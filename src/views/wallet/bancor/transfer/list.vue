<template>
    <transition :name="transitionName">
        <div class="body" id="asset">
            <div>
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/wallet',{'from':'asset'})">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                        <span class="titlefont">{{ $route.query.name }}</span>
                    </div>
                </div>
                <div class="property-detail-home">
                    <div class="property-detail-nav">
                        <div :class="request.type == 1 ? 'property-detail-nav-active' : ''" @click="changeTab(1)">全部
                        </div>
                        <div :class="request.type == 2 ? 'property-detail-nav-active' : ''" @click="changeTab(2)">转出
                        </div>
                        <div :class="request.type == 3 ? 'property-detail-nav-active' : ''" @click="changeTab(3)">转入
                        </div>
                    </div>
                    <div class="property-detail-all wrapper" ref="scroll">
                        <div>
                            <div class="property-detail-list" v-for="(v,k) in list" :key="k"
                                 @click="changeRoute('/bancor/transfer/detail', {
                                    transactionHash: v.txHash,
                                    name: $route.query.name,
                                    timestamp: v.timestamp,
                                    from: v.from,
                                    to: v.to,
                                    amount: v.amount,
                                    fromLink: 'list'
                                 })">
                                <div class="property-detail-list-category">
                                    <img src="@/assets/img/wallet/daochu-white.png" alt=""
                                         v-if="walletActive.address == v.from">
                                    <img src="@/assets/img/wallet/daoru-white.png" alt=""
                                         v-else-if="walletActive.address == v.to">
                                    <img src="@/assets/img/wallet/fail.png" alt="" v-else-if="v.amount == 0">
                                </div>
                                <div v-if="walletActive.address == v.from">
                                    <div class="property-detail-list-detail-info">
                                        <div class="property-detail-list-detail-info-address">{{ addressSub(v.to) }}
                                        </div>
                                        <div class="property-detail-list-detail-info-time">{{ v.timestamp | time2Date()
                                            }}
                                        </div>
                                    </div>
                                    <div class="property-detail-list-detail-money">-{{ v.amount | roundOff(2) }}</div>
                                </div>
                                <div v-else-if="walletActive.address == v.to">
                                    <div class="property-detail-list-detail-info">
                                        <div class="property-detail-list-detail-info-address">{{ addressSub(v.from) }}
                                        </div>
                                        <div class="property-detail-list-detail-info-time">{{ v.timestamp | time2Date()
                                            }}
                                        </div>
                                    </div>
                                    <div class="property-detail-list-detail-money">+{{ v.amount | roundOff(2) }}</div>
                                </div>
                                <div v-else-if="v.amount == 0">
                                    <div class="property-detail-list-detail-info">
                                        <div class="property-detail-list-detail-info-address">{{ addressSub(v.to) }}
                                        </div>
                                        <div class="property-detail-list-detail-info-time">{{ v.timestamp | time2Date()
                                            }}
                                        </div>
                                    </div>
                                    <div class="property-detail-list-detail-money">0</div>
                                </div>
                            </div>
                            <div v-show="list.length == 0 && !loading.show"
                                 style="width: 100%;text-align: center;padding-top: 15px;font-size: 14px">
                                暂无数据...
                            </div>
                        </div>
                    </div>
                    <div class="property-detail-operate">
                        <div @click="changeRoute('/vns/receive', {
                            from: 'bancor',
                            address: $route.query.address,
                            name: $route.query.name
                        })">收款
                        </div>
                        <div @click="changeRoute('/bancor/transfer/index', {
                            from: 'bancor',
                            address: $route.query.address,
                            name: $route.query.name
                        })">转账
                        </div>
                    </div>
                </div>
            </div>
            <Loading></Loading>
        </div>
    </transition>
</template>

