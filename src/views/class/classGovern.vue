<template>
    <transition :name="transitionName">
    <div class="body" id="classGovern">
        <!--头部-->
        <div class="header">
            <div class="immersion">
                        <span class="backImg" @click="backRoute()">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                <span class="titlefont">班级管理</span>
            </div>
        </div>
        <div class="new" ref="wrapper">
        <div class="govern">
            <ul class="list1">

                <li>
                    <span>成员加入方式</span>
                    <a href="javascript:void(0)">付费&nbsp;<img src="@/assets/img/ic_common_entrance_arrow.png" alt=""></a>
                </li>
                <li >
                    <span>成员加入自动通知</span>
                    <a href="javascript:void(0)"><img src="@/assets/img/ic_common_entrance_arrow.png" alt=""></a>
                </li>

            </ul>
            <div class="update">
                <span>允许星球外用户搜索到星球和内容</span>
                <div class="switch-container">
                    <mt-switch v-model="value"></mt-switch>
                </div>
            </div>
            <p class="search">
               开启后,可被搜索、推荐预览部分主题
            </p>
            <ul class="list2">
                <li>
                    <span>设置发表权限</span>
                    <a href="javascript:void(0)"><img src="@/assets/img/ic_common_entrance_arrow.png" alt=""></a>
                </li>

            </ul>
            <div class="update">
                <span>允许分享主题</span>
                <div class="switch-container">
                    <mt-switch v-model="isValue"></mt-switch>
                </div>
            </div>
            <p class="share">
                开启后，可以分享到微信、朋友圈，生成长图
            </p>
            <div class="update">
                <span>允许一元查看主题</span>
                <div class="switch-container">
                    <mt-switch v-model="show"></mt-switch>
                </div>
            </div>
            <p class="close">
                开启后，非星球内用户在微信内支付一元可查看单个主题，发表者可获得收益
            </p>
            <div class="update">
                <span>开放星球成员列表</span>
                <div class="switch-container">
                    <mt-switch v-model="isVal"></mt-switch>
                </div>
            </div>
            <p class="share">
                关闭后，普通成员无法查看星球内成员列表
            </p>
            <div class="update">
                <span>启用成员编号</span>
                <div class="switch-container">
                    <mt-switch v-model="val"></mt-switch>
                </div>
            </div>
            <p class="share">
               启用后，成员持有唯一的编号&nbsp;&nbsp;&nbsp;<span style="color: #7A919E;">查看示例</span>
            </p>
            <div class="update">
                <span>允许成员私聊</span>
                <div class="switch-container">
                    <mt-switch v-model="isTrue"></mt-switch>
                </div>
            </div>
            <div class="update">
                <span>开启水印</span>
                <div class="switch-container">
                    <mt-switch v-model="va"></mt-switch>
                </div>
            </div>
            <p class="shareTag">
               开启后，主题背景会印上用户标识
            </p>

        </div>
        </div>

    </div>

    </transition>
</template>

<script>
    import Bscroll from 'better-scroll';
    export default {
        name: "classGovern",
        data(){
            return {
                groupId:'',
                transitionName:'slide-right',
                value:false,
                isValue:false,
                val:false,
                isVal:false,
               isTrue:false,
                va:false,
                show:false
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
            this.groupId=this.$route.query.groupId;
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
@import "../../assets/css/class/classGovern";
</style>