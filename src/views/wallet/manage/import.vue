<template>
    <transition name="slide-right">
        <div class="lead-content">
            <div class="header">
                <div class="immersion">
                    <span class="backImg" @click="changeRoute('/wallet/manage')">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                    <span class="titlefont">VNS</span>
                    <span class="saomiaoImg">
                        <img src="@/assets/img/saomiao.png" alt="" @click="changeRoute('/wallet/importScan', {tab: tab})">
                    </span>
                </div>
            </div>
            <div class="lead-nav" style="margin-top: 1.3rem">
                <div :class="tab==='keystore'?'active':''" @click="tab='keystore'">Keystore</div>
                <div :class="tab==='mnemonic'?'active':''" @click="tab='mnemonic'">助记词</div>
                <div :class="tab==='pKey'?'active':''" @click="tab='pKey'">私钥</div>
            </div>
            <div v-show="tab==='keystore'">
                <div class="lead-hint">复制粘贴ETSC官方钱包Keystore文件内容至输入框，或通过扫描Keystore内容生成的二维码录入。</div>
                <div class="wallet-textarea">
                    <textarea placeholder="Keystore文件内容" v-model="keystore.text"></textarea>
                </div>
                <div class="wallet-password">
                    <input :type="keystore.pwdShow?'text':'password'" placeholder="钱包密码" v-model="keystore.pwd">
                    <img src="@/assets/img/closeeyes.png" alt="" @click="keystore.pwdShow = true" v-show="!keystore.pwdShow">
                    <img src="@/assets/img/createwallet/eye-open.png" alt="" class="pwd-close-icon" @click="keystore.pwdShow = false" v-show="keystore.pwdShow">
                </div>
                <div class="content-start" :class="keystore.button?'li-active':''" @click="keystoreImport()">开始导入</div>
                <!--TODO-->
                <!--<div class="content-understand"><img src="@/assets/img/book.png" alt="">&nbsp;&nbsp;了解 Keystore</div>-->
            </div>
            <div v-show="tab==='mnemonic'">
                <div class="lead-hint">使用助记词导入的同时可以修改钱包密码。</div>
                <div class="mnemonic-textarea">
                    <textarea placeholder="输入助记词，用空格分隔" v-model="mnemonic.text"></textarea>
                </div>
                <div class="mnemonic-path">
                    <div class="path-choose">
                        <span>选择路径</span>
                        <!--<span>默认<img src="@/assets/img/rightwhite.png" alt=""></span>-->
                        <span>默认</span>
                    </div>
                    <input type="text" value="m/44'/60'/0'/0/0" disabled style="background-color: #fff">
                </div>
                <div class="mnemonic-set">
                    <h1>设置密码&nbsp;<img src="@/assets/img/i.png" alt=""></h1>
                    <input :type="mnemonic.pwdShow?'text':'password'" placeholder="钱包密码" maxlength="20" size="20" class="mnemonic-password" v-model="mnemonicPwd">
                    <span class="mnemonic-intension">
                        <ul class="intension-line">
                            <li :class="mnemonic.pwdStrength.mode>0?'li-active':''"></li>
                            <li :class="mnemonic.pwdStrength.mode>1?'li-active':''"></li>
                            <li :class="mnemonic.pwdStrength.mode>2?'li-active':''"></li>
                            <li :class="mnemonic.pwdStrength.mode>3?'li-active':''"></li>
                        </ul>
                        <span>{{ mnemonic.pwdStrength.msg }}</span>
                    </span>
                    <div class="mnemonic-suggest">{{ mnemonic.pwdStrength.line }}</div>
                    <input :type="mnemonic.pwdShow?'text':'password'" placeholder="重复输入密码" class="mnemonic-repassword" v-model="mnemonic.rePwd">

                    <img src="@/assets/img/closeeyes.png" alt="" @click="mnemonic.pwdShow = true" v-if="!mnemonic.pwdShow">
                    <img src="@/assets/img/createwallet/eye-open.png" alt="" @click="mnemonic.pwdShow = false" v-if="mnemonic.pwdShow">

                    <input type="text" placeholder="密码提示信息" class="mnemonic-information" v-model="mnemonic.tip">
                </div>
                <div class="content-start" :class="mnemonic.button?'li-active':''" @click="mnemonicImport()">开始导入</div>
                <!--TODO-->
                <!--<div class="content-understand"><img src="@/assets/img/book.png" alt="">&nbsp;&nbsp;了解 助记词</div>-->
            </div>
            <div v-show="tab=='pKey'">
                <div class="lead-hint">输入Private Key文件内容至输入框。或通过扫描Private Key内容生成的二维码录入。请留意字符大小写。</div>
                <div class="key-textarea">
                    <textarea placeholder="输入明文私钥" v-model="pKey.text"></textarea>
                </div>
                <div class="key-set">
                    <h1>设置密码&nbsp;<img src="@/assets/img/i.png" alt=""></h1>
                    <input :type="pKey.pwdShow?'text':'password'" placeholder="钱包密码" maxlength="20" size="20" class="mnemonic-password" v-model="pKeyPwd">
                    <span class="mnemonic-intension">
                        <ul class="intension-line">
                            <li :class="pKey.pwdStrength.mode>0?'li-active':''"></li>
                            <li :class="pKey.pwdStrength.mode>1?'li-active':''"></li>
                            <li :class="pKey.pwdStrength.mode>2?'li-active':''"></li>
                            <li :class="pKey.pwdStrength.mode>3?'li-active':''"></li>
                        </ul>
                        <span>{{ pKey.pwdStrength.msg }}</span>
                    </span>
                    <div class="mnemonic-suggest">{{ pKey.pwdStrength.line }}</div>
                    <input :type="pKey.pwdShow?'text':'password'" placeholder="重复输入密码" class="mnemonic-repassword" v-model="pKey.rePwd">

                    <img src="@/assets/img/closeeyes.png" alt="" @click="pKey.pwdShow = true" v-if="!pKey.pwdShow">
                    <img src="@/assets/img/createwallet/eye-open.png" alt="" @click="pKey.pwdShow = false" v-if="pKey.pwdShow">

                    <input type="text" placeholder="密码提示信息" class="mnemonic-information" v-model="pKey.tip">
                </div>
                <div class="content-start" :class="pKey.button?'li-active':''" @click="pKeyImport()">开始导入</div>
                <!--TODO-->
                <!--<div class="content-understand"><img src="@/assets/img/book.png" alt="">&nbsp;&nbsp;了解 明文私钥</div>-->
            </div>
            <Loading></Loading>
            <Success></Success>
        </div>
    </transition>
