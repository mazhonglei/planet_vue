<template>
    <transition>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(cover,index) in coverList" :key="index" @click="routerNext(cover.id)">
                    <img :src='cover.cover_pic | imgPath' alt="" :title="cover.name">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
    </transition>
</template>

<script>
    import Swiper from 'swiper';
    import axios from "axios";
    import sha1 from 'sha1';
    import {site, apiKey} from '../assets/js/config/site.js';

    export default {
        name: 'swipe',
        data() {
            return {
                coverList: []

            }
        },
        mounted() {
            this.getCoverList();
        },
        updated() {
            new Swiper('.swiper-container', {

                loop: true,
                // 如果需要分页器
                slidesPerView: "auto",
                effect: 'coverflow',
                centeredSlides: true,
                autoplay: {
                    disableOnInteraction: false,
                    autoplay: true,
                    delay:3000
                },
                coverflow: {
                    rotate: 30,
                    stretch: 10,
                    depth: 60,
                    modifier: 10,
                    slideShadows: true
                },
                pagination: {
                    // 表示pagination的html标签class是swiper-pagination
                    el: '.swiper-pagination'
                },
                spaceBetween: -5,
            })
        }
        ,
        created() {

        },
        filters: {
            imgPath: function (value) {
                return site + value;
            }
        },
        methods: {
            getCoverList() {
                let that = this;
                let url = site + '/api/group/getCoverList';
                let info = {
                    accessToken: sha1(apiKey)
                }
                axios.post(url, info).then(function (response) {
                    that.coverList = response.data.data.recommend;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            routerNext: function(groupId){
                let that = this;
                let uid = localStorage.getItem('uid');
                if(uid && uid > 0){
                    let info = {
                        userId: uid,
                        groupId: groupId,
                        accessToken: sha1(uid + groupId + apiKey)
                    }
                    let url = site + '/api/group/groupUserInfo';
                    axios.post(url, info).then(function (response) {
                        if (response.data.is_member == 1) {
                            that.changeRoute('/classIndex',{groupId:groupId,from:'swipe'})
                        }else{
                            that.changeRoute('/classInfo',{groupId:groupId,from:'swipe'})
                        }
                    }).catch(function (error) {
                        console.log(error);
                        that.msg = "请求错误";
                    });
                }else{
                    this.msg = "请重新登录";
                    setTimeout(function () {
                        that.changeRoute('/');
                    }, 1000);
                }
            },
        },
    }
</script>

<style>
    @import "~swiper/dist/css/swiper.min.css";

    .swiper-container {
        width: 100%;
        height: 100%;
        overflow: unset;
    }


    .swiper-pagination-bullet {
        width: 6px;
        height: 6px;
        background: #411e60;
    }

    .swiper-pagination-bullet-active {
        background-color: #411e60;
    }

    .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: -35px;
    }

    .swiper-container .swiper-wrapper .swiper-slide {
        width: 75%;
        border-radius: .14rem;
        overflow: hidden;
    }

    .swiper-container .swiper-wrapper .swiper-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

</style>
