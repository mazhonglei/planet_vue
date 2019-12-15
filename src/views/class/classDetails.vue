<template>
    <transition :name="transitionName">
        <div class="body" id="classDetails">
            <!--头部-->
            <div class="header">
                <div class="immersion">
                        <span class="backImg"
                              @click="myBack()">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                    <span class="titlefont">详情</span>
                </div>
            </div>
            <div tabindex="-1" role="dialog" aria-hidden="true" class="pswp" style="position: fixed">
                <div class="pswp__bg" style=""></div>
                <div class="pswp__scroll-wrap">
                    <div class="pswp__container" style="transform: translate3d(-2100px, 0px, 0px);">
                        <div class="pswp__item" style="display: block; transform: translate3d(2100px, 0px, 0px);">
                            <div class="pswp__zoom-wrap"
                                 style="transform: translate3d(257.5px, 487px, 0px) scale(0.24);"><img class="pswp__img"
                                                                                                       src="static/img/class_21.0d4d15f8.jpg"
                                                                                                       style="opacity: 1; width: 375px; height: 375px;">
                            </div>
                        </div>
                        <div class="pswp__item" style="transform: translate3d(2520px, 0px, 0px);">
                            <div class="pswp__zoom-wrap" style="transform: translate3d(0px, 146px, 0px) scale(1);"><img
                                    class="pswp__img" src="static/img/class_17.4cb691d2.jpg"
                                    style="opacity: 1; width: 375px; height: 375px;"></div>
                        </div>
                        <div class="pswp__item" style="display: block; transform: translate3d(1680px, 0px, 0px);">
                            <div class="pswp__zoom-wrap" style="transform: translate3d(0px, 146px, 0px) scale(1);"><img
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
                        <button title="Previous (arrow left)" class="pswp__button pswp__button--arrow--left"></button>
                        <button title="Next (arrow right)" class="pswp__button pswp__button--arrow--right"></button>
                        <div class="pswp__caption">
                            <div class="pswp__caption__center"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="new" ref="wrapper">

                <div class="details">
                    <!--详情-->
                    <div class="details_common clear">
                        <div class="clear detailsBox">
                            <div class="img"
                                 @click="changeRoute('/userDetail',{groupId:groupId,userId:classDetails1.user_id,from:'classDetails'})">
                                <img :src="classDetails1.avatar | imgPath" alt="">
                            </div>
                            <div class="commonContent">
                                <!--<img src="@/assets/img/ic_operation.png" alt="" class="img1" @click="isTrue()">-->
                                <p class="name"
                                   @click="changeRoute('/userDetail',{groupId:groupId,userId:classDetails1.user_id,from:'classDetails'})">
                                    {{classDetails1.nick}}</p>
                                <p class="time">{{classDetails1.ctime}}</p>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <pre><p class="speak" v-html="showEmojifir(classDetails1.body)">
                        </p></pre>
                        <div class="imgs">
                            <vue-preview :slides="classDetails1.images" @close="handleClose"></vue-preview>
                        </div>
                        <div class="answer" v-if="classDetails1.likeUid">
                            <div>
                                <img src="@/assets/img/classZan.png" alt="">
                            </div>
                            <ul>
                                <li v-for="(person,index) in classDetails1.likeList " :key="index">
                                    {{person.nick}}&nbsp;
                                </li>
                            </ul>

                        </div>
                        <div class="details_zan">
                            <div class="details_btn zan">
                                <!--indexOf查看likeUid是否包括uid-->
                                <div>
                                    <img src="@/assets/img/like.png" alt=""
                                         v-if="(classDetails1.likeUid).indexOf(uid)===-1"
                                         @click="likePost(classDetails1.id);">
                                    <img src="@/assets/img/like_active.png" alt="" v-else
                                         @click="cancelLike(classDetails1.id)">
                                </div>
                                <span>赞</span>
                            </div>
                            <div class="details_btn" @click="shareHref()">
                                <img src="@/assets/img/classShare2.png" alt="">
                                <span>分享</span>
                            </div>
                        </div>

                    </div>
                    <div class="details_com">
                        <span>评论({{classDetails1.comments_count}})</span>
                    </div>
                    <div class="com">
                        <div class="comContent clear" v-for="(detail2,index) in commentList" :key="index">
                            <div class="comContentImg"
                                 @click="changeRoute('/userDetail',{groupId:groupId,userId:detail2.user_id})">
                                <img :src="detail2.avatar | imgPath" alt="">
                            </div>
                            <div class="comRight clear">
                                <p class="com_name clear"
                                   @click="changeRoute('/userDetail',{groupId:groupId,userId:detail2.user_id})">
                                    <span>{{detail2.nick}}</span>
                                </p>
                                <p class="com_time">
                                    <span>{{detail2.ctime}}</span>
                                </p>
                                <p class="com_speak" v-html="showEmojifir(detail2.body)">
                                    {{detail2.body}}
                                </p>
                                <div class="preview">
                                    <!--<vue-preview :slides="detail2.images" @close="handleClose"></vue-preview>-->
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="details_bottom">
                <div @click="isTxtShow= !isTxtShow">等你评论</div>
                <!--<img src="@/assets/img/ic_topic_detail_more.png" alt="" @click="isTrue()">-->
            </div>
            <div>
                <transition name="commentBg">
                    <div class="classDetailsMask" v-show="isTxtShow"
                         @click="hide();"></div>
                </transition>
                <transition name="commentFade">
                    <div class="classDetailsContent" v-show="isTxtShow">
                        <!--<textarea name="" id="" rows="6" v-model="commentCon" placeholder='等你评论'></textarea>-->
                        <div style="position: relative;">
                            <el-input
                                    type="textarea"
                                    placeholder="说点什么..."
                                    resize="none"
                                    v-model="commentCon" maxlength="45">
                            </el-input>
                            <div class="maxText">({{commentCon.length}}/45)</div>
                        </div>
                        <div class="star">
                            <div class="common3 clear">
                                <div class="f_left">
                                    <img src="@/assets/img/ic_face_gray.png" alt="" @click="showEmoji = !showEmoji">
                                </div>
                                <button @click="sendComment();">发送</button>
                            </div>
                            <!--emoji表情-->
                            <transition name="fade">
                                <div class="emoji-box" v-if="showEmoji">
                                    <vue-emoji @select="selectEmoji"></vue-emoji>
                                </div>
                            </transition>
                            <!--emoji-->
                        </div>
                    </div>
                </transition>
            </div>
            <!--分享遮罩层-->
            <share-popup v-show="isShare"></share-popup>
            <Loading v-show="loading"></Loading>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>
    </transition>
