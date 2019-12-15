<template>
    <transition :name="transitionName">
        <div class="body" id="userSearch">
            <div class="searchBox">
                <!--头部-->
                <div class="header">
                    <div class="immersion">
                     <span class="backImg" @click="changeRoute('/classSearch',{groupId:groupId,from:'userSearchList'})">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>

                        <form action="#" class="clear">
                            <img src="@/assets/img/ic_search.png" alt="" class="searchIcon">
                            <input type="text" placeholder="搜索">
                        </form>
                        <a href="javascript:void(0)" @click="changeRoute('/classSearch',{groupId:groupId,from:'userSearchList'})">取消</a>
                    </div>
                </div>
                <div class="searchContent" ref="wrapper">
                    <div>
                        <div class="searchMain search-box">
                            <p class="searchTitle">主题</p>
                            <ul class="searchItem">
                                <li v-for="(eachMain,index) in eachMainList" :key="index">
                                    <div>{{eachMain.title}}</div>
                                    <div class="searchuserTime">
                                        <span>{{eachMain.name}}</span>
                                        <time>{{eachMain.date}}<em>{{eachMain.time}}</em></time>
                                    </div>
                                </li>
                            </ul>
                            <div class="viewMore">
                                <i class="search-icon"></i>
                                <span>查看更多主题</span>
                                <i class="arrowIcon"></i>
                            </div>
                        </div>
                        <div class="searchUser search-box">
                            <p class="searchTitle">用户</p>
                            <ul class="searchItem">
                                <li v-for="(eachUser,index) in eachUserList" :key="index">
                                    <div class="userImg">
                                        <img :src="eachUser.img" alt="">
                                    </div>
                                    <div class="userName">{{eachUser.name}}</div>
                                </li>
                            </ul>
                        </div>
                        <div class="searchUser search-box">
                            <p class="searchTitle">已加入的班级</p>
                            <ul class="searchItem pdnone">
                                <li v-for="(eachClass,index) in eachClassList" :key="index">
                                    <div class="userImg classImg">
                                        <img :src="eachClass.img" alt="">
                                    </div>
                                    <div class="userName">
                                        <div>{{eachClass.name}}</div>
                                        <div class="userId">ID:
                                            <span>{{eachClass.id}}</span>
                                            <span>{{eachClass.userName}}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {site} from '../../assets/js/config/site.js'
    import Bscroll from 'better-scroll'

    export default {
        name: "userSearchList",
        data() {
            return {
                groupId:'',
                transitionName: 'slide-right',
                eachMainList: [
                    {
                    title: '「设计之美 回答了: 请问v-html无法解析标签咋办」',
                    name: '设计之美',
                    date: '2017/5/5',
                    time: '16:34'

                }, {
                    title: '[图片]「设计之美 回答了: 请问v-html无法解析标签咋办签咋办签咋办」',
                    name: '西堡',
                    date: '2017/10/5',
                    time: '23:34'

                }, {
                    title: '[图片]「Vux - 基于Vue和WeUI的组件库 Vux (读音sdadasdasdasda」',
                    name: '蒲格璐',
                    date: '2017/10/5',
                    time: '23:34'

                }],
                eachUserList: [
                    {
                    img: require('@/assets/img/shouye_04.jpg'),
                    name: 'Emily and vivian'
                }, {
                    img: require('@/assets/img/shouye_02.jpg'),
                    name: 'hello vue'
                }, {
                    img: require('@/assets/img/shouye_01.jpg'),
                    name: 'leverage'
                },],
                eachClassList: [
                    {

                    img: require('@/assets/img/shouye_04.jpg'),
                    name: '前端兔',
                    id: '46314034',
                    userName: 'TooBug'
                }, {
                    img: require('@/assets/img/shouye_01.jpg'),
                    name: '菲麦前端',
                    id: '96621007',
                    userName: '小虫巨蟹'
                }, {
                    img: require('@/assets/img/shouye_02.jpg'),
                    name: '北京前端',
                    id: '34249657',
                    userName: '陈庆@淘宝'
                },],
                myscroll: "",
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
        mounted() {
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
                    that.changeRoute('/classSearch',{groupId:that.groupId,from:'userSearchList'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
            this.groupId=this.$route.query.groupId;
            if (!this.myscroll) {
                this.myscroll = new Bscroll(this.$refs.wrapper, {
                    probeType: 3,
                    click: true,
                    disableMouse: true,
                    pullDownRefresh: {
                        threshold: 30,
                        stop: 0
                    }
                });
            } else {
                this.myscroll.refresh();
            }
        },

    }
</script>

<style lang="scss">
    @import "../../assets/css/class/classSearch.scss";
</style>
