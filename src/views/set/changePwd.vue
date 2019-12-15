<template>
    <transition :name="transitionName">
        <div class="body" id="forgotPwd">
            <div class="news">
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/set',{'from':'changePwd'})">
                                <img src="@/assets/img/ic_back.png" alt="">
                            </span>
                        <span class="titlefont">修改密码</span>
                    </div>
                </div>
                <div class="pass">
                    <span>原密码</span> <input :type="this.login_data.pwdType" v-model="oldPwd" placeholder="输入6位以上登录密码">
                    <i class="iconfont" @click="changeType()">
                        <img src="@/assets/img/active/eye.png" v-if="iconShow.eye==='psd'" alt="">
                        <img src="@/assets/img/active/eye_active.png" v-else alt="">
                    </i>
                </div>
                <div class="pass">
                    <span>新密码</span> <input :type="this.login_data.pwdType2" v-model="newPwd" placeholder="输入6位以上登录密码">
                    <i class="iconfont" @click="changeType2()">
                        <img src="@/assets/img/active/eye.png" v-if="iconShow.eye2==='psd2'" alt="">
                        <img src="@/assets/img/active/eye_active.png" v-else alt="">
                    </i>
                </div>
                <div class="pass">
                    <span>确认密码</span> <input :type="this.login_data.pwdType3" v-model="rePwd" placeholder="输入6位以上登录密码">
                    <i class="iconfont" @click="changeType3()">
                        <img src="@/assets/img/active/eye.png" v-if="iconShow.eye3==='psd3'" alt="">
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

    export default {
        name: "forgotPwd",
        components: {Toast},
        data() {
            return {
                transitionName: "slide-right",
                login_data: {
                    pwdType: "password",
                    pwdType2: "password",
                    pwdType3: "password"
                },
                username: "",
                userpwd: "",
                phone: "",
                regxuser: /^1[0-9]\d{9}$/,
                regxpwd: /^[0-9A-Za-z_@]{6,24}/,
                msg: '',
                oldPassword: '',
                newPassword: '',
                rePassword: '',
                iconShow: {
                    eye: 'psd',
                    eye2: 'psd2',
                    eye3: 'psd3'
                },

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
                that.changeRoute('/set',{'from':'changePwd'})
                setTimeout(function () {//1s中后清除
                    first = null;
                }, 1000);
            }
        };
    },
        computed: {
            oldPwd: {
                get() {
                    return this.oldPassword;
                },
                set(v) {
                    this.oldPassword = v;
                }
            },
            newPwd: {
                get() {
                    return this.newPassword;
                },
                set(v) {
                    this.newPassword = v;
                }
            },
            rePwd: {
                get() {
                    return this.rePassword;
                },
                set(v) {
                    this.rePassword = v;
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
            }, changeType2() {
                let that = this;
                this.login_data.pwdType2 = this.login_data.pwdType2 === 'password' ? 'text' : 'password';
                //密码icon显示隐藏
                if (that.iconShow.eye2 == 'psd2') {
                    that.iconShow.eye2 = ''
                } else {
                    that.iconShow.eye2 = 'psd2'
                }
            }, changeType3() {
                let that = this;
                this.login_data.pwdType3 = this.login_data.pwdType3 === 'password' ? 'text' : 'password';
                //密码icon显示隐藏
                if (that.iconShow.eye3 == 'psd3') {
                    that.iconShow.eye3 = ''
                } else {
                    that.iconShow.eye3 = 'psd3'
                }
            },
            routeForgot: function () {
                let username = localStorage.getItem('username');
                let uid = localStorage.getItem('uid');
                let oldPassword = this.oldPassword;
                let newPassword = this.newPassword;
                let rePassword = this.rePassword;
                if (oldPassword == '' || !this.regxpwd.test(oldPassword)) {
                    this.msg = "密码格式不正确";
                    return false;
                }
                if (newPassword == '' || !this.regxpwd.test(newPassword)) {
                    this.msg = "新密码格式不正确";
                    return false;
                }
                if (newPassword != rePassword) {
                    this.msg = "两次密码不一致";
                    return false;
                }
                let info = {
                    userId: uid,
                    mobile: username,
                    oldPassword: oldPassword,
                    password: newPassword,
                    accessToken: sha1(uid + username + oldPassword + newPassword + apiKey)
                };
                let url = site + '/api/users/changePwd';
                let that = this;
                axios.post(url, info).then(function (response) {
                    if (response.data.status == 1 && response.data.code == 0) {
                        that.msg = "修改密码成功";
                        setTimeout(function () {
                            that.changeRoute('/set');
                        }, 1000);
                    } else {
                        if (response.data.code == 5) {
                            that.msg = "原密码错误";
                        } else if (response.data.code == 4) {
                            that.msg = "修改密码失败";
                        }
                        return false;
                    }
                }).catch(function (error) {
                    console.log(error);
                    that.msg = "修改密码错误";
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
