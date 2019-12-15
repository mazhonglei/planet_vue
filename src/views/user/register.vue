<template>
    <transition :name="transitionName">
        <div class="body" id="register">
            <!--头部-->
            <div class="header">
                <div class="immersion">
                   <span class="backImg" @click="backRoute()">
                                <img src="@/assets/img/ic_back.png" alt="">
                            </span>
                    <span class="titlefont">手机注册</span>
                    <!--<span class="email">邮箱</span>-->
                </div>
            </div>
            <div class="padding-box">
                <div class="name">
                    <span>昵称</span>
                    <input type="text" v-model="nick" placeholder="昵称不能低于2个中文或4个英文">
                </div>
                <div class="phone">
                    <span class="phone-text">手机号</span>
                    <input type="text" v-model="account" placeholder="输入手机号码">
                    <a href="#" v-show="codeShow" @click="sendMessage">获取验证码</a>
                    <a href="#" v-show="!codeShow"><span>{{auth_time}}</span>s后重新发送</a>
                </div>
                <div class="name">
                    <span>验证码</span>
                    <input type="text" v-model="phoneCode" placeholder="输入验证码">
                </div>
                <div class="pwd">
                    <span>密码</span>
                    <input :type="this.login_data.pwdType" v-model="pwd" placeholder="输入6位以上登录密码">
                    <i class="iconfont" @click="changeType()">
                        <img src="@/assets/img/active/eye.png" v-if="eye==='psd'" alt="">
                        <img src="@/assets/img/active/eye_active.png" v-else alt="">
                    </i>
                </div>
                <div class="pwd">
                    <span>支付密码</span>
                    <input :type="this.login_data.pwdType2" v-model="tradePwd" placeholder="输入6位以上支付密码">
                    <i class="iconfont" @click="changeType2()">
                        <img src="@/assets/img/active/eye.png" v-if="payeye==='paypsd'" alt="">
                        <img src="@/assets/img/active/eye_active.png" v-else alt="">
                    </i>
                </div>
                <div class="name">
                    <span>邀请码</span>
                    <input type="text" v-model="invitCode" placeholder="输入邀请码">
                </div>
            </div>
            <div class="register" @click="routeReg()">
                注册
            </div>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>
    </transition>
</template>

<script>
    'use strict'
    import axios from "axios";
    import Toast from '../../components/toast';
    import sha1 from 'sha1';
    import {site, apiKey} from '../../assets/js/config/site.js';
    import {sendMsg} from '../..//assets/js/config/msg.js';

    export default {
        name: "register",
        components: {Toast},
        data() {
            return {
                transitionName: "slide-right",
                login_data: {
                    pwdType: "password",
                    pwdType2: "password"
                },
                nickname: "",
                username: "",
                userpwd: "",
                tradepwd: "",
                invit: "",
                phone: "",
                regxuser: /^1[0-9]\d{9}$/,
                regxpwd: /^[0-9A-Za-z_@]{6,24}/,
                regxnick: /^[\u4e00-\u9fa5A-Za-z0-9-_]*$/,
                msg: '',
                eye: 'psd',
                payeye: 'paypsd',
                codeShow: true,
                auth_time: 0, //倒计时0
            }
        },
    mounted(){
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
            account: {
                get() {
                    return this.username;
                },
                set(v) {
                    this.username = v;
                }
            },
            pwd: {
                get() {
                    return this.userpwd;
                },
                set(v) {
                    this.userpwd = v;
                }
            },
            tradePwd: {
                get() {
                    return this.tradepwd;
                },
                set(v) {
                    this.tradepwd = v;
                }
            },
            nick: {
                get() {
                    return this.nickname;
                },
                set(v) {
                    this.nickname = v;
                }
            },
            invitCode: {
                get() {
                    return this.invit;
                },
                set(v) {
                    this.invit = v;
                }
            },
            phoneCode: {
                get() {
                    return this.phone;
                },
                set(v) {
                    this.phone = v;
                }
            },
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
        },
        methods: {
            changeType() {
                let that = this;
                this.login_data.pwdType = this.login_data.pwdType === 'password' ? 'text' : 'password';
                //密码icon显示隐藏
                if (that.eye == 'psd') {
                    that.eye = ''
                } else {
                    that.eye = 'psd'
                }
            },
            changeType2() {
                let that = this;
                this.login_data.pwdType2 = this.login_data.pwdType2 === 'password' ? 'text' : 'password';
                //密码icon显示隐藏
                if (that.payeye == 'paypsd') {
                    that.payeye = ''
                } else {
                    that.payeye = 'paypsd'
                }
            },
            sendMessage() {
                let username = this.username;
                if (username == '' || !this.regxuser.test(username)) {
                    this.msg = "请输入正确的手机号";
                    return false;
                }
                sendMsg(this, username, 1);
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
            },
            routeReg: function () {
                let username = this.username;
                let password = this.userpwd;
                let tradepwd = this.tradepwd;
                let nick = this.nickname;
                let phoneCode = this.phone;
                let invitCode = this.invit;
                if (username == '' || !this.regxuser.test(username)) {
                    this.msg = "请输入正确的手机号";
                    return false;
                }
                if (password == '' || !this.regxpwd.test(password)) {
                    this.msg = "密码格式不正确";
                    return false;
                }
                if (tradepwd == '' || !this.regxpwd.test(tradepwd)) {
                    this.msg = "支付密码格式不正确";
                    return false;
                }
                if (nick == '' || !this.regxnick.test(nick)) {
                    this.msg = "昵称格式不正确";
                    return false;
                }
                if (phoneCode == '') {
                    this.msg = "请输入短信验证码";
                    return false;
                }
                if (invitCode == '') {
                    this.msg = "请输入邀请码";
                    return false;
                }
                let info = {
                    mobile: username,
                    password: password,
                    tradepwd: tradepwd,
                    nick: nick,
                    phoneCode: phoneCode,
                    invit: invitCode,
                    accessToken: sha1(username + password + tradepwd + nick + phoneCode + invitCode + apiKey)
                };
                let url = site + '/api/users/regUser';
                let that = this;
                axios.post(url, info).then(function (response) {
                    if (response.data.status == 1 && response.data.code == 0) {
                        that.msg = "注册成功";
                        setTimeout(function () {
                            that.changeRoute('/');
                        }, 1000);
                    } else {
                        if (response.data.code == 12) {
                            that.msg = "短信验证码错误";
                        } else if (response.data.code == 11) {
                            that.msg = "邀请码不存在";
                        } else if (response.data.code == 11) {
                            that.msg = "注册失败";
                        }
                        return false;
                    }
                }).catch(function (error) {
                    console.log(error);
                    that.msg = "登录错误";
                    return false;
                });

            },
            square(v) {
                this.msg = v
            },
        },
    }
</script>

<style lang="scss">
    @import "../../assets/css/login/register.scss";
    @import "../../assets/css/font2/iconfont.css";


</style>
