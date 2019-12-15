<template>
    <transition :name="transitionName">
        <div class="body" id="classMore">
            <!--头部-->
            <div class="header">
                <div class="immersion">
                        <span class="backImg" @click="changeRoute('/classIndex',{groupId:groupId,from:'classMore'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                    <span class="titlefont">更多</span>
                </div>
            </div>
            <div class="new" ref="wrapper">

                <div class="moreContent" >
                    <img src="@/assets/img/starmore1.jpg" alt="" class="head">
                        <!--内容-->
                        <div class="contents">
                            <div class="img1">
                                <div class="image1">
                                    <img src="@/assets/img/ic_action_image.png" alt="" class="headImage">
                                </div>
                            <p class="name">
                            颜世杰
                        </p>
                            </div>
                            <div class="img2">
                            <div class="image2">
                                <img src="@/assets/img/ic_action_image.png" alt="" class="headImage">
                            </div>
                            <div class="image3">
                                <img src="@/assets/img/ic_action_image.png" alt="" class="headImage">
                            </div>
                            </div>
                            <div class="img4">
                            <div class="image4">
                                <img src="@/assets/img/ic_action_image.png" alt="" class="headImage">
                            </div>
                            <div class="image5">
                                <img src="@/assets/img/ic_action_image.png" alt="" class="headImage">
                            </div>
                            </div>
                            <div class="img6">
                            <div class="image6">
                                <img src="@/assets/img/ic_action_image.png" alt="" class="headImage">
                            </div>
                            <div class="image7">
                                <img src="@/assets/img/ic_action_image.png" alt="" class="headImage">
                            </div>
                            </div>
                            <div class="img8">
                            <div class="image8">
                                <img src="@/assets/img/ic_action_image.png" alt="" class="headImage">
                            </div>
                            <div class="image9">
                                <img src="@/assets/img/ic_action_image.png" alt="" class="headImage">
                            </div>
                            </div>
                            <div class="img10">
                            <div class="image10">
                                <img src="@/assets/img/ic_action_image.png" alt="" class="headImage">
                            </div>
                            <div class="image11">
                                <img src="@/assets/img/ic_action_image.png" alt="" class="headImage">
                            </div>
                            </div>
                            <div class="img12">
                            <div class="image12">
                                <img src="@/assets/img/ic_action_image.png" alt="" class="headImage">
                            </div>
                            </div>
                            <p class="answer">
                                Vue.js回答
                            </p>
                            <p class="id">
                                ID:1760241
                            </p>
                        </div>
                    <div class="moreSpeak">
                            <p class="time">
                                2018年12月5日加入星球
                            </p>
                            <p class="join">
                                加入排名272
                            </p>
                            <p class="share">
                                <span>分享班级</span>
                                <img src="@/assets/img/starmore2.jpg" alt="">
                            </p>
                    </div>
                        <div class="message">
                            <ul class="list1">
                                <li >
                                    <span>我的名片</span>
                                    <a href="#">:-D&nbsp;<img src="@/assets/img/ic_common_entrance_arrow.png"
                                                              alt=""></a>
                                </li>
                                <li >
                                    <span>编辑资料</span>
                                    <a href="#">Vue.js&nbsp;问答&nbsp;<img
                                            src="@/assets/img/ic_common_entrance_arrow.png" alt=""></a>
                                </li>
                                <li >
                                    <span>班级成员</span>
                                    <a href="#">1&nbsp;<img src="@/assets/img/ic_common_entrance_arrow.png" alt=""></a>
                                </li>
                                <li >
                                    <span>班级管理</span>
                                    <a href="#"><img src="@/assets/img/ic_common_entrance_arrow.png" alt=""></a>
                                </li>
                                <li>
                                    <span>标签管理</span>
                                    <a href="#"><img src="@/assets/img/ic_common_entrance_arrow.png" alt=""></a>
                                </li>
                            </ul>
                            <ul class="list2">
                                <li>
                                    <span>邀请嘉宾</span>
                                    <a href="#"><img src="@/assets/img/ic_common_entrance_arrow.png" alt=""></a>
                                </li>

                            </ul>
                            <div class="update">
                                <span>动态内显示主体更新</span>
                                <div class="switch-container">
                                    <mt-switch v-model="value"></mt-switch>
                                </div>
                            </div>
                            <p class="close">
                                关闭后,只有@你的消息才显示在动态内
                            </p>
                            <p class="login">退出登录</p>
                        </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Bscroll from 'better-scroll'

    export default {
        name: "classMore",
        data(){
            return {
                value:false,
              transitionName : 'slide-right',
                groupId:''

            }
        },
        created(){
            if(this.$route.query.from == 'editProfile' || this.$route.query.from == 'classMember'|| this.$route.query.from == 'classGovern'){
                this.transitionName = 'slide-left';
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
                    that.changeRoute('/classIndex',{groupId:that.groupId,from:'classMore'});
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
                        stop: 20
                    }
                });
            } else {
                this.myscroll.refresh();
            }
        },
    }
</script>

<style lang="scss">
    @import "../../assets/css/class/classMore.scss";

</style>