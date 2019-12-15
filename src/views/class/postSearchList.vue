<template>
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
                    <div class="searchMain search-box">
                        <p class="searchTitle">主题</p>
                        <div ref="wrapper">
                            <ul class="searchItem">
                                <li v-for="(eachMain,index) in eachMainList" :key="index" @click="changeRoute('/classDetails', {groupId: eachMain.group_id,postId:eachMain.id, from: 'postSearchList'})">
                                    <div v-html="showEmojifir(eachMain.body)">{{eachMain.body}}</div>
                                    <div class="searchuserTime">
                                        <span>{{eachMain.name}}</span>
                                        <time>{{eachMain.ctime}}</time>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
                eachMainList: [],
                searchKey: "",
                noMore: false,
                nowPage: 0
            }
        },
        created() {
            this.searchKey = this.$route.query.searchKey;
            this.search();
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
                    let type = 0;
                    let searType = 2;
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
                        that.eachMainList = response.data.data.post;
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else {
                    that.msg = "关键词不能为空";
                    return false;
                }
            },
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
                    that.backRoute()
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
            let searchKey = that.searchKey;
            this.myscroll.on('pullingUp', function () { //pullingUp下拉刷新
                if (that.noMore === false) {
                    let uid = localStorage.getItem('uid');
                    let type = 0;
                    let searType = 2;
                    that.nowPage = that.nowPage + 1;
                    let url = site + '/api/group/searchGroup';
                    let nowPage = that.nowPage;
                    let info = {
                        userId: uid,
                        searchStr: searchKey,
                        type: type,
                        searType: searType,
                        nowPage: nowPage,
                        accessToken: sha1(uid + searchKey + type + searType + nowPage + apiKey)
                    }
                    axios.post(url, info).then(function (response) {
                        // console.log(response)
                        response.data.data.post.forEach(function (item) {
                            that.eachMainList.push(item);
                        })
                        if (response.data.data.post.length < 15) {
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
    @import "../../assets/css/class/classSearch.scss";
</style>
