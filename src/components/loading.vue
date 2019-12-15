<template>
    <transition>
        <div class="body" id="loading">
            <div data-loader="circle" class="loadingIcon"></div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "loading"
    }
</script>

<style lang="scss">
    @import "~css-loading";

    #loading {
        background-color: rgba(0, 0, 0, .3);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;

        .loadingIcon {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            border-top-color: transparent !important;
        }
    }
</style>