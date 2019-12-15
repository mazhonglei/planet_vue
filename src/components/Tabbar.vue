<template>
    <transition>
        <mt-tabbar v-model="message" fixed>
            <mt-tab-item id="home">
                <img slot="icon" :src="this.atabs[0]">
                首页
            </mt-tab-item>
            <mt-tab-item id="find">
                <img slot="icon" v-bind:src="this.atabs[1]">
                发现
            </mt-tab-item>
            <mt-tab-item id="wallet">
                <img slot="icon" v-bind:src="this.atabs[2]">
                钱包
            </mt-tab-item>
            <mt-tab-item id="myInfo">
                <img slot="icon" v-bind:src="this.atabs[3]">
                我的
            </mt-tab-item>
        </mt-tabbar>
    </transition>
</template>

<script>
    export default {
        name: "index",
        props: {
            selected: String,
            tabs: Array,
        },
        mounted() {

        },
        created() {
        },
        data() {
            return {
                //选中的tabbar值message为外面页面传入的值selected
                message: this.selected,
                //这里使用的icon图标为图片，所以需要加图片改变的传入，若使用阿里图标，则不用加
                atabs: this.tabs,
            }

        },
        watch: {
            message: function (val, path) {
                // 这里就可以通过 val 的值变更来确定去向
                switch (val) {
                    case 'home':
                        this.active = path;
                        this.$router.push('/home');
                        break;
                    case 'find':
                        this.active = path;
                        this.$router.push('/find');
                        break;
                    case 'wallet':
                        this.active = path;
                        this.$router.push('/wallet');
                        break;
                    case 'myInfo':
                        this.active = path;
                        this.$router.push('/myInfo');
                        break;
                }
            }
        },
        methods: {}

    }
</script>

<style lang="scss">
    @import "../assets/css/class/home.scss";

    .mint-tabbar > .mint-tab-item.is-selected {
        background-color: transparent;

        .mint-tab-item-label {
            color: #411E60;
        }
    }

    .mint-tab-item-label {
        color: #929292;
    }
</style>