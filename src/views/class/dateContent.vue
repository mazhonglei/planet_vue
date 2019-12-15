<template>
    <div class="body" id="dateContent">
        <!--头部-->
        <div class="header">
            <div class="immersion">
                        <span class="backImg" @click="backRoute()">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                <span class="titlefont">2018/12/1-2019/1/8</span>
            </div>
        </div>
        <div class="searchContent" ref="wrapper">
           <div>
               <div class="searchMain search-box">
                   <p class="searchTitle">主题</p>
                   <ul class="searchItem">
                       <li v-for="(eachMain,index) in eachMainList" :key="index">
                           <div>{{eachMain.title}}</div>
                           <div class="searchuserTime">
                               <span>{{eachMain.name}}</span>
                               <time>{{eachMain.date}}<em>{{eachMain.time}}</em></time>
                           </div>
                       </li>
                   </ul>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
    import Bscroll from 'better-scroll'
    export default {
        name: "dateContent",
        data() {
            return {
                eachMainList: [{
                    title: '「设计之美 回答了: 请问v-html无法解析标签咋办」',
                    name: '设计之美',
                    date: '2017/5/5',
                    time: '16:34'

                }, {
                    title: '[图片]「设计之美 回答了: 请问v-html无法解析标签咋办签咋办签咋办」',
                    name: '西堡',
                    date: '2017/10/5',
                    time: '23:34'

                }, {
                    title: '[图片]「Vux - 基于Vue和WeUI的组件库 Vux (读音sdadasdasdasda」',
                    name: '蒲格璐',
                    date: '2017/10/5',
                    time: '23:34'

                }],
                myscroll: "",
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
                    }
                });
            } else {
                this.myscroll.refresh();
            }
        },
    }
</script>

<style lang="scss">
    @import "../../assets/css/class/classSearch.scss";
</style>