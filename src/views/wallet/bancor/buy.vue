<template>
    <transition :name="transitionName">
        <div class="body" id="purchase">
            <div>
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/bancor/count',
                        {'from':'purchase', address: contract.address, name: contract.name})">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                        <span class="titlefont">买入</span>
                    </div>
                </div>
                <div class="transaction-buy-home">
                    <!--<div class="transaction-buy-pay">
                        <div>
                            <div>买入{{ contract.name }}数量</div>
                            <div>余额：{{ contract.balance | roundOff(4)}} {{ contract.name }}</div>
                        </div>
                        <div><input type="text" :placeholder="'输入您要买入的'+contract.name+'数量'" v-model="num"></div>
                    </div>
                    <div class="transaction-buy-estimate">
                        <div>
                            <div>预估买入所需VNS</div>
                            <div>余额：{{ balance.VNS | roundOff(4) }} VNS</div>
                        </div>
                        <div>预估买入花费{{ vns }} VNS</div>
                    </div>-->
                    <div class="transaction-buy-pay">
                        <div>
                            <div>买入VNS数量</div>
                            <div>余额：{{ balance.VNS | roundOff(4)}} VNS</div>
                        </div>
                        <div><input type="text" placeholder="输入您要买入的VNS数量" v-model="vns"></div>
                    </div>
                    <div class="transaction-buy-estimate">
                        <div>
                            <div>预计获得{{ contract.name }}数量</div>
                            <div>余额：{{ contract.balance | roundOff(4) }} {{ contract.name }}</div>
                        </div>
                        <div>预估获得{{ num | roundOff(4)}} {{ contract.name }}</div>
                    </div>
                    <div class="transaction-buy-cost">
                        <div>
                            <div>矿工费用</div>
                            <div>{{ gasPrice }} Gwei</div>
                        </div>
                        <div class="transfer-range">
                            <mt-range v-model="gasPrice" :min="1" :step="0.1" :max="50">
                                <div slot="start" class="range-start"><img src="@/assets/img/tortoise.png" alt=""></div>
                                <div slot="end" class="range-end"><img src="@/assets/img/rabbit.png" alt=""></div>
                            </mt-range>
                        </div>
                    </div>
                    <div class="transaction-buy-hint">预估买入数量仅供参考，Bancor协议会根据交易数量自动调整交易价格，请以实际到账数量为准。</div>
                    <div class="transaction-buy-button buyin" v-show="button_1" @click="step=2">买入</div>
                    <div class="transaction-buy-button buyin" style="background: #C2C7CB;" v-show="!button_1">买入</div>

                </div>
            </div>
            <!--确定遮罩层-->
            <transition name="bg">
                <div class="sureMask" v-show="step !=1"></div>
            </transition>
            <transition name="fade">
                <div class="sureMaskContent" v-show="step==2">
                    <div class="contentShare">
                        支付详情
                        <i class="iconfont icon-chahao1" @click="step=1"></i>
                    </div>
                    <div class="detail-money">
                        {{ vns }} VNS
                    </div>
                    <div class="detail-information detail-first">
                        <div>支付信息</div>
                        <div>{{ contract.name }} 购买</div>
                    </div>
                    <div class="detail-information">
                        <div>收款地址</div>
                        <div>{{ contract.address }}</div>
                    </div>
                    <div class="detail-information">
                        <div>付款地址</div>
                        <div>{{ walletActive.address }}</div>
                    </div>
                    <div class="detail-information detail-cost">
                        <div>gasPrice</div>
                        <div>{{ gasPrice }} Gwei</div>
                    </div>
                    <div class="content-next" @click="step=3">下一步</div>
                </div>
            </transition>
            <transition name="fade">
                <div class="content-password" v-show="step==3">
                    <div class="password-title">
                        <img src="@/assets/img/wallet/backIcon.png" @click="step=2" alt="">
                        请输入密码
                    </div>
                    <div class="password-wallet">输入钱包密码</div>
                    <div class="password-word">
                        <input :type="pwdShow?'text':'password'" v-model="pwd" placeholder="密码">
                    </div>
                    <div>
                        <img src="@/assets/img/active/eye.png" class="password-img" v-if="!pwdShow"
                             @click="pwdShow = true">
                        <img src="@/assets/img/active/eye_active.png" class="password-img" v-else
                             @click="pwdShow = false">
                    </div>
                    <div class="password-sure" v-show="button_2" style="background: #411E60;" @click="buy()">确认</div>
                    <div class="password-sure" v-show="!button_2">确认</div>
                </div>
            </transition>
            <Success></Success>
            <Loading2></Loading2>
        </div>
    </transition>
