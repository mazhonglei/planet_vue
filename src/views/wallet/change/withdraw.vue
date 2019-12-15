<template>
    <transition :name="transitionName">
        <div class="body" id="withdraw">
            <div>
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="backRoute()">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                        <span class="titlefont">提现</span>
                    </div>
                </div>
                <div class="withdraw-home">
                    <div class="withdraw-count">
                        <div>
                            <div>提现数量</div>
                            <div>余额：{{tokenNum}} {{tokenMark}}</div>
                        </div>
                        <div class="withdraw-input"><input type="text" v-model="withdrawNum" placeholder="输入您要提现的数量"/>
                        </div>
                    </div>
                    <div class="withdraw-address">
                        <div>提现地址</div>
                        <div class="withdraw-input"><input type="text" v-model="withdrawAddress"
                                                           placeholder="输入您要提现的收款地址"/></div>
                    </div>
                    <div class="withdraw-code">
                        <div>短信验证码</div>
                        <div class="code-msg">
                            <div class="withdraw-input"><input type="text" v-model="withdrawCode"
                                                               placeholder="输入您收到的短信验证码"></div>
                            <div v-show="codeShow" @click="sendMessage">发送验证码</div>
                            <a href="#" v-show="!codeShow" style="background-color: #C2C7CB;"><span>{{auth_time}}</span>s后重新发送</a>
                        </div>
                    </div>
                    <div class="withdraw-charge">
                        <div>手续费</div>
                        <div>提现手续费为{{fee}}%，实际到账{{calNum|roundOff(4)}} {{tokenMark}}</div>
                    </div>
                    <div class="withdraw-hint">请确认提现地址无误后，点击提交。提交后无法更改，无法找回。</div>
                    <div class="withdraw-button" style="background-color: #C2C7CB;"
                         v-show="showBtn">提交
                    </div>
                    <div class="withdraw-button"  @click="submitWithdraw" v-show="!showBtn">提交</div>
                </div>
            </div>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>
    </transition>
</template>

<script>
    import axios from "axios";
    import Toast from '../../../components/toast';
    import sha1 from 'sha1';
    import {site, apiKey} from '../../../assets/js/config/site.js';
    import {sendMsg} from '../../../assets/js/config/msg.js';

    export default {
        name: "withdraw",
        components: {Toast},
        data() {
            return {
                transitionName: 'slide-left',
                tokenNum: 0,
                tokenMark: '',
                fee: '',
                calNum: 0,
                wdNum: '',
                wdAddress: '',
                wdCode: '',
                codeShow: true,
                msg: '',
                auth_time: 0, //倒计时0
                showBtn: true
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
                    that.backRoute()
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
        },
        computed: {
            withdrawNum: {
                get() {
                    return this.wdNum;
                },
                set(v) {
                    this.wdNum = v;
                    if (Number(v) > Number(this.tokenNum)) {
                        this.wdNum = Number(this.tokenNum);
                    } else {
                        this.wdNum = v;
                    }
                    this.calNum = parseFloat((this.wdNum - (this.wdNum * this.fee / 100)).toFixed(6));
                }
            },
            withdrawAddress: {
                get() {
                    return this.wdAddress;
                },
                set(v) {
                    this.wdAddress = v;
                }
            },
            withdrawCode: {
                get() {
                    return this.wdCode;
                },
                set(v) {
                    this.wdCode = v;
                }
            },
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
        },
        watch: {
            withdrawAddress() {
                if (this.withdrawAddress != "") {
                    this.showBtn = false;
                } else {
                    this.showBtn = true;
                }
            }
        },
        created() {
            this.currency_id = this.$route.query.currencyId;
            this.getCurrencyInfo();
            if (this.$route.query.from == 'list') {
                this.transitionName = 'slide-right';
            }
            this.replaceRoute('withdraw', {currencyId: this.currency_id});

        },
        methods: {

            getCurrencyInfo: function () {
                let uid = localStorage.getItem('uid');
                let currencyId = this.currency_id;
                let url = site + '/api/trans/getCurrencyInfo';
                let that = this;
                let info = {
                    userId: uid,
                    currencyId: currencyId,
                    accessToken: sha1(uid + currencyId + apiKey)
                }
                axios.post(url, info).then(function (response) {
                    console.log(response);
                    if (response.data.status == 1) {
                        that.tokenNum = response.data.data.tokenNum;
                        that.tokenMark = response.data.data.tokenMark;
                        that.fee = response.data.data.fee;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
            ,
            sendMessage() {
                let username = localStorage.getItem('username');
                sendMsg(this, username, 5);
                //验证码倒计时
                this.codeShow = false;
                this.auth_time = 59;
                let auth_timer = setInterval(() => {
                    this.auth_time--;
                    if (this.auth_time <= 0) {
                        this.codeShow = true;
                        clearInterval(auth_timer)
                    }
                }, 1000)
            }
            ,
            submitWithdraw() {
                let uid = localStorage.getItem('uid');
                let currencyId = this.currency_id;
                let wdAddress = this.wdAddress;
                let wdCode = this.wdCode;
                let wdNum = this.wdNum;
                let that = this;
                let url = site + '/api/trans/withdrawCurrency';
                let info = {
                    userId: uid,
                    currencyId: currencyId,
                    wdAddress: wdAddress,
                    wdCode: wdCode,
                    wdNum: wdNum,
                    accessToken: sha1(uid + currencyId + wdAddress + wdCode + wdNum + apiKey)
                }
                axios.post(url, info).then(function (response) {
                    if (response.data.status == 1) {
                        that.msg = "提现成功，等待审核";
                        setTimeout(function () {
                            that.changeRoute('/change/asset');
                        }, 1000);
                    } else {
                        that.msg = "操作失败，请重新操作";
                    }
                }).catch(function (error) {
                    console.log(error);
                    that.msg = "操作失败，请重新操作";
                });
            },
            square(v) {
                this.msg = v
            },
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/css/wallet/withdraw";
</style>
