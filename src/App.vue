<template>
    <router-view></router-view>


</template>


<script>
    import '@/assets/css/main.scss'
    import '@/assets/js/rem/flex'
    import '@/assets/css/font2/iconfont.css'
    import {synWallet, synCurrency, synExchange} from '@/assets/js/timer/index';

    export default {
        name: 'app',
        data() {
            return {}
        },

        created() {
            document.addEventListener("plusready", this.onPlusReady, false);
            synWallet();
            synCurrency();
            synExchange();
        },
        mounted() {


        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*  text-align: center;*/
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
