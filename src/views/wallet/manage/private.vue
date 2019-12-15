<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
    <transition>
        <div class="export-box">
            <div class="header">
                <div class="immersion">
                    <span class="backImg" @click="changeRoute('/wallet/manage')">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                    <span class="titlefont">导出私钥</span>
                </div>
            </div>
            <div class="mg-44">
                <div class="private-nav">
                    <div class="" :class="tab==1?'export-active':''" @click="tab=1">密钥</div>
                    <div class="" :class="tab==2?'export-active':''" @click="tab=2">二维码</div>
                </div>
                <div class="mui-slider-group">
                    <div id="item1" class="mui-slider-item mui-control-content" :class="tab==1?'mui-active':''"
                         v-show="tab==1">
                        <div class="export-item export-bgcolor export-line">
                            <ul class="export-ul">
                                <li>
                                    <p class="export-color">离线保存</p>
                                    <p>切勿保存至邮箱、记事本、网盘、聊天工具等，非常危险</p>
                                </li>
                                <li>
                                    <p class="export-color">请勿使用网络传输</p>
                                    <p>请勿通过网络工具传输，一旦被黑客获取将造成不可挽回的资产损失。建议离线设备通过二维码方式传输。</p>
                                </li>
                                <li>
                                    <p class="export-color">密码管理工具保存</p>
                                    <p>建议使用密码管理工具管理</p>
                                </li>
                            </ul>
                        </div>
                        <div class="text-box">
                            <div class="textarea" contenteditable="true">{{ walletDecode.pKey }}</div>
                            <button
                                    v-clipboard:copy="walletDecode.pKey"
                                    v-clipboard:success="doClipboard"
                                    v-clipboard:error="" id="alert_little">复制私钥

                            </button>
                        </div>
                    </div>
                    <div id="item2" class="mui-slider-item mui-control-content" :class="tab==2?'mui-active':''"
                         v-show="tab==2">
                        <div class="export-item export-bgcolor export-line">
                            <ul class="export-ul">
                                <li>
                                    <p class="export-color">仅供直接扫描</p>
                                    <p>二维码禁止保存、截图、以及拍照。仅供用户在安全环境下直接扫描来方便的导入钱包</p>
                                </li>
                                <li>
                                    <p class="export-color">在安全环境下使用</p>
                                    <p>请在确保四周无人及无摄像头的情况下使用。二维码一旦被他人获取将造成不可挽回的资产损失</p>
                                </li>
                            </ul>
                        </div>
                        <div class="code-box" v-show="!qrCode">
                            <img src="@/assets/img/createwallet/code2.jpg" alt="" class="code">
                            <img src="@/assets/img/createwallet/showcode.png" alt="" class="code2">
                            <button class="showcode" @click="showQrcode()">显示二维码</button>
                        </div>
                        <div v-show="qrCode" style="width: 220px;margin: 60px auto 0;">
                            <canvas id="canvas-private" @click="qrCode=false"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <alert_shot></alert_shot>
            <alert_little></alert_little>
        </div>
    </transition>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    import '@/assets/css/wallet/exprotkeystore.css'
    import QRCode from 'qrcode';
    import alert_shot from '@/components/modal/alert_shot'
    import alert_little from '@/components/modal/alert_little'

    export default {
        name: 'wallet_manager_private',
        created() {
            this.aAlert_shot({
                show: true,
                tip: "如果有人获取你的私钥 将有能力获取你的资产！请妥善保管私钥。",
            });
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
                    that.changeRoute('/wallet/manage')
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
        },
        computed: {
            ...mapState("wallet", [
                "walletActive", "walletCreate", "walletDecode"
            ]),
            ...mapState("modal", [
                "alert_shot", "alert_little"
            ]),

        },
        components: {
            alert_shot, alert_little
        },
        data() {
            return {
                tab: 1,
                qrCode: false
            }
        },
        methods: {
            showQrcode: function () {
                this.qrCode = true;
                let canvas = document.querySelector('#canvas-private');
                QRCode.toCanvas(canvas, this.walletDecode.pKey, {
                    width: 220,
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
                });
            },
            ...mapActions('modal', [
                'aAlert_little'
            ]),
        }
    }
</script>
<style scoped>
    .export-box {
        background-color: #FAFBFC;
    }

</style>
