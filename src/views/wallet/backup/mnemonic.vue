<template>
    <transition name="slide-right">
      <div class="body" id="mnemonic">
          <div class="content-backup-mnemonic" v-on:swiperight="backRoute()" style="overflow: hidden">
              <div class="header">
                  <div class="immersion">
                       <span class="backImg" @click="backRoute()">
                                <img src="@/assets/img/ic_back.png" alt="">
                       </span>
                  </div>
              </div>
              <div class="content-top">
                  <div class="content-mnemonic">
                      <div class="mnemonic-iconfont"><img src="@/assets/img/wallet/backup/write.png" alt=""></div>
                      <div class="mnemonic-title">备份助记词</div>
                  </div>
                  <div class="content-hint">请仔细抄写下方助记词，我们将在下一步验证。</div>
                  <div class="mnemonic-english">{{ walletDecode.mnemonic }}</div>
                  <a @click="changeRoute('/wallet/backup/verify')">
                      <div class="backup-mnemonic-next">下一步</div>
                  </a>
                  <alert_shot></alert_shot>
              </div>
          </div>
      </div>
    </transition>
</template>
<script>
    import {mapState} from 'vuex'
    import alert_shot  from '@/components/modal/alert_shot';
    export default {
        name: 'wallet_backup_mnemonic',
        created() {
            this.aAlert_shot({
                show: true,
            });
        },
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
        computed: {
            ...mapState("wallet", [
                "walletDecode"
            ]),
            ...mapState("modal", [
                "alert_shot"
            ]),

        },
        components: {
            alert_shot
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>
<style lang="scss">
    @import "../../../assets/css/wallet/mnemonic";

    .content-backup-mnemonic {
        background: #ffffff !important;
    }
</style>
