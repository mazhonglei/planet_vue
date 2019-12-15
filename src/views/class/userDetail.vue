<template>
    <transition :name="transitionName">
        <div class="body" id="userDetail">
            <!--头部-->
            <div class="header">
                <div class="immersion">
                        <span class="backImg" @click="myBack()">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                    <span class="titlefont">{{userInfo.nick}}</span>
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
            <div class="new" ref="wrapper">
                <div class="userDetail clear">
                    <div class="user_content">
                        <div class="user_headImg">
                            <img :src="userInfo.avatar | imgPath" alt="">
                        </div>
                        <p class="user_name">
                            {{userInfo.nick}}
                        </p>
                        <div class="user_mask">
                            {{userInfo.signature}}
                        </div>
                    </div>

                    <div class="user_con">
                        <div class="user_common" v-for="(img,index) in list" :key="index">
                            <div class="img">
                                <img :src="userInfo.avatar | imgPath" alt="">
                            </div>
                            <div class="commonContent">

                                <div class="speak"><span style="color: #6a89a1;">{{userInfo.nick}}：</span>
                                    <pre><span
                                            v-html="showEmojifir(img.body.length>55?img.body.substring(0,55)+'...':img.body)"></span></pre>

                                </div>

                                <div class="imgs">
                                    <vue-preview :slides="img.images" @close="handleClose"></vue-preview>
                                </div>
                                <p class="images clear">
                                    <span>{{img.ctime}}</span>
                                    <label>{{groupName}}</label>
                                </p>
                                <p class="user_images">
                                    <span @click="changeRoute('/classDetails',{postId:img.id,groupId:groupId,from:from,name:groupName})">
                                        <img src="@/assets/img/classZan.png" alt="">
                                        <em v-if="img.likes_count > 0">{{img.likes_count}}</em>
                                    </span>
                                    <span @click="changeRoute('/classDetails',{postId:img.id,groupId:groupId,from:'userDetail',name:groupName})">
                                        <img src="@/assets/img/classMessage.png" alt="">
                                        <em v-if="img.comments_count > 0">{{img.comments_count}}</em>
                                    </span>
                                    <span> <img src="@/assets/img/classShare2.png" alt=""
                                                @click="shareHref({nick:userInfo.nick,body:img.body,postId:img.id})"></span>
                                </p>
                            </div>
                            <div class="clear"></div>
                        </div>

                    </div>
                </div>
            </div>
            <Loading v-show="loading"></Loading>
        </div>
    </transition>
</template>

