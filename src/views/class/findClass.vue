<template>
    <transition :name="transitionName">
        <div class="body" id="findClass">
            <div class="new">
                <!--头部-->
                <div class="header">
                    <div class="immersion">
                        <form action="javascript:void(0)">
                            <div>
                                <div class="searchList" @click="isSearch">
                                    <span>{{selected}}</span>
                                    <img src="@/assets/img/ic_switch_triangle.png" class="search-icon"
                                         :class="isRotate?'isRotateA':'isRotateB'" alt="">
                                    <transition name="bg">
                                        <ul class="search-list" v-show="isList">
                                            <li :class="searchActive=='all'?'searchActive':''"
                                                @click="isSearchActive('all')" value="">全部
                                            </li>
                                            <li :class="searchActive=='class'?'searchActive':''"
                                                @click="isSearchActive('class')" value="">班级
                                            </li>
                                            <li :class="searchActive=='theme'?'searchActive':''"
                                                @click="isSearchActive('theme')" value="">主题
                                            </li>
                                        </ul>
                                    </transition>
                                </div>
                                <input type="search" v-model="searchKey" placeholder="搜索" @keyup.13="search"
                                       maxlength="35">

                            </div>
                            <a href="javascript:void(0);" @click="backRoute()">取消</a>
                        </form>

                    </div>
                </div>
                <div ref="wrapper" class="wrapperBox">
                    <div class="padding-box" v-if="isSearched === false">
                        <div class="history" v-for="(searchItem,index) in searchItemList" :key="index">
                            <p class="f_left">
                                <img src="@/assets/img/ic_history_time.png" alt="">
                                <span @click="selectHistorySearch(searchItem.name)">{{searchItem.name}}</span>
                            </p>
                            <div class="f_right" @click="del(index)">
                                <img src="@/assets/img/ic_hashtag_remove_button.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="searchContent" v-else>
                        <div class="searchUser search-box" v-if="eachUserList.length > 0">
                            <p class="searchTitle">已加入的班级</p>
                            <ul class="searchItem pdnone">
                                <li v-for="(eachUser,index) in eachUserList" :key="index" v-show="index < 3"
                                    @click="routerNext(eachUser.id)">
                                    <div class="userImg">
                                        <img :src="eachUser.cover_pic | imgPath" alt="">
                                    </div>
                                    <div class="userName">
                                        <div>{{eachUser.name}}</div>
                                        <div class="userId">
                                            ID:<span>{{eachUser.group_no}}</span><span>{{eachUser.nick}}</span></div>
                                    </div>
                                </li>
                            </ul>
                            <div class="viewMore"
                                 @click="changeRoute('/classSearchList',{searchKey:searchStr,type:0,from:'findClass'})"
                                 v-if="eachUserList.length > 3">
                                <i class="search-icon"></i>
                                <span>查看更多</span>
                                <i class="arrowIcon"></i>
                            </div>
                        </div>
                        <div class="searchMain search-box" v-if="eachMainList.length > 0">
                            <p class="searchTitle">已加入班级的主题</p>
                            <ul class="searchItem">
                                <li v-for="(eachMain,index) in eachMainList" :key="index" v-show="index < 3"
                                    @click="changeRoute('/classDetails',{groupId:eachMain.group_id,postId:eachMain.id,from:'findClass'})">
                                    <div class="searchCont" v-html="showEmojifir(eachMain.body)">{{eachMain.body}}</div>
                                    <div class="searchuserTime">
                                        <div>来自<span>{{eachMain.name}}</span>|<span>{{eachMain.nick}}</span></div>
                                        <div>{{eachMain.ctime}}</div>
                                    </div>
                                </li>
                            </ul>
                            <div class="viewMore" @click="changeRoute('/postSearchList',{searchKey:searchStr})"
                                 v-if="eachMainList.length > 3">
                                <i class="search-icon"></i>
                                <span>查看更多</span>
                                <i class="arrowIcon"></i>
                            </div>
                        </div>
                        <div class="searchMain search-box search-line" v-if="isSearched === true">
                            <ul class="searchItem pdnone">
                                <li>
                                    <div class="userImg userBg">
                                        <img src="@/assets/img/ic_action_group_search_normal.png" alt="">
                                    </div>
                                    <div class="userName"
                                         @click="changeRoute('/classSearchList',{searchKey:searchStr,type:1,from:'findClass'})">
                                        <div class="userBox">
                                            <div class="searchMore">搜索更多<span>{{searchStr}}</span></div>
                                            <div class="userId">班级名称、ID</div>
                                        </div>
                                        <i class="arrowIcon vatop"></i>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>
    </transition>
