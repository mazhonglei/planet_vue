<template>
    <transition :name="transitionName">
        <div class="body" id="classMember">
            <!--头部-->

            <div class="header">
                <div class="immersion">
                        <span class="backImg" @click="changeRoute('/classDetail',{groupId:groupId})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                    <span class="titlefont">班级成员</span>
                    <!--<span class="hdIcon-lf" @click="isShow=!isShow">
                        <img src="@/assets/img/ic_action_group_settings.png" alt="" class="img1">
                    </span>-->
                </div>
            </div>

            <div class="member">
                <!--<form action="#">
                    <i class="iconfont icon-sousuo1"></i>
                    <input type="text" placeholder="搜索成员" >
                </form>-->
                <div class="member_content">
                    <!--<ul class="member_list">
                        <li >
                            <img src="@/assets/img/ic_trial_member_list.png" alt="" class="left">
                            <p>免费体验成员</p>
                            <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                        </li>
                        <li >
                            <img src="@/assets/img/ic_overdue_member_list.png" alt="" class="left">
                            <p>未续费成员</p>
                            <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                        </li>g src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                        </li>
                        <li >
                            <img src="@/assets/img/ic_black_list.png" alt="" class="left">
                            <p>黑名单</p>
                            <im

                    </ul>-->
                    <p class="member_intro">
                        <span>班长、班级成员</span>
                    </p>
                    <div style="height: 100%;overflow: hidden;" ref="wrapper">
                        <ul class="member_name clear">
                            <li v-for="(member,index) in classMember " :key="index">
                                <div>
                                    <img :src="member.avatar | imgPath" alt="" class="left1" :onerror="defaultImg">
                                </div>
                                <p>{{member.nick}}</p>
                                <span class="right1" v-if="member.role == 3">班长</span>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
            <!--遮罩层-->
            <div class="member_mask" v-show="isShow" @click="isShow=false">
                <div class="member_maskContent">
                    <p>排序方法</p>
                    <div><input type="radio" name="active" checked><span>默认</span></div>
                    <div><input type="radio" name="active"><span>最后登录时间</span></div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import axios from "axios"
    import sha1 from 'sha1'
    import {site, apiKey} from '../../assets/js/config/site.js';
    import Bscroll from 'better-scroll';

    export default {
        name: "classMember",
        data() {
            return {
                groupId: '',
                transitionName: 'slide-left',
                isShow: false,
                defaultImg: 'this.src="' + require('@/assets/img/head_default.png') + '"',
                classMember: [],

            }
        },
        created() {
            this.groupId = this.$route.query.groupId;
            this.getMember();
            if (this.$route.query.from == 'classDetail') {
                this.transitionName = 'slide-right';
            }
            // this.replaceRoute('/classMember')
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
                    that.changeRoute('/classDetail',{groupId:that.groupId})
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
                this.myscroll.refresh();
            }
            let that = this;
            this.myscroll.on('pullingUp', function () { //pullingUp下拉刷新
                if (that.noMore === false) {
                    let groupId = that.$route.query.groupId;
                    that.nowPage = that.nowPage + 1;
                    let url = site + '/api/group/getMemberList';
                    let nowPage = that.nowPage;
                    let info = {
                        groupId: groupId,
                        nowPage: nowPage,
                        accessToken: sha1(groupId + nowPage + apiKey)
                    }
                    axios.post(url, info).then(function (response) {
                        response.data.data.forEach(function (item) {
                            that.classMember.push(item);
                        })
                        if (response.data.data.length < 20) {
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
        },
        filters: {
            imgPath: function (value) {
                if (value) {
                    return site + value;
                } else {
                    return require('@/assets/img/head_default.png');
                }
            },
        },
        methods: {
            getMember: function () {
                let that = this;
                let groupId = this.$route.query.groupId;
                let info = {
                    groupId: groupId,
                    accessToken: sha1(groupId + apiKey)
                }
                let url = site + '/api/group/getMemberList';
                axios.post(url, info).then(function (response) {
                    that.classMember = response.data.data;
                    // console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            },
        }

    }
</script>

<style lang="scss">
    @import "../../assets/css/class/classMember";


</style>