</template>

<script>
    import {synBalanceOnce} from '@/assets/js/timer/index';
    import {mapActions, mapState} from 'vuex';
    import {getGasPrice} from "@/assets/js/etherjs/account";
    import {myAlert} from "@/assets/js/h5plus/nativeUI";
    import {AESDecrypt} from '@/assets/js/utils/crypto'
    import Loading2 from '@/components/modal/loading';
    import Success from '@/components/modal/success';
    import {Smt_balanceOf, Smt_owner} from "@/assets/js/etherjs/bancor/SmartToken";
    import {Bnt_buy} from "@/assets/js/etherjs/bancor/BancorNetwork";
    import {Bcv_getPurchaseReturn} from "@/assets/js/etherjs/bancor/BancorConverter";

    export default {
        name: "purchase",
        data() {
            return {
                contract: {
                    address: "",
                    name: "",
                    balance: 0,
                },
                transitionName: 'slide-right',
                gasPrice: 4,
                to: "",
                num: 0,
                vns: "",
                money: "",
                msg: "",
                step: 1,
                button_1: false,
                button_2: false,
                pwd: "",
                pwdShow: false,
                Interval: ""
            }
        },
        created() {
            this.contract.address = this.$route.query.address;
            this.contract.name = this.$route.query.name;
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
                    that.changeRoute('/bancor/count',
                        {'from':'purchase', address: that.contract.address, name: that.contract.name})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
            synBalanceOnce();
            this.getGasPrice();
            this.Interval = setInterval(() => {
                this.checkEmpty();
            }, 500);

            this.getReturn();

            Smt_balanceOf(this.contract.address, this.walletActive.address).then((balance) => {
                this.contract.balance = balance / 10 ** 18;
            });
        },
        computed: {
            ...mapState("balance", [
                "balance"
            ]),
            ...mapState("wallet", [
                "walletActive",
            ]),
        },
        components: {
            Loading2, Success
        },
        methods: {
            getGasPrice: async function () {
                let price = await getGasPrice();
                price = price.toString() / 10 ** 9;
                if(Number(price) >= 4){
                    this.gasPrice = price;
                }
            },
            checkEmpty: function () {
                this.button_1 = this.num != '' && parseFloat(this.vns) < parseFloat(this.balance.VNS);
                this.button_2 = this.pwd != '';
            },
            getReturn: async function () {
                let owner = await Smt_owner(this.contract.address);
                this.Interval = setInterval(async () => {
                    if (this.vns == "") return;
                    let res = await Bcv_getPurchaseReturn(owner, this.vns);
                    this.num = res.toString() / 10 ** 18;
                }, 1000);
            },
            buy: async function () {
                let pKey = AESDecrypt({
                    pwd: this.pwd,
                    msg: this.walletActive.pKey
                });
                if (pKey == '') {
                    myAlert({msg: "密码错误",});
                    return
                }
                this.step = 1;
                try {
                    this.aLoading({
                        show: true,
                        tip: "处理中...",
                        close: true
                    });

                    await Bnt_buy({
                        privateKey: pKey,
                        smt_address: this.contract.address,
                        gasPrice: this.gasPrice,
                        vns: this.vns
                    });
                    this.aSuccess({show: true, tip: "购买成功"});
                    setTimeout(() => {
                        this.changeRoute('/bancor/count', {
                            from: 'purchase',
                            address: this.$route.query.address,
                            name: this.$route.query.name
                        })
                    }, 1000)
                } catch (e) {
                    console.log(e);
                    this.aLoading({show: false});
                    myAlert({msg: "交易失败",});
                }
            },
            ...mapActions('modal', [
                'aLoading',
                'aSuccess',
            ]),
        },
        destroyed: function () {
            clearInterval(this.Interval);
        },
    }
</script>

<style lang="scss">
    @import "../../../assets/css/wallet/purchase";
</style>