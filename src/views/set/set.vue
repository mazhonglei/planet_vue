<template>
    <transition :name="transitionName">
        <div class="body" id="set">
            <div class="new">
                <!--头部-->
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/myInfo',{'from':'set'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                        <span class="titlefont">设置</span>
                    </div>
                </div>
                <ul class="setUl">
                    <li class="bottomLine">
                        <img src="@/assets/img/wallet/phone.png" alt="" class="left">
                        <p>手机号码</p>
                        <!--<img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">-->
                        <label>{{tel}}</label>
                    </li>
                    <li @click="changeRoute('/changePwd')" class="bottomLine">
                        <img src="@/assets/img/wallet/changePwd.png" alt="" class="left">
                        <p>修改密码</p>
                        <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                    </li>
                    <li @click="changeRoute('/changeTradePwd')" class="bottomLine">
                        <img src="@/assets/img/wallet/changePwd.png" alt="" class="left">
                        <p>修改支付密码</p>
                        <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                    </li>
                    <li class="bottomLine" @click="changeRoute('/resetTradePwd')">
                        <img src="@/assets/img/wallet/resetPwd.png" alt="" class="left resetPwd">
                        <p>重置支付密码</p>
                        <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                    </li>
                    <!--<li class="bottomLine">
                        <img src="@/assets/img/setting_03.jpg" alt="" class="left">
                        <p>清除缓存</p>
                        <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">
                    </li>-->
                    <li @click="changeRoute('/aboutUs')">

                        <img src="@/assets/img/wallet/about.png" alt="" class="left">
                        <p>关于DDUP</p>
                        <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="right">

                    </li>
                </ul>

                <div class="out" @click="actionSheet">
                    退出登录
                </div>
            </div>
            <mt-actionsheet
                    :actions= "data"
                    v-model="sheetVisible">
            </mt-actionsheet>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "set",
        data () {
            return {
                transitionName:'slide-right',
                // action sheet 选项内容
                data: [{
                    name: '确定退出',
                    method : this.loginOut	// 调用methods中的函数
                }],
                // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
                sheetVisible: false,
                tel:"",
            }
        },
    mounted(){
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
                that.changeRoute('/myInfo',{'from':'set'})
                setTimeout(function () {//1s中后清除
                    first = null;
                }, 1000);
            }
        };
    },
        created() {
            this.tel = localStorage.getItem('username');
            if(this.$route.query.from == 'aboutUs'||this.$route.query.from == 'changePwd'||this.$route.query.from == 'changeTradePwd'||this.$route.query.from == 'resetTradePwd'){
                this.transitionName = 'slide-left';
            }
        },
        methods: {
            actionSheet: function(){
                // 打开action sheet
                this.sheetVisible = true;
            },
            loginOut: function () {
                localStorage.setItem('uid','');
                localStorage.setItem('userInfo','');
                localStorage.setItem('username','');
                localStorage.setItem('loginKey', '');
                this.changeRoute('/');
            }
        }

    }
</script>

<style lang="scss">
@import "../../assets/css/set/setting";
</style>
