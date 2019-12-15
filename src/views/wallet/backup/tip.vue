<template>
    <transition>
        <div class="body" id="tip">
            <div class="content-tip">
                <a @click="changeRoute('/wallet')">
                    <div class="content-later">稍后备份</div>
                </a>
                <div class="content-backup">
                    <div class="backup-iconfont"><img src="@/assets/img/wallet/backup/shield.png" alt=""></div>
                    <div class="backup-title">备份钱包</div>
                </div>
                <div class="content-hint">没有妥善备份就无法保障资产安全。删除程序或钱包后，你需要备份文件来恢复钱包。</div>
                <div class="content-danger">
                    <li>请在四周无人、确保没有摄像头的安全环境进行备份。</li>
                </div>
                <a @click="changeRoute('/wallet/backup/mnemonic')">
                    <div class="content-help">备份助记词</div>
                </a>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'wallet_backup_tip',
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
                    that.changeRoute('/wallet')
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>
<style lang="scss">
    @import "../../../assets/css/wallet/walletTip";

    .content-tip {
        background: #ffffff !important;
    }
</style>
