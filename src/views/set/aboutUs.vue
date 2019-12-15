<template>
    <transition :name="transitionName">
        <div>
            <div class="body" id="aboutUs">
                <div class="header">
                   <div class="immersion">
                        <span class="backImg" @click="changeRoute('/set',{'from':'aboutUs'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                       <span class="titlefont">关于DDUP</span>
                   </div>
                </div>
                <div class="about">
                    <div class="img">
                        <img src="@/assets/img/ic_logo_about.png" alt="">
                    </div>
                    <div class="ddup">
                        <span>DDUP</span>
                    </div>
                    <p>知识分享，学习交流</p>
                    <p>V1.0.0(180101)</p>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
    export default {
        name: "aboutUs",
        data(){
            return {
                transitionName:'slide-right'
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
                    that.changeRoute('/set',{'from':'aboutUs'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
        }
    }
</script>

<style lang="scss">
    @import "../../assets/css/set/aboutUs.scss";

</style>
