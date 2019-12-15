<template>
    <transition :name="transitionName">
        <div class="body" id="sendWallet">
            <div class="header">
                <div class="immersion">
                        <span class="backImg" @click="changeRoute('/myInfo',{'from':'sendWallet'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                    <span class="titlefont">发红包</span>
                </div>
            </div>
            <div class="sendWallet">
                <div class="sendBox">
                    <form action="#" class="sendMoney">
                        <div class="allMoney" v-if="redType == 0">
                            <div class="pin">拼</div>
                            <span class="money">总金额</span>
                        </div>
                        <div class="everyMoney" v-else>
                            <span class="money">单个金额</span>
                        </div>
                        <input type="text" class="redWallet" v-model="setMoney" placeholder="0.00" maxlength="10">
                        <span class="yuan">VNS</span>
                    </form>
                    <div class="send_pin" v-if="redType == 0">当前为拼手气红包，<span @click="change(redType)">改为普通红包</span>
                    </div>
                    <div class="send_common" v-else>当前为普通红包，<span @click="change(redType)">改为拼手气红包</span></div>
                    <form action="#" class="walletNum">
                        <span class="moneyCount">红包个数</span>
                        <input type="text" class="redWallet" v-model="setNum" placeholder="填写个数" maxlength="10">
                        <span class="yuan">个</span>
                    </form>
                </div>
                <div class="send_pin"></div>
                <div class="text">
                    <textarea name="" id="" rows="4" v-model="setContent" placeholder="恭喜发财，大吉大利"></textarea>
                </div>
                <div class="send_pin">当前余额：{{balance}} VNS</div>
                <div class="showMoney">
                    <span>{{countMoney}} VNS</span>
                </div>
                <div class="walletMoney">
                    <span @click="sendRedPacket">塞钱进红包</span>
                </div>
            </div>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>
    </transition>
</template>

<script>
    import axios from "axios";
    import sha1 from 'sha1';
    import {site, apiKey} from '../../assets/js/config/site.js';
    import Toast from '../../components/toast';

    export default {
        name: "sendWallet",
        components: {Toast},
        data() {
            return {
                transitionName: 'slide-right',
                redType: 0,
                sendMoney: '',
                countMoney: 0,
                sendNum: '',
                balance: 0,
                msg: '',
                getMoney: 0,
                content: '',
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
                    that.changeRoute('/myInfo',{'from':'sendWallet'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
        },
        created() {
            this.getVnsBalance();
        },
        computed: {
            setMoney: {
                get() {
                    return this.sendMoney;
                },
                set(v) {
                    this.sendMoney = v;
                    if (this.redType == 0) {
                        this.countMoney = v;
                        if (this.sendNum > 0) {
                            this.getMoney = Number(v) / Number(this.sendNum);
                        }
                    } else {
                        this.countMoney = v * Number(this.sendNum);
                    }
                }
            },
            setNum: {
                get() {
                    return this.sendNum;
                },
                set(v) {
                    this.sendNum = v;
                    if (this.redType == 0) {
                        this.getMoney = Number(this.sendMoney) / Number(v);
                    } else {
                        this.countMoney = v * Number(this.sendMoney);
                    }
                }
            },
            setContent: {
                get() {
                    return this.content;
                },
                set(v) {
                    this.content = v;
                }
            },
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
        },
        methods: {
            change(redType) {
                if (redType == 0) {
                    this.redType = 1;
                    this.countMoney = Number(this.sendMoney) * Number(this.sendNum);
                } else {
                    this.redType = 0;
                    this.countMoney = Number(this.sendMoney);
                }
            },
            getVnsBalance() {
                let uid = localStorage.getItem('uid');
                let currencyId = 2;
                let url = site + '/api/users/getUserBalance';
                let that = this;
                let info = {
                    userId: uid,
                    currencyId: currencyId,
                    accessToken: sha1(uid + currencyId + apiKey)
                }
                axios.post(url, info).then(function (response) {
                    if (response.data.status == 1) {
                        that.balance = Number(response.data.data);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            sendRedPacket() {
                let that = this;
                if (that.countMoney > that.balance) {
                    that.msg = '余额不足';
                    return false;
                }
                if (that.redType == 0) {
                    if (that.getMoney < 0.01) {
                        that.msg = '单个红包金额不可低于0.01';
                        return false;
                    }
                }
                that.$messagebox.prompt(' ', '请输入支付密码', {inputType: 'password'}).then(({value, action}) => {
                    if (action == 'confirm') {
                        let password = value;
                        let uid = localStorage.getItem('uid');
                        let redType = that.redType;
                        let money = that.countMoney;
                        let num = that.sendNum;
                        let content = that.content;
                        if (content == '') {
                            content = '恭喜发财，大吉大利';
                        }
                        let currencyId = 2;
                        let url = site + '/api/users/sendRedPacket';
                        let info = {
                            userId: uid,
                            password: password,
                            type: redType,
                            money: money,
                            num: num,
                            currencyId: currencyId,
                            content: content,
                            accessToken: sha1(uid + password + redType + money + num + currencyId + content + apiKey)
                        }
                        axios.post(url, info).then(function (response) {
                            if (response.data.status == 1) {
                                that.msg = '红包创建成功';
                                setTimeout(function () {
                                    that.changeRoute('/myWallet');
                                }, 1000);
                            } else {
                                if (response.data.code == 4) {
                                    that.msg = '支付密码错误';
                                } else if (response.data.code == 5) {
                                    that.msg = '余额不足';
                                } else {
                                    that.msg = '红包创建失败';
                                }
                            }
                        }).catch(function (error) {
                            console.log(error);
                        });

                    } else {
                        return false;
                    }
                }).catch(err => {
                    if (err == 'cancel') {
                        return false;
                    }
                });

            },
            square(v) {
                this.msg = v
            },
        }
    }
</script>

<style lang="scss">
    @import "../../assets/css/user/sendWallet";

</style>
