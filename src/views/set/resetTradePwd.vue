<template>
    <transition :name="transitionName">
        <div class="body" id="forgotPwd">
            <div class="news">
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/set',{'from':'resetTradePwd'})">
                                <img src="@/assets/img/ic_back.png" alt="">
                            </span>
                        <span class="titlefont">重置支付密码</span>
                    </div>
                </div>
                <div class="phone">
                    <span class="phone-text">验证码</span> <input type="text" v-model="phoneCode" placeholder="输入验证码">
                    <a href="#" v-show="codeShow" @click="sendMessage">获取验证码</a>
                    <a href="#" v-show="!codeShow"><span>{{auth_time}}</span>s后重新发送</a>
                </div>
                <!--<div class="name">
                    <span>验证码</span> <input type="text" v-model="phoneCode" placeholder="输入验证码">
                    <a href="#" @click="sendMessage">获取验证码</a>
                </div>-->
                <div class="pass">
                    <span>支付密码</span> <input :type="this.login_data.pwdType" v-model="pwd" placeholder="输入6位以上登录密码">
                    <i class="iconfont" @click="changeType()">
                        <img src="@/assets/img/active/eye.png" v-if="iconShow.eye==='psd'" alt="">
                        <img src="@/assets/img/active/eye_active.png" v-else alt="">
                    </i>
                </div>
                <div class="sure" @click="routeForgot">确定</div>
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
        name: "forgotPwd",
        components: {Toast},
        data() {
            return {
                transitionName: "slide-right",
                login_data: {
                    pwdType: "password"
                },
                iconShow:{
                    eye:'psd'
                },
                username: "",
                userpwd: "",
                phone: "",
                regxuser: /^1[0-9]\d{9}$/,
                regxpwd: /^[0-9A-Za-z_@]{6,24}/,
                msg: '',
                codeShow: true,
                auth_time: 0, //倒计时0
            }
        }, mounted(){
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
                    that.changeRoute('/set',{'from':'resetTradePwd'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
        },
        computed: {
            pwd: {
                get() {
                    return this.userpwd;
                },
                set(v) {
                    this.userpwd = v;
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
                if (that.iconShow.eye == 'psd') {
                    that.iconShow.eye = ''
                } else {
                    that.iconShow.eye = 'psd'
                }
            },
            sendMessage() {
                let username = localStorage.getItem('username');
                let uid = localStorage.getItem('uid');
                if (username == '' || !this.regxuser.test(username)) {
                    this.msg = "请输入正确的手机号";
                    return false;
                }
                sendMsg(this, username, 3, uid);
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
            routeForgot: function () {
                let username = localStorage.getItem('username');
                let uid = localStorage.getItem('uid');
                let password = this.userpwd;
                let phoneCode = this.phone;
                if (username == '' || uid == '') {
                    this.msg = "请重新登录";
                    this.changeRoute('/');
                    return false;
                }
                if (password == '' || !this.regxpwd.test(password)) {
                    this.msg = "密码格式不正确";
                    return false;
                }
                if (phoneCode == '') {
                    this.msg = "请输入短信验证码";
                    return false;
                }
                let info = {
                    userId: uid,
                    mobile: username,
                    tradePwd: password,
                    phoneCode: phoneCode,
                    accessToken: sha1(uid + username + password + phoneCode + apiKey)
                };
                let url = site + '/api/users/resetTradePwd';
                let that = this;
                axios.post(url, info).then(function (response) {
                    if (response.data.status == 1 && response.data.code == 0) {
                        that.msg = "重置支付密码成功";
                        setTimeout(function () {
                            that.changeRoute('/set');
                        }, 1000);
                    } else {
                        if (response.data.code == 12) {
                            that.msg = "短信验证码错误";
                        } else if (response.data.code == 4) {
                            that.msg = "重置支付密码失败";
                        }
                        return false;
                    }
                }).catch(function (error) {
                    console.log(error);
                    that.msg = "重置支付密码错误";
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
    @import "../../assets/css/login/forgotPwd.scss";
    @import "../../assets/css/font2/iconfont.css";

</style>
