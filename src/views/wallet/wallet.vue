<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
    <transition :name="transitionName">
        <div class="body" id="wallet">
            <div class="new">
                <!--头部-->
                <div class="header">
                    <div class="immersion">
                        <span class="titlefont">钱包</span>
                    </div>
                </div>
                <div class="wallet-home">
                    <div class="wallet-use-content">
                        <div class="wallet-use">
                            <div class="wallet-use-detail">
                                <div class="wallet-use-photo"><img :src="null | imgPath" alt=""></div>
                                <div class="wallet-use-info">
                                    <div class="wallet-use-name">VNS-Wallet</div>
                                    <div class="wallet-use-address">{{ addressSub(walletActive.address,10) }}
                                        <img src="@/assets/img/wallet/copy-white.png" class="coffer-copy"
                                             v-clipboard:copy="walletActive.address"
                                             v-clipboard:success="doClipboard"
                                             v-clipboard:error="" id="alert_little">
                                    </div>
                                </div>
                                <div class="wallet-more" @click="changeRoute('/wallet/manage')">
                                    <img src="@/assets/img/wallet/more.png" alt="">
                                </div>
                            </div>
                            <div class="wallet-use-money">
                                <span>$</span>
                                <span class="wallet-use-money-count">{{ money | roundOff(4)}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="wallet-other">
                        <div class="wallet-other-content" @click="changeRoute('/bancor/list')">
                            <div class="wallet-other-photo"><img src="@/assets/img/wallet/transaction.png" alt=""></div>
                            <div class="wallet-other-detail">
                                <div>Bancor交易</div>
                                <div>去中心化的交易所</div>
                            </div>
                        </div>
                        <div class="wallet-other-content" @click="changeRoute('/change/asset',{from:'wallet'})">
                            <div class="wallet-other-photo"><img src="@/assets/img/wallet/diamond.png" alt=""></div>
                            <div class="wallet-other-detail">
                                <div>零钱</div>
                                <div>$ {{sumCurrency}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="wallet-assets">
                        <div>资产</div>
                        <div @click="changeRoute('wallet/bancor/assets',{from:'wallet'})">
                            <img src="@/assets/img/wallet/add.png" alt="">
                        </div>
                    </div>
                    <div class="wallet-assets-content">
                        <div class="wallet-assets-detail" @click="changeRoute('/vns/list',{from:'wallet'})">
                            <div><img :src="null | imgPath" alt=""></div>
                            <div>
                                <div>VNS</div>
                                <div>Venus</div>
                            </div>
                            <div>
                                <div>{{ balance.VNS | roundOff(4) }}</div>
                                <div>{{ balance.VNS * currency.VNS | roundOff(4) }}</div>
                            </div>
                        </div>
                        <div class="wallet-assets-detail" v-for="(v,k) in bancorList" :key="k" @click="changeRoute('/bancor/transfer/list',
                        {address:v.contract_address, name: v.currency_mark,from:'wallet'})">
                            <div><img :src="null | imgPath" alt=""></div>
                            <div>
                                <div>{{ v.currency_mark }}</div>
                                <div>{{ v.currency_name }}</div>
                            </div>
                            <div>
                                <div>{{ v.balance | roundOff(4) }}</div>
                                <div>{{ v.balance * v.last_price * currency.VNS | roundOff(4)}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Tabbar :selected="selected" :tabs="tabs"></Tabbar>
            <Alert_little></Alert_little>
        </div>

    </transition>
</template>

<script>
    import {mapState} from 'vuex'
    import {synBalanceOnce, synWallet, synCurrency, synExchange} from '@/assets/js/timer/index';
    import {site, apiKey} from '@/assets/js/config/site.js'
    import sha1 from 'sha1'
    import axios from "axios";
    import {Smt_balanceOf} from "@/assets/js/etherjs/bancor/SmartToken";
    import Alert_little from '@/components/modal/alert_little';

    export default {
        name: "wallet",
        data() {
            return {
                isShow: false,
                selected: "wallet",
                tabs: [require("@/assets/img/active/home.png"), require("@/assets/img/active/find.png"),
                    require("@/assets/img/active/wallet_active.png"), require("@/assets/img/active/my.png")],
                transitionName: '',
                money: 0,
                sumCurrency: 0,
                bancorList: []
            }
        },
        computed: {
            ...mapState("balance", [
                "balance", "currency"
            ]),
            ...mapState("wallet", [
                "walletActive",
            ]),
            ...mapState("modal", [
                "alert_little"
            ])
        },
        mounted() {
            mui.init({
                keyEventBind: {
                    backbutton: true  //关闭back按键监听
                }
            });
            // //首页返回键处理
            // //处理逻辑：1秒内，连续两次按返回键，则退出应用；
            var first = null;
            mui.back = function () {
                //首次按键，提示  再按一次退出应用
                if (!first) {
                    first = new Date().getTime();//记录第一次按下回退键的时间
                    mui.toast('再按一次退出应用');//给出提示
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                } else {
                    if (new Date().getTime() - first < 1000) {//如果两次按下的时间小于1s，
                        plus.runtime.quit();//那么就退出app

                    }
                }
            };
        },
        created() {
            if (this.$route.query.from == 'walletManage' || this.$route.query.from == 'bancor' || this.$route.query.from == 'smallChange' || this.$route.query.from == 'asset') {
                this.transitionName = 'slide-left';
            } else {
                this.transitionName = '';
            }

            synBalanceOnce().then(() => {
                this.money += Number(this.balance.VNS) * this.currency.VNS;
            });
            synWallet();
            synCurrency();
            synExchange();
            this.doBancorList();
            this.getUserCurrencySum();
        },
        components: {
            Alert_little
        },
        methods: {
            doClipboard: function () {
                this.aAlert_little({
                    msg: "复制成功",
                    top: "220px"
                })
            },
            show() {
                this.isShow = true;
            },
            close() {
                this.isShow = false
            },
            getUserCurrencySum: function () {
                let uid = localStorage.getItem('uid');
                let url = site + '/api/users/getMyCuerrencySum';
                let that = this;
                let info = {
                    userId: uid,
                    accessToken: sha1(uid + apiKey)
                }
                axios.post(url, info).then(function (response) {
                    if (response.data.status == 1) {
                        that.sumCurrency = response.data.data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            doBancorList: function () {
                let bancorAddress = localStorage.getItem("bancorAddress") ? JSON.parse(localStorage.getItem("bancorAddress")) : [];

                axios.get(site + '/api/publics/getCurrencyList').then(async (response) => {
                    let bancorList = response.data.data;
                    for (let i in bancorList) {
                        if (bancorAddress.indexOf(bancorList[i].contract_address) > -1) {
                            this.bancorList.push(bancorList[i]);
                            Smt_balanceOf(this.bancorList[i].contract_address, this.walletActive.address).then((balance) => {
                                this.bancorList[i].balance = balance / 10 ** 18;
                                this.$set(this.bancorList, i, this.bancorList[i]);
                            });
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        },
        filters: {
            imgPath: function (value) {
                if (value) {
                    return site + value;
                } else {
                    return require('@/assets/img/head_default.png');
                }
            }
        },
    }
</script>

<style lang="scss">
    @import "../../assets/css/wallet/wallet";
    @import "../../assets/css/wallet/cash";

    #wallet {
        .fade-enter-active, .fade-leave-active {
            transition: all .5s;
        }

        .fade-enter, .fade-leave-to {
            transform: translateY(150%);
        }

        .bg-enter-active, .bg-leave-active {
            transition: all .5s;
        }

        .bg-enter, .bg-leave-to {
            opacity: 0;
        }
    }
</style>
