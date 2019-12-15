<template>
    <transition :name="transitionName">
        <div class="body" id="setMoney">
            <div class="new">
                <!--头部-->
                <div class="header createClass">
                    <div class="immersion">
                       <span class="backImg" @click="changeRoute('/createClass',{'from':'setMoney'})">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                        <span class="titlefont">设置加入费用</span>
                        <span class="next" @click="routerClass">下一步</span>
                    </div>
                </div>
                <!--内容-->
                <div class=" contentsize">

                    <form action="#">
                        <div class="create_box clear">
                            <input id="" type="text" style=" text-align:center" maxlength="5"
                                   oninput="value=value.replace(/[^\d]/g,'')" v-model="setPrice">
                        </div>
                        <span>USDT/年</span>
                    </form>

                    <p>(可设置{{minPrice}}~{{maxPrice}}的整数)</p>
                </div>
            </div>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>
    </transition>
</template>

<script>
    import Toast from '../../components/toast';
    import axios from "axios";
    import sha1 from 'sha1';
    import {site, apiKey} from '../../assets/js/config/site.js';

    export default {
        name: "setMoney",
        components: {Toast},
        data() {
            return {
                transitionName: "slide-right",
                msg: '',
                minPrice: "50",
                maxPrice: "3000",
                price: "",
                type: '',
            }
        },
        computed: {
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
            setPrice: {
                get() {
                    return this.price;
                },
                set(v) {
                    this.price = v;
                }
            },
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
                that.changeRoute('/createClass',{'from':'setMoney'})
                setTimeout(function () {//1s中后清除
                    first = null;
                }, 1000);
            }
        };
    },
        created() {
            this.getClassMoney();
            if(this.$route.query.from == 'setClassInfo'){
                this.transitionName = 'slide-left';
            }

        },
        methods: {
            getClassMoney: function () {
                let that = this;
                let url = site + '/api/group/getClassSet';
                let info = {
                    accessToken: sha1(apiKey)
                }
                axios.post(url, info).then(function (response) {
                    that.minPrice = response.data.data.minPrice;
                    that.maxPrice = response.data.data.maxPrice;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            routerClass: function () {
                if (Number(this.price) < Number(this.minPrice)) {
                    this.msg = "设置价格不能小于最低价";
                    return false;
                }
                if (Number(this.price) > Number(this.maxPrice)) {
                    this.msg = "设置价格不能大于最高价";
                    return false;
                }
                let type = this.$route.query.type;
                this.changeRoute('/setClassInfo', {type: type, price: this.price});
            },
            square(v) {
                this.msg = v
            },
        }
    }
</script>

<style lang="scss">
    @import '../../assets/css/class/setMoney';





</style>