<script>
    /* eslint-disable */
    import {mapState, mapActions} from 'vuex';
    import axios from 'axios';
    import {myAlert} from "@/assets/js/h5plus/nativeUI";
    import BScroll from 'better-scroll';
    import Loading from '@/components/modal/loading';

    export default {
        name: "asset",
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
                    that.changeRoute('/wallet',{'from':'asset'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
            this.$nextTick(() => {
                new BScroll(this.$refs.scroll, {
                    click: true
                });
            });
            this.getList();
            setTimeout(() => {
                this.setScroll();
            }, 400);
        },
        computed: {
            ...mapState("wallet", [
                "walletActive",
            ]),
            ...mapState("modal", [
                "loading"
            ])
        },
        components: {
            Loading
        },
        data() {
            return {
                transitionName: 'slide-left',
                list: [],
                request: {
                    type: 1,
                    pageNo: 1,
                    pageSize: 10,
                    isEnd: false
                }
            }
        },
        created() {
            this.name = this.$route.query.name;
            this.address = this.$route.query.address;
            if (this.$route.query.from == 'transferDetails' || this.$route.query.from == 'receivables' || this.$route.query.from == 'transfer' || this.$route.query.from == 'wallet') {
                this.transitionName = 'slide-right';
            }
            if (this.$route.query.from == 'transfer') {
                this.transitionName = 'slide-left';
            }
            this.replaceRoute('/bancor/transfer/list', {address: this.address, name: this.name})

        },

        methods: {
            setScroll: function () {
                let scroll = new BScroll('.wrapper', {
                    scrollY: true,
                    click: true,
                    pullDownRefresh: {
                        threshold: 20, // 下拉距离超过30px触发pullingDown事件
                        stop: 0 // 回弹停留在距离顶部20px的位置
                    },
                    pullUpLoad: {
                        threshold: -10
                    }
                });
                scroll.on("pullingUp", () => {    // 上拉加载
                    this.request.pageNo++;
                    this.getList().then((res) => {
                        if (res != 1) {
                            scroll.refresh();
                        }
                        scroll.finishPullUp();
                    });
                    scroll.refresh();
                });
                scroll.on("pullingDown", () => {    // 下拉刷新
                    this.request.pageNo = 1;
                    this.request.isEnd = false;
                    this.list = [];
                    this.getList().then(() => {
                        scroll.refresh();       // 数据加载完之后，更新document 文档结构
                        scroll.finishPullDown();
                    });
                    scroll.refresh();
                });
            },
            getList: function () {
                // 已经是最后一页，结束操作
                if (this.request.isEnd) return new Promise((resolve) => {
                    resolve(1);
                });

                // 不是最后一页，继续操作
                this.aLoading({
                    show: true,
                    tip: "加载中..."
                });
                let params;
                switch (this.request.type) {
                    case 1:
                        params = {
                            pageNo: this.request.pageNo,
                            pageSize: this.request.pageSize,
                            all: this.walletActive.address,
                        };
                        break;
                    case 2:
                        params = {
                            pageNo: this.request.pageNo,
                            pageSize: this.request.pageSize,
                            from: this.walletActive.address
                        };
                        break;
                    case 3:
                        params = {
                            pageNo: this.request.pageNo,
                            pageSize: this.request.pageSize,
                            to: this.walletActive.address
                        };
                        break;

                }
                return axios.get('http://47.92.126.183:82/client/transfer/list', {
                    params: params
                }).then((response) => {
                    if (response.data.data.list.length < 10) {
                        this.request.isEnd = true;
                    }
                    for (let i in response.data.data.list) {
                        response.data.data.list[i].amount = response.data.data.list[i].amount / 10 ** 18;
                        this.list.push(response.data.data.list[i]);
                    }
                    this.aLoading({show: false, tip: "加载中..."});
                }).catch((error) => {
                    this.aLoading({show: false,});
                    myAlert({
                        msg: "获取数据失败",
                        button: "确定"
                    });
                    console.log(error);
                });
            },
            changeTab: function (type) {
                this.request.type = type;
                this.request.pageNo = 1;
                this.request.isEnd = false;
                this.list = [];
                this.getList();
            },
            ...mapActions('modal', [
                'aLoading'
            ])
        }
    }
</script>

<style lang="scss">
    @import "../../../../assets/css/wallet/asset";
</style>
