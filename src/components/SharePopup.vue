<template>
    <div class="share-popup">
        <!--遮罩层-->
        <transition name="fade">
            <div class="maskSubstance" >
                <div class="substanceShare">
                     分享至
                    <i class="iconfont icon-chahao1"></i>
                </div>
                <div class="share">
                    <div class="left f_left">
                        <img src="@/assets/img/share_03.jpg" alt="">
                        <p>微信好友</p>
                    </div>
                    <div class="right f_right">
                        <img src="@/assets/img/share_05.jpg" alt="">
                        <p>朋友圈</p>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="bg">
            <div class="shareMask"></div>
        </transition>
    </div>
</template>

<script>

    export default {
        name: "Share_popup",
        data() {
            return {
            }
        },

        methods: {

        },
    }
</script>

<style lang="scss">
    @import "../assets/css/components/share";

    .fade-enter-active, .fade-leave-active {
        transition: all 0.4s;
    }

    .fade-enter, .fade-leave-to {
        transform: translateY(10rem);
    }

    .bg-enter-active, .bg-leave-active {
        transition: all 0.8s;
    }

    .bg-enter, .bg-leave-to {
        opacity: 0;
    }

</style>
