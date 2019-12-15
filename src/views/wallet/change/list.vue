<template>
    <transition :name="transitionName">
        <div class="body" id="assetDetails">
            <div class="header">
                <div class="immersion">
                        <span class="backImg" @click="backRoute()">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                    <span class="titlefont">DDUP零钱</span>
                </div>
            </div>
            <div class="property-detail-home">
                <div class="property-detail-nav">
                    <div :class="request.type == 0 ? 'property-detail-nav-active' : ''" @click="changeTab(0)">全部
                    </div>
                    <div :class="request.type == 1 ? 'property-detail-nav-active' : ''" @click="changeTab(1)">充值
                    </div>
                    <div :class="request.type == 2 ? 'property-detail-nav-active' : ''" @click="changeTab(2)">提现
                    </div>
                    <div :class="request.type == 3 ? 'property-detail-nav-active' : ''" @click="changeTab(3)">挖矿
                    </div>
                </div>
                <div class="property-detail-all" ref="wrapper">
                    <div>
                        <div class="property-detail-list" v-for="(v,k) in list" :key="k"
                             @click="changeRoute('/change/detail',v)">
                            <div class="property-detail-list-category">
                                <img src="@/assets/img/wallet/daoru-white.png" alt="" v-if="v.opt_type == 1">
                                <img src="@/assets/img/wallet/daochu-white.png" alt="" v-else-if="v.opt_type == 2">
                                <img src="@/assets/img/wallet/daochu-white.png" alt="" v-else-if="v.opt_type == 6">
                                <img src="@/assets/img/wallet/daoru-white.png" alt="" v-else-if="v.opt_type == 7">
                            </div>
                            <div v-if="v.opt_type == 1">
                                <div class="property-detail-list-detail-info">
                                    <div class="property-detail-list-detail-info-address">{{ addressSub(v.from) }}</div>
                                    <div class="property-detail-list-detail-info-time">{{ v.ctime }}</div>
                                </div>
                                <div class="property-detail-list-detail-money">+{{ v.number }} {{v.currency_mark}}</div>
                            </div>
                            <div v-else-if="v.opt_type == 2">
                                <div class="property-detail-list-detail-info">
                                    <div class="property-detail-list-detail-info-address">{{ addressSub(v.to) }}</div>
                                    <div class="property-detail-list-detail-info-time">{{ v.ctime }}</div>
                                </div>
                                <div class="property-detail-list-detail-money">-{{ v.number }} {{v.currency_mark}}</div>
                            </div>
                            <div v-else-if="v.opt_type == 6">
                                <div class="property-detail-list-detail-info">
                                    <div class="property-detail-list-detail-info-address">加入班级{{ v.name }}花费
                                    </div>
                                    <div class="property-detail-list-detail-info-time">{{ v.ctime }}</div>
                                </div>
                                <div class="property-detail-list-detail-money">-{{ v.number }} {{v.currency_mark}}
                                </div>
                            </div>
                            <div v-else-if="v.opt_type == 7">
                                <div class="property-detail-list-detail-info">
                                    <div class="property-detail-list-detail-info-address">加入班级{{ v.name }}返回
                                    </div>
                                    <div class="property-detail-list-detail-info-time">{{ v.ctime }}</div>
                                </div>
                                <div class="property-detail-list-detail-money">+{{ v.number }} {{v.currency_mark}}
                                </div>
                            </div>
                        </div>
                        <div v-show="list.length == 0 && !loading.show"
                             style="width: 100%;text-align: center;padding-top: 15px;font-size: 14px">
                            暂无数据...
                        </div>
                    </div>
                </div>
                <div class="property-detail-operate">
                    <div @click="changeRoute('/change/recharge',{currencyId:currency_id,from:'list'})">充值</div>
                    <div @click="changeRoute('/change/withdraw',{currencyId:currency_id,from:'list'})">提现</div>
                </div>
            </div>
            <Loading></Loading>
        </div>
    </transition>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import axios from "axios";
    import sha1 from 'sha1';
    import {site, apiKey} from '../../../assets/js/config/site.js';
    import Loading from '@/components/modal/loading';
    import Bscroll from 'better-scroll';

    export default {
        name: "assetDetails",
        data() {
            return {
                transitionName: 'slide-left',
                list: [],
                myscroll: "",
                currency_id: '',
                request: {
                    type: 0
                },
                noMore: false,
                nowPage: 0,
            }
        },
        created() {
            if (this.$route.query.from == 'asset') {
                this.transitionName = 'slide-right';
            }
            this.currency_id = this.$route.query.currencyId;
            this.replaceRoute('list', {currencyId: this.currency_id})
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
            this.getTransList();
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
            this.myscroll.on('pullingUp', function () { //pullingUp上拉加载
                if (that.noMore === false) {
                    let uid = localStorage.getItem('uid');
                    that.nowPage = that.nowPage + 1;
                    that.type = that.request.type;
                    let currencyId = that.currency_id;
                    let url = site + '/api/trans/getTransList';
                    let nowPage = that.nowPage;
                    let type = that.type;
                    let info = {
                        nowPage: nowPage,
                        userId: uid,
                        currencyId: currencyId,
                        type: type,
                        accessToken: sha1(nowPage + uid + currencyId + type + apiKey)
                    };
                    axios.post(url, info).then(function (response) {
                        response.data.data.forEach(function (item) {
                            that.list.push(item);
                        });
                        if (response.data.data.length < 10) {
                            that.noMore = true;
                            that.aLoading({
                                show: true,
                                tip: "加载中..."
                            });
                            setTimeout(() => {
                                that.aLoading({
                                    show: false,
                                    tip: "加载中..."
                                });
                            }, 150)
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
        },
        computed: {
            ...mapState("modal", [
                "loading"
            ])
        },
        components: {
            Loading
        },
        methods: {
            addressSub(address = '', length = 10) {
                return address.substring(0, length) + "..." + address.substring(address.length - length, address.length);
            },
            getTransList: function () {
                // 已经是最后一页，结束操作
                if (this.noMore) return new Promise((resolve) => {
                    resolve(1);
                });
                // 不是最后一页，继续操作
                this.aLoading({
                    show: true,
                    tip: "加载中..."
                });
                let uid = localStorage.getItem('uid');
                let currencyId = this.currency_id;
                let url = site + '/api/trans/getTransList';
                let type = this.request.type;
                let that = this;
                let info = {
                    userId: uid,
                    currencyId: currencyId,
                    type: type,
                    accessToken: sha1(uid + currencyId + type + apiKey)
                }
                return axios.post(url, info).then(function (response) {
                    that.list = response.data.data;
                    that.aLoading({show: false, tip: "加载中..."});
                }).catch(function (error) {
                    console.log(error);
                });
            },
            changeTab: function (type) {
                this.request.type = type;
                this.nowPage = 0;
                this.noMore = false;
                this.list = [];
                this.getTransList();
            },
            ...mapActions('modal', [
                'aLoading'
            ])
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/css/wallet/assetDetails";
</style>
