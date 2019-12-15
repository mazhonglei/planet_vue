<template>
    <transition :name="transitionName">
        <div class="body" id="myInfo">
            <!--头部-->
            <div class="header">
                <div class="immersion">
                    <span class="titlefont">我</span>
                </div>
            </div>
            <div class="new" ref="wrapper">
                <!--内容-->
                <div class="myContent">
                    <div class="content1">
                        <div class="imgs" @click="changeRoute('/editUser')">
                            <div class="leftImg">
                                <img :src="userInfo.avatar" alt="" :onerror="defautImg">
                            </div>
                            <div class="nick">
                                <p class="nickName">{{userInfo.nickName}}</p>
                                <p class="nickId">ID:{{userInfo.userId}}</p>
                            </div>
                            <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                        </div>

                        <ul class="list">
                            <li @click="changeRoute('/myCreate',{from:'myInfo'})" class="bottomLine listLi1">
                                <img src="@/assets/img/studentCase.png" alt="" class="centerLeft1">
                                <p>我创建的班级</p>
                                <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                            </li>
                            <li @click="changeRoute('/myJoin',{from:'myInfo'})" class="bottomLine listLi1">
                                <img src="@/assets/img/joinMy.png" alt="" class="left">
                                <p>我加入的班级</p>
                                <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                            </li>
                            <!--<li class="bottomLine listLi" >
                                <img src="@/assets/img/star_02.png" alt="" class="centerLeft">
                                <p>我的收藏</p>
                                <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                            </li>-->
                            <li @click="changeRoute('/message')" class="bottomLine listLi">
                                <img src="@/assets/img/myInfo/msg.png" alt="" class="centerLeft">
                                <p>消息中心</p>
                                <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                            </li>
                            <li @click="changeRoute('/invitation',{from:'myInfo'})" class="listLi">
                                <img src="@/assets/img/message_02.png" alt="" class="centerLeft">
                                <p>我的邀请</p>
                                <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                            </li>
                        </ul>
                    </div>

                    <div class="content2">
                        <ul class="list2">

                            <li class="bottomLine" @click="changeRoute('/sendWallet')">
                                <img src="@/assets/img/email_01.png" alt="" class="left">
                                <p>发红包</p>
                                <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                            </li>
                            <li class="bottomLine" @click="changeRoute('/myWallet')">
                                <img src="@/assets/img/mywallet01.png" alt="" class="left">
                                <p>我的红包</p>
                                <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                            </li>
                            <!--<li class="bottomLine">-->
                            <!--<img src="@/assets/img/me_05.jpg" alt="" class="left">-->
                            <!--<p>帮助与反馈</p>-->
                            <!--<img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">-->
                            <!--</li>-->
                            <li @click="changeRoute('/set')">
                                <img src="@/assets/img/me_06.png" alt="" class="left">
                                <p>设置</p>
                                <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                            </li>
                        </ul>
                    </div>
                </div>
                <!--底部-->
                <Tabbar :selected="selected" :tabs="tabs"></Tabbar>
            </div>
        </div>
    </transition>
</template>

<script>
    import Bscroll from 'better-scroll';
    import {site} from '../../assets/js/config/site.js'

    export default {
        name: "myInfo",
        data() {
            return {
                transitionName: '',
                defautImg: 'this.src="' + require('@/assets/img/head_default.png') + '"',
                isHide: false,
                userInfo: {
                    nickName: '',
                    avatar: '',
                    userId: '',
                },
                selected: "myInfo",
                tabs: [require("@/assets/img/active/home.png"), require("@/assets/img/active/find.png"),
                    require("@/assets/img/active/wallet.png"), require("@/assets/img/active/my_active.png")],
            }
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
            if (!this.myscroll) {
                this.myscroll = new Bscroll(this.$refs.wrapper, {
                    probeType: 3,
                    click: true,
                    disableMouse: true,
                    pullDownRefresh: {
                        threshold: 30,
                        stop: 20
                    }
                });
            } else {
                this.myscroll.refresh();
            }
        },
        created() {
            if (this.$route.query.from == 'message' || this.$route.query.from == 'set' || this.$route.query.from == 'editUser' || this.$route.query.from == 'wallet' || this.$route.query.from == 'drafts' || this.$route.query.from == 'myCreate' || this.$route.query.from == 'myJoin' || this.$route.query.from == 'sendWallet' || this.$route.query.from == 'myWallet') {
                this.transitionName = 'slide-left';
            } else {
                this.transitionName = '';
            }
            let user = JSON.parse(localStorage.getItem('userInfo'));
            this.userInfo.nickName = user.nick;
            this.userInfo.avatar = site + user.avatar;
            this.userInfo.userId = localStorage.getItem('uid');
        },
        beforeRouteLeave(to, from, next) {
            if (to.path == "/editUser") {
                this.transitionName = "slide-left";
            }
            setTimeout(function () {
                next();
            }, 50);
        },
        methods: {
            //弹窗显示
            close() {
                this.isHide = false;
            },


            getInfo() {

            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/css/user/my";
    @import "../../assets/css/font2/iconfont.css";

    #myInfo {
        .fade-enter-active, .fade-leave-active {
            transition: all .4s;
        }

    }
</style>
