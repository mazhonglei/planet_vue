<template>
    <transition :name="transitionName">
        <div class="body" id="walletManage">
            <div>
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/wallet',{'from':'walletManage'})">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                        <span class="titlefont">钱包管理</span>
                    </div>
                </div>
                <div class="wallet-manage-home">
                    <div class="wallet-manage-use-detail">
                        <div class="wallet-manage-use-photo">
                            <img :src="null | imgPath" alt="">
                        </div>
                        <div class="wallet-manage-use-info">
                            <div class="wallet-manage-use-name">VNS-Wallet</div>
                            <div class="wallet-manage-use-address">{{ addressSub(walletActive.address,10) }}</div>
                        </div>
                    </div>
                    <div class="wallet-manage-operation">
                        <div class="wallet-manage-operation-content" @click="keystorePre()">
                            <div><img src="@/assets/img/wallet/daochu.png" alt=""></div>
                            <div>
                                <div>导出Keystore</div>
                                <div><img src="@/assets/img/wallet/next.png" alt=""></div>
                            </div>
                        </div>
                        <div class="wallet-manage-operation-content" @click="privatePre()">
                            <div><img src="@/assets/img/wallet/daochu.png" alt=""></div>
                            <div>
                                <div>导出私钥</div>
                                <div><img src="@/assets/img/wallet/next.png" alt=""></div>
                            </div>
                        </div>
                        <div class="wallet-manage-operation-content" @click="changeRoute('/wallet/manage/import')">
                            <div><img src="@/assets/img/wallet/daoru.png" alt=""></div>
                            <div>
                                <div>导入Keystore</div>
                                <div><img src="@/assets/img/wallet/next.png" alt=""></div>
                            </div>
                        </div>
                        <div class="wallet-manage-operation-content"
                             @click="changeRoute('/wallet/manage/import',{tab : 'pKey'})">
                            <div><img src="@/assets/img/wallet/daoru.png" alt=""></div>
                            <div>
                                <div>导入私钥</div>
                                <div><img src="@/assets/img/wallet/next.png" alt=""></div>
                            </div>
                        </div>
                        <div class="wallet-manage-operation-content"
                             @click="changeRoute('/wallet/manage/import',{tab : 'mnemonic'})">
                            <div><img src="@/assets/img/wallet/daoru.png" alt=""></div>
                            <div>
                                <div>导入助记词</div>
                                <div><img src="@/assets/img/wallet/next.png" alt=""></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Alert_little></Alert_little>
            <Prompt></Prompt>
            <Loading></Loading>
        </div>
    </transition>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import {myAlert} from "@/assets/js/h5plus/nativeUI";
    import {AESDecrypt} from '@/assets/js/utils/crypto'
    import {generateKeystore} from '@/assets/js/etherjs/wallet';
    import Prompt from '@/components/modal/prompt';
    import Loading from '@/components/modal/loading';
    import Alert_little from '@/components/modal/alert_little';
    import {site} from '@/assets/js/config/site.js'

    export default {
        name: "walletManage",
        computed: {
            ...mapState("wallet", [
                "walletActive"
            ]),
            ...mapState("modal", [
                "prompt", "loading", "alert_little"
            ])
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
                    that.changeRoute('/wallet',{'from':'walletManage'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
        },
        components: {
            Prompt, Loading, Alert_little
        },
        watch: {
            // 监听密码框-确认按钮
            prompt(v) {
                if (v.isConfirm) {
                    if (v.complete === 'mnemonic') {
                        // computed计算到的变化，不及时？
                        this.mnemonicDo(v.value);
                    }
                    if (v.complete === 'private') {
                        // computed计算到的变化，不及时？
                        this.privateDo(v.value);
                    }
                    if (v.complete === 'keystore') {
                        // computed计算到的变化，不及时？
                        this.keystoreDo(v.value);
                    }
                }
            }
        },
        data() {
            return {
                transitionName: 'slide-right'
            }
        },
        methods: {
            privatePre: function () {
                this.aPrompt({
                    show: true,
                    title: "请输入密码",
                    cancel: "取消",
                    confirm: "确定",
                    type: "password",
                    placeholder: "请输入密码",
                    complete: "private"
                })
            },
            privateDo: function (pwd) {
                // 生成私钥
                try {
                    let pKey = AESDecrypt({
                        pwd: pwd,
                        msg: this.walletActive.pKey
                    });
                    if (pKey === '') {
                        myAlert({
                            msg: "密码错误",
                            button: "确定"
                        });
                    } else {
                        this.aWalletDecode({
                            pKey: pKey
                        });
                        this.changeRoute("/wallet/manage/private")
                    }
                } catch (e) {
                    myAlert({
                        msg: "密码错误",
                        button: "确定"
                    });
                }


            },
            keystorePre: function () {
                this.aPrompt({
                    show: true,
                    title: "请输入密码",
                    cancel: "取消",
                    confirm: "确定",
                    type: "password",
                    placeholder: "请输入密码",
                    complete: "keystore"
                })
            },
            async keystoreDo(pwd) {
                try {
                    let keystore;
                    // keystore 不存在的时候
                    if (this.walletActive.keystore === "") {

                        let pKey = AESDecrypt({
                            pwd: pwd,
                            msg: this.walletActive.pKey
                        });
                        if (pKey === "") {
                            myAlert({msg: "密码错误", button: "确定"});
                            return;
                        }
                        this.aLoading({
                            show: true,
                            tip: "生成中...."
                        });
                        keystore = await generateKeystore({
                            pKey: pKey,
                            pwd: pwd
                        });
                        this.aLoading({
                            show: false,
                            tip: ""
                        });
                    } else {
                        keystore = AESDecrypt({
                            pwd: pwd,
                            msg: this.walletActive.keystore
                        });
                        if (keystore === '') {
                            myAlert({msg: "密码错误", button: "确定"});
                            return;
                        }
                    }
                    this.aWalletDecode({
                        keystore: keystore
                    });
                    this.changeRoute("/wallet/manage/keystore")
                } catch (e) {
                    myAlert({msg: "密码错误", button: "确定"});
                }
            },
            ...mapActions('modal', [
                'aPrompt'
            ]),
            ...mapActions('wallet', [
                'aWalletCreate', 'aWalletActive', 'aWalletDecode'
            ])
        },
        filters: {
            imgPath: function (value) {
                if (value) {
                    return site + value;
                } else {
                    return require('@/assets/img/head_default.png');
                }
            }
        },
    }
</script>

<style lang="scss">
    @import "../../../assets/css/wallet/walletManage";
</style>
