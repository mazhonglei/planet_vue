<template>
    <div class="toastcover">
        <span class="toast">{{msg1}}</span>
    </div>
</template>
<script>
    /* eslint-disable */
    "use strict";
    export default {
        name: "toast",
        props: ["msg"],
        data() {
            return {
                msg1: this.msg,
            }
        },
        computed: {},
        mounted() {
            var th = this;
            setTimeout(function () {
                th.msg1 = "";
            }, 1400)
        },
        watch: {
            msg1(v, ov) {
                this.$emit("toast", v);
            }
        }
    }
</script>
<style lang="scss">
    @import '../assets/sass/index.scss';
    .toastcover {
        @include position(top, left, 6rem, 50%);
        transform: translateX(-50%);
        animation: opcity-animation 1.5s ease-in-out 1;
        z-index: 99;
    }

    .toast {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        height: count(30rem);
        padding-left: count(10rem);
        padding-right: count(10rem);
        border-radius: count(5rem);
        color: #fff;
        background: rgba(0, 0, 0, .6);
        font-size: 14px;
    }
</style>
