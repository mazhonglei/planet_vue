<template>
    <div class="loding-mask" v-show="success.show">
        <div class="loding-box">
            <span class="loding-icon loding-size"><img src="@/assets/img/complete.png" alt=""></span>
            <p class="loding-text loding-complete">{{ success.tip }}</p>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        name: 'success',
        computed: {

            ...mapState("modal", [
                "success"
            ]),

        },
    }
</script>
<style scoped>
    @import '../../assets/css/components/modal/loading.css';
</style>
