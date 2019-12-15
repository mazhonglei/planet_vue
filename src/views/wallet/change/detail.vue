<template>
    <transition :name="transitionName">
        <div class="body" id="transactionDetails">
            <div>
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="backRoute()">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                        <span class="titlefont">交易详情</span>
                    </div>
                </div>
                <div class="withdraw-detail-home" id="withdrawDetails">
                    <div class="withdraw-detail-home-in">
                        <div class="withdraw-detail-audit"  v-if="obj.status == 1 || obj.status == 4 || obj.status == 5">
                            <div><img src="@/assets/img/wallet/time.png" alt=""></div>
                            <div>待审核</div>
                            <div>{{ obj.ctime }}</div>
                        </div>
                        <div class="withdraw-detail-audit" v-if="obj.status == 2">
                            <div><img src="@/assets/img/wallet/success-w.png" alt=""></div>
                            <div>交易成功</div>
                            <div>{{ obj.ctime }}</div>
                        </div>
                        <div class="withdraw-detail-audit"  v-if="obj.status == 3">
                            <div><img src="@/assets/img/wallet/fail.png" alt=""></div>
                            <div>交易驳回</div>
                            <div>{{ obj.ctime }}</div>
                        </div>
                        <div class="withdraw-detail-info">
                            <div>
                                <div>金额:</div>
                                <div>{{ obj.number | roundOff(2) }} {{obj.currency_mark}}</div>
                            </div>
                            <div>
                                <div>手续费:</div>
                                <div>{{ obj.fee }}</div>
                            </div>
                            <div v-if="obj.opt_type == 2">
                                <div>付款地址:</div>
                                <div>本账户提现</div>
                            </div>
                            <div v-if="obj.opt_type == 1 || obj.opt_type == 2">
                                <div>收款地址:</div>
                                <div>{{ obj.to }}<img src="@/assets/img/wallet/copy.png" alt=""
                                                      v-clipboard:copy="obj.to"
                                                      v-clipboard:success="doClipboard"
                                                      v-clipboard:error="" class="alert_little"
                                ></div>
                            </div>
                            <div v-else-if="obj.opt_type == 6 || obj.opt_type == 7">
                                <div>对应操作:</div>
                                <div>
                                    加入班级{{ obj.name }}
                                </div>
                            </div>
                        </div>
                        <div class="withdraw-detail-code" v-if="obj.status == 2 && (obj.opt_type == 1 || obj.opt_type == 2)">
                            <div>
                                <div>
                                    <div>交易TxId:</div>
                                    <div>{{addressSub(obj.txid,5)}}<img src="@/assets/img/wallet/copy.png" alt=""></div>
                                </div>
                                <div>
                                    <div>区块高度:</div>
                                    <div>{{ obj.blocknum }}</div>
                                </div>
                            </div>
                            <div>
                                <canvas id="canvas-tx" style="width: 100%;height: 100%"></canvas>
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
    import QRCode from 'qrcode';
    import Alert_little from '@/components/modal/alert_little';

    export default {
        name: "detail",
        data() {
            return {
                transitionName: 'slide-right',
                obj: {},
            }
        },
        created() {
            this.obj = this.$route.query;
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
                let canvas = document.querySelector('#canvas-tx');
                QRCode.toCanvas(canvas, this.obj.txid, {
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
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/css/wallet/transactionDetails";
</style>
