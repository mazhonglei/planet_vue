<template>
    <transition :name="transitionName">
        <div class="body" id="classDetail">
            <div class="new">
                <!--头部-->
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/classIndex',{groupId:groupId,from:'classDetail'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                        <span class="titlefont">班级详情</span>
                    </div>
                </div>
                <div class="classDetail">
                    <div class="area">
                        <div class="abc">{{groupInfo.name}}</div>
                        <div class="area_share" @click="shareHref()">
                            <img src="../../assets/img/class_share.png" alt="">
                            <span>分享班级</span>
                        </div>
                    </div>
                    <ul class="list1">
                        <!--<li class="bottomLine">
                            <span class="class_intro">班级名片</span>
                            <a href="#">
                                <span>ElonMusic</span>
                                <img src="@/assets/img/ic_common_entrance_arrow.png" alt="">
                            </a>
                        </li>-->
                        <li class="bottomLine"
                            @click="changeRoute('/editProfile',{groupId:groupId,from:'classDetail'})">
                            <span class="class_intro">班级资料</span>
                            <a href="#">
                                <span>{{groupInfo.name}}</span>
                                <img src="@/assets/img/ic_common_entrance_arrow.png" alt="">
                            </a>

                        </li>
                        <li class="bottomLine"
                            @click="changeRoute('/classMember',{groupId:groupId,from:'classDetail'})">
                            <span class="class_intro">班级成员</span>
                            <a href="#">
                                <span>{{groupInfo.users_count}}+</span>
                                <img src="@/assets/img/ic_common_entrance_arrow.png" alt="">
                            </a>
                        </li>
                        <li>
                            <span class="class_intro">班级权限</span>
                            <a href="javascript:void(0)">
                                <span style="padding-right: 0.4rem">{{groupInfo.money}} USDT</span>
                            </a>
                        </li>

                    </ul>
                    <div class="class_login" @click="quitClass">退出班级</div>
                </div>
            </div>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>
    </transition>
</template>

<script>
    import axios from "axios"
    import Toast from '../../components/toast';
    import sha1 from 'sha1'
    import {site, apiKey} from '../../assets/js/config/site.js'
    import {MessageBox} from 'mint-ui';
    import {int} from '../../assets/js/config/int'
    export default {
        name: "classDetail",
        components: {Toast},
        data() {
            return {
                transitionName: 'slide-left',
                groupId: '',
                groupInfo: {
                    name: "",
                    id: "",
                    users_count: "",
                    nick: "",
                    summary: ""
                },
                msg: '',
                isShare: false,
                shares: {},
                Intent: '',
                File: '',
                Uri: '',
                main: '',
            }
        },
        created() {
            this.getClassInfo();
            this.groupId = this.$route.query.groupId;
            if (this.$route.query.from == 'classIndex') {
                this.transitionName = 'slide-right';
            }

            this.replaceRoute('/classDetail', {groupId: this.groupId})
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
                    that.changeRoute('/classIndex',{groupId:that.groupId,from:'classDetail'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };

            if (window.plus) {
                this.plusReady();
            }
        },
        computed: {
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
        },
        methods: {
            getClassInfo: function () {
                let that = this;
                let groupId = this.$route.query.groupId;
                let info = {
                    groupId: groupId,
                    accessToken: sha1(groupId + apiKey)
                }
                let url = site + '/api/group/groupOnlyInfo';
                axios.post(url, info).then(function (response) {
                    that.groupInfo = response.data.data;
                    // console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            },
            quitClass: function () {
                let that = this;
                this.$messagebox.confirm(
                    '确定退出班级？',
                    '提示',
                    {
                        cancelButtonClass: 'mint-msgbox-confirm',
                        confirmButtonClass: 'mint-msgbox-cancel cancel_btn',
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',

                    }
                ).then(action => {
                    if (action == 'confirm') {
                        let groupId = this.$route.query.groupId;
                        let uid = localStorage.getItem('uid');
                        let info = {
                            userId: uid,
                            groupId: groupId,
                            accessToken: sha1(uid + groupId + apiKey)
                        }
                        let url = site + '/api/group/quitGroup';
                        axios.post(url, info).then(function (response) {
                            if (response.data.status == 1) {
                                that.msg = "退出班级成功";
                                setTimeout(function () {
                                    that.changeRoute('/home');
                                }, 1000);
                            } else {
                                if (response.data.code == 4) {
                                    that.msg = "班长不能退出班级";
                                } else {
                                    that.msg = "退出班级失败";
                                }
                            }
                        }).catch(function (error) {
                            that.msg = "退出班级失败";
                            console.log(error);
                        });
                    }
                }).catch(err => {
                    if (err == 'cancel') {
                        return false;
                    }
                });
            },
            square(v) {
                this.msg = v
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
                    msg.href = int + 'index/share/shareClass?'+'groupId=' + this.groupInfo.id;
                    msg.title = this.groupInfo.nick + "邀请你加入班级：" + this.groupInfo.name;
                    msg.content = this.groupInfo.summary;
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
        }
    }
</script>

<style lang="scss">
    @import "../../assets/css/class/classDetail";

</style>
