<template>
    <transition :name="transitionName">
        <div class="body" id="editUser">
            <div class="news">
                <div class="header">
                    <div class="immersion">
                        <span class="backImg" @click="changeRoute('/myInfo',{'from':'editUser'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                        <span class="titlefont">个人信息</span>
                    </div>
                </div>
                <div class="user1">
                    <ul class="user1Content">
                        <li class="bottomLine userHead needsclick" @click="uploadHead" >
                            <label>头像</label>
                            <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="gt">
                            <div class="img nick">
                                <img :src="userInfo.avatar " alt="" class="needsclick">
                            </div>
                        </li>
                        <li @click="changeRoute('/nickName')" class="bottomLine">
                            <p>昵称</p>
                            <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="gt">
                            <span class="nick">{{userInfo.nickName}}</span>
                        </li>
                        <li class="bottomLine">
                            <p>ID</p>
                            <span class="nick">{{userInfo.id}}</span>
                        </li>
                        <li class="bottomLine">
                            <p>手机</p>
                            <!--<img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="gt">-->
                            <span class="nick">{{tel}}</span>
                        </li>
                        <li @click="changeRoute('/signature')">
                            <p>签名</p>
                            <img src="@/assets/img/ic_common_entrance_arrow.png" alt="" class="gt">
                            <span class="nick">{{userInfo.signature}}</span>
                        </li>

                    </ul>
                </div>
            </div>
            <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper">
            </simple-cropper>
            <Toast :msg="msg" v-if="this.msg!=''" :class="opacity" @toast="square"></Toast>
        </div>

    </transition>
</template>

<script>
    import SimpleCropper from '../../components/simpleCropper'
    import axios from "axios";
    import Toast from '../../components/toast';
    import sha1 from 'sha1';
    import {site, apiKey} from '../../assets/js/config/site.js';

    export default {
        name: "editUser",
        components: {Toast, SimpleCropper},
        data() {
            return {
                isShow: false,
                transitionName: "slide-right",
                userInfo: {
                    nickName: '',
                    id: '',
                    avatar: require('@/assets/img/head_default.png'),
                    userInfo:'',
                    signature:'',
                },
                headpic: '',
                uploadParam: {
                    fileType: 'recruit', // 其他上传参数
                    uploadURL: site + '/api/users/uploadHead', // 上传地址
                    scale: 1 // 相对手机屏幕放大的倍数: 4倍
                },
                msg: '',
                slide: "",
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
                that.changeRoute('/myInfo',{'from':'editUser'})
                setTimeout(function () {//1s中后清除
                    first = null;
                }, 1000);
            }
        };
    },
        created() {
            this.tel = localStorage.getItem('username');
            if (this.$route.query.from == 'nickName') {
                this.transitionName = 'slide-left';
            }
            let user = JSON.parse(localStorage.getItem('userInfo'));
            this.userInfo.nickName = user.nick;
            this.userInfo.id = user.id;
            this.userInfo.signature = user.signature;
            if (user.avatar) {
                this.userInfo.avatar = site + user.avatar;
            }

        },
        computed: {
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
        },
        methods: {
            // 上传头像
            uploadHead() {
                this.$refs['cropper'].upload()
            },
            // 上传头像成功回调
            uploadHandle(data) {
                if (data.status === 1) {
                    this.headpic = "/" + data.imgsrc;
                    this.userInfo.avatar = site + this.headpic
                    let uid = localStorage.getItem('uid');
                    let avatar = this.headpic;
                    let info = {
                        users_id: uid,
                        avatar: avatar,
                        accessToken: sha1(uid + avatar + apiKey)
                    };
                    let url = site + '/api/users/editUsers';
                    let that = this;
                    axios.post(url, info).then(function (response) {
                        if (response.data.status == 1 && response.data.code == 0) {
                            that.msg = "设置成功";
                            let user = JSON.parse(localStorage.getItem('userInfo'));
                            user.avatar = avatar;
                            localStorage.setItem('userInfo', JSON.stringify(user))
                        } else {
                            that.msg = "设置失败";
                            return false;
                        }
                    }).catch(function (error) {
                        console.log(error);
                        that.msg = "设置错误";
                        return false;
                    });
                }
            },
            square(v) {
                this.msg = v
            },
        },
        beforeRouteLeave(to, from, next) {
            if (to.path == "/nickName") {
                this.transitionName = "slide-left";
            }
            setTimeout(function () {
                next();
            }, 50);
        },
    }
</script>

<style lang="scss">
    @import "../../assets/css/user/editUser";


</style>
