<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
    <transition :name="transitionName">
        <div class="body" id="recharge">
            <div>
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="backRoute()">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                        <span class="titlefont">充值</span>
                    </div>
                </div>
                <div class="recharge-home">
                    <div class="recharge-home-in">
                        <div class="recharge-info">充值地址</div>
                        <div class="recharge-code">
                            <canvas id="canvasRechargeQr"></canvas>
                        </div>
                        <div class="recharge-address">{{address}}<img
                                src="@/assets/img/wallet/copy.png" alt=""
                                v-clipboard:copy="address"
                                v-clipboard:success="doClipboard"
                                v-clipboard:error="" id="alert_little"></div>
                    </div>
                </div>
            </div>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>
    </transition>
</template>

<script>
    import axios from "axios";
    import sha1 from 'sha1';
    import {site, apiKey} from '../../../assets/js/config/site.js';
    import QRCode from 'qrcode';
    import Toast from '../../../components/toast';

    export default {
        name: "recharge",
        data() {
            return {
                transitionName: 'slide-left',
                currency_id: '',
                address: '',
                invitCode: '',
                msg: "",
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
        created() {
            if (this.$route.query.from == 'list') {
                this.transitionName = 'slide-right';
            }
            this.currency_id = this.$route.query.currencyId;
            this.getCurrencyAddress();
            /*this.replaceRoute('recharge')*/
        },
        components: {Toast},
        methods: {
            //提示信息
            square(v) {
                this.msg = v
            },
            showQrcode: function () {
                let canvas = document.querySelector('#canvasRechargeQr');
                QRCode.toCanvas(canvas, this.address, {
                    width: 120,
                    margin: 2
                }, function (error) {
                    console.log(error)
                })
            },
            getCurrencyAddress() {
                let uid = localStorage.getItem('uid');
                let currencyId = this.currency_id;
                let url = site + '/api/users/getCurrencyAddress';
                let that = this;
                let info = {
                    userId: uid,
                    currencyId: currencyId,
                    accessToken: sha1(uid + currencyId + apiKey)
                }
                axios.post(url, info).then(function (response) {
                    if (response.data.status == 1) {
                        that.address = response.data.data;
                        that.showQrcode();
                    } else {
                        console.log(response);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            doClipboard: function () {
                let that = this;
                that.msg = "复制成功"
            },
        },
        computed: {
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
        },
    }
</script>

<style lang="scss">
    @import "../../../assets/css/wallet/recharge";

    #recharge {
        .toastcover {
            top: 220px;
        }
    }
</style>
