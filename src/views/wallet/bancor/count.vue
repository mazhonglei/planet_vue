<template>
    <transition :name="transitionName">
        <div class="body" id="transaction">
            <div style="height: 100%">
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/bancor/list',{'from':'transaction'})">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                        <span class="titlefont">{{ name }}交易</span>
                    </div>
                </div>
                <div class="transaction-home">
                    <div class="time_div">
                        <div class="time_span" :class="active == 1 ? 'time_span_active' : ''" data-interval="5" @click="changeTime(1,'5')">5 min</div>
                        <div class="time_span" :class="active == 2 ? 'time_span_active' : ''" data-interval="30" @click="changeTime(2,'30')">30 min</div>
                        <div class="time_span" :class="active == 3 ? 'time_span_active' : ''" data-interval="60" @click="changeTime(3,'60')">1 hour</div>
                        <div class="time_span" :class="active == 4 ? 'time_span_active' : ''" data-interval="D" @click="changeTime(4,'D')">1 day</div>
                    </div>
                    <div class="transaction-curve">
                        <div id="tv_chart_container">
                            <iframe :src="demo+'/tradingview/bancor.html?name='+name+'&interval='+interval" frameborder="0" style="width: 100%;"></iframe>
                        </div>
                    </div>
                    <div class="transaction-record">成交记录</div>
                    <div class="transaction-record-content">
                        <div class="transaction-record-title">
                            <div>时间</div>
                            <div>方向</div>
                            <div>成交量(DDUP)</div>
                            <div>成交均价(VNS)</div>
                        </div>
                        <div class="transaction-record-list-content">
                            <div class="transaction-record-list" v-for="(v,k) in list" :key="k">
                                <div>{{ v.date }}</div>
                                <div class="transaction-buyin" v-if="v.status">买入</div>
                                <div class="transaction-buyout" v-else>卖出</div>
                                <div>{{ v.num | roundOff(4) }}</div>
                                <div>{{ v.price | roundOff(4) }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="transaction-buy">
                        <div class="buy-in" @click="changeRoute('/bancor/buy', {address: address, name: name})">买入</div>
                        <div class="buy-out" @click="changeRoute('/bancor/sell', {address: address, name: name})">卖出
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    /* eslint-disable */
    import {site} from '@/assets/js/config/site.js';
    import axios from "axios";
    import {mapState} from 'vuex';
    import {myAlert} from "@/assets/js/h5plus/nativeUI";

    export default {
        name: "transaction",
        data() {
            return {
                transitionName: 'slide-right',
                address: "",
                name: "",
                active: 3,
                interval: '60',
                list: [],
                widget: "",
                Interval: "",
                demo: "",
            }
        },
        created() {
            if (this.$route.query.from == 'purchase' || this.$route.query.from == 'sellOut') {
                this.transitionName = 'slide-left';
            }
            this.demo = site;
            this.address = this.$route.query.address;
            this.name = this.$route.query.name;

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
                    that.changeRoute('/bancor/list',{'from':'transaction'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
            // this.init();
            this.doBancorList();
            this.Interval = setInterval(() => {
                this.doBancorList();
            }, 10000);
        },
        computed: {
            ...mapState("wallet", [
                "walletActive",
            ]),
        },

        // http://demo.sandyvip.com/api/datafeed/symbol
        // http://demo.sandyvip.com/api/datafeed/config
        // http://demo.sandyvip.com/api/datafeed/history
        // http://127.0.0.1:82/client/bancor/prices
        // https://demo_feed.tradingview.com
        methods: {
            /*init: function () {
                this.widget = window.tvWidget = new TradingView.widget({
                    fullscreen: true,
                    symbol: this.$route.query.name,
                    interval: this.interval,
                    container_id: "tv_chart_container",
                    //	BEWARE: no trailing slash is expected in feed URL
                    datafeed: new Datafeeds.UDFCompatibleDatafeed("http://47.92.126.183:82/client/bancor/prices", 10000),
                    library_path: "/static/kline/charting_library/",
                    locale: "zh",
                    enabled_features: ["hide_last_na_study_output"],
                    disabled_features: ["header_widget", "timeframes_toolbar", "context_menus", "legend_context_menu", "edit_buttons_in_legend"],
                    preset: "mobile",
                    time_frames: false,
                });
            },*/
            changeTime: function (active, interval) {
                this.active = active;
                this.interval = interval;
                // this.widget.remove();
                // this.init();
            },
            doBancorList: function () {
                axios.get('http://47.92.126.183:82/client/bancor/list', {
                    params: {
                        to: this.$route.query.address,
                        pageNo: 1,
                        pageSize: 3
                    }
                }).then((response) => {
                    let list = response.data.data.list;
                    for (let i in list) {
                        if (Number(list[i].amount > 0)) {
                            list[i].status = 0;
                            list[i].price = list[i].bMount / list[i].amount;
                            list[i].num = list[i].amount / 10 ** 18;
                        } else {
                            list[i].status = 1;
                            list[i].price = list[i].value / list[i].bMount;
                            list[i].num = list[i].bMount / 10 ** 18;
                        }
                        let date = this.time2Date(list[i].timestamp);
                        list[i].date = date.substring(5, 17);
                    }
                    this.list = list;
                }).catch((error) => {
                    myAlert({
                        msg: "获取数据失败",
                        button: "确定"
                    });
                    console.log(error);
                });
            },
            time2Date: function (timestamp) {
                let time = new Date(timestamp * 1000);
                let y = time.getFullYear();
                let m = time.getMonth() + 1;
                let d = time.getDate();
                let h = time.getHours();
                let mm = time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
                let s = time.getSeconds();
                return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
            },
        },
        destroyed: function () {
            clearInterval(this.Interval);
            // this.widget.remove()
        },
    }
</script>

<style lang="scss">
    @import "../../../assets/css/wallet/transaction";

    iframe {
        height: 320px !important;
    }

    .time_div {
        height: 20px;
        line-height: 20px;
        background-color: #fff;
        display: flex;
        .time_span {
            text-align: center;
            font-size: 12px;
            margin-left: 10px;
        }
        .time_span_active {
            color: red;
        }
    }
</style>