</template>

<script>
    import Toast from '../../components/toast';
    import axios from "axios"
    import sha1 from 'sha1'
    import {site, apiKey} from '../../assets/js/config/site.js'
    import Bscroll from 'better-scroll';

    export default {
        name: "findClass",
        components: {Toast},
        data() {
            return {
                transitionName: 'slide-left',
                selected: '全部',
                searchActive: 'all',
                isList: false,
                isRotate: false,
                searchItemList: [],
                msg: "",
                searchStr: "",
                eachMainList: [],
                eachUserList: [],
                isSearched: false,
                searType: 0,
            }
        },
        created() {
            let searchList = JSON.parse(localStorage.getItem('searchList'));
            if(searchList){
                this.searchItemList = searchList.reverse();
            }else{
                this.searchItemList = [];
            }

            if (this.searchItemList == null) {
                this.searchItemList = [];
            }
            if (this.$route.query.from == 'home') {
                this.transitionName = 'slide-right';
            }
            this.replaceRoute('/findClass');
        },
        computed: {
            searchKey: {
                get() {
                    return this.searchStr;
                },
                set(v) {
                    let searchList = JSON.parse(localStorage.getItem('searchList'));
                    if(searchList){
                        this.searchItemList = searchList.reverse();
                    }else{
                        this.searchItemList = [];
                    }
                    if (v != '') {
                        let arrResult = [];
                        for (let i = 0; i < this.searchItemList.length; i++) {
                            if (this.searchItemList[i].name.indexOf(v) != -1) {
                                arrResult.push(this.searchItemList[i]);
                            }
                        }
                        this.searchItemList = arrResult;
                    } else {
                        this.isSearched = false;
                    }
                    this.searchStr = v;
                }
            },
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
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
            isSearchActive(res) {

                this.searchActive = res;
                this.value = res;
                if (this.value === "all") {
                    this.selected = '全部';
                    this.searType = 0
                } else if (this.value === "class") {
                    this.selected = '班级';
                    this.searType = 1
                } else {
                    this.selected = '主题';
                    this.searType = 2
                }

            },
            isSearch() {
                this.isList = !this.isList;
                this.isRotate = !this.isRotate;
            },
            del(index) {
                let that = this
                that.searchItemList.splice(index, 1)
                localStorage.setItem('searchList', JSON.stringify(that.searchItemList.reverse()));
                that.searchItemList = JSON.parse(localStorage.getItem('searchList')).reverse();
            },
            selectHistorySearch: function (searchKey) {
                this.searchStr = searchKey;
                this.search();
            },
            search: function () {
                let that = this;
                let searchKey = that.searchStr;
                if (searchKey != '') {
                    let searchInfo = {
                        name: searchKey
                    }
                    let type = 0;
                    let searType = that.searType;
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
                        that.eachUserList = response.data.data.group;
                        that.isSearched = true;
                        that.searchItemList = JSON.parse(localStorage.getItem('searchList'));
                        // console.log(response)
                        let y = 0;
                        for (let i = 0; i < that.searchItemList.length; i++) {
                            if (that.searchItemList[i].name == searchKey) {
                                y = y + 1;
                            }
                        }
                        if (y == 0) {
                            that.searchItemList.push(searchInfo);
                            if (that.searchItemList.length > 10) {
                                let over = that.searchItemList.length - 10;
                                that.searchItemList.splice(0, over)
                            }
                            localStorage.setItem('searchList', JSON.stringify(that.searchItemList));
                        }
                        that.searchItemList = that.searchItemList.reverse();
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else {
                    that.msg = "关键词不能为空";
                }
            },
            square(v) {
                this.msg = v
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
                            that.changeRoute('/classIndex', {groupId: groupId, from: 'findClass'})
                        } else {
                            that.changeRoute('/classInfo', {groupId: groupId, from: 'findClass'})
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
                    }
                });
            } else {
                this.refresh();
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/css/class/search";

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    .fade-enter, .fade-leave-to {
        transform: none;
    }

    .isRotateA {
        transform: rotate(180deg);
        transition: all .3s;
    }

    .isRotateB {
        transition: all .3s;
    }
</style>
