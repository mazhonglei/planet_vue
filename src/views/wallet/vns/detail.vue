<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
    <transition :name="transitionName">
        <div class="body" id="transferDetails">
            <div>
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="backRoute()">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                        <span class="titlefont">转账详情</span>
                    </div>
                </div>
                <div class="transfer-detail-home">
                    <div class="transfer-detail-home-in">
                        <div class="transfer-detail-success">
                            <div><img src="@/assets/img/wallet/success.png" alt=""></div>
                            <div>转账成功</div>
                            <div>{{ obj.timestamp | time2Date() }}</div>
                        </div>
                        <div class="transfer-detail-info">
                            <div>
                                <div>金额:</div>
                                <div>{{ obj.value | roundOff(2) }} VNS</div>
                            </div>
                            <div>
                                <div>矿工费:</div>
                                <div>
                                    <div>{{ obj.gasUsed * gasPrice / 10 ** 9 | roundOff(6) }} VNS</div>
                                    <div>≈Gas({{ obj.gasUsed }})*GasPrice({{ gasPrice }} Gwei)</div>
                                </div>
                            </div>
                            <div>
                                <div>付款地址:</div>
                                <div>{{ obj.from }}<img src="@/assets/img/wallet/copy.png" alt=""
                                                        v-clipboard:copy="obj.from"
                                                        v-clipboard:success="doClipboard"
                                                        v-clipboard:error="" class="alert_little">
                                </div>
                            </div>
                            <div>
                                <div>收款地址:</div>
                                <div>{{ obj.to }}
                                    <img src="@/assets/img/wallet/copy.png" alt=""
                                         v-clipboard:copy="obj.to"
                                         v-clipboard:success="doClipboard"
                                         v-clipboard:error="" class="alert_little">
                                </div>
                            </div>
                        </div>
                        <div class="tramsfer-detail-code">
                            <div>
                                <div>
                                    <div>交易Txld:</div>
                                    <div>{{ addressSub(obj.transactionHash,5) }}
                                        <img src="@/assets/img/wallet/copy.png" alt=""
                                             v-clipboard:copy="obj.transactionHash"
                                             v-clipboard:success="doClipboard"
                                             v-clipboard:error="" class="alert_little">
                                    </div>
                                </div>
                                <div>
                                    <div>区块高度:</div>
                                    <div>{{ obj.blockNumber }}</div>
                                </div>
                            </div>
                            <div>
                                <canvas id="canvas-hash" style="width: 100%;height: 100%"></canvas>
                            </div>
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
    import {getTransaction} from "@/assets/js/etherjs/account";
    import QRCode from 'qrcode';
    import Alert_little from '@/components/modal/alert_little';

    export default {
        name: "transferDetails",
        data() {
            return {
                transitionName: 'slide-right',
                obj: {},
                gasPrice: 0
            }
        },
        created() {
            this.obj = this.$route.query;
            if (this.$route.query.from == 'list') {
                this.transitionName = 'slide-left';
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
            this.showQrcode();
            this.transaction();
        },
        computed: {
            ...mapState("modal", [
                "alert_little"
            ])
        },
        components: {
            Alert_little
        },

        methods: {
            showQrcode: function () {
                let canvas = document.querySelector('#canvas-hash');
                QRCode.toCanvas(canvas, this.obj.blockHash, {
                    width: 80,
                    margin: 0
                }, function (error) {
                    if (error)
                        console.log(error)
                })
            },
            doClipboard: function () {
                this.aAlert_little({
                    msg: "复制成功",
                    top: "220px"
                })
            },
            transaction: async function () {
                let res = await getTransaction(this.$route.query.transactionHash);
                this.gasPrice = res.gasPrice.toString() / 10 ** 9;
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/css/wallet/transferDetails";
</style>