</template>
<script>
    /* eslint-disable */
    import {mapActions, mapState} from 'vuex'
    import {importByKeystore, importByPrivate, importByWord} from '@/assets/js/etherjs/wallet'
    import {myAlert} from "@/assets/js/h5plus/nativeUI";
    import {pwd} from '@/assets/js/form/index';
    import Loading from '@/components/modal/loading';
    import Success from '@/components/modal/success';


    export default {
        name: 'wallet_import',
        computed: {
            ...mapState("modal", [
                "success", "loading"
            ])
        },
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
                    that.changeRoute('/wallet/manage')
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
            this.tab = this.$route.query.tab ? this.$route.query.tab : 'keystore';
            let value = this.$route.query.value ? this.$route.query.value : '';
            switch (this.tab) {
                case "keystore":
                    this.keystore.text = value;
                    break;
                case "mnemonic":
                    this.mnemonic.text = value;
                    break;
                case "pKey":
                    this.pKey.text = value;
                    break;
            }
            this.Interval = setInterval(() => {
                this.canCreate();
            }, 500);
        },
        components: {
            Success, Loading
        },
        watch: {
            mnemonicPwd: function (v) {
                this.mnemonic.pwdStrength.mode = pwd.checkStrong(v);
                if (this.mnemonic.pwdStrength.mode < 2) {
                    this.mnemonic.pwdStrength.msg = "弱";
                } else if (this.mnemonic.pwdStrength.mode < 3) {
                    this.mnemonic.pwdStrength.msg = "一般";
                } else if (this.mnemonic.pwdStrength.mode < 4) {
                    this.mnemonic.pwdStrength.msg = "强";
                } else {
                    this.mnemonic.pwdStrength.msg = "很好";
                }
                if (this.mnemonic.pwdStrength.mode > 0) {
                    this.mnemonic.pwdStrength.line = v.length + "字符";
                } else {
                    this.mnemonic.pwdStrength.line = "8-20位字符，建议回合大小写字母、数字、符号";
                }
            },
            pKeyPwd: function (v) {
                this.pKey.pwdStrength.mode = pwd.checkStrong(v);
                if (this.pKey.pwdStrength.mode < 2) {
                    this.pKey.pwdStrength.msg = "弱";
                } else if (this.pKey.pwdStrength.mode < 3) {
                    this.pKey.pwdStrength.msg = "一般";
                } else if (this.pKey.pwdStrength.mode < 4) {
                    this.pKey.pwdStrength.msg = "强";
                } else {
                    this.pKey.pwdStrength.msg = "很好";
                }
                if (this.pKey.pwdStrength.mode > 0) {
                    this.pKey.pwdStrength.line = v.length + "字符";
                } else {
                    this.pKey.pwdStrength.line = "8-20位字符，建议回合大小写字母、数字、符号";
                }
            }
        },
        data() {
            return {
                tab: "keystore",
                keystore: {
                    text: "",
                    pwd: "",
                    pwdShow: false,
                    button: false,
                },
                mnemonic: {
                    text: "",
                    rePwd: "",
                    tip: "",
                    pwdShow: false,
                    button: false,
                    pwdStrength: {
                        msg: "弱",
                        mode: 0,
                        line: "8-20位字符，建议回合大小写字母、数字、符号",
                    },
                },
                mnemonicPwd: "",
                pKey: {
                    text: "",
                    rePwd: "",
                    tip: "",
                    pwdShow: false,
                    button: false,
                    pwdStrength: {
                        msg: "弱",
                        mode: 0,
                        line: "8-20位字符，建议回合大小写字母、数字、符号",
                    },
                },
                pKeyPwd: "",
                Interval:""
            }
        },
        methods: {
            keystoreImport: function () {
                if (!this.keystore.button) return;
                this.aLoading({
                    show: true,
                    tip: "导入中"
                });
                let that = this;
                setTimeout(() => {
                    importByKeystore({
                        keystore: that.keystore.text,
                        pwd: that.keystore.pwd
                    }).then(() => {
                        return that.aSuccess({
                            show: true,
                            tip: "导入成功",
                        });
                    }).then(() => {
                        that.changeRoute("/wallet");
                    }).catch((e) => {
                        console.log(e);
                        that.aLoading({
                            show: false,
                            tip: "导入失败"
                        });
                        if ("Error: invalid password" === e.toString()) {
                            myAlert({
                                msg: "密码错误",
                                button: "确定"
                            });
                        } else {
                            myAlert({
                                msg: "操作失败",
                                button: "确定"
                            });
                        }

                    });
                }, 200);
            },
            mnemonicImport: function () {
                if (!this.mnemonic.button) return;
                this.aLoading({
                    show: true,
                    tip: "助记词导入中"
                });
                let that = this;
                setTimeout(() => {
                    importByWord({
                        mnemonic: that.mnemonic.text,
                        pwd: that.mnemonicPwd,
                        tip: that.mnemonic.tip
                    }).then(() => {
                        return that.aSuccess({
                            show: true,
                            tip: "导入成功",
                        });
                    }).then(() => {
                        that.changeRoute("/wallet");
                    }).catch((e) => {
                        console.log(e);
                        that.aLoading({
                            show: false,
                            tip: "导入失败"
                        });
                        myAlert({
                            msg: "导入失败",
                            button: "确定"
                        });

                    });
                }, 200);

            },
            pKeyImport: function () {
                if (!this.pKey.button) return;
                this.aLoading({
                    show: true,
                    tip: "私钥导入中"
                });
                let that = this;
                setTimeout(() => {
                    importByPrivate({
                        privateKey: that.pKey.text,
                        pwd: that.pKeyPwd,
                        tip: that.pKey.tip
                    }).then(() => {
                        return that.aSuccess({
                            show: true,
                            tip: "导入成功",
                        });
                    }).then(() => {
                        that.changeRoute("/wallet");
                    }).catch((e) => {
                        console.log(e);
                        that.aLoading({
                            show: false,
                            tip: "导入失败"
                        });
                        myAlert({
                            msg: "导入失败",
                            button: "确定"
                        });
                    });
                }, 200);
            },
            canCreate: function () {
                this.keystore.button = this.keystore.text !== '' && this.keystore.pwd !== '';
                this.mnemonic.button = this.mnemonic.text !== '' && this.mnemonic.pwdStrength.mode > 0 && this.mnemonic.rePwd !== '';
                this.pKey.button = this.pKey.text !== '' && this.pKey.pwdStrength.mode > 0 && this.pKey.rePwd !== '';
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
<style scoped>
    @import '../../../assets/css/wallet/import/leadKey.css';
    @import '../../../assets/css/wallet/import/leadMnemonic.css';
    @import '../../../assets/css/wallet/import/leadWallet.css';

    .li-active {
        background: #411E60 !important;
    }

    .content-size {
        font-family: sans-serif;
    }

    .saomiaoImg{
        display: inline-block;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 100%;
        margin-right: 10px;
        z-index: 2;
        overflow: hidden;
        color: #411E60;
    }

    .saomiaoImg> img{
        display: block;
        width: .5rem;
        height: .5rem;
        top: 50%;
        transform: translateY(-50%);
        filter: drop-shadow(0.5rem 0 #411E60);
        position: relative;
        right: .5rem;
    }
</style>
