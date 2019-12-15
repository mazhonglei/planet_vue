<template>
    <transition :name="transitionName">
        <div class="body" id="nickName">
            <div class="new">
                <!--头部-->
                <div class="header">
                    <div class="immersion">
                     <span class="backImg" @click="changeRoute('/editUser',{'from':'nickName'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                        <span class="titlefont">个性签名</span>
                        <span v-if="isShow" class="send" @click="updateNick">确定</span>
                    </div>
                </div>
                <form action="#" class="signTure">
                    <textarea v-model="signCon" maxlength="40"></textarea>
                    <!--<input type="text" v-model="nick">
                    <img src="../../assets/img/close02.png" alt="" class="clearNick">-->
                </form>
                <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
            </div>
        </div>
    </transition>
</template>

<script>
    import axios from "axios";
    import Toast from '../../components/toast';
    import sha1 from 'sha1';
    import {site, apiKey} from '../../assets/js/config/site.js';

    export default {
        name: "nickName",
        components: {Toast},
        data() {
            return {
                isShow: false,
                transitionName: "slide-right",
                signConText: '',
                oldSign: '',
                msg: '',
            }
        },mounted(){
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
                    that.changeRoute('/editUser',{'from':'nickName'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
        },
        created() {
            let user = JSON.parse(localStorage.getItem('userInfo'));
            this.oldSign = user.signature;
            this.signConText = user.signature;
        },
        computed: {
            signCon: {
                get() {
                    return this.signConText;
                },
                set(v) {
                    if (v != this.oldSign && v != '') {
                        this.isShow = true;
                    } else {
                        this.isShow = false;
                    }
                    this.signConText = v;
                }
            },
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
        },
        methods: {
            updateNick: function () {
                let uid = localStorage.getItem('uid');
                let signature = this.signConText;
                let info = {
                    users_id: uid,
                    signature: signature,
                    accessToken: sha1(uid + signature + apiKey)
                };
                let url = site + '/api/users/editUsers';
                let that = this;
                axios.post(url, info).then(function (response) {
                    if (response.data.status == 1 && response.data.code == 0) {
                        that.msg = "设置成功";
                        let user = JSON.parse(localStorage.getItem('userInfo'));
                        user.signature = signature;
                        localStorage.setItem('userInfo', JSON.stringify(user))
                        setTimeout(function () {
                            that.changeRoute('/editUser');
                        }, 1000);
                    } else {
                        that.msg = "设置失败";
                        return false;
                    }
                }).catch(function (error) {
                    console.log(error);
                    that.msg = "设置错误";
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
    @import "../../assets/css/user/nickName";

</style>
