<template>
    <transition :name="transitionName">
        <div class="body" id="editProfile">
            <!--头部-->
            <div class="header">
                <div class="immersion">
                        <span class="backImg" @click="changeRoute('/classDetail',{groupId:groupId})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                    <span class="titlefont">班级资料</span>
                </div>
            </div>
            <div class="new">
                <!--星球名称-->
                <div class="setClass-box">
                    <div class="starName">

                        <div class="classImg-box">
                            <img :src="groupInfo.cover_pic | imgPath" alt="">
                        </div>
                        <div class="className">{{groupInfo.name}}</div>
                    </div>
                    <ul class="selectSort">
                        <li>
                            {{groupInfo.cate_name}}
                        </li>
                    </ul>

                    <div class="introduce">
                        {{groupInfo.summary}}
                    </div>

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
        name: "setClassInfo",
        data() {
            return {
                transitionName: 'slide-left',
                groupId: '',
                groupInfo: {
                    name: "",
                    id: "",
                    users_count: "",
                    summary: "",
                    cover_pic: "",
                    cate_name: "",
                },
            }
        },
        filters: {
            imgPath: function (value) {
                if (value) {
                    return site + value;
                } else {
                    return require('@/assets/img/bg_fk.png');
                }
            }
        },
        created() {
            this.getClassInfo();
            //@/assets/img/bg_fk.png
            this.groupId = this.$route.query.groupId;
            if (this.$route.query.from == 'classDetail') {
                this.transitionName = 'slide-right';
            }
            // this.replaceRoute('/editProfile', {groupId: this.groupId})

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
                    that.changeRoute('/classDetail',{groupId:that.groupId})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
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
        }

    }
</script>

<style lang="scss">
    @import "../../assets/css/class/editProfile";


</style>
