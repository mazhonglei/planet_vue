<template>
    <transition :name="transitionName">
        <div class="body" id="myWallet">
            <div class="header">
                <div class="immersion">
                        <span class="backImg" @click="changeRoute('/myInfo',{'from':'myWallet'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                    <span class="titlefont">我的红包</span>
                </div>
            </div>
            <div class="myWallet" ref="wrapper">
                <div>
                    <div class="myWalletCon clear">
                        <div class="myHeadImg">
                            <img :src="userInfo.avatar" alt="">
                        </div>
                        <div class="myReceive">
                            <p class="p1">{{userInfo.nick}}共发出红包总数</p>
                            <p class="p2">{{redCount}}<span>个</span></p>
                        </div>
                    </div>
                    <div class="walletDate">
                        <ul>
                            <li class="bottomLine" v-for="(red,index) in redList" :key="index"
                                @click="changeRoute('/walletDetails',{redId:red.id})">
                                <div class="name clear">
                                    <span class="span_name" v-if="red.type == 0">拼手气红包</span>
                                    <span class="span_name" v-else>普通红包</span>
                                    <span class="span_money">{{red.money}}元</span>
                                </div>
                                <div class="time clear">
                                    <span class="span_time">{{red.ctime}}</span>
                                    <span class="span_num">{{red.getnum}}/{{red.num}}个</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </transition>
</template>

<script>
    import axios from "axios";
    import sha1 from 'sha1';
    import {site, apiKey} from '../../assets/js/config/site.js';
    import Bscroll from 'better-scroll';

    export default {
        name: "myWallet",
        data() {
            return {
                transitionName: 'slide-right',
                userInfo: {
                    avatar: require('@/assets/img/head_default.png'),
                    nick: ''
                },
                redCount: 0,
                redList: [],
                nowPage:0,
                noMore:false
            }
        },
        created() {
            let uInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.userInfo.nick = uInfo.nick;
            if (uInfo.avatar) {
                this.userInfo.avatar = site + uInfo.avatar;
            }
            if (this.$route.query.from == 'walletDetails') {
                this.transitionName = 'slide-left'
            }
            this.getMyRed();
        },
        methods: {
            getMyRed() {
                let uid = localStorage.getItem('uid');
                let url = site + '/api/users/getMyRed';
                let that = this;
                let info = {
                    userId: uid,
                    accessToken: sha1(uid + apiKey)
                }
                axios.post(url, info).then(function (response) {
                    if (response.data.status == 1) {
                        that.redCount = response.data.data.count;
                        that.redList = response.data.data.redList;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
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
                    that.changeRoute('/myInfo',{'from':'myWallet'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
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
                    },
                    pullUpLoad: {
                        threshold: 20 //下拉加载所触发需要的高度
                    }
                });
            } else {
                this.myscroll.refresh();
            }
            let that = this;
            this.myscroll.on('pullingUp', function () { //pullingUp下拉刷新
                console.log(that.nowPage);
                console.log(that.noMore);
                if (that.noMore === false) {
                    let uid = localStorage.getItem('uid');
                    that.nowPage = that.nowPage + 1;
                    let url = site + '/api/users/getMyRed';
                    let nowPage = that.nowPage;
                    let info = {
                        userId: uid,
                        nowPage: nowPage,
                        accessToken: sha1(uid + nowPage + apiKey)
                    }
                    axios.post(url, info).then(function (response) {
                        console.log(response)
                        response.data.data.redList.forEach(function (item) {
                            that.redList.push(item);
                        })
                        console.log(response)
                        if (response.data.data.redList.length < 8) {
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
            });
        }
    }
</script>

<style lang="scss">
    @import "../../assets/css/user/myWallet";

</style>
