<template>
    <transition :name="transitionName">
        <div class="body" id="messageList">
            <div class="messageCenter">
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/message',{'from':'messageList'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                        <span class="titlefont">消息列表</span>
                    </div>
                </div>
                <!--评论-->
                <div class="wrapperBox" ref="wrapper">
                    <ul class="commentList">
                        <li class="listComment " v-for="(message,index) in messageList" :key="index">
                            <div class="img">
                                <img :src="message.avatar | imgPath" alt="">
                            </div>
                            <div class="commentContent">
                                <p class="msgContent">
                                    <span>{{message.from_nick}}</span><span>回复:</span>
                                    <span @click="changeRoute('/classDetails',{postId:message.post_id,groupId:message.group_id,from:'messageList',name:message.group_name})"
                                          v-html="showEmojifir(message.body.length>34?message.body.substring(0,34) + '...':message.body)"></span>
                                </p>
                                <!--<p class="msgCont">
                                    <span>{{message.messageCont}}</span>
                                </p>-->
                                <p class="chat">
                                    <span>{{message.ctime}}</span>
                                    <label>{{message.group_name}}</label>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            <Loading v-show="loading"></Loading>
        </div>
    </transition>
</template>

<script>
    import axios from "axios"
    import sha1 from 'sha1'
    import {site, apiKey} from '../../assets/js/config/site.js'
    import Bscroll from 'better-scroll';

    export default {
        name: "messageList",
        data() {
            return {
                transitionName: 'slide-left',
                messageList: [],
                loading: true,
                myscroll: "",
                nowPage: 0,
                noMore: false
            }
        },
        created() {
            this.getMsgList();
            if (this.$route.query.from == 'message') {
                this.replaceRoute('/messageList')
                this.transitionName = 'slide-right';
            }
        },
        filters: {
            imgPath: function (value) {
                if (value) {
                    return site + value;
                } else {
                    return require('@/assets/img/head_default.png');
                }
            }
        },
        methods: {
            //评论
            getMsgList: function () {
                let that = this;
                let uid = localStorage.getItem('uid'); //获取当前localstorage内存储的uid
                if (uid && uid > 0) {
                    let userId = uid;
                    let info = {
                        userId: userId,
                        accessToken: sha1(userId + apiKey)
                    }
                    let url = site + '/api/msg/getCommentList';
                    axios.post(url, info).then(function (response) {
                        console.log(response);
                        that.messageList = response.data.data;
                        that.loading = false
                    }).catch(function (error) {
                        console.log(error);
                        that.loading = false
                    });
                } else {
                    that.msg = "请重新登录";
                    setTimeout(function () {
                        that.changeRoute('/');
                    }, 1000);
                }
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
                    that.changeRoute('/message',{'from':'messageList'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };

            this.groupId = this.$route.query.groupId;
            this.uid = localStorage.getItem('uid');
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
                        threshold: 20 //下拉加载所触发需要的高度
                    }
                });
            } else {
                this.refresh();
            }
            let that = this;
            this.myscroll.on('pullingUp', function () { //pullingUp下拉刷新
                if (that.noMore === false) {
                    let uid = localStorage.getItem('uid'); //获取当前localstorage内存储的uid
                    that.nowPage = that.nowPage + 1;
                    let url = site + '/api/msg/getCommentList';
                    let userId = uid;
                    let nowPage = that.nowPage;
                    let info = {
                        userId: userId,
                        nowPage: nowPage,
                        accessToken: sha1(userId + nowPage + apiKey)
                    }
                    axios.post(url, info).then(function (response) {
                        response.data.data.forEach(function (item) {
                            that.messageList.push(item);
                        })
                        if (response.data.data.length < 12) {
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
    @import "../../assets/css/system/messageList";

</style>