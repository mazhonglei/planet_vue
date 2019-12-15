<template>
    <transition :name="transitionName">
        <div class="body" id="home">
            <!--头部-->
            <div class="header">
                <div class="immersion">
                    <span class="titlefont">DDUP</span>
                    <span class="hdIcon-lf" @click="changeRoute('/findClass',{from:'home'})">
                        <img src="@/assets/img/searchicon.png" alt="" class="img1">
                    </span>
                </div>
            </div>
            <div class="new" ref="wrapper">
                <div class="wrapper-pd">

                    <!--轮播图-->
                    <div class="banner">
                        <swipe></swipe>
                    </div>
                    <div class="student">
                        热门班级
                    </div>
                    <!--内容-->
                    <div class="content">
                        <div class="hotclass">
                            <div class="left1 f_left" @click="routerNext(hotList.id)"
                                 v-for="(hotList,index) in hotClasslist" :key="index">
                                <div class="left1Img">
                                    <img :src="hotList.cover_pic | imgPath" alt="">
                                </div>
                                <p>{{hotList.name}}</p>
                                <div class="left1Content">
                                    {{hotList.posts_count}}次更新&nbsp;|&nbsp;{{hotList.money}}USDT
                                </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="need">
                        -更懂你的学习需求-
                    </div>
                </div>
            </div>
            <Tabbar :selected="selected" :tabs="tabs"></Tabbar>
            <Loading v-show="loading"></Loading>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>
    </transition>
</template>
<script>
    import swipe from '../../components/swipe'
    import Bscroll from 'better-scroll'
    import axios from "axios";
    import sha1 from 'sha1';
    import {site, apiKey} from '../../assets/js/config/site.js';
    import Toast from '../../components/toast';

    export default {
        name: "home",
        components: {swipe, Toast},
        data() {
            return {
                transitionName: '',
                hotClasslist: [],
                myscroll: "",
                msg: "",
                noMore: false,
                nowPage: 0,
                loading: true,
                selected: "home",
                tabs: [require("@/assets/img/active/home_active.png"), require("@/assets/img/active/find.png"),
                    require("@/assets/img/active/wallet.png"), require("@/assets/img/active/my.png")],
            }
        },
        created() {
            // 没有钱包地址的时候，跳转到创建钱包页面
            let walletActive = localStorage.getItem("walletActive");
            if (!walletActive) {
                this.changeRoute("/wallet/create");
                return;
            }

            this.loading = true;
            this.getHotList();
            if (this.$route.query.from == 'classIndex' || this.$route.query.from == 'classInfo' || this.$route.query.from == 'findClass') {
                this.transitionName = 'slide-left';
            } else {
                this.transitionName = '';
            }
            this.replaceRoute('home')
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
                        stop: 0
                    },
                    pullUpLoad: {
                        threshold: -10
                    }
                });
            } else {
                this.myscroll.refresh();
            }
            let that = this;
            this.myscroll.on('pullingUp', function () { //pullingUp下拉刷新
                if (that.noMore === false) {
                    that.nowPage = that.nowPage + 1;
                    let url = site + '/api/group/getHotList';
                    let nowPage = that.nowPage;
                    let info = {
                        nowPage: nowPage,
                        accessToken: sha1(nowPage + apiKey)
                    }
                    axios.post(url, info).then(function (response) {
                        //遍历拿到的data push到热门班级列表内
                        response.data.data.hot.forEach(function (item) {
                            that.hotClasslist.push(item);
                        })
                        if (response.data.data.hot.length < 6) {
                            that.noMore = true;
                        }
                        that.myscroll.finishPullUp();
                        that.myscroll.refresh();
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else {
                    that.myscroll.finishPullUp();
                    that.myscroll.refresh();
                }
            })
        },

        filters: {
            imgPath: function (value) {
                return site + value;
            }
        },
        computed: {
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
        },
        methods: {
            getHotList() {
                let that = this;
                let url = site + '/api/group/getHotList';
                let nowPage = that.nowPage;
                let info = {
                    nowPage: nowPage,
                    accessToken: sha1(nowPage + apiKey)
                }
                axios.post(url, info).then(function (response) {
                    that.hotClasslist = response.data.data.hot;
                    if (that.hotClasslist.length < 6) {
                        that.noMore = true;
                    }
                    that.loading = false;
                }).catch(function (error) {
                    console.log(error);
                    that.loading = false;
                });
            },
            routerNext: function (groupId) {
                let that = this;
                let uid = localStorage.getItem('uid');
                if (uid && uid > 0) {
                    let info = {
                        userId: uid,
                        groupId: groupId,
                        accessToken: sha1(uid + groupId + apiKey)
                    }
                    let url = site + '/api/group/groupUserInfo';
                    axios.post(url, info).then(function (response) {
                        if (response.data.is_member == 1) {
                            that.changeRoute('/classIndex', {groupId: groupId, from: 'home'})
                        } else {
                            that.changeRoute('/classInfo', {groupId: groupId, from: 'home'})
                        }
                    }).catch(function (error) {
                        console.log(error);
                        that.msg = "请求错误";
                    });
                } else {
                    this.msg = "请重新登录";
                    setTimeout(function () {
                        that.changeRoute('/');
                    }, 1000);
                }
            },
            square(v) {
                this.msg = v
            },
        },
    }
</script>

<style lang="scss">
    @import "../../assets/css/class/home";
</style>
