<template>
    <transition :name="transitionName">
        <div class="body" id="smallChange">
            <div class="header">
                <div class="immersion">
                        <span class="backImg" @click="backRoute()">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                    <span class="titlefont">零钱</span>
                </div>
            </div>
            <div class="assetsBox">
                <div class="loose-change-assets-title">
                    <div>零钱资产</div>
                    <label @click="checkType()">
                        <i class="asset-checkT" v-if="pType ==1"></i>
                        <i class="asset-check" v-else></i>
                        隐藏零资产币种
                    </label>
                </div>
                <div class="loose-change-home" ref="wrapper">
                    <div class="loose-change-assets-content">
                        <div class="loose-change-assets-detail" v-for="(currency,index) in currencyList"
                             :key="index" @click="routeList(currency.id)">
                            <div><img :src="currency.logo | imgPath" alt=""></div>
                            <div>
                                <div>{{currency.currency_mark}}</div>
                                <div>{{currency.currency_name}}</div>
                            </div>
                            <div>
                                <div>{{currency.num}}</div>
                                <div>${{currency.price}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import axios from "axios";
    import sha1 from 'sha1';
    import {site, apiKey} from '../../../assets/js/config/site.js';
    import Bscroll from 'better-scroll'

    export default {
        name: "smallChange",
        data() {
            return {
                transitionName: 'slide-left',
                currencyList: [],
                nowPage: 0,
                pType: 0,
                noMore: false
            }
        },
        created() {
            if (this.$route.query.from == 'wallet') {
                this.transitionName = 'slide-right';
            }
            this.getMyCurrencyList();
            this.replaceRoute('asset')
        },
        filters: {
            imgPath: function (value) {
                if (value) {
                    return site + value;
                } else {
                    return require('@/assets/img/head_default.png');
                }
            }
        },
        methods: {
            checkType: function () {
                if (this.pType == 1) {
                    this.pType = 0
                } else {
                    this.pType = 1
                }
                this.getMyCurrencyList()
            },
            routeList(currencyId) {
                console.log(currencyId);
                if (currencyId > 2) {
                    this.changeRoute('/change/tokenList', {currencyId: currencyId, from: 'asset'})
                } else {
                    this.changeRoute('/change/list', {currencyId: currencyId, from: 'asset'});
                }
            },
            getMyCurrencyList() {
                let uid = localStorage.getItem('uid');
                let pType = this.pType;
                let url = site + 'api/users/myCurrencyList';
                let that = this;
                let info = {
                    userId: uid,
                    type: pType,
                    accessToken: sha1(uid + pType + apiKey)
                }
                axios.post(url, info).then(function (response) {
                    if (response.data.status == 1) {
                        that.currencyList = response.data.data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },

        },
        mounted() {
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
            if (!this.myscroll) {
                this.myscroll = new Bscroll(this.$refs.wrapper, {
                    probeType: 3,
                    click: true,
                    disableMouse: true,
                    pullDownRefresh: {
                        threshold: 30,
                        stop: 0
                    },
                    pullUpLoad: {
                        threshold: 20 //下拉加载所触发需要的高度
                    }
                });
            } else {
                this.myscroll.refresh();
            }
            let that = this;
            this.myscroll.on('pullingUp', function () { //pullingUp下拉刷新
                if (that.noMore === false) {
                    let uid = localStorage.getItem('uid');
                    that.nowPage = that.nowPage + 1;
                    let url = site + '/api/users/myCurrencyList';
                    let nowPage = that.nowPage;
                    let pType = this.pType;
                    let info = {
                        userId: uid,
                        nowPage: nowPage,
                        pType: pType,
                        accessToken: sha1(uid + nowPage + pType + apiKey)
                    };
                    axios.post(url, info).then(function (response) {
                        response.data.data.forEach(function (item) {
                            that.currencyList.push(item);
                        });
                        if (response.data.data.length < 10) {
                            that.noMore = true;
                        }
                        that.myscroll.finishPullUp();
                        that.myscroll.refresh();
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else {
                    that.myscroll.finishPullUp();
                    that.myscroll.refresh();
                }
            });
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/css/wallet/smallChange";
</style>
