<template>
    <transition :name="transitionName">
        <div class="body" id="myAssets">
            <div class="header">
                <div class="immersion">
                     <span class="backImg" @click="backRoute()">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>

                    <form action="#" class="clear">
                        <img src="@/assets/img/ic_search.png" alt="" class="searchIcon">
                        <input type="text" placeholder="搜索" v-model="request.search">
                    </form>
                    <a href="javascript:void(0)" @click="search()">搜索</a>
                </div>
            </div>
            <div class="assetsBox">
                <div class="assetsTit">我的资产</div>
                <div class="assetsOfbox wrapper" ref="wrapper">
                    <ul class="assetsItem">
                        <li class="clear" v-for="(v,k) in bancorList" :key="k">
                            <div class="bottomLine clear">
                                <span class="assetsImg">
                                    <img :src="v.logo | imgPath" alt="">
                                </span>
                                <div class="assetsItem-lf">
                                    <p>{{ v.currency_mark }}</p>
                                    <p>{{ v.currency_name }}</p>
                                    <p>{{ addressSub(v.contract_address, 10) }}</p>
                                    <div class="assets-btn">
                                        <mt-switch v-model="v.choose"
                                                   @change="changeChoose(v.contract_address, k)"></mt-switch>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import BScroll from 'better-scroll';
    import {site} from '@/assets/js/config/site.js'
    import axios from "axios";

    export default {
        name: "bancor_assets",
        data() {
            return {
                transitionName: 'slide-left',
                bancorList: [],
                request: {
                    type: 1,
                    pageNo: 1,
                    pageSize: 10,
                    isEnd: false,
                    search: "",
                }
            }
        },
        created() {
            if (this.$route.query.from == 'wallet') {
                this.transitionName = 'slide-right';
            } else {
                this.transitionName = '';
            }

            this.doBancorList()
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
            setTimeout(() => {
                this.setScroll();
            }, 400);
        },
        methods: {
            setScroll: function () {
                let scroll = new BScroll('.wrapper', {
                    scrollY: true,
                    click: true,
                    pullDownRefresh: {
                        threshold: 20, // 下拉距离超过30px触发pullingDown事件
                        stop: 0
                    },
                    pullUpLoad: {
                        threshold: -10
                    }
                });
                scroll.on("pullingUp", () => {    // 上拉加载
                    this.request.pageNo++;
                    this.doBancorList().then((res) => {
                        if (res != 1) {
                            scroll.refresh();
                        }
                        scroll.finishPullUp();
                    });
                });
                scroll.on("pullingDown", () => {    // 下拉刷新
                    this.request.pageNo = 1;
                    this.request.isEnd = false;
                    this.bancorList = [];
                    this.doBancorList().then(() => {
                        scroll.refresh();       // 数据加载完之后，更新document 文档结构
                        scroll.finishPullDown();
                    });
                });
            },
            doBancorList: function () {
                if (this.request.isEnd) return new Promise((resolve) => {
                    resolve(1);
                });
                let bancorAddress = localStorage.getItem("bancorAddress") ? JSON.parse(localStorage.getItem("bancorAddress")) : [];
                let params = {
                    pageNo: this.request.pageNo,
                    pageSize: this.request.pageSize,
                    search: this.request.search
                };

                return axios.get(site + 'api/publics/getCurrencyList', {
                    params: params
                }).then(async (response) => {
                    if (response.data.data.length < 10) {
                        this.request.isEnd = true;
                    }
                    this.bancorList = response.data.data;
                    for (let i in this.bancorList) {
                        this.bancorList[i].choose = bancorAddress.indexOf(this.bancorList[i].contract_address) > -1
                        this.$set(this.bancorList, i, this.bancorList[i]);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            changeChoose: function (address, k) {
                let bancorAddress = localStorage.getItem("bancorAddress") ? JSON.parse(localStorage.getItem("bancorAddress")) : [];
                if (bancorAddress.indexOf(address) < 0) {
                    bancorAddress.push(address);
                } else {
                    for (let i in bancorAddress) {
                        if (bancorAddress[i] == address) {
                            bancorAddress.splice(i, 1);
                        }
                    }
                }
                this.bancorList[k].choose = !this.bancorList[k].choose;
                localStorage.setItem("bancorAddress", JSON.stringify(bancorAddress));
            },
            search: function () {
                this.request.pageNo = 1;
                this.request.isEnd = false;
                this.bancorList = [];
                this.doBancorList().then(() => {
                    scroll.refresh();       // 数据加载完之后，更新document 文档结构
                });
            }
        },
        filters: {
            imgPath: function (value) {
                if (value) {
                    return site + value;
                } else {
                    return require('@/assets/img/head_default.png');
                }
            },
        },
    }
</script>

<style lang="scss">
    @import "../../../assets/css/wallet/myAssets";
</style>