<script>
    import Bscroll from 'better-scroll';
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
        tapToToggleControls: false
    })
    import axios from "axios"
    import sha1 from 'sha1'
    import {site, apiKey} from '../../assets/js/config/site.js'
    import {MessageBox} from 'mint-ui';
    import {int} from '../../assets/js/config/int'

    export default {
        name: "userDetail",
        data() {
            return {
                transitionName: 'slide-left',
                groupId: '',
                userId: '',
                isHide: true,
                isShow: false,
                comments: '',
                myscroll: "",
                userInfo: {
                    id: '',
                    nick: '',
                    signature: '',
                },
                groupName: '',
                list: [],
                noMore: false,
                nowPage: 0,
                loading: true,
                isShare: false,
                shares: {},
                Intent: '',
                File: '',
                Uri: '',
                main: '',
                from: ""
            }
        },
        methods: {
            myBack: function () {
                let that = this;
                let query = that.$route.query;
                switch (query.from) {
                    case "classIndex":
                        this.changeRoute("/classIndex", {
                            groupId: this.groupId,
                            postId: this.postId,
                            from: 'classDetails'
                        });
                        break;
                    case "find":
                        this.changeRoute("/find", query);
                        break;
                    case "classDetails":
                        this.changeRoute("/classIndex", {
                            groupId: this.groupId,
                            userId: this.userId,
                            from: 'classDetails'
                        });
                        break;
                    case "userDetail":
                        this.changeRoute("/find", query);
                        break;
                    default:
                        this.backRoute();
                        break;
                }
            },
            handleClose() {
                console.log('close event')
            },
            selectEmoji(code) {
                this.commentCon += code
            },
            submit() {
                this.data.push(this.commentCon)
                this.commentCon = ''
            },
            getUserInfo: function () {
                let that = this;
                let groupId = this.$route.query.groupId;
                let userId = this.$route.query.userId;
                let info = {
                    userId: userId,
                    groupId: groupId,
                    accessToken: sha1(userId + groupId + apiKey)
                }
                let url = site + '/api/users/getUserInfo';
                axios.post(url, info).then(function (response) {
                    that.userInfo = response.data.data.userInfo;
                    that.groupName = response.data.data.groupInfo.name;
                    that.list = response.data.data.postList;
                    that.loading = false;
                    console.log(response)
                }).catch(function (error) {
                    that.loading = false;
                    console.log(error);
                });
            },
            isTrue() {
                this.isShare = true;
            },
            plusReady() {
                this.updateSerivces();
                if (plus.os.name == "Android") {
                    this.main = plus.android.runtimeMainActivity();
                    this.Intent = plus.android.importClass("android.content.Intent");
                    this.File = plus.android.importClass("java.io.File");
                    this.Uri = plus.android.importClass("android.net.Uri");
                }
            },
            shareAction(sb, bh, list) {
                console.log(list.postId)
                if (!sb || !sb.s) {
                    MessageBox({
                        title: '',
                        message: "无效的分享服务!",
                        showCancelButton: false
                    });
                    // plus.nativeUI.alert("无效的分享服务！");
                    return;
                }

                var msg = {content: 'test', extra: {scene: sb.x}};
                if (bh) {
                    let str = list.body.substring(0, 26) + '...';
                    msg.href = int + 'index/share/sharePost?' + 'postId=' + list.postId;
                    msg.title = str;
                    msg.content = "来自" + "「" + this.groupName + "」" + list.nick + "的主题";
                    msg.thumbs = ["_www/logo.png"];
                    msg.pictures = ["_www/logo.png"];
                    console.log(msg.href)
                } else {
                    msg.pictures = [''];
                }
                // 发送分享
                if (sb.s.authenticated) {
                    //alert("---已授权---");
                    this.shareMessage(msg, sb.s);
                } else {
                    //alert("---未授权---");
                    sb.s.authorize(function () {
                        this.shareMessage(msg, sb.s);
                    }, function (e) {
                        MessageBox({
                            title: '',
                            message: "分享失败!",
                            showCancelButton: false
                        });
                        // plus.nativeUI.alert("分享失败!");
                    });
                }
            },
            shareMessage(msg, s) {
                s.send(msg, function () {
                    MessageBox({
                        title: '',
                        message: "分享到\"" + s.description + "\"成功!",
                        showCancelButton: false
                    });
                    // plus.nativeUI.alert("分享到\"" + s.description + "\"成功！ ");

                }, function (e) {
                    MessageBox({
                        title: '',
                        message: "分享失败!",
                        showCancelButton: false
                    });
                    // plus.nativeUI.alert("分享失败!");

                });
            },
            shareHref(list) {
                var shareBts = [];
                let th = this;
                // 更新分享列表
                var ss = this.shares['weixin'];
                ss && ss.nativeClient && (shareBts.push({title: '微信朋友圈', s: ss, x: 'WXSceneTimeline'}),
                    shareBts.push({title: '微信好友', s: ss, x: 'WXSceneSession'}));
                // 弹出分享列表
                shareBts.length > 0 ? plus.nativeUI.actionSheet({
                    title: '分享链接',
                    cancel: '取消',
                    buttons: shareBts
                }, function (e) {
                    (e.index > 0) && th.shareAction(shareBts[e.index - 1], true, list);
                }) : MessageBox({
                    title: '',
                    message: "当前环境无法支持分享链接操作!",
                    showCancelButton: false
                });
                // plus.nativeUI.alert('当前环境无法支持分享链接操作!');
            },
            updateSerivces() {
                let th = this;
                plus.share.getServices(function (s) {
                    th.shares = {};
                    for (var i in s) {
                        var t = s[i];
                        th.shares[t.id] = t;
                    }
                }, function (e) {
                    console.log(e);
                    MessageBox({
                        title: '',
                        message: "获取分享列表失败!",
                        showCancelButton: false
                    });
                    // plus.nativeUI.alert("获取分享列表失败!");
                });
            }
        },
        created() {
            this.loading = true;
            this.from = this.$route.query.from;
            this.groupId = this.$route.query.groupId;
            this.userId = this.$route.query.userId;
            this.getUserInfo();
            if (this.$route.query.from == 'classIndex' || this.$route.query.from == 'find' || this.$route.query.from == 'classDetails') {
                this.replaceRoute('/userDetail', {groupId: this.groupId, userId: this.userId})
                this.transitionName = 'slide-right';
            }

            // this.replaceRoute('/userDetail', {groupId: this.groupId, userId: this.userId})
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
                    that.myBack()
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
            let groupId = this.$route.query.groupId;
            let userId = this.$route.query.userId;
            this.myscroll.on('pullingUp', function () { //pullingUp下拉刷新
                if (that.noMore === false) {
                    that.nowPage = that.nowPage + 1;
                    let url = site + '/api/users/getUserInfo';
                    let nowPage = that.nowPage;
                    let info = {
                        userId: userId,
                        groupId: groupId,
                        nowPage: nowPage,
                        accessToken: sha1(userId + groupId + nowPage + apiKey)
                    }
                    axios.post(url, info).then(function (response) {
                        response.data.data.postList.forEach(function (item) {
                            that.list.push(item);
                        });
                        if (response.data.data.postList.length < 6) {
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
            if (window.plus) {
                this.plusReady();
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
        computed: {
            commentCon: {
                get() {
                    return this.comments;
                },
                set(v) {
                    this.comments = v;
                }
            }
        },
    }
</script>

<style lang="scss">
    @import "../../assets/css/class/userDetail";

    .commentFade-enter-active, .commentFade-leave-active {
        transition: all 0.4s;
    }

    .commentFade-enter, .commentFade-leave-to {
        transform: translateY(10rem);
    }

    .commentFade-enter-to, .commentFade-leave {
        transform: translateY(0rem);
    }

    .commentBg-enter-active, .commentBg-leave-active {
        transition: all 0.8s;
    }

    .commentBg-enter, .commentBg-leave-to {
        opacity: 0;
    }
</style>
