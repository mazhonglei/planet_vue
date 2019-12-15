<template>
    <transition :name="transitionName">
        <div class="body" id="walletDetails">
            <div class="header">
                <div class="immersion">
                        <span class="backImg" @click="changeRoute('/myWallet',{'from':'walletDetails'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                    <span class="titlefont">红包详情</span>
                    <span class="next">
                                <img src="@/assets/img/share.png" alt="" class="classIcon">
                    </span>
                </div>
            </div>
            <div class="walletDetails" ref="wrapper">
                <div>
                    <div class="walletDetailsCon clear">
                        <div class="myHeadImg">
                            <img :src="userInfo.avatar" alt="">
                        </div>
                        <div class="mySend">
                            <span>{{userInfo.nick}}</span>
                        </div>
                        <div class="sendWallet">
                            <span>{{redInfo.content}}</span>
                        </div>
                    </div>
                    <div class="middle"></div>
                    <div class="peopleDetails">
                        <div class="walletNum">
                            <span>{{redInfo.num}}个红包共{{redInfo.money}}元，已抢{{redInfo.getnum}}个</span>
                        </div>
                        <div class="walletPerson clear">
                            <div class="clear bottomLine linePs" v-for="(red,index) in getList" :key="index">
                                <div class="right_content">
                                    <div class="peopleDetail clear">
                                        <span class="leftName">{{red.mobile}}</span>
                                        <span class="rightMoney">{{red.money}}</span>
                                    </div>
                                    <div class="peopleDetail2 clear">
                                        <span class="leftTime">{{red.ctime}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
        name: "walletDetails",
        data() {
            return {
                transitionName: 'slide-right',
                userInfo: {
                    avatar: require('@/assets/img/head_default.png'),
                    nick: ''
                },
                redId: '',
                redInfo: {
                    content: '',
                    num: '',
                    getnum: '',
                },
                getList: [],
                nowPage: 0,
                noMore: false
            }
        },
        created() {
            let uInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.userInfo.nick = uInfo.nick;
            if (uInfo.avatar) {
                this.userInfo.avatar = site + uInfo.avatar;
            }
            this.redId = this.$route.query.redId;
            this.getRedInfo();
        },
        methods: {
            getRedInfo() {
                let redId = this.redId;
                let url = site + '/api/users/redInfo';
                let that = this;
                let info = {
                    redId: redId,
                    accessToken: sha1(redId + apiKey)
                };
                axios.post(url, info).then(function (response) {
                    if (response.data.status == 1) {
                        that.redInfo = response.data.data.redInfo;
                        that.getList = response.data.data.getList;
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
                that.changeRoute('/myWallet',{'from':'walletDetails'})
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
                if (that.noMore === false) {
                    let redId = that.redId;
                    that.nowPage = that.nowPage + 1;
                    let url = site + '/api/users/redInfo';
                    let nowPage = that.nowPage;
                    let info = {
                        redId: redId,
                        nowPage: nowPage,
                        accessToken: sha1(redId + nowPage + apiKey)
                    };
                    axios.post(url, info).then(function (response) {
                        response.data.data.getList.forEach(function (item) {
                            that.getList.push(item);
                        });
                        if (response.data.data.getList.length < 6) {
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
    @import "../../assets/css/user/walletDetails";

</style>
