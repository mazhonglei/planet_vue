<template>
    <transition :name="transitionName">
        <div class="body" id="classSearch">
            <div class="new">
                <!--头部-->
                <div class="header">
                    <div class="immersion">
                        <form action="#" class="clear">
                            <img src="../../assets/img/ic_search.png" alt="" class="searchIcon">
                            <input type="text" placeholder="搜索">
                        </form>
                        <a href="javascript:void(0)" @click="changeRoute('/classIndex',{groupId:groupId,from:'classSearch'})">取消</a>
                    </div>
                </div>
                <!--内容-->
                <div class="content">
                    <ul class="information">
                        <li @click="changeRoute('/userSearchList',{groupId:groupId})">
                            <img src="../../assets/img/ic_search_user.png" alt="">
                            <span>用户</span>
                        </li>
                        <li>
                            <img src="../../assets/img/ic_search_file.png" alt="">
                            <span>主题</span>
                        </li>
                        <li @click="changeRoute('/searchDate',{groupId:groupId})">
                            <img src="../../assets/img/ic_search_date.png" alt="">
                            <span>日期</span>
                        </li>
                    </ul>
                    <!--<ul class="label">-->
                    <!--<li class=" clearfix">-->
                    <!--<span>标签</span>-->
                    <!--<img src="../../assets/img/ic_common_entrance_arrow.png" alt="" >-->
                    <!--</li>-->
                    <!--</ul>-->
                    <!--<ul class="tgaList">-->
                    <!--<li>编译器</li>-->
                    <!--</ul>-->
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "classSearch",
        data(){
            return {
                transitionName:'slide-right',
                groupId:''
            }
        },
        created(){
            if(this.$route.query.from == 'userSearchList' || this.$route.query.from == 'searchDate'){
                this.transitionName = 'slide-left';
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
                    that.changeRoute('/classIndex',{groupId:that.groupId,from:'classSearch'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
            this.groupId=this.$route.query.groupId;
        }
    }
</script>

<style lang="scss">
    @import "../../assets/css/class/classSearch.scss";
</style>