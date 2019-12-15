<template>
    <transition :name="transitionName">
        <div class="body" id="setClassInfo">
            <!--头部-->
            <div class="header">
                <div class="immersion">
                       <span class="backImg" @click="changeRoute('/setMoney',{'from':'setClassInfo'})">
                        <img src="@/assets/img/ic_back.png" alt="">
                    </span>
                    <div class="createClass-title">
                        <span class="titlefont"> 创建付费班级</span>
                        <span class="createMoney">{{price}} USDT/年</span>
                    </div>
                    <span class="complete" @click="createClass">完成</span>
                </div>
            </div>
            <div class="new" ref="wrapper">
                <!--星球名称-->
                <div class="wrapperBox">
                    <div class="setClass-box">
                        <div class="starName">
                            <div class="classImg-box">
                                <img :src="userImg" alt="" @click="upload" class="needsclick">
                                <i class="camera-icon needsclick" @click="upload">
                                </i>
                            </div>
                            <input type="text" placeholder="班级名字" v-model="className" maxlength="10">
                        </div>
                        <div class="select">
                            选择所属类型&nbsp;&nbsp;(必选)
                        </div>
                        <ul class="selectSort">
                            <li @click="selectActive(selectItem.id)" :class="{selectActive:selectItem.id==classtype}"
                                v-for="(selectItem,index) in selectList" :key="index" :date-val="selectItem.id">
                                {{selectItem.name}}
                            </li>
                        </ul>
                        <div class="classToken">
                            <p>班级代币名称 : <input type="text" v-model="tokenName"></p>
                            <p>班级代币总量 : <input type="text" v-model="tokenNum"></p>
                        </div>
                        <div class="introduce">
                            <textarea name="" id="" v-model="classInfo" cols="40" rows="8"></textarea>
                        </div>
                        <div class="clause" @click="clauseActive()">
                            <p>
                                <img src="@/assets/img/false.png" alt="" v-if="show.clauseImg"
                                     @click="show.clauseImg=false">
                                <img src="@/assets/img/true.png" alt="" v-else @click="show.clauseImg=true">
                                我已阅读并同意<span>《DDUP班级规则》</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper"></simple-cropper>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>
    </transition>
</template>

<script>
    import Toast from '../../components/toast';
    import axios from "axios";
    import sha1 from 'sha1';
    import {site, apiKey} from '../../assets/js/config/site.js';
    import SimpleCropper from '@/components/simpleCropper';
    import Bscroll from 'better-scroll';

    export default {
        name: "setClassInfo",
        components: {Toast, SimpleCropper},
        data() {
            return {
                transitionName: 'slide-right',
                price: "",
                tType: "",
                classname: "",
                classtype: "",
                classinfo: "",
                coverpic: "",
                tokenname: "",
                tokennum: "",
                groupId: '',
                msg: "",
                uploadParam: {
                    fileType: 'recruit', // 其他上传参数
                    uploadURL: site + '/api/users/uploadHead', // 上传地址
                    scale: 1 // 相对手机屏幕放大的倍数: 4倍
                },
                userImg: require('@/assets/img/bg_fk.png'),
                show: {
                    clauseImg: false
                },
                selectList: [{
                    name: '科技',
                    id: 1
                }, {
                    name: '教育',
                    id: 2
                }, {
                    name: '文艺',
                    id: 3
                }, {
                    name: '生活',
                    id: 4
                }, {
                    name: '娱乐',
                    id: 5
                }, {
                    name: '健康',
                    id: 6
                }, {
                    name: '时尚',
                    id: 7
                }, {
                    name: '经济',
                    id: 8
                }]

            }
        },

        computed: {
            className: {
                get() {
                    return this.classname;
                },
                set(v) {
                    this.classname = v;
                }
            },
            classInfo: {
                get() {
                    return this.classinfo;
                },
                set(v) {
                    this.classinfo = v;
                }
            },
            tokenName: {
                get() {
                    return this.tokenname;
                },
                set(v) {
                    this.tokenname = v;
                }
            },
            tokenNum: {
                get() {
                    return this.tokennum;
                },
                set(v) {
                    this.tokennum = v;
                }
            },
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
        },
        created() {
            this.price = this.$route.query.price;
            this.tType = this.$route.query.type;
            this.getClassType();
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
                    that.changeRoute('/setMoney',{'from':'setClassInfo'})
                    setTimeout(function () {//1s中后清除
                        first = null;
                    }, 1000);
                }
            };
            this.groupId = this.$route.groupId;
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
        },
        methods: {

            selectActive(index) {
                this.classtype = index
            },
            clauseActive() {
                this.showImg == 1
            },
            upload() {
                this.$refs['cropper'].upload()
            },
            uploadHandle(data) {
                if (data.status === 1) {
                    this.coverpic = "/" + data.imgsrc;
                    this.userImg = site + this.coverpic
                }
            },
            getClassType: function () {
                let that = this;
                let url = site + '/api/group/getClassType';
                let info = {
                    accessToken: sha1(apiKey)
                }
                axios.post(url, info).then(function (response) {
                    that.selectList = response.data.data;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            createClass: function () {
                let that = this;
                let name = that.classname;
                let userId = localStorage.getItem('uid');
                let categoryId = that.classtype;
                let summary = that.classinfo;
                let money = that.price;
                let timeType = that.tType;
                let tokenName = that.tokenname;
                let tokenNum = that.tokennum;
                let coverPic = that.coverpic;
                if (name == '') {
                    that.msg = "班级名称不能为空";
                    return false;
                }
                if (userId == '') {
                    that.msg = "请重新登录";
                    //跳转
                    return false;
                }
                if (categoryId == '') {
                    that.msg = "请选择所属分类";
                    return false;
                }
                if (summary == '') {
                    that.msg = "请填写班级简介";
                    return false;
                }
                if (money == '' || Number(money) <= 0) {
                    that.msg = "加入班级费用不能为空";
                    return false;
                }
                if (tokenName == '') {
                    that.msg = "请输入班级代币名称";
                    return false;
                }
                if (tokenNum == '' || Number(tokenNum) <= 0) {
                    that.msg = "班级代币总量不能小于0";
                    return false;
                }
                let info = {
                    name: name,
                    user_id: userId,
                    category_id: categoryId,
                    cover_pic: coverPic,
                    mode: 'pay',
                    time_type: timeType,
                    token_num: tokenNum,
                    token_name: tokenName,
                    money: money,
                    summary: summary,
                    accessToken: sha1(name + userId + categoryId + coverPic + 'pay' + timeType + tokenNum + tokenName + money + summary + apiKey)
                }
                let url = site + '/api/group/createGroup';
                axios.post(url, info).then(function (response) {
                    if (response.data.status == 1 && response.data.code == 0) {
                        that.msg = "创建成功,等待审核";
                        setTimeout(function () {
                            that.changeRoute('/myCreate');
                        }, 1000);
                    } else {
                        that.msg = "创建失败";
                        return false;
                    }
                }).catch(function (error) {
                    console.log(error);
                    that.msg = "创建错误";
                    return false;
                });
            },
            //提示信息
            square(v) {
                this.msg = v
            },

        }

    }
</script>

<style lang="scss">
    @import "../../assets/css/class/setClassInfo";


</style>