</template>

<script>

    import Bscroll from 'better-scroll'
    import VuePreview from 'vue-preview';
    import Vue from 'vue';
    import axios from "axios"
    import sha1 from 'sha1'
    import {site, apiKey} from '../../assets/js/config/site.js'
    import Toast from '../../components/toast';
    import vueEmoji from '../../components/emoji.vue'
    import {MessageBox} from 'mint-ui';
    import {int} from '../../assets/js/config/int'

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

    export default {
        name: "classDetails",
        data() {
            return {
                transitionName: 'slide-left',
                groupId: '',
                showEmoji: false,
                isTxtShow: false,
                detailShow: false,
                is: true,
                classDetails1: {
                    avatar: '',
                    body: '',
                    comments_count: '',
                    ctime: '',
                    images: [],
                    likeList: [],
                    likeUid: "",
                    nick: '',
                    user_id: ''
                },
                commentList: [{
                    user_id: ''
                }],
                postId: "",
                comments: "",
                commentId: "",
                targetUser: "",
                myscroll: '',
                msg: "",
                uid: "",
                noMore: false,
                nowPage: 0,
                loading: true,
                isShare: false,
                shares: {},
                Intent: '',
                File: '',
                Uri: '',
                main: '',
                name: ""
            }
        },
        components: {Toast, vueEmoji},
        created() {
            console.log(this.$route.query)
            this.name = this.$route.query.name;
            this.loading = true;
            this.uid = localStorage.getItem('uid'); //进入页面时给uid赋值
            this.groupId = this.$route.query.groupId;
            this.postId = this.$route.query.postId; //拿到路由内传的postId
            this.name = this.$route.query.name;
            this.getPostInfo();
            // if (this.$route.query.from == 'userDetail' || this.$route.query.from == 'classIndex' || this.$route.query.from == 'find' || this.$route.query.from == 'findClass') {
            //     this.transitionName = 'slide-right';
            // }
            if (this.$route.query.from == 'classIndex' || this.$route.query.from == 'find' || this.$route.query.from == 'userDetail' || this.$route.query.from == 'essences' || this.$route.query.from == 'messageList' || this.$route.query.from == 'findClass' || this.$route.query.from == 'postSearchList') {
                this.replaceRoute('/classDetails', {groupId: this.groupId, postId: this.postId})
                this.transitionName = 'slide-right';
            }
            if (this.$route.query.from == 'userDetail') {
                this.transitionName = 'slide-left';
            }
            // this.replaceRoute('/classDetails', {groupId: this.groupId, postId: this.postId})
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
            myBack: function () {
                let that = this;
                let query = that.$route.query;
                switch (query.from) {
                    case "classIndex":
                        this.backRoute();
                        break;
                    case "find":
                        this.backRoute();
                        break;
                    case "home":
                        this.changeRoute('/classIndex', {groupId: this.groupId, from: 'classDetails'});
                        break;
                    case "classDetails":
                        this.changeRoute('/classIndex', {groupId: this.groupId, from: 'classDetails'});
                        break;
                    case "userDetail":
                        this.backRoute();
                        break;
                    case "essences":
                        this.backRoute();
                        break;
                    default:
                        this.backRoute();
                        break;
                }
            },
            handleClose() {
                console.log('close event')
            },
            hide() {
                this.isTxtShow = false;
                this.showEmoji = false;
                this.commentCon = "";
            },
            square(v) {
                this.msg = v
            },
            //点赞
            likePost: function (postId) {
                let that = this;
                let uid = localStorage.getItem('uid');
                let user = JSON.parse(localStorage.getItem('userInfo'));
                if (uid && uid > 0) {
                    let info = {
                        userId: uid,
                        postId: postId,
                        accessToken: sha1(uid + postId + apiKey)
                    }
                    let url = site + '/api/group_posts/postLike';
                    axios.post(url, info).then(function (response) {
                        if (response.data.status == 1 && response.data.code == 0) {
                            that.msg = "点赞成功";
                            let uinfo = {
                                nick: user.nick,
                                user_id: uid,
                            }
                            that.classDetails1.likeList.push(uinfo);
                            that.classDetails1.likeUid += ',' + uid;
                        } else {
                            that.msg = "点赞失败";
                            return false;
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else {
                    that.msg = "请重新登录";
                    setTimeout(function () {
                        that.changeRoute('/');
                    }, 1000);
                }
            },
            //取消点赞
            cancelLike: function (postId) {
                let that = this;
                let uid = localStorage.getItem('uid');
                if (uid && uid > 0) {
                    let info = {
                        userId: uid,
                        postId: postId,
                        accessToken: sha1(uid + postId + apiKey)
                    }
                    let url = site + '/api/group_posts/cancelLike';
                    axios.post(url, info).then(function (response) {
                        if (response.data.status == 1 && response.data.code == 0) {
                            that.msg = "取消点赞";
                            that.classDetails1.likeList.forEach(function (item, indexs) { //遍历likeList 删除第几个
                                if (item.user_id == uid) {
                                    that.classDetails1.likeList.splice(indexs, 1);
                                }
                            });
                            //把likeUid的内容替换成空
                            that.classDetails1.likeUid = that.classDetails1.likeUid.replace("," + uid, "");
                        } else {
                            that.msg = "操作失败";
                            return false;
                        }
                    }).catch(function (error) {
                        console.log(error);
                        that.msg = "操作失败";
                        return false;
                    });
                } else {
                    that.msg = "请重新登录";
                    setTimeout(function () {
                        that.changeRoute('/');
                    }, 1000);
                }
            },
            getPostInfo: function () {
                let that = this;
                let postId = that.$route.query.postId;
                let groupId = that.$route.query.groupId;
                let info = {
                    postId: postId,
                    groupId: groupId,
                    accessToken: sha1(postId + groupId + apiKey)
                }
                let url = site + '/api/group_posts/postDetail';
                axios.post(url, info).then(function (response) {

                    that.classDetails1 = response.data.data; //用户列表
                    that.commentList = response.data.data.commentList; //评论列表
                    that.loading = false;
                }).catch(function (error) {
                    console.log(error);
                    that.loading = false;
                });
            },
            //评论
            sendComment: function () {
                let that = this;
                let uid = localStorage.getItem('uid'); //获取当前localstorage内存储的uid
                let uNick = JSON.parse(localStorage.getItem("userInfo"));
                if (uid && uid > 0) {
                    let targetUser = that.classDetails1.user_id;
                    let userId = uid;
                    let body = that.comments;
                    let commentableId = that.postId;
                    if (body == '') {
                        that.msg = "评论内容不能为空";
                        return false;
                    }
                    if (!targetUser || !commentableId) {
                        that.msg = "请重新操作";
                        that.hide();
                        return false;
                    }

                    let info = {
                        target_user: targetUser,
                        user_id: userId,
                        body: body,
                        commentable_id: commentableId,
                        accessToken: sha1(targetUser + userId + body + commentableId + apiKey)
                    }
                    let url = site + '/api/group_posts/postsComments';
                    axios.post(url, info).then(function (response) {
                        if (response.data.status == 1 && response.data.code == 0) {
                            that.msg = "评论成功";
                            that.hide();
                            that.commentList.push({
                                body: body,
                                ctime: '刚刚',
                                nick: uNick.nick,
                            })
                        } else {
                            that.msg = "评论失败";
                            that.hide();
                            return false;
                        }
                    }).catch(function (error) {
                        console.log(error);
                        that.msg = "评论错误";
                        that.hide();
                        return false;
                    });


                } else {
                    that.msg = "请重新登录";
                    setTimeout(function () {
                        that.changeRoute('/');
                    }, 1000);
                }
                this.showEmoji = false;
            },
            selectEmoji(code) {
                if (code.length + this.commentCon.length > 45) {
                    this.commentCon
                } else {
                    this.commentCon += code;
                }
            },
            submit() {
                this.data.push(this.commentCon)
                this.commentCon = ''
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
            shareAction(sb, bh) {
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
                    let str = this.classDetails1.body.substring(0, 26) + '...';
                    msg.href = int + 'index/share/sharePost?' + 'postId=' + this.postId;
                    msg.title = str;
                    msg.content = "来自" + "「" + this.name + "」" + this.classDetails1.nick + "的主题";
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
            shareHref() {
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
                    (e.index > 0) && th.shareAction(shareBts[e.index - 1], true);
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
                    MessageBox({
                        title: '',
                        message: "获取分享列表失败!",
                        showCancelButton: false
                    });
                    // plus.nativeUI.alert("获取分享列表失败!");
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
                    that.myBack()
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
            this.groupId = this.$route.query.groupId;
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
            if (window.plus) {
                this.plusReady();
            }
            let that = this;
            this.myscroll.on('pullingUp', function () { //pullingUp下拉刷新
                if (that.noMore === false) {
                    let postId = that.$route.query.postId; //拿到路由内传的postId
                    that.nowPage = that.nowPage + 1;
                    let url = site + '/api/group_posts/getCommentList';
                    let nowPage = that.nowPage;
                    let info = {
                        postId: postId,
                        nowPage: nowPage,
                        accessToken: sha1(postId + nowPage + apiKey)
                    }
                    axios.post(url, info).then(function (response) {
                        response.data.data.forEach(function (item) {
                            that.commentList.push(item);
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
        computed: {
            commentCon: {
                get() {
                    return this.comments;
                },
                set(v) {
                    this.comments = v;
                }
            },
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
        }

    }
</script>

<style lang="scss">
    @import "../../assets/css/class/classDetails";

    .commentFade-enter-active, .commentFade-leave-active {
        transition: all 0.3s;
    }

    .commentFade-enter, .commentFade-leave-to {
        transform: translateY(10rem);
    }

    .commentFade-enter-to, .commentFade-leave {
        transform: translateY(0rem);
    }

    .commentBg-enter-active, .commentBg-leave-active {
        transition: all 0.1s !important;
    }

    .commentBg-enter, .commentBg-leave-to {
        opacity: 0;
    }


</style>