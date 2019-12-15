<template>
    <transition :name="transitionName">
        <div class="body" id="myCreate">
            <div class="new">
                <!--头部-->
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/myInfo',{'from':'myCreate'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                        <span class="titlefont"> 我创建的班级</span>
                        <span class="hdIcon-lf" @click="changeRoute('/createClass')">
                            <img src="@/assets/img/add.png" alt="" class="img1">
                        </span>
                    </div>
                </div>
                <!--内容-->
                <div class="content">
                    <!--<div class="searchBox">
                        <i class="iconfont icon-sousuo1"></i>
                        <div @click="changeRoute('/findClass')">搜索班级或内容...</div>
                    </div>-->
                    <div class="buyBox" ref="wrapper">
                        <div class="buyList">
                            <div class="square" v-for="(myClass,index) in myClassList"
                                 @click="routeClass(myClass.group_id, myClass.audit)" :key="index">
                                <div class="imgShadow">
                                    <img :src="myClass.cover_pic | imgPath" alt="">
                                </div>
                                <div class="right">
                                    <div class="rightContent">
                                        <p class="p1">
                                            {{myClass.name}}
                                        </p>
                                        <p class="p2">
                                            {{myClass.summary}}
                                        </p>
                                    </div>
                                    <div class="p3">
                                        <span>共{{myClass.users_count}}人加入学习</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="myClassList.length == 0 && !loading"
                         style="width: 100%;text-align: center;padding-top: 15px;font-size: 14px;position: absolute;top: 50%;transform: translateY(-50%)">
                        暂无创建班级...
                    </div>
                </div>
                <!--底部-->
            </div>
            <Loading v-show="loading"></Loading>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>
    </transition>
</template>


<script>
    import Bscroll from 'better-scroll'
    import axios from "axios";
    import sha1 from 'sha1';
    import {site, apiKey} from '../../assets/js/config/site.js';
    import Toast from '../../components/toast';

    export default {
        name: "myClass",
        components: {Toast},
        data() {
            return {
                groupId: '',
                transitionName: 'slide-left',
                myClassList: [],
                myscroll: "",
                msg: "",
                noMore: false,
                nowPage: 0,
                loading: true
            }
        },
        created() {
            this.loading = true;
            if (this.$route.query.from == 'myInfo') {
                this.transitionName = 'slide-right';
            }
            this.replaceRoute('/myCreate')
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
                    that.changeRoute('/myInfo',{'from':'myCreate'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
            this.uid = this.$route.query.uid;
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
            this.getMyClass();
            let that = this;
            this.myscroll.on('pullingUp', function () { //pullingUp下拉刷新
                console.log(that.nowPage);
                console.log(that.noMore);
                if (that.noMore === false) {
                    let uid = localStorage.getItem('uid');
                    that.nowPage = that.nowPage + 1;
                    let url = site + '/api/group/myCreate';
                    let nowPage = that.nowPage;
                    let info = {
                        userId: uid,
                        nowPage: nowPage,
                        accessToken: sha1(uid + nowPage + apiKey)
                    }
                    axios.post(url, info).then(function (response) {
                        response.data.data.forEach(function (item) {
                            that.myClassList.push(item);
                        })
                        console.log(response)
                        if (response.data.data.length < 6) {
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
                    return require('@/assets/img/bg_fk.png');
                }
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
            //获取已购班级列表
            getMyClass() {
                let that = this;
                let url = site + '/api/group/myCreate';
                let uid = localStorage.getItem('uid');
                let info = {
                    userId: uid,
                    accessToken: sha1(uid + apiKey)
                }
                axios.post(url, info).then(function (response) {
                    that.myClassList = response.data.data;
                    that.loading = false;
                }).catch(function (error) {
                    console.log(error);
                    that.loading = false;
                });
            },
            routeClass: function (groupId, audit) {
                if (audit == 1) {
                    let that = this;
                    let url = site + '/api/group/groupUserInfo';
                    let uid = localStorage.getItem('uid');
                    let info = {
                        userId: uid,
                        groupId: groupId,
                        accessToken: sha1(uid + groupId + apiKey)
                    }
                    axios.post(url, info).then(function (response) {
                        if (response.data.is_member == 1) {
                            that.changeRoute('/classIndex', {groupId: groupId, from: 'myCreate'})
                        } else {
                            that.msg = "无法进入班级";
                        }
                    }).catch(function (error) {
                        console.log(error);
                        that.msg = "系统错误";
                    });
                }else{
                    this.msg = "班级暂未审核通过，无法进入";
                }
            },
            square(v) {
                this.msg = v
            },
        }
    }
</script>

<style lang="scss">
    @import "../../assets/css/user/myCreate";
</style>
