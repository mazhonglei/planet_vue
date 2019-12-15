<template>
    <transition :name="transitionName">
        <div class="body" id="receivables">
            <div>
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="myBack()">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                        <span class="titlefont">收款</span>
                    </div>
                </div>
                <div class="recharge-home">
                    <div class="recharge-home-in">
                        <div class="recharge-info">收款地址</div>
                        <div class="recharge-code">
                            <!--<img src="@/assets/img/wallet/code.jpg" alt="">-->
                            <canvas id="canvas23232323"></canvas>
                        </div>
                        <div class="recharge-address">
                            {{ walletActive.address }}
                            <img src="@/assets/img/wallet/copy.png" alt=""
                                 v-clipboard:copy="walletActive.address"
                                 v-clipboard:success="doClipboard"
                                 v-clipboard:error="" id="alert_little">
                        </div>
                    </div>
                </div>
            </div>
            <Alert_little></Alert_little>
        </div>
    </transition>
</template>

<script>
    import {mapState} from 'vuex'
    import QRCode from 'qrcode';
    import Alert_little from '@/components/modal/alert_little';

    export default {
        name: "wallet_vns_receive",
        created() {
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
                    that.myBack()
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
            this.showQrcode();
        },
        data() {
            return {
                transitionName: 'slide-right'
            }
        },
        computed: {
            ...mapState("wallet", [
                "walletActive",
            ]),
            ...mapState("modal", [
                "alert_little"
            ])
        },
        components: {
            Alert_little
        },
        methods: {
            showQrcode: function () {
                let canvas = document.querySelector('#canvas23232323');
                QRCode.toCanvas(canvas, this.walletActive.address, {
                    width: 90,
                    margin: 0
                }, function (error) {
                    console.log(error)
                })
            },
            doClipboard: function () {
                this.aAlert_little({
                    msg: "复制成功",
                    top: "220px"
                })
            },
            myBack: function () {
                let query = this.$route.query;
                switch (query.from){
                    case "bancor":
                        this.changeRoute("/bancor/transfer/list", query);
                        break;
                    default:
                        this.changeRoute("/vns/list", {'from':'receivables'});
                        break;
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/css/wallet/receivables";
</style>
