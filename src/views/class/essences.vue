<template>
    <transition :name="transitionName">
        <div class="body" id="essences">
            <!--头部-->
            <div class="header">
                <div class="immersion">
                       <span class="backImg" @click="backRoute()">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                    <span class="titlefont">精华</span>
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
                <!--评论-->
                <div class="star">
                    <div class="common1 clear" v-for="(common1,index) in classIndexList1" :key="index">
                        <div class="img"
                             @click="changeRoute('/userDetail',{groupId:groupId,userId:common1.user_id,from:'classIndex'})">
                            <img :src="common1.avatar | imgPath" alt="">
                        </div>
                        <div class="commonContent">
                            <p class="className"
                               @click="changeRoute('/userDetail',{groupId:groupId,userId:common1.user_id,from:'classIndex'})">
                                {{common1.nick}}</p>
                            <p class="classTime">{{common1.ctime}}</p>
                            <pre><p class="classSpeak"
                                    v-html="showEmojifir(common1.body.length>58?common1.body.substring(0,58)+'...':common1.body)"
                                    @click="changeRoute('/classDetails',{postId:common1.id,groupId:groupId,from:'essences',name:name})"></p></pre>
                            <div class="imgs">

                                <vue-preview :slides="common1.images" @close="handleClose"></vue-preview>

                            </div>
                            <p class="images">
                                <img src="@/assets/img/classZan.png" alt=""
                                     v-if="(common1.likeUid).indexOf(uid) === -1" @click="likePost(common1.id,index)">
                                <img src="@/assets/img/classZan2.png" alt="" v-else
                                     @click="cancelLike(common1.id,index)">
                                <img src="@/assets/img/classMessage.png" alt=""
                                     @click="show(common1.id,common1.user_id);">
                                <img src="@/assets/img/classShare2.png" alt=""
                                     @click="shareHref({nick:common1.nick,body:common1.body,postId:common1.id})">
                            </p>
                            <div class="answer" v-if="common1.likeUid">
                                <div>
                                    <img src="@/assets/img/classZan.png" alt="">
                                </div>
                                <ul>
                                    <li v-for="(person,index) in common1.likeList " :key="index">
                                        {{person.nick}}&nbsp;
                                    </li>
                                </ul>

                            </div>
                            <div class="communicate">
                                <p v-for="(item,index) in common1.commentList" :key="index">
                                    <span>{{item.nick}}</span>：
                                    <span v-html="showEmojifir(item.body)"
                                          @click="changeRoute('/classDetails',{postId:common1.id,groupId:groupId,from:'classIndex',name:name})">{{item.body}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--评论遮罩层-->
                <div>
                    <transition name="commentBg">
                        <div class="classIndexMask" v-show="isShow" @click="hide();"></div>
                    </transition>
                    <transition name="commentFade">
                        <div class="classIndexContent" v-show="isShow">
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
                            <div class="star clear pdnone">
                                <div class="common3 clear">
                                    <div class="f_left" @click="showEmoji = !showEmoji">
                                        <img src="../../assets/img/ic_face_gray.png" alt="">
                                    </div>
                                    <button @click="sendComment()">发送</button>
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
                <div v-show="classIndexList1.length == 0 && !loading"
                     style="width: 100%;text-align: center;padding-top: 15px;font-size: 14px;position: absolute;top: 50%;transform: translateY(-50%)">
                    暂无精华内容...
                </div>
            </div>
            <Loading v-show="loading"></Loading>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>
    </transition>
</template>

<script>
    import VuePreview from 'vue-preview';
    import Vue from 'vue';
    import vueEmoji from '../../components/emoji.vue'

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
    import Toast from '../../components/toast';
    import axios from "axios";
    import Bscroll from 'better-scroll';
    import sha1 from 'sha1';
    import {site, apiKey} from '../../assets/js/config/site.js';
    import {MessageBox} from 'mint-ui';
    import {int} from '../../assets/js/config/int'

    export default {
        name: "essences",
        components: {Toast, vueEmoji},
        data() {
            return {
                transitionName: 'slide-left',
                isShow: false,
                imgShow: true,
                groupId: "",
                uid: "",
                msg: "",
                myscroll: '',
                classIndexList1: [],
                commentId: "",
                targetUser: "",
                comments: "",
                noMore: false,
                nowPage: 0,
                isShare: false,
                loading: true,
                showEmoji: false,
                name: "",
                shares: {},
                Intent: '',
                File: '',
                Uri: '',
                main: ''
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
            this.groupId = this.$route.query.groupId;
            this.getEssences();
            let that = this;
            this.myscroll.on('pullingUp', function () { //pullingUp下拉刷新
                if (that.noMore === false) {
                    let groupId = that.$route.query.groupId;
                    that.nowPage = that.nowPage + 1;
                    let url = site + '/api/group/groupEssences';
                    let nowPage = that.nowPage;
                    let info = {
                        groupId: groupId,
                        nowPage: nowPage,
                        accessToken: sha1(groupId + nowPage + apiKey)
                    }
                    axios.post(url, info).then(function (response) {
                        response.data.data.forEach(function (item) {
                            that.classIndexList1.push(item);
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
            if (window.plus) {
                this.plusReady();
            }
        },
        methods: {

            handleClose() {
                console.log('close event')
            },
            show(commentId, targetUser) {
                this.commentId = commentId;
                this.targetUser = targetUser;
                this.isShow = !this.isShow;
                console.log(1)
            },
            hide() {
                this.isShow = !this.isShow;
                this.showEmoji = false;
                this.commentCon ="";
            },
            //提示信息
            square(v) {
                this.msg = v
            },
            selectEmoji(code) {
                if (code.length + this.commentCon.length > 45) {
                    this.commentCon
                } else {
                    this.commentCon += code;
                }
            },
            likePost: function (postId, index) {
                let that = this;
                let uid = localStorage.getItem('uid');
                let user = JSON.parse(localStorage.getItem('userInfo'));
                let zindex = index;
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
                            that.classIndexList1[zindex].likeList.push(uinfo);
                            that.classIndexList1[zindex].likeUid += ',' + uid;
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
            cancelLike: function (postId, index) {
                let that = this;
                let uid = localStorage.getItem('uid');
                let zindex = index;
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
                            that.classIndexList1[zindex].likeList.forEach(function (item, indexs) {
                                if (item.user_id == uid) {
                                    that.classIndexList1[zindex].likeList.splice(indexs, 1);
                                }
                            });
                            that.classIndexList1[zindex].likeUid = that.classIndexList1[zindex].likeUid.replace("," + uid, "");
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
            //获取精华帖
            getEssences: function () {
                let that = this;
                let groupId = that.groupId;
                let info = {
                    groupId: groupId,
                    accessToken: sha1(groupId + apiKey)
                };
                let url = site + '/api/group/groupEssences';
                axios.post(url, info).then(function (response) {
                    console.log(response);
                    if (response.data.status == 1 && response.data.code == 0) {
                        that.classIndexList1 = response.data.data;
                    } else {
                        that.classIndexList1 = [];
                    }
                    that.loading = false;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            sendComment: function () {
                let that = this;
                let uid = localStorage.getItem('uid');
                if (uid && uid > 0) {
                    let targetUser = that.targetUser;
                    let userId = uid;
                    let body = that.comments;
                    let commentableId = that.commentId;
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
                        console.log(response);
                        if (response.data.status == 1 && response.data.code == 0) {
                            that.msg = "评论成功";
                            that.hide();
                            that.getEssences()
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
                    msg.content = "来自" + "「" + this.name + "」" + list.nick + "的主题";
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
                var list = list
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
            this.name = this.$route.query.name;
            this.groupId = this.$route.query.groupId;
            if (this.$route.query.from == 'classIndex') {
                this.replaceRoute('/essences', {groupId: this.groupId})
                this.transitionName = 'slide-right';
            }
            this.groupId = this.$route.query.groupId;
            this.replaceRoute('/essences', {groupId: this.groupId})
        },
    }
</script>

<style lang="scss">
    @import '../../assets/css/class/essences';

    #essences {
        .pdnone {
            padding: 0;
        }

        .common3.clear {
            padding: 0 .25rem;
        }
    }

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
