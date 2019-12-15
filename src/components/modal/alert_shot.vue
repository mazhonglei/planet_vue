<template>
    <div class="popout-content">
        <transition name="fade">
            <div class="popout" v-show="alert_shot.show">
                <div class="content-mnemonic">
                    <div class="mnemonic-iconfont"><img src="@/assets/img/photo.png" alt=""></div>
                    <div class="mnemonic-title">{{ alert_shot.title || '请勿截图' }}</div>
                </div>
                <div class="popout-hint">{{ alert_shot.tip || "如果有人获取你的助记词将直接获取你的资产！请抄写下助记词并存放在安全的地方。" }}</div>
                <div class="content-know" @click="aAlert_shot({show: false})">{{ alert_shot.confirm || "知道了" }}</div>
            </div>
        </transition>
        <transition name="bg">
            <div class="bg"  v-show="alert_shot.show"></div>
        </transition>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        name: 'alert_shot',
        computed: {
            ...mapState("modal", [
                "alert_shot"
            ]),

        },
    }
</script>
<style scoped>
    @import "../../assets/css/components/modal/popout.css";

    .fade-enter-active, .fade-leave-active {
        transition: all 1s;
    }

    .fade-enter, .fade-leave-to {
        transform: translateY(10rem);
    }

    .bg-enter-active, .bg-leave-active {
        transition: all 1s;
    }

    .bg-enter, .bg-leave-to {
        opacity: 0;
    }
</style>
