<template>
    <transition :name="transitionName">
        <div class="body" id="classInfo">
            <div class="header infoHeader">
                <div class="immersion">
                            <span class="backImg" @click="backRoute()">
                                <img src="@/assets/img/ic_back.png" alt="">
                            </span>
                    <span class="titleFont" style="display: none">{{name}}</span>
                    <span class="next" @click="shareHref()">
                                <img src="@/assets/img/share.png" alt="" class="classIcon">
                    </span>
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
                <div class="new1">
                    <div class="headMask"></div>
                    <!--头部-->
                    <div class="head" :style="{'background': 'url('+bgImg+') no-repeat center'}"></div>
                    <div class="headCon">
                        <div class="view">
                            <img :src="avatar" alt="">
                        </div>
                        <p class="circle">
                            {{nick}}
                        </p>
                        <p class="id">
                            ID:{{groupNo}}
                        </p>
                        <p class="create">
                            创建{{cday}}天，班长：{{nick}} <!--今天活跃过-->
                        </p>
                    </div>
                    <div class="classStar mainClassStar">

                        <div class="content3">
                            <ul>
                                <li>
                                    <a href="#">
                                        <div>
                                            <img src="@/assets/img/pen.png" alt="">
                                        </div>
                                        <span>主题{{postCount}}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <div class="capIcon">
                                            <img src="@/assets/img/cap.png" alt="">
                                        </div>
                                        <span>精华{{essencesCount}}</span>
                                    </a>
                                </li>

                            </ul>
                            <div class="line"></div>
                        </div>
                    </div>
                    <div class="classStar">
                        <div class="classContent">
                            <div class="intro">
                                <label>班级介绍</label>
                                <div class="bgcolor"></div>
                            </div>
                            <p class="study">
                                {{summary}}
                            </p>
                            <div class="free">
                                <span>学费须知</span>
                                <div class="bgcolor"></div>
                            </div>
                            <div class="data">
                                <img src="@/assets/img/usdt.png" alt="">
                                <span>USDT</span>
                                <label style="color: #D94237;">{{money}}</label>
                            </div>
                            <div class="pay">
                                <p>1.付费后，你可以使用当前的付款账户参与互动</p>
                                <!--<p>有效期：<span style="color: #D94237; ;">2018/12/10至2019/12/30</span></p>-->
                                <p>虚拟商品原则上不予退款，如有争议，请联系客服,</p>
                                <p>会耐心为您解答</p>
                            </div>
                        </div>
                    </div>

                    <!--部分主题预览-->
                    <div class="classStar">
                        <div class="theme">
                            部分主题预览
                        </div>
                    </div>
                    <!--评论-->
                    <div class="classStar">
                        <div class="comment1" v-for="(comment1,index) in classInfoList1" :key="index">
                            <div class="img">
                                <img :src="comment1.avatar | imgPath" alt="">
                            </div>
                            <div class="comment1Content">
                                <div class="className"><span>{{comment1.nick}}</span>
                                    <p v-if="comment1.user_id == classHeadUid">班长</p>
                                </div>
                                <p class="classTime">{{comment1.ctime}}</p>
                                <pre><p class="classSpeak" v-html="showEmojifir(comment1.body.length>55?comment1.body.substring(0,55)+'...':comment1.body)"></p></pre>

                                <div class="imgs">
                                    <vue-preview :slides="[]" @close="handleClose"></vue-preview>
                                </div>

                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>

                    </div>

                </div>
            </div>
            <!--底部-->
            <div class="joinClass" @click="indicate">
                <a href="javascript:void(0)">
                    <span>加入班级</span>
                </a>
            </div>

            <!--成功支付遮罩层-->
            <transition name="bg">
                <div class="mask" v-show="isShow"></div>
            </transition>
            <transition name="fade">
                <div class="maskContents" v-show="isShow">
                    <img src="@/assets/img/success.jpg" alt="">
                    <p>您已成功支付</p>
                    <div class="sure" @click="changeRoute('/classIndex',{groupId:groupId,from:'classInfo'})">
                        确定
                    </div>
                </div>
            </transition>
            <!--确定遮罩层-->
            <transition name="bg">
                <div class="sureMask" v-show="makeSure" @click="makeSure = !makeSure"></div>
            </transition>
            <transition name="fade">
                <div class="sureMaskContent" v-show="makeSure">
                    <div class="contentShare">
                        输入密码
                        <i class="iconfont icon-chahao1" @click="makeSure = !makeSure"></i>
                    </div>
                    <div class="dataBox">
                        <div class="data" :class="dataActive==1?'data_active':''" @click="dataActive=1">
                            <div class="clear">
                                <img src="@/assets/img/usdt.png" alt="">
                                <span>USDT</span>
                                <label style="color: #D94237;">{{money}}</label>
                                <img src="@/assets/img/true_active.png" v-show="dataActive==1" class="data_img" alt="">
                            </div>
                        </div>
                        <div class="data" :class="dataActive==2?'data_active':''" @click="dataActive=2">
                            <div class="clear data-rt">
                                <img src="@/assets/img/vns.png" alt="">
                                <span>VNS</span>
                                <label style="color: #D94237;">{{vnsMoney | roundOff(2)}}</label>
                                <img src="@/assets/img/true_active.png" v-show="dataActive==2" class="data_img" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="star">
                        <input type="password" v-model="payPwd" @keyup="getInputValue" maxlength="15"
                               placeholder="请输入钱包密码">
                        <div class="pay" :class="isOk==true?'pay_active':''" @click="payClass">
                            确定支付
                        </div>
                    </div>
                </div>
            </transition>

            <Loading v-show="loading"></Loading>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
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
    import Bscroll from 'better-scroll'
    import Toast from '../../components/toast';
    import $ from 'jquery'
    import axios from "axios"
    import sha1 from 'sha1'
    import {site, apiKey} from '../../assets/js/config/site.js'
    import {MessageBox} from 'mint-ui';
    import {int} from '../../assets/js/config/int'
    /* eslint-disable */

    export default {
        name: "classInfo",
        components: {Toast},
        data() {
            return {
                transitionName: 'slide-left',
                isShow: false,
                isHide: false,
                makeSure: false,
                classInfoList1: [],
                groupId: '',
                groupNo: '',
                bgImg: '',
                avatar: require('@/assets/img/head_default.png'),
                name: "",
                money: "",
                cday: "",
                vnsMoney: "",
                nick: "",
                classHeadUid: 0,
                postCount: "",
                essencesCount: 0,
                summary: "",
                myscroll: "",
                payPassword: "",
                regxpwd: /^[0-9A-Za-z_@]{6,24}/,
                msg: "",
                isOk: false,
                loading: true,
                isShare: false,
                dataActive: 1,
                shares: {},
                Intent: '',
                File: '',
                Uri: '',
                main: '',
            }
        },
        computed: {
            payPwd: {
                get() {
                    return this.payPassword;
                },
                set(v) {
                    this.payPassword = v;
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
        created() {
            this.loading = true;
            this.groupId = this.$route.query.groupId;
            this.getClassInfo();
            if (this.$route.query.from == 'classSearchList' || this.$route.query.from == 'home'|| this.$route.query.from == 'swipe') {
                this.transitionName = 'slide-right';
            }
            this.replaceRoute('/classInfo', {groupId: this.groupId});
        },
        methods: {
            getInputValue() {
                //当input框输入长度超过6位字符就改变button颜色
                this.payPwd.length >= 6 ? this.isOk = true : this.isOk = false;
            },
            isTrue() {
                this.isShare = true;
            },
            handleClose() {
                console.log('close event')
            },
            close() {
                this.isHide = false;
            },
            indicate() {
                this.makeSure = true;
            },
            isNext() {
                this.isShow = true;
                this.makeSure = false;
            },
            payClass: function () {
                let that = this;
                let groupId = that.groupId;
                let uid = localStorage.getItem('uid');
                let tradePwd = that.payPassword;
                let currencyId = that.dataActive;
                if (tradePwd == '' || !this.regxpwd.test(tradePwd)) {
                    this.msg = "支付密码格式不正确";
                    return false;
                }
                let info = {
                    userId: uid,
                    groupId: groupId,
                    tradePwd: tradePwd,
                    currencyId: currencyId,
                    accessToken: sha1(uid + groupId + tradePwd + currencyId + apiKey)
                }
                let url = site + '/api/group/addGroup';
                axios.post(url, info).then(function (response) {
                    console.log(response.data);
                    if (response.data.status == 1) {
                        that.isShow = true;
                        that.makeSure = false;
                    } else {
                        if (response.data.code == 5) {
                            that.msg = "账户余额不足";
                            return false;
                        } else if (response.data.code == 6) {
                            that.msg = "支付密码不正确";
                            return false;
                        } else {
                            that.msg = "加入班级错误";
                            return false;
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getClassInfo: function () {
                let that = this;
                let groupId = this.$route.query.groupId;
                let info = {
                    groupId: groupId,
                    accessToken: sha1(groupId + apiKey)
                }
                let url = site + '/api/group/groupInfo';
                axios.post(url, info).then(function (response) {
                    if (response.data.data.groupInfo.avatar) {
                        that.avatar = site + response.data.data.groupInfo.avatar;
                    }
                    that.bgImg = site + response.data.data.groupInfo.cover_pic;
                    that.groupNo = response.data.data.groupInfo.group_no;
                    that.nick = response.data.data.groupInfo.nick;
                    that.name = response.data.data.groupInfo.name;
                    that.money = response.data.data.groupInfo.money;
                    that.cday = response.data.data.groupInfo.cday;
                    that.postCount = response.data.data.groupInfo.posts_count;
                    that.summary = response.data.data.groupInfo.summary;
                    that.classHeadUid = response.data.data.groupInfo.user_id;
                    that.essencesCount = response.data.data.groupInfo.essences;
                    that.classInfoList1 = response.data.data.postList;
                    that.vnsMoney = that.money / response.data.data.groupInfo.vnsPrice;
                    /*console.log(response);*/
                    that.loading = false;
                }).catch(function (error) {
                    console.log(error);
                    that.loading = false;
                });
            },
            square(v) {
                this.msg = v
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
                    msg.href = int + 'index/share/shareClass?'+'groupId=' + this.groupId;
                    msg.title = this.nick + "邀请你加入班级：" + this.name;
                    msg.content = this.nick + "创建";
                    msg.thumbs = ["_www/logo.png"];
                    msg.pictures = [ "_www/logo.png"];
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
                    },
                });
            } else {
                this.myscroll.refresh();
            };

            this.myscroll.on('scroll', (pos) => {
                // console.log(pos);
                let opacity = 0;
                let headHeight = $('.head').outerHeight();
                if (Math.abs(pos.y) <= headHeight) {
                    opacity = Math.abs(pos.y) / headHeight;
                    $('.header .titleFont ').css('display', 'none');
                    $('.backImg img').css('left', '0')
                    $('.next img').css('left', '0')
                } else {
                    opacity = 1;
                    $('.header .titleFont ').css({'display': 'block', "color": '#411e60'});
                    $('.next img').css('left', '-.44rem')
                    $('.backImg img').css('left', '-.44rem')
                }
                $('.infoHeader').css('background', 'rgba(241,240,244,' + opacity + ')');
            })
            if (window.plus) {
                this.plusReady();
            }
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
    @import '../../assets/css/class/classInfo.scss';


    .fade-enter-active, .fade-leave-active {
        transition: all 0.4s;
    }

    .fade-enter, .fade-leave-to {
        transform: translateY(10rem);
    }

    .fade-enter-to, .fade-leave {
        transform: translateY(0rem);
    }

    .bg-enter-active, .bg-leave-active {
        transition: all 0.8s;
    }

    .bg-enter, .bg-leave-to {
        opacity: 0;
    }


</style>
