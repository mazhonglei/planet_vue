<template>
    <transition :name="transitionName">
        <div class="body" id="login">
            <!--头部-->
            <div class="header">
                <div class="immersion">
                    <span class="titlefont">登录</span>
                    <span class="log" @click="changeRoute('/register')">注册</span>
                </div>
            </div>
            <div class="padding-box">
                <div class="phone">
                    <span>账号</span> <input type="text" v-model="account" placeholder="手机号" maxlength="11">
                </div>

                <div class="pwd">
                    <span>密码</span>
                    <input :type="this.login_data.pwdType" v-model="pwd" placeholder="输入6位以上登录密码">
                    <i class="iconfont" @click="changeType()">
                        <img src="@/assets/img/active/eye.png" v-if="eye==='psd'" alt="">
                        <img src="@/assets/img/active/eye_active.png" v-else alt="">
                    </i>
                </div>
            </div>

            <a href="javascript:void(0)" @click="routeLogin" class="register" style="display: block;">
                登录
            </a>
            <span class="forget" @click="changeRoute('/forgotPwd')">忘记密码</span>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>
    </transition>
</template>
<script>
    'use strict'
    import  axios from "axios";
    import Toast from '../../components/toast';
    import sha1 from 'sha1';
    import {site, apiKey} from '../../assets/js/config/site.js';

    export default {
        name: 'login',
        components: {Toast},
        data() {
            return {
                transitionName: "slide-left",
                login_data: {
                    pwdType: "password"
                },
                username: "",
                userpwd: "",
                regxuser: /^1[0-9]\d{9}$/,
                regxpwd: /^[0-9A-Za-z_@]{6,24}/,
                msg: '',
                eye: 'psd'
            }
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
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
        },
        created() {
            this.isUpdate();
        },
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
            isUpdate: function () {
                let version = 1;
                let needUpdate = false;
                let url = site + '/api/apis/getVersion';

                //if ('Android' === plus.os.name) {
                let type = 1;
                /*} else {
                    let type = 2;
                }*/
                let info = {
                    type: type,
                    accessToken: sha1(type +
                        apiKey)
                }
                axios.post(url, info).then(function (response) {
                    if (response.data.data.version > version) {
                        needUpdate = true;
                    }
                    if (needUpdate) {
                        /*plus.nativeUI.confirm(this.$t('m.wallet.index.prompt[6]'), function (event) {
                            sessionStorage.setItem("updateConfirm", 1);
                            if (event.index == 0) {
                                plus.runtime.openURL("");
                            }
                        });*/
                    }
                }).catch(function (error) {
                    console.log(error);
                    return false;
                });
            },
            routeLogin: function () {
                let username = this.username;
                let password = this.userpwd;
                if (this.regxuser.test(username) && this.regxpwd.test(password)) {
                    let url = site + '/api/users/login';
                    console.log(url)
                    let info = {
                        mobile: username,
                        password: password,
                        accessToken: sha1(username + password + apiKey)
                    }
                    let that = this;
                    axios.post(url, info).then(function (response) {
                        if (response.data.status == 1 && response.data.code == 0) {
                            localStorage.setItem('uid', response.data.data.id);
                            localStorage.setItem('loginKey', response.data.data.login_key);
                            localStorage.setItem('username', username);
                            localStorage.setItem('userInfo', JSON.stringify(response.data.data));
                            if(localStorage.getItem('walletCreate')){
                                that.changeRoute('/home');
                            }else{
                                that.changeRoute('/wallet/create');
                            }
                        } else {
                            that.msg = "账号或密码错误";
                            return false;
                        }
                    }).catch(function (error) {
                        console.log(error);
                        that.msg = "登录错误";
                        return false;
                    });
                } else {
                    this.msg = "账号或密码错误";
                    return false;
                }
            },
            //提示信息
            square(v) {
                this.msg = v
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../../assets/css/login/login";

</style>
