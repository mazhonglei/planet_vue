<template>
    <transition :name="transitionName">
        <div class="body" id="sendPost">
            <div class="new">
                <!--头部-->
                <div class="header">
                    <div class="immersion">
                       <span class="backImg" @click="backRoute()">
                                取消
                            </span>
                        <span class="titlefont"> {{name}}</span>
                        <span class="send" @click="sendPost">发送</span>
                    </div>

                </div>
                <div class="speak">
                    <!--<textarea name="" id="" cols="41" rows="28" v-model="getBody" placeholder="说点什么..." class=" search_input"></textarea>-->
                    <!--el-input 文本框-->
                    <el-input
                            type="textarea"
                            placeholder="说点什么..."
                            resize="none"
                            v-model="getBody" class="search_input">
                    </el-input>
                    <!--el-input-->
                </div>
                <div class="sendImg">
                    <div class="addImg">
                        <uploader
                                url="http://3.112.84.186/api/publics/upload"
                        ></uploader>
                        <!--<ul>
                            <li v-for="(imgItem,index) in imgList" :key="index"><img :src="imgItem.img" alt="">
                            </li>
                        </ul>-->
                        <div class="addBtn" @click="upload" v-show="btnShow">
                            确认上传
                        </div>
                    </div>
                    <div class="share">
                        <div class="left" @click="showEmoji = !showEmoji">
                            <img src="@/assets/img/smile.png" alt="">
                        </div>
                    </div>
                    <!--emoji表情-->
                    <transition name="fade">
                        <div class="emoji-box" v-if="showEmoji">
                            <vue-emoji
                                    @select="selectEmoji">
                            </vue-emoji>
                        </div>
                    </transition>
                    <!--emoji-->
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
    import vueEmoji from '../../components/emoji.vue'
    import {mapState} from 'vuex'

    export default {
        name: "sendPost",
        components: {Toast, vueEmoji},
        data() {
            return {
                transitionName: 'slide-left',
                isEmoji: false,
                showEmoji: false,
                data: [],
                imgList: [{
                    img: require("@/assets/img/shouye_01.jpg")
                }, {
                    img: require("@/assets/img/shouye_02.jpg")
                }, {
                    img: require("@/assets/img/shouye_03.jpg")
                }],
                groupId: "",
                name: "",
                msg: "",
                body: "",
                imgs: "",
                btnShow: true
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
                that.backRoute()
                setTimeout(function () {//1s中后清除
                    first = null;
                }, 1000);
            }
        };
    },
        computed: {
            getBody: {
                get() {
                    return this.body;
                },
                set(v) {
                    this.body = v;
                }
            },
            opacity() {
                return {
                    opacity: this.msg != '',
                }
            },
            ...mapState({
                imgStatus: state => state.imgstore.img_status,
                imgPaths: state => state.imgstore.img_paths
            })
        },
        methods: {
            upload() {
                this.$store.commit('set_img_status', 'uploading')

            },
            submits() {
                console.log(this.imgPaths)
                setTimeout(() => {
                    this.msg = "上传完成";
                }, 200);
                this.imgs = this.imgPaths;
                this.btnShow = false;
            },
            sendPost: function () {
                let uid = localStorage.getItem('uid');
                let that = this;
                let groupId = that.groupId;
                let images = that.imgs;
                if (uid && uid > 0) {
                    if (groupId && groupId > 0) {
                        let body = that.body;
                        if (body == '') {
                            that.msg = "内容不能为空";
                            return false;
                        }
                        let info = {
                            group_id: groupId,
                            user_id: uid,
                            body: body,
                            images: images,
                            accessToken: sha1(groupId + uid + body + images + apiKey)
                        }
                        console.log(info)
                        let url = site + '/api/group_posts/createPost';
                        axios.post(url, info).then(function (response) {
                            if (response.data.status == 1 && response.data.code == 0) {
                                that.msg = "发布成功";
                                setTimeout(function () {
                                    that.changeRoute('/classIndex', {groupId: groupId, from: 'sendPost'});
                                }, 1000);
                            } else {
                                that.msg = "发布失败";
                                return false;
                            }
                        }).catch(function (error) {
                            console.log(error);
                            that.msg = "发布错误";
                            return false;
                        });
                    } else {
                        that.msg = "请选择班级";
                        setTimeout(function () {
                            that.changeRoute('/myJoin');
                        }, 1000);
                    }
                } else {
                    that.msg = "请重新登录";
                    setTimeout(function () {
                        that.changeRoute('/');
                    }, 1000);
                }
            },
            square(v) {
                this.msg = v
            },
            selectEmoji(code) {
                this.getBody += code
            },
            submit() {
                this.data.push(this.getBody)
                this.getBody = ''
            }
        },
        created() {
            this.groupId = this.$route.query.groupId;
            this.name = this.$route.query.name;
            if (this.$route.query.from == 'classIndex') {
                this.transitionName = 'slide-right';
            }
            this.replaceRoute('/sendPost')
        },
        watch: {
            imgStatus() {
                if (this.imgStatus === 'finished') {
                    this.submits()
                }
            }
        },
        destoryed() {
            this.imgs = []
        }
    }
</script>

<style lang="scss">
    @import "../../assets/css/class/sendPost.scss";

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }


    .clearfix {
        &:after {
            content: '';
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: all 0.4s;
    }

    .fade-enter, .fade-leave-to {
        transform: translateY(10rem);
    }

    .fade-enter-to, .fade-leave {
        transform: translateY(0rem);
    }

    .bg-enter-active, .bg-leave-active {
        transition: all 0.8s;
    }

    .bg-enter, .bg-leave-to {
        opacity: 0;
    }

    .btn {
        width: 100%;
        height: 3em;
        background-color: green;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
