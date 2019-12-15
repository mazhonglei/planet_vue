<template>
    <transition :name="transitionName">
        <div class="body" id="bancor">
            <div>
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/wallet',{'from':'bancor'})">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                        <span class="titlefont">Bancor交易</span>
                    </div>
                </div>
                <div class="bancor-transaction-home">
                    <div class="transaction-assets-title">
                        <div>交易资产</div>
                        <div>最新价</div>
                        <div>24H涨跌</div>
                    </div>
                    <div class="transaction-assets-content">
                        <div class="transaction-assets-list"
                             @click="changeRoute('/bancor/count', {address: v.contract_address, name: v.currency_mark})"
                             v-for="(v,k) in bancorList" :key="k">
                            <div class="transaction-assets-name">
                                <div>
                                    <div>{{ v.currency_mark }}</div>
                                    <div>&nbsp;/VNS</div>
                                </div>
                                <div>24h 量 {{ v.volume }}</div>
                            </div>
                            <div class="transaction-assets-money">
                                <div>{{ v.last_price }}</div>
                                <div>{{ v.last_price }}</div>
                            </div>
                            <div class="transaction-assets-change">
                                <div class="change-red" v-if="Number(v.change) < 0">{{ v.change * 100 }}%</div>
                                <div class="change-green" v-else>{{ v.change * 100 }}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {site} from '@/assets/js/config/site.js'
    import axios from "axios";

    export default {
        name: "bancor",
        data() {
            return {
                transitionName: 'slide-right',
                bancorList: []
            }
        },
        mounted() {
            let that = this;
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
                    that.changeRoute('/wallet', {'from': 'bancor'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
        },
        created() {
            if (this.$route.query.from == 'transaction') {
                this.transitionName = 'slide-left';
            }
            this.doBancorList();
        },
        methods: {
            show() {
                this.isShow = true;
            },
            close() {
                this.isShow = false
            },
            doBancorList: function () {
                axios.get(site + '/api/publics/getCurrencyList').then((response) => {
                    this.bancorList = response.data.data;
                }).catch((err) => {
                    console.log(err);
                })
            }
        },
    }
</script>

<style lang="scss">
    @import "../../../assets/css/wallet/bancor";
</style>