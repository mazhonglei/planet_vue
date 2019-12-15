<template>
    <transition :name="transitionName">
        <div class="body" id="classIndex">
            <div class="header">
                <div class="immersion">
                            <span class="backImg" @click="myBack()">
                                <img src="@/assets/img/ic_back.png" alt="">
                            </span>
                    <span class="titlefont" style="display: none">{{name}}</span>
                    <span class="hdIcon-lf" @click="changeRoute('/classDetail',{groupId:groupId,from:'classIndex'})">
                        <img src="../../assets/img/ic_action_group_settings.png" alt="" class="img1">
                    </span>
                    <!--<span class="hdIcon-lfw" @click="changeRoute('/classSearch',{groupId:groupId})">
                        <img src="../../assets/img/ic_action_group_search_normal.png" alt="" class="img2">
                    </span>-->
                </div>
            </div>

            <div tabindex="-1" role="dialog" aria-hidden="true" class="pswp" style="position: fixed">
                <div class="pswp__bg" style=""></div>
                <div class="pswp__scroll-wrap">
                    <div class="pswp__container" style="transform: translate3d(-2100px, 0px, 0px);">
                        <div class="pswp__item" style="display: block; transform: translate3d(2100px, 0px, 0px);">
                            <div class="pswp__zoom-wrap"
                                 style="transform: translate3d(257.5px, 487px, 0px) scale(0.24);"><img class="pswp__img"
                                                                                                       src="static/img/active/null.png"
                                                                                                       style="opacity: 1; width: 375px; height: 375px;">
                            </div>
                        </div>
                        <div class="pswp__item" style="transform: translate3d(2520px, 0px, 0px);">
                            <div class="pswp__zoom-wrap" style="transform: translate3d(0px, 146px, 0px) scale(1);"><img
                                    class="pswp__img" src="static/img/active/null.png"
                                    style="opacity: 1; width: 375px; height: 375px;"></div>
                        </div>
                        <div class="pswp__item" style="display: block; transform: translate3d(1680px, 0px, 0px);">
                            <div class="pswp__zoom-wrap" style="transform: translate3d(0px, 146px, 0px) scale(1);"><img
                                    class="pswp__img" src="static/img/active/null.png"
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
                <div>
                    <div class="headMask"></div>
                    <!--头部-->
                    <div class="head"
                         :style="{'background': 'url('+bgImg+') no-repeat center','background-size':'cover'}"></div>
                    <div class="content">
                    </div>

                    <!--评论-->
                    <div class="indexStar">
                        <div class="common1" v-for="(common1,index) in classIndexList1" :key="index">
                            <div class="img"
                                 @click="changeRoute('/userDetail',{groupId:groupId,userId:common1.user_id,from:'classIndex'})">
                                <img :src="common1.avatar | imgPath" alt="">
                            </div>
                            <div class="commonContent">
                                <div class="className"
                                     @click="changeRoute('/userDetail',{groupId:groupId,userId:common1.user_id,from:'classIndex'})">
                                    <span>{{common1.nick}}</span>
                                    <p v-if="common1.user_id == classHeadUid">{{classNa}}</p>
                                </div>
                                <p class="classTime">{{common1.ctime}}</p>
                                <pre><p class="classSpeak"
                                        @click="changeRoute('/classDetails',{postId:common1.id,groupId:groupId,from:'classIndex',name:name})"
                                        v-html="showEmojifir(common1.body.length>55?common1.body.substring(0,55)+'...':common1.body)"></p></pre>
                                <div class="imgs">
                                    <vue-preview :slides="common1.images" @close="handleClose"></vue-preview>

                                </div>
                                <p class="images">
                                    <img src="@/assets/img/classZan.png" alt=""
                                         v-if="(common1.likeUid).indexOf(uid) === -1"
                                         @click="likePost(common1.id,index)">
                                    <img src="@/assets/img/classZan2.png" alt="" v-else
                                         @click="cancelLike(common1.id,index)">
                                    <img src="@/assets/img/classMessage.png" alt=""
                                         @click="show(common1.id,common1.user_id);">
                                    <img src="@/assets/img/classShare2.png" alt=""
                                         @click="shareHref({nick:common1.nick,body:common1.body,postId:common1.id})">
                                </p>
                                <div class="clear"></div>

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
                                        <span @click="changeRoute('/userDetail',{groupId:groupId,userId:item.user_id})">{{item.nick}}</span>：
                                        <span @click="changeRoute('/classDetails',{postId:common1.id,groupId:groupId,from:'classIndex',name:name})"
                                              v-html="showEmojifir(item.body.length>42?item.body.substring(0,42)+'...':item.body)"></span>
                                    </p>
                                </div>
                            </div>
                            <div class="clear"></div>
                        </div>

                    </div>

                    <!--定位-->
                    <div class="position">
                        <div class="circle">
                            <img :src="avatar" alt="">
                        </div>
                        <div class="train">
                            {{name}}
                        </div>
                        <ul class="positionList">
                            <li>
                                <a href="javascript:void(0);"
                                   @click="changeRoute('/sendPost',{groupId:groupId,name:name,from:'classIndex'})">
                                    <div>
                                        <img src="@/assets/img/pen.png" alt="">
                                    </div>
                                    <span>发表</span>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);"
                                   @click="changeRoute('/essences',{groupId:groupId,from:'classIndex',name:name})">
                                    <div class="capIcon">
                                        <img src="@/assets/img/cap.png" alt="">
                                    </div>
                                    <span>精华</span>
                                </a>
                            </li>
                            <div class="line"></div>
                        </ul>
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
            <share-popup v-show="isShare"></share-popup>
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
    import Bscroll from 'better-scroll';
    import $ from 'jquery'
    import axios from "axios"
    import sha1 from 'sha1'
    import {site, apiKey} from '../../assets/js/config/site.js'
    import Toast from '../../components/toast';
    import {MessageBox} from 'mint-ui';
    import {int} from '../../assets/js/config/int'
    /* eslint-disable */
    export default {
        name: "classIndex",
        components: {Toast, vueEmoji},
        data() {
            return {
                transitionName: 'slide-left',
                showEmoji: false,
                classNa: '班长',
                isShow: false,
                imgShow: true,
                classIndexList1: {},
                groupId: '',
                bgImg: require('@/assets/img/bg_login_fragment_header.png'),
                avatar: require('@/assets/img/head_default.png'),
                classHeadUid: 0,
                name: "",
                myscroll: "",
                comments: "",
                commentId: "",
                targetUser: "",
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
                from: ''
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
                    let url = site + '/api/group/getPostList';
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
            this.myscroll.on('scroll', (pos) => {
                let opacity = 0;
                let headHeight = $('.head').outerHeight();
                if (Math.abs(pos.y) <= headHeight) {
                    opacity = Math.abs(pos.y) / headHeight;
                    $('.header .titlefont ').css('display', 'none');
                    $('.backImg img').attr('src', require('@/assets/img/ic_back.png'));
                    $('.hdIcon-lf img').css('left', '0');
                    $('.hdIcon-lfw img').css('left', '0');
                } else {
                    opacity = 1;
                    $('.header .titlefont ').css('display', 'block');
                    $('.backImg img').attr('src', require('@/assets/img/back.png'));
                    $('.hdIcon-lf img').css('left', '-.44rem');
                    $('.hdIcon-lfw img').css('left', '-.44rem');
                }
                $('.header').css('background', 'rgba(241,240,244,' + opacity + ')');

            })

            if (window.plus) {
                this.plusReady();
            }

        },
        created() {
            this.loading = true;
            this.groupId = this.$route.query.groupId;
            this.from = this.$route.query.from;
            this.getClassInfo();

            // this.replaceRoute('/classIndex', {groupId: this.groupId});
            if (this.$route.query.from == 'sendPost' || this.$route.query.from == 'essences' || this.$route.query.from == 'classDetail' || this.$route.query.from == 'classDetails' || this.$route.query.from == 'classIndex') {
                this.transitionName = 'slide-left';
            }
            if (this.$route.query.from == 'myCreate' || this.$route.query.from == 'myJoin' || this.$route.query.from == 'swipe' || this.$route.query.from == 'home' || this.$route.query.from == 'findClass' || this.$route.query.from == 'classSearchList') {
                this.replaceRoute('/classIndex', {groupId: this.groupId});
                this.transitionName = 'slide-right';
            }

        },
        filters: {
            imgPath: function (value) {
                if (value) {
                    return site + value;
                } else {
                    return require('@/assets/img/head_default.png');
                }
            },
            ellipsis(value) {
                if (!value) return '';
                if (value.length > 8) {
                    return value.slice(0, 8) + '...'
                }
                return value
            }
        },
        methods: {
            myBack: function () {
                let query = this.from;
                switch (query) {
                    case "home":
                        this.changeRoute("/home", query);
                        break;
                    case "classInfo":
                        this.changeRoute("/home", query);
                        break;
                    case "sendPost":
                        this.changeRoute("/home", query);
                        break;
                    case "classDetail":
                        this.changeRoute("/home", query);
                        break;
                    case "myCreate":
                        this.changeRoute("/myCreate", query);
                        break;
                    case "myJoin":
                        this.changeRoute("/myJoin", query);
                        break;
                    default:
                        this.backRoute()
                        break;
                }
            },
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
                this.commentCon = "";
            },
            square(v) {
                this.msg = v
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
            getClassInfo: function () {
                let that = this;
                let groupId = this.$route.query.groupId;
                let info = {
                    groupId: groupId,
                    accessToken: sha1(groupId + apiKey)
                }
                let url = site + '/api/group/groupHome';
                axios.post(url, info).then(function (response) {
                    that.bgImg = site + response.data.data.groupInfo.cover_pic;
                    if (response.data.data.groupInfo.avatar) {
                        that.avatar = site + response.data.data.groupInfo.avatar;
                    }
                    that.name = response.data.data.groupInfo.name;
                    that.classHeadUid = response.data.data.groupInfo.user_id;
                    that.classIndexList1 = response.data.data.postList;
                    that.loading = false;

                }).catch(function (error) {
                    console.log(error);
                    that.loading = false;
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
                        if (response.data.status == 1 && response.data.code == 0) {
                            that.msg = "评论成功";
                            that.hide();
                            that.getClassInfo()
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
                console.log(this.commentCon)
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
                    msg.href = int + 'index/share/sharePost?' +'postId=' + list.postId;
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
        beforeRouteLeave(to, from, next) {
            this.myscroll.stop();
            setTimeout(function () {
                next();
            }, 50);
        },
    }
</script>

<style lang="scss">
    @import '../../assets/css/class/classIndex.scss';

    #classIndex {
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
