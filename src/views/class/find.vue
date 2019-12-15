<template>
    <transition :name="transitionName">
        <div class="body" id="find">
            <div class="new">
                <div class="header">
                    <div class="immersion">
                        <span class="titlefont">发现</span>
                    </div>
                </div>
                <div tabindex="-1" role="dialog" aria-hidden="true" class="pswp" style="position: fixed">
                    <div class="pswp__bg" style=""></div>
                    <div class="pswp__scroll-wrap">
                        <div class="pswp__container" style="transform: translate3d(-2100px, 0px, 0px);">
                            <div class="pswp__item" style="display: block; transform: translate3d(2100px, 0px, 0px);">
                                <div class="pswp__zoom-wrap"
                                     style="transform: translate3d(257.5px, 487px, 0px) scale(0.24);"><img
                                        class="pswp__img"
                                        src="static/img/class_21.0d4d15f8.jpg"
                                        style="opacity: 1; width: 375px; height: 375px;">
                                </div>
                            </div>
                            <div class="pswp__item" style="transform: translate3d(2520px, 0px, 0px);">
                                <div class="pswp__zoom-wrap" style="transform: translate3d(0px, 146px, 0px) scale(1);">
                                    <img
                                            class="pswp__img" src="static/img/class_17.4cb691d2.jpg"
                                            style="opacity: 1; width: 375px; height: 375px;"></div>
                            </div>
                            <div class="pswp__item" style="display: block; transform: translate3d(1680px, 0px, 0px);">
                                <div class="pswp__zoom-wrap" style="transform: translate3d(0px, 146px, 0px) scale(1);">
                                    <img
                                            class="pswp__img" src="static/img/class_19.64e16ec0.jpg"
                                            style="opacity: 1; width: 375px; height: 375px;"></div>
                            </div>
                        </div>
                        <div class="pswp__ui pswp__ui--hidden">
                            <div class="pswp__top-bar">
                                <div class="pswp__counter">3 / 3</div>
                                <button title="Close (Esc)" class="pswp__button pswp__button--close"></button>
                                <button title="Zoom in/out" class="pswp__button pswp__button--zoom"></button>
                                <div class="pswp__preloader">
                                    <div class="pswp__preloader__icn">
                                        <div class="pswp__preloader__cut">
                                            <div class="pswp__preloader__donut"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                                <div class="pswp__share-tooltip"></div>
                            </div>
                            <button title="Previous (arrow left)"
                                    class="pswp__button pswp__button--arrow--left"></button>
                            <button title="Next (arrow right)" class="pswp__button pswp__button--arrow--right"></button>
                            <div class="pswp__caption">
                                <div class="pswp__caption__center"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="findPage" ref="wrapper">
                    <div class="content">
                        <div class="common clear" v-for="(img,index) in list" :key="index">
                            <div class="img"
                                 @click="changeRoute('/userDetail',{groupId:img.group_id,userId:img.user_id,from:'find'})">
                                <img :src="img.avatar | imgPath" alt="">
                            </div>
                            <div class="commonContent">

                                <div class="speak">
                                    <span @click="changeRoute('/userDetail',{groupId:img.group_id,userId:img.user_id,from:'find'})">{{img.nick}}：</span>
                                    <pre><span
                                            @click="changeRoute('/classDetails',{groupId:img.group_id,postId:img.id,from:'find',name:img.name})"
                                            v-html="showEmojifir(img.body.length>55?img.body.substring(0,55)+'...':img.body)"></span></pre>
                                </div>

                                <div class="imgs">
                                    <vue-preview :slides="img.images" @close="handleClose"></vue-preview>
                                </div>
                                <p class="images clear">
                                    <span>{{img.ctime}}</span>
                                    <label>{{img.name}}</label>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Tabbar :selected="selected" :tabs="tabs"></Tabbar>
                <Loading v-show="loading"></Loading>
                <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
            </div>
            <!--底部-->

        </div>

    </transition>
</template>

<script>
    import VuePreview from 'vue-preview';
    import Vue from 'vue';

    Vue.use(VuePreview);

    function preview() {
    }

    Vue.use(preview, {
        mainClass: 'pswp--minimal--dark',
        barsSize: {top: 0, bottom: 0},
        captionEl: false,
        fullscreenEl: false,
        shareEl: false,
        bgOpacity: 0.85,
        tapToClose: true,
        tapToToggleControls: false,

    })
    import Toast from '../../components/toast';
    import axios from "axios";
    import Bscroll from 'better-scroll';
    import sha1 from 'sha1';
    import {site, apiKey} from '../../assets/js/config/site.js';

    export default {
        name: "findClass",
        components: {Toast},
        data() {
            return {
                transitionName: '',
                list: [],
                msg: "",
                myscroll: "",
                nowPage: 0,
                noMore: false,
                loading: true,
                selected: "find",
                tabs: [require("@/assets/img/active/home.png"), require("@/assets/img/active/find_active.png"),
                    require("@/assets/img/active/wallet.png"), require("@/assets/img/active/my.png")],
            }
        },
        computed: {
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
                        threshold: 20 //下拉加载所触发需要的高度
                    }
                });
            } else {
                this.myscroll.refresh();
            }
            let that = this;
            this.myscroll.on('pullingUp', function () { //pullingUp下拉刷新
                if (that.noMore === false) {
                    let uid = localStorage.getItem('uid');
                    that.nowPage = that.nowPage + 1;
                    let url = site + '/api/group_posts/findPost';
                    let nowPage = that.nowPage;
                    let info = {
                        userId: uid,
                        nowPage: nowPage,
                        accessToken: sha1(uid + nowPage + apiKey)
                    }
                    axios.post(url, info).then(function (response) {
                        response.data.data.forEach(function (item) {
                            that.list.push(item);
                        })
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
        methods: {
            handleClose() {
                console.log('close event')
            },
            //提示信息
            square(v) {
                this.msg = v
            },
            //获取发现页信息
            getFindInfo: function () {
                let that = this;
                let uid = localStorage.getItem('uid');
                if (uid && uid > 0) {
                    let info = {
                        userId: uid,
                        accessToken: sha1(uid + apiKey)
                    };
                    let url = site + '/api/group_posts/findPost';
                    axios.post(url, info).then(function (response) {
                        if (response.data.status == 1 && response.data.code == 0) {
                            that.list = response.data.data;
                        }
                        that.loading = false;
                    }).catch(function (error) {
                        console.log(error);
                        that.loading = false;
                    });
                } else {
                    that.msg = "请重新登录";
                    setTimeout(function () {
                        that.changeRoute('/');
                    }, 1000);
                }
            },

        },
        created() {
            this.loading = true;
            this.getFindInfo();

        },
    }
</script>

<style lang="scss">
    @import "../../assets/css/class/find";
</style>
