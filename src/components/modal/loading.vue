<template>
    <div class="loding-mask" v-show="loading.show">
        <div class="skip" v-show="loading.close">点击此处跳过等待</div>
        <div @click="aLoading({show: false})" class="closeSkip" v-show="loading.close">
            <img src="@/assets/img/loadingClose.png" alt="">
        </div>
        <div class="loding-box">
            <div style="margin: 30px auto;width: 20px;height: 20px;" data-loader="circle-side"></div>
            <p class="loding-text">{{ loading.tip }}</p>
        </div>
    </div>
</template>
<script>

    import 'css-loading'
    import {mapGetters, mapState, mapActions} from 'vuex'

    export default {
        name: 'loading',
        computed: {
            ...mapState("modal", [
                "loading"
            ]),
            ...mapGetters("modal", {
                loading: "getMLoading",
            })
        },
        methods: {
            ...mapActions('modal', [
                'aLoading',
            ]),
        }

    }
</script>
<style scoped>
    @import '../../assets/css/components/modal/loding.css';

    .loding-mask {
        z-index: 999;
        background-color: rgba(0, 0, 0, .3);
    }

    .closeSkip {
        color: #fff;
        font-size: .32rem;
        position: absolute;
        right: 42px;
        top: 30px;
        width: 15px;
        height: 15px;
    }

    .closeSkip img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .skip {
        position: absolute;
        right: 20px;
        top: 65px;
        border-radius: 20px;
        font-size: .28rem;
        padding: 10px;
        background-color: #fff;

    }

    .skip::before {
        display: inline-block;
        width: 0;
        height: 0;
        border: solid transparent;
        border-width: 10px;
        border-bottom-color: #fff;
        content: "";
        position: absolute;
        top: -20px;
        right: 20px;
    }
</style>
