<template>
    <transition :name="transitionName">
        <div class="body" id="message">
            <div class="new">
                <!--头部-->
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/myInfo',{'from':'message'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                        <span class="titlefont"> 消息中心</span>
                    </div>
                </div>
                <!--内容-->
                <div class="content">
                    <ul class="msgList">
                        <li class="news clear bottomLine" @click="changeRoute('/messageList',{from:'message'})">
                            <div class="commentPo">
                            <img src="@/assets/img/messageComment.png" alt="">
                            </div>
                            <div class="newContent">
                                <p>
                                    <span>评论</span>
                                    <label>{{messageInfo.ctime}}</label>
                                </p>
                                <div class="clear"></div>
                                <div class="common">
                                    {{messageInfo.from_nick}}评论了你的动态
                                </div>
                            </div>
                            <div class="clear"></div>
                        </li>
                        <!--<li class="news clear bottomLine" @click="changeRoute('/messageList')">
                            <div class="messagePo">
                            <img src="@/assets/img/information.png" alt="">
                            </div>
                            <div class="newContent">
                                <p>
                                    <span>系统消息</span>
                                    <label>2017年12月10日</label>
                                </p>
                                <div class="clear"></div>
                                <div class="common">
                                    你修改的资料已成功更新
                                </div>
                            </div>
                        </li>-->
                    </ul>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import axios from "axios"
    import sha1 from 'sha1'
    import {site, apiKey} from '../../assets/js/config/site.js'
    export default {
        name: "message",
        data() {
            return {
                transitionName: 'slide-right',
                messageInfo: {ctime:'',from_nick:''}
            }
        },
    mounted(){
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
                that.changeRoute('/myInfo',{'from':'message'})
                setTimeout(function () {//1s中后清除
                    first = null;
                }, 1000);
            }
        };
    },
        created() {
            if (this.$route.query.from == 'messageList') {
                this.transitionName = 'slide-left';
            }
            this.getLastMsg();
        },
        methods: {
            //获取最后一条评论
            getLastMsg: function () {
                let that = this;
                let uid = localStorage.getItem('uid'); //获取当前localstorage内存储的uid
                if (uid && uid > 0) {
                    let userId = uid;
                    let info = {
                        userId: userId,
                        accessToken: sha1(userId + apiKey)
                    }
                    let url = site + '/api/msg/getLastComment';
                    axios.post(url, info).then(function (response) {
                        console.log(response);
                        if(response.data.data.length > 0){
                            that.messageInfo = response.data.data[0];
                        }
                        that.loading = false
                    }).catch(function (error) {
                        console.log(error);
                        that.loading = false
                    });
                } else {
                    that.msg = "请重新登录";
                    setTimeout(function () {
                        that.changeRoute('/');
                    }, 1000);
                }
            }
        },
    }
</script>

<style lang="scss">
    @import "../../assets/css/system/message";


</style>
