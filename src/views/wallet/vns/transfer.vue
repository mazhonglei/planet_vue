<template>
    <transition :name="transitionName">
        <div class="body" id="transfer">
            <div style="height: 100%;">
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/vns/list/',{'from':'transfer'})">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                        <span class="titlefont">VNS转账</span>
                    </div>
                </div>
                <div class="withdraw-home">
                    <div class="withdraw-count">
                        <div>
                            <div>支付数量</div>
                            <div>余额：{{ balance.VNS | roundOff(4) }} VNS</div>
                        </div>
                        <div class="withdraw-input">
                            <input type="text" placeholder="输入您要支付的数量" v-model="vns">
                        </div>
                    </div>
                    <div class="withdraw-address">
                        <div>收款地址</div>
                        <div class="withdraw-input">
                            <input type="text" placeholder="输入您要支付的收款地址" v-model="to">
                        </div>
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
                    <div class="withdraw-hint">请确认转出地址无误后，点击提交。提交后无法更改，无法找回。</div>
                    <div class="withdraw-button" style="background: #411E60;" v-show="button_1" @click="step=2">
                        提交
                    </div>
                    <div class="withdraw-button" v-show="!button_1">
                        提交
                    </div>
                </div>
            </div>

            <!--确定遮罩层-->
            <transition name="bg">
                <div class="sureMask" v-show="step !=1 "></div>
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
                        <div>VNS 转账</div>
                    </div>
                    <div class="detail-information">
                        <div>收款地址</div>
                        <div>{{ to }}</div>
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
                        <img src="@/assets/img/wallet/backIcon.png" alt="" @click="step=2">
                        请输入密码
                    </div>
                    <div class="password-wallet">输入钱包密码</div>
                    <div class="password-word">
                        <input :type="pwdShow?'text':'password'" v-model="pwd" placeholder="密码">
                    </div>
                    <div>
                        <img src="@/assets/img/active/eye.png" class="password-img" v-if="!pwdShow" @click="pwdShow = true">
                        <img src="@/assets/img/active/eye_active.png" class="password-img" v-else @click="pwdShow = false">
                    </div>
                    <div class="password-sure" v-show="button_2" style="background: #411E60;" @click="doTransfer()">确认</div>
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
    import {transferVNS} from '@/assets/js/etherjs/transaction'
    import Loading2 from '@/components/modal/loading';
    import Success from '@/components/modal/success';

    export default {
        name: "transfer",
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
                    that.changeRoute('/vns/list/',{'from':'transfer'})
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
        data() {
            return {
                transitionName: 'slide-right',
                gasPrice: 4,
                to: "",
                vns: "",
                money: "",
                msg: "",
                step: 1,
                button_1: false,
                button_2: false,
                pwd: "",
                pwdShow: false,
                Interval:""
            }
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
                this.button_1 = this.vns != '' && this.to != this.walletActive.address && parseFloat(this.vns) < parseFloat(this.balance.VNS);
                this.button_2 = this.pwd != '';
            },
            doTransfer: async function () {
                if (this.address == '') {
                    myAlert({msg: "地址不能为空",});
                    return;
                }
                let pKey = AESDecrypt({
                    pwd: this.pwd,
                    msg: this.walletActive.pKey
                });
                if (pKey == '') {
                    myAlert({msg: "密码错误",});
                    return
                }
                this.step = 1;
                this.aLoading({
                    show: true,
                    tip: "处理中...",
                    close:true
                });
                try {
                    await transferVNS({
                        privateKey: pKey,
                        to: this.to,
                        gasPrice: this.gasPrice,
                        value: this.vns
                    });
                    this.aSuccess({show: true, tip: "转账成功"});
                    setTimeout(()=>{
                        this.changeRoute("/vns/list")
                    },1000)
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
    @import "../../../assets/css/wallet/transfer";

    .fade-enter-active, .fade-leave-active {
        transition: all 0.4s;
    }

    .fade-enter, .fade-leave-to {
        transform: translateY(10rem);
    }

    .fade-enter-to, .fade-leave {
        transform: translateY(0rem);
    }

    .bg-enter-active, .bg-leave-active {
        transition: all 0.8s;
    }

    .bg-enter, .bg-leave-to {
        opacity: 0;
    }

</style>