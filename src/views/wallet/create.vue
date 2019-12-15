<template>
    <transition name="slide-right">
        <div class="body" id="walletCreate">
            <div class="createuser">
                <div class="createuser">
                    <div class="header">
                        <div class="immersion">
                       <!--<span class="backImg" @click="backRoute()">-->
                                <!--<img src="@/assets/img/ic_back.png" alt="">-->
                       <!--</span>-->
                        </div>
                    </div>
                    <div class="create-box">
                        <div class="create-img">
                            <img src="../../assets/img/wallet/create/wallet_create.png" alt="">
                            <p>创建钱包</p>
                        </div>
                        <div class="mui-input-group">
                            <div class="mui-input-row">
                                <input type="text" class="mui-input-clear" placeholder="身份名"
                                       v-model="name"
                                       @keydown="canCreate()">
                            </div>
                            <div class="mui-input-row" :class="show.pwdStrength?'tipsmg':''">
                                <input :type="pwdStrength.show?'text':'password'"
                                       class="coffer-pwd"
                                       placeholder="密码"
                                       maxlength="20" v-model="pwd" @focus="show.pwdMsg=true;show.pwdStrength=true"
                                       @blur="show.pwdMsg=false" @keydown="canCreate()">
                                <div v-show="show.pwdStrength">
                                    <p class="pwdtips">{{ pwdStrength.line }}</p>
                                    <span class="pwd-icon">
                                    <ul class="pwd-line">
                                        <li :class="pwdStrength.mode>0?'li-active':''"></li>
                                        <li :class="pwdStrength.mode>1?'li-active':''"></li>
                                        <li :class="pwdStrength.mode>2?'li-active':''"></li>
                                        <li :class="pwdStrength.mode>3?'li-active':''"></li>
                                    </ul>
                                    <span>{{ pwdStrength.msg }}</span>
                                </span>
                                </div>
                            </div>
                            <div class="mui-input-row">
                                <input :type="pwdStrength.show?'text':'password'" class="mui-input-password"
                                       maxlength="20"
                                       placeholder="重复输入密码" v-model="pwdConfirm"
                                       @keydown="canCreate()">
                                <span class="pwd-icon">
                                <img src="@/assets/img/wallet/create/eye-close.png" alt="" class="pwd-close-icon"
                                     @click="pwdStrength.show = true" v-show="!pwdStrength.show">
                                <img src="@/assets/img/wallet/create/eye-open.png" alt="" class="pwd-close-icon"
                                     @click="pwdStrength.show = false" v-show="pwdStrength.show">
                            </span>
                            </div>
                            <div class="mui-input-row">
                                <input type="text" class="mui-input-clear" placeholder="密码提示信息" v-model="tip">
                            </div>
                            <button class="create li-active" @click="doWalletCreate()" v-if="button">创建</button>
                            <button class="create" v-else>创建</button>
                        </div>
                    </div>
                </div>
                <!--条款弹窗-->
                <transition name="bg">
                    <div class="mui-backdrop popup-hide" v-show="show.protocol">
                        <div class="create-popup">
                            <h1 class="create-popup-tit">使用说明
                                <i class="createIcon">
                                    <img src="@/assets/img/wallet/createFind.png" alt="">
                                </i>
                            </h1>
                            <div class="create-content">
                                <div style="height: calc(100% + 1px);">
                                    <p class="content-tit">VNS Wallet 使用须知</p>
                                    <p class="create-content-text">
                                        为了您安全便捷的使用VNS Wallet，请用户在确定使用VNS Wallet前仔细阅读以下内容。
                                        <span class="create-line"></span>
                                        【定义解释】
                                        <span class="create-line"></span>
                                        VNS Wallet<span
                                            class="fontw">是VNS基于区块链开发的数字钱包，包括其他为方便用户使用区块链系统而开发的辅助工具。</span>
                                        <span class="create-line"></span>
                                        私钥：<span class="fontw">由256位随机字符构成，是用户拥有并使用数字代币的核心。不可泄露给他人。</span>
                                        <span class="create-line"></span>
                                        公钥：<span
                                            class="fontw">由私钥借助密码学原理单向推导生成，并用以生成区块链数字钱包地址，数字钱包地址即为公开收款地址。</span>
                                        <span class="create-line"></span>
                                        助记词：<span class="fontw">符合区块链BIP39 行业标准，由随机算法生成的12（或15/18/21/24）个有序单词组成。是私钥的易记录表现形式，方便用户备份保管。不可泄露给他人。</span>
                                        <span class="create-line"></span>
                                        Keystore:<span class="fontw">是私钥或助记词经过用户设置的钱包密码加密保存的文件形式，它只唯一存储在您的这台移动设备中，不会同步至任何服务器。不可泄露给他人。</span>
                                        <span class="create-line"></span>
                                        数字代币：<span class="fontw">指VNS Walle目前支持的数字代币种类，包括但不限于ETH、VNS等。</span>
                                        <span class="create-line"></span>
                                        【使用须知】
                                        <span class="create-line"></span>
                                        <span class="fontw">在使用VNS Walle时，以下情况的出现可能导致转账功能不可用、转账“交易失败”或“打包超时”：</span>
                                        <span class="create-line"></span>
                                        <span class="fontw"> 1.钱包余额不足；</span>
                                        <span class="create-line"></span>
                                        <span class="fontw">2.交易矿工费不足；</span>
                                        <span class="create-line"></span>
                                        <span class="fontw">3.区块链执行智能合约代码失败；</span>
                                        <span class="create-line"></span>
                                        <span class="fontw">4.网络、设备等技术故障；</span>
                                        <span class="create-line"></span>
                                        <span class="fontw">5.区块链网络拥堵、故障灯原因引起交易被抛弃；</span>
                                        <span class="create-line"></span>
                                        <span class="fontw">6.您的地址或交易对方地址被识别为特殊地址，如高风险地址。</span>
                                        <span class="create-line"></span>
                                        <span class="fontw">7.您的地址或交易对方地址被识别为特殊地址，如高风险地址。</span>
                                        <span class="create-line"></span>
                                        以下操作均可能导致数字资产丢失，请务必引起高度重视。
                                        <span class="create-line"></span>
                                        <span class="fontw">1.移动设备遗失、删除且未备份VNS Walle、删除且未备份钱包、遗忘且未备份钱包密码、私钥、助记词、Keystore；</span>
                                        <span class="create-line"></span>
                                        <span class="fontw">2.因您自行泄露钱包密码、私钥、助记词、Keystore，或借用、转让或授权他人使用自己的移动设备或VNS Walle钱包；</span>
                                        <span class="create-line"></span>
                                        <span class="fontw">3.因误操作（包括但不限于您输错转账地址、自身选择转账节点服务器的问题）VNS Walle；</span>
                                        <span class="create-line"></span>
                                        <span class="fontw">4.因不理解区块链技术的知识而进行错误操作；</span>
                                        <span class="create-line"></span>
                                        <span class="fontw">5.因系统滞后、区块链系统不稳定等原因导致拷贝用户在区块链上的交易记录发生偏差；</span>
                                        <span class="create-line"></span>
                                        再次郑重提示！<span
                                            class="fontw">请您牢记并备份好VNS Walle的密码、私钥、助记词、Keystore，一旦忘记将无法找回。</span>
                                    </p>
                                </div>
                            </div>
                            <div class="mui-input-row mui-radio mui-left create-radio">
                            <span class="create-icon">
                                <img src="@/assets/img/wallet/create/click_active.png" alt="" v-if="show.next"
                                     @click="show.next=false">
                                <img src="@/assets/img/wallet/create/click.png" alt="" v-else
                                     @click="show.next=true">
                            </span>
                                <label>我已仔细阅读并同意以上条款以及<br>
                                    <p>Cookies 的使用声明</p>
                                </label>
                            </div>
                            <button class="create-next" v-if="show.next" @click="show.protocol = false">继续</button>
                            <button class="create-next" disabled v-else>继续</button>
                        </div>
                    </div>
                </transition>

                <!--密码弹框-->
                <div class="pwd-popup" v-show="show.pwdMsg">
                    <p class="pwd-tri"></p>
                    <div class="pwd-img">
                        <img src="../../assets/img/wallet/create/lock.png" alt="">
                    </div>
                    <div class="pwd-text">
                        <p>密码用于加密保护私钥，以及转账、调用合约等，所以强度非常重要。</p>
                        <p>Vns Wallet不存储密码，也无法帮您找回，请务必牢记</p>
                    </div>
                </div>
                <Loading2></Loading2>
                <Success></Success>
            </div>
        </div>
    </transition>
