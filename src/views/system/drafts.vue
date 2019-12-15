<template>
    <transition :name="transitionName">
        <div class="body" id="drafts">
            <div class="new">
                <div class="header">
                   <div class="immersion">
                        <span class="backImg" @click="changeRoute('/myInfo',{'from':'drafts'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                       <span class="titlefont">草稿箱</span>
                   </div>
                </div>
                <div class="send">
                    <img src="@/assets/img/draft01.png" alt="">
                    <span>取消发送内容可以被视为草稿</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "drafts",
        data(){
            return {
                transitionName : "slide-right"
            }
        },
    }
</script>

<style lang="scss">
    @import "../../assets/css/system/drafts";
</style>