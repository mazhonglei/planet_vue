<template>
    <div class="success" v-show="alert_little.show" :style="'top:'+alert_little.top">
        <div>{{ alert_little.msg }}</div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        name: 'alert_little',
        computed: {
            ...mapState("modal", [
                "alert_little"
            ]),
        },
    }
</script>
<style>
    .success {
        width: 100%;
        height: 0.8rem;
        font-size: 0.2rem;
        position: absolute;
        z-index: 999;
    }

    .success div {
        width: 1.4rem;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        margin: 0.15rem auto;
        border-radius: 0.25rem;
        background-color: #354654;
        color: #fff;
    }
</style>