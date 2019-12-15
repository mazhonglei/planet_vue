<template>
    <transition :name="transitionName">
        <div class="body" id="createClass">
            <div class="new">
                <!--头部-->
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/myCreate',{'from':'createClass'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                        <span class="titlefont">创建付费班级</span>
                        <span class="next" @click="routeNext()">下一步</span>
                    </div>
                </div>
                <div class="star">
                    <div class="select-class">
                        选择班级服务模式
                    </div>
                    <div class="time">
                        <div class="circle">
                            <!--<img src="@/assets/img/false.png" alt="">-->
                            <img src="@/assets/img/false.png" alt="">
                        </div>
                        <div class="timerInner">
                            <p class="p1">固定时长</p>
                            <p class="p2">有效期：用户的加入日期往后计算1年</p>
                            <p class="p3">创建成功后,不可改为固定期限</p>
                        </div>
                    </div>
                    <div class="time">
                        <div class="circle">
                            <img src="@/assets/img/false.png" alt="">
                        </div>
                        <div class="timerInner">
                            <p class="p1">固定期限</p>
                            <p class="p2">有效期 :&nbsp;&nbsp;2018/12/5至2019/12/5</p>
                            <p class="p3">创建成功后,&nbsp;&nbsp;可改为固定时长</p>
                        </div>
                    </div>
                    <input type="hidden" name="type" id="classType"/>
                </div>
            </div>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>
    </transition>
</template>

<script>
    import $ from "jquery";
    import Toast from '../../components/toast';

    export default {
        name: "createClass",
        components: {Toast},
        data() {
            return {
                transitionName: "slide-right",
                msg: '',
            }
        },
        created() {
            if (this.$route.query.from == 'setMoney') {
                this.transitionName = 'slide-left';
            }
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
                    that.changeRoute('/myCreate',{'from':'createClass'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
            //let that = this;
            $(".time").click(function () {
                $('.circle img').attr('src', require("@/assets/img/false.png"));
                $(this).css('border', 'solid 1px #411E60').siblings().css('border', '');
                $(this).find('img').attr('src', require("@/assets/img/true.png"));
                $("#classType").val($(this).index());
            });
        },
        computed: {
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
        },


        methods: {
            routeNext: function () {
                let type = $("#classType").val();
                if (type != 1 && type != 2) {
                    this.msg = "请选择服务模式";
                    return false;
                }
                this.changeRoute('/setMoney', {type: type});
            },
            square(v) {
                this.msg = v
            },
        },
        /*beforeRouteLeave(to, from, next) {
            if (to.path == "/setMoney") {
                this.transitionName = "slide-left";
            }
            setTimeout(function () {
                next();
            }, 50);
        },*/
    }
</script>

<style lang="scss">
    @import "../../assets/css/class/createClass.scss";


</style>
