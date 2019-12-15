<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
    <transition :name="transitionName">
        <div class="body" id="invitation">
            <div class="header">
                <div class="immersion">
                        <span class="backImg" @click="backRoute()">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                    <span class="titlefont">我的邀请</span>
                </div>
            </div>
            <div class="myWallet" ref="wrapper">
                <div>
                    <div class="myWalletCon clear">
                        <p class="in-codetext">我的邀请码
                            <i @click="isShow=!isShow"><img src="@/assets/img/wallet/about.png" alt=""></i>
                        </p>
                        <div class="in-code">{{invitCode}}</div>
                        <div class="copy-code">
                            <button v-clipboard:copy="invitCode"
                                    v-clipboard:success="doClipboard"
                                    v-clipboard:error="" id="alert_little">复制邀请码
                            </button>
                        </div>
                    </div>
                    <div class="walletDate">
                        <div class="walletNum">
                            <span>邀请列表（共邀请{{invitCount}}人）</span>
                        </div>
                        <ul>
                            <li class="bottomLine" v-for="(invit,index) in invitList" :key="index">
                                <div class="in-titImg">
                                    <img :src="invit.avatar | imgPath" alt="">
                                </div>
                                <div class="name clear">
                                    <span class="span_name">{{invit.nick}}</span>
                                    <time class="in-time">{{invit.ctime}}</time>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--遮罩层-->
            <div class="popup">
                <transition name="bg">
                    <div class="aboutCode" v-show="isShow">
                        <h5 class="address">
                            关于邀请码
                            <i class="icon-close" @click="close">
                                <img src="@/assets/img/myInfo/close.png" alt="">
                            </i>
                        </h5>
                        <div class="number">
                            0x713259839068047056705705665
                        </div>
                    </div>
                </transition>
                <transition name="bg">
                    <div class="mask" v-show="isShow" @click="close"></div>
                </transition>
            </div>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>

    </transition>
</template>

<script>
    import axios from "axios";
    import sha1 from 'sha1';
    import {site, apiKey} from '../../assets/js/config/site.js';
    import Bscroll from 'better-scroll';
    import Toast from '../../components/toast';

    export default {
        name: "invitation",
        data() {
            return {
                transitionName: 'slide-left',
                isShow: false,
                invitCode: '',
                invitCount: 0,
                invitList: [],
                nowPage: 0,
                noMore: false,
                msg: "",
            }
        },
        created() {
            if (this.$route.query.from == 'myInfo') {
                this.transitionName = 'slide-right';
            }
            this.replaceRoute('/invitation')
            let uInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.invitCode = uInfo.invit_code;
            this.getInvit();
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
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
        },
        components: {Toast},
        methods: {
            close() {
                this.isShow = false
            },
            //提示信息
            square(v) {
                this.msg = v
            },
            getInvit() {
                let invit = this.invitCode;
                let url = site + '/api/users/myInvitList';
                let that = this;
                let info = {
                    invit: invit,
                    accessToken: sha1(invit + apiKey)
                }
                axios.post(url, info).then(function (response) {
                    if (response.data.status == 1) {
                        console.log(response);
                        that.invitCount = response.data.data.count;
                        that.invitList = response.data.data.list;
                    } else {
                        console.log(response);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            doClipboard: function () {
                let that = this;
                that.msg = "复制成功"
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
            this.myscroll.on('pullingUp', function () { //pullingUp下拉刷新
                console.log(that.nowPage);
                console.log(that.noMore);
                if (that.noMore === false) {
                    let invit = that.invitCode;
                    that.nowPage = that.nowPage + 1;
                    let url = site + '/api/users/myInvitList';
                    let nowPage = that.nowPage;
                    let info = {
                        invit: invit,
                        nowPage: nowPage,
                        accessToken: sha1(invit + nowPage + apiKey)
                    }
                    axios.post(url, info).then(function (response) {
                        console.log(response)
                        response.data.data.list.forEach(function (item) {
                            that.list.push(item);
                        })
                        console.log(response)
                        if (response.data.data.list.length < 7) {
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
    @import "../../assets/css/system/invitation";

    #invitation {
        .fade-enter-active, .fade-leave-active {
            transition: all .5s;
        }

        .fade-enter, .fade-leave-to {
            transform: translateY(150%);
        }

        .bg-enter-active, .bg-leave-active {
            transition: all .5s;
        }

        .bg-enter, .bg-leave-to {
            opacity: 0;
        }
    }
</style>