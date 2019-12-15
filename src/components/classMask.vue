<template>
    <!--遮罩层-->
    <div>
        <transition name="bg">
            <div class="classIndexmask" v-show="isShow"></div>
        </transition>
        <transition name="fade">
            <div class="classIndexContent" v-show="isShow">
                <textarea name="" id=""  rows="6" placeholder='等你评论'></textarea>
                <div class="star">
                    <div class="common3">
                        <div class="f_left">
                            <img src="../assets/img/ic_filter_image_topic_normal.png" alt="">
                            <img src="../assets/img/ic_file_select_in_editor.png" alt="">
                            <img src="../assets/img/ic_face_gray.png" alt="">
                        </div>
                        <button @click="hide">发送</button>
                        <p>(0/1000)</p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "classMask",
        data(){
            return {
                isShow:true
            }
        },
        methods:{
            hide(){
                this.isShow=false;
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/css/components/classMask";
    .fade-enter-active, .fade-leave-active {
        transition: all 0.4s;
    }

    .fade-enter, .fade-leave-to {
        transform: translateY(10rem);
    }

    .fade-enter-to, .fade-leave {
        transform: translateY(0rem);
    }

    .bg-enter-active, .bg-leave-active {
        transition: all 0.8s;
    }

    .bg-enter, .bg-leave-to {
        opacity: 0;
    }
</style>