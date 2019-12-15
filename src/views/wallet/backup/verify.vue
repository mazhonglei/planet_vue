<template>
    <transition name="slide-right">
        <div class="body" id="verify">
            <div class="content-verify" style="overflow: hidden">
                <div class="header">
                    <div class="immersion">
                       <span class="backImg" @click="backRoute()">
                                <img src="@/assets/img/ic_back.png" alt="">
                       </span>
                    </div>
                </div>
                <div class="content-top">
                    <div class="content-mnemonic">
                        <div class="mnemonic-iconfont">
                            <img src="@/assets/img/wallet/backup/write.png" alt="">
                        </div>
                        <div class="mnemonic-title">备份助记词</div>
                    </div>
                    <div class="content-hint">请按顺序点击助记词，以确认您正确备份。</div>
                    <div class="content-danger-two" v-show="error">助记词顺序不正确，请校对</div>
                    <div class="content-english">
                        <div v-for="(item,index) in select" :key="index" @click="remove(item)">{{ item }}</div>
                    </div>
                    <div class="content-english-to">
                        <div v-for="(item,index) in mnemonicRandom" :key="index" @click="add(item,index)">{{ item }}</div>
                    </div>
                    <div class="content-next background1" v-if="complete" @click="backup()">完成</div>
                    <div class="content-next" v-else>完成</div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    /* eslint-disable */

    import {mapGetters} from 'vuex'
    import {backupDone} from '@/assets/js/etherjs/wallet'

    export default {
        name: 'wallet_backup_verify',
        mounted() {
            let that = this;
            mui.init({
                keyEventBind: {
                    backbutton: true  //关闭back按键监听
                }
            });
            // //首页返回键处理
            // //处理逻辑：1秒内，连续两次按返回键，则退出应用；
            var first = null;
            mui.back = function () {
                //首次按键，提示  再按一次退出应用
                if (!first) {
                    first = new Date().getTime();//记录第一次按下回退键的时间
                    that.backRoute()
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
        },
        created() {
        },
        computed: {
            ...mapGetters("wallet", {
                mnemonic: "getMnemonicArray",
                mnemonicRandom: "getMnemonicArrayRandom",
            })
        },
        data() {
            return {
                select: [],
                error: false,
                complete: false,
            }
        },
        methods: {
            add: function (item, index) {
                if (this.error) return;
                this.select.push(item);
                this.mnemonicRandom.splice(index, 1);
                if (item !== this.mnemonic[this.select.length - 1]) {
                    this.error = true;
                }
                if (this.select.length === this.mnemonic.length) {
                    this.complete = true;
                }
            },
            remove: function (item) {
                this.error = false;
                for (let i in this.select) {
                    if (this.select[i] === item) {
                        this.select.splice(i, 1)
                        this.mnemonicRandom.push(item);
                    }
                }
                for (let i in this.select) {
                    if (this.select[i] !== this.mnemonic[i]) {
                        this.error = true;
                        return
                    }
                }
            },
            backup: function () {
                backupDone().then(() => {
                    this.changeRoute("/wallet");
                });
            }
        }
    }
</script>
<style lang="scss">
    @import "../../../assets/css/wallet/verify";

 #verify{
     .background1 {
         background-color: #411E60;
     }

     .content-verify {
         background: #ffffff !important;
     }
 }
</style>
