<template>
    <transition :name="transitionName">
        <div class="body" id="userSearch">
            <div class="searchBox">
                <!--头部-->
                <div class="header">
                    <div class="immersion">
                     <span class="backImg" @click="backRoute()">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>

                        <form action="#" class="clear">
                            <img src="@/assets/img/ic_search.png" alt="" class="searchIcon">
                            <input type="search" v-model="setKey" @keyup.13="search" placeholder="搜索">
                        </form>
                        <a href="javascript:void(0)" @click="backRoute">取消</a>
                    </div>
                </div>
                <div class="searchContent" ref="wrapper">
                    <div>
                        <div class="searchUser search-box">
                            <p class="searchTitle" v-if="type == 1">相关班级</p>
                            <p class="searchTitle" v-else>已加入班级</p>
                            <ul class="searchItem pdnone">
                                <li v-for="(eachClass,index) in eachClassList" :key="index"
                                    @click="routerNext(eachClass.id)">
                                    <div class="userImg classImg">
                                        <img :src="eachClass.cover_pic | imgPath" alt="">
                                    </div>
                                    <div class="userName">
                                        <div>{{eachClass.name}}</div>
                                        <div class="userId">ID:
                                            <span>{{eachClass.group_no}}</span>
                                            <span>{{eachClass.nick}}</span>
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
    import axios from "axios"
    import sha1 from 'sha1'
    import {site, apiKey} from '../../assets/js/config/site.js'
    import Bscroll from 'better-scroll';

    export default {
        name: "userSearchList",
        data() {
            return {
                transitionName: 'slide-left',
                eachClassList: [],
                searchKey: "",
                type: 1,
            }
        },
        created() {
            this.type = this.$route.query.type;
            this.searchKey = this.$route.query.searchKey;
            this.search();
            if (this.$route.query.from == 'findClass') {
                this.transitionName = 'slide-right';
            }
            this.replaceRoute('/classSearchList', {searchKey: this.searchKey, type: this.type});
        },
        computed: {
            setKey: {
                get() {
                    return this.searchKey;
                },
                set(v) {
                    this.searchKey = v;
                }
            },
        },
        filters: {
            imgPath: function (value) {
                if (value) {
                    return site + value;
                } else {
                    return require('@/assets/img/class2.jpg');
                }
            }
        },
        methods: {
            search: function () {
                let that = this;
                let searchKey = that.searchKey;
                if (searchKey != '') {
                    let type = that.type;
                    let searType = 1;
                    let uid = localStorage.getItem('uid');
                    let info = {
                        userId: uid,
                        searchStr: searchKey,
                        type: type,
                        searType: searType,
                        accessToken: sha1(uid + searchKey + type + searType + apiKey)
                    }
                    let url = site + '/api/group/searchGroup';
                    axios.post(url, info).then(function (response) {
                        that.eachClassList = response.data.data.group;
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else {
                    that.msg = "关键词不能为空";
                    return false;
                }
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
                        // console.log(response)
                        if (response.data.is_member == 1) {
                            that.changeRoute('/classIndex', {groupId: groupId, from: 'classSearchList'})
                        } else {
                            that.changeRoute('/classInfo', {groupId: groupId, from: 'classSearchList'})
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
                    that.backRoute()
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
                        stop: 0
                    }
                });
            } else {
                this.refresh();
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/css/class/classSearch.scss";
</style>
