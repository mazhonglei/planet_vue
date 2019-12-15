<template>
    <transition :name="transitionName">
        <div class="body" id="sellOut">
            <div>
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/bancor/count',
                        {'from':'sellOut', address: contract.address, name: contract.name})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                        <span class="titlefont">卖出</span>
                    </div>
                </div>
                <div class="transaction-buy-home">
                    <div class="transaction-buy-pay">
                        <div>
                            <div>卖出{{ contract.name }}数量</div>
                            <div>余额：{{ contract.balance | roundOff(4) }} {{ contract.name }}</div>
                        </div>
                        <div><input type="number" :placeholder="'输入您要卖出'+contract.name+'的数量'" v-model="num"></div>
                    </div>
                    <div class="transaction-buy-estimate">
                        <div>
                            <div>预估卖出获得VNS金额</div>
                            <div>余额：{{ balance.VNS | roundOff(4) }} VNS</div>
                        </div>
                        <div>{{ vns | roundOff(4) }} VNS</div>
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
                    <div class="transaction-buy-hint">预估卖出VNS金额仅供参考，Bancor协议会根据交易数量自动调整交易价格，请以实际到账数量为准。</div>
                    <div class="transaction-buy-button buyout" v-show="button_1" @click="step=2">卖出</div>
                    <div class="transaction-buy-button buyout" style="background: #C2C7CB;" v-show="!button_1">卖出</div>
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
                        {{ num }} {{ contract.name }}
                    </div>
                    <div class="detail-information detail-first">
                        <div>交易信息</div>
                        <div>{{ contract.name }} 出售</div>
                    </div>
                    <div class="detail-information">
                        <div>合约地址</div>
                        <div>{{ contract.address }}</div>
                    </div>
                    <div class="detail-information">
                        <div>收款地址</div>
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
                        <img src="@/assets/img/wallet/backIcon.png" @click="step=2" alt="">请输入密码
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
                    <div class="password-sure" v-show="button_2" style="background: #411E60;" @click="sale()">确认</div>
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
    // import {Bnt_sale} from "@/assets/js/etherjs/bancor/BancorNetwork";
    import {Bcv_getSaleReturn, Bcv_sale} from "@/assets/js/etherjs/bancor/BancorConverter";

    export default {
        name: "sellOut",
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
                num: "",
                vns: 0,
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
                        {'from':'sellOut', address: that.contract.address, name: that.contract.name})
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

            this.Interval = setInterval(() => {
                this.getReturn()
            }, 1000);

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
                this.button_1 = this.num != '' && parseFloat(this.num) <= parseFloat(this.contract.balance);
                this.button_2 = this.pwd != '';
            },
            getReturn: async function () {
                if (this.num == "") return;
                let owner = await Smt_owner(this.contract.address);
                let res = await Bcv_getSaleReturn(owner, this.num);
                this.vns = res.toString() / 10 ** 18;
            },
            sale: async function () {
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
                    this.aLoading({show: true, tip: "区块确认中...", close: true});
                    let owner = await Smt_owner(this.contract.address);
                    await Bcv_sale({
                        Bcv_address: owner,
                        privateKey: pKey,
                        smt_address: this.contract.address,
                        gasPrice: this.gasPrice,
                        amount: this.num
                    });
                    this.aSuccess({show: true, tip: "出售成功"});
                    setTimeout(()=>{
                        this.changeRoute('/bancor/count', {
                            from: 'sellOut',
                            address: this.$route.query.address,
                            name: this.$route.query.name
                        })
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
    @import "../../../assets/css/wallet/sellOut";
</style>