</template>
<script>
    /* eslint-disable */
    import {myAlert} from "@/assets/js/h5plus/nativeUI";
    import {pwd} from '@/assets/js/form/index'
    import {create} from '@/assets/js/etherjs/wallet'
    import {mapActions, mapState} from 'vuex'
    import Loading2 from '@/components/modal/loading';
    import Success  from '@/components/modal/success';

    export default {
        name: 'wallet_create',
        mounted() {
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
                    mui.toast('再按一次退出应用');//给出提示
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                } else {
                    if (new Date().getTime() - first < 1000) {//如果两次按下的时间小于1s，
                        plus.runtime.quit();//那么就退出app

                    }
                }
            };
        },
        created() {
        },
        computed: {
            ...mapState("wallet", [
                "walletActive", "walletCreate", "walletDecode"
            ]),
            ...mapState("modal", [
                "alert_shot", "loading", "success", "alert_little", "prompt"
            ]),

        },
        components: {
            Loading2, Success
        },
        watch: {
            pwd: function (v) {
                this.pwdStrength.mode = pwd.checkStrong(v);
                if (this.pwdStrength.mode < 2) {
                    this.pwdStrength.msg = "弱";
                } else if (this.pwdStrength.mode < 3) {
                    this.pwdStrength.msg = "一般";
                } else if (this.pwdStrength.mode < 4) {
                    this.pwdStrength.msg = "强";
                } else {
                    this.pwdStrength.msg = "很好";
                }
                if (this.pwdStrength.mode > 0) {
                    this.pwdStrength.line = v.length + "字符";
                } else {
                    this.pwdStrength.line = "8-20位字符，建议回合大小写字母、数字、符号";
                }
            }
        },
        data() {
            return {
                show: {
                    next: false,
                    protocol: true,
                    pwdMsg: false,
                    pwdStrength: false
                },
                name: "",
                pwd: "",
                pwdConfirm: "",
                pwdStrength: {
                    msg: "弱",
                    mode: 0,
                    line: "8-20位字符，建议回合大小写字母、数字、符号",
                    show: false
                },
                tip: "",
                button: false,
                language: "",
            }
        },
        methods: {
            doWalletCreate: function () {
                if (this.pwd !== this.pwdConfirm) {
                    myAlert({
                        msg: "前后密码不一致",
                        button: "确定"
                    });
                    return;
                }

                this.aLoading({
                    show: true,
                    tip: "创建中"
                });
                setTimeout(() => {
                    create({
                        pwd: this.pwd,
                        name: this.name,
                        tip: this.tip
                    }).then((wallet) => {
                        this.aWalletDecode({
                            mnemonic: wallet.mnemonic
                        });
                        return this.aSuccess({
                            show: true,
                            tip: "创建成功",
                        });
                    }).then(() => {
                        this.changeRoute("/wallet/backup/tip");
                    }).catch((e) => {
                        console.log(e);
                        this.aLoading({
                            show: false,
                            tip: "创建失败"
                        });
                        myAlert({
                            msg: "创建失败",
                            button: "确定"
                        });
                    });
                }, 500);

            },
            canCreate: function () {
                this.button = this.name !== '' && this.pwdStrength.mode > 0 && this.pwdConfirm !== '';
            },
            ...mapActions('wallet', [
                "aWalletDecode"
            ]),
            ...mapActions('modal', [
                'aLoading',
                'aSuccess',
            ]),

        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/wallet/walletCreate";

    body {
        background: #ffffff;
    }

    .li-active {
        background: #411E60 !important;
    }

    .bg-enter-active, .bg-leave-active {
        transition: all 0.5s;
    }

    .bg-enter, .bg-leave-to {
        opacity: 0!important;
    }

    .create-line {
        margin: .1rem;
        display: block;
    }

    .fontw {
        font-weight: normal;
    }

    .em-ft {
        text-decoration: underline;
    }

</style>
