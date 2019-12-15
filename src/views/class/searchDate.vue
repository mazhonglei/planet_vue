<template>
    <transition :name="transitionName">
    <div class="body" id="searchDate">
        <!--头部-->
        <div class="header">
            <div class="immersion">
                        <span class="backImg" @click="changeRoute('/classSearch',{groupId:groupId,from:'searchDate'})">
                            <img src="@/assets/img/ic_back.png" alt="">
                        </span>
                <span class="titlefont">按日期查看</span>
                <span class="next" @click="changeRoute('/dateContent')">完成</span>
            </div>
        </div>
        <div class="dateBox">
            <div class="dateItem">
                <ul>
                    <li class="clear" v-for="(timeList,index) in setTimeList" @click="openPicker" :key="index">
                        <div class="timeTxt">{{timeList.title}}</div>
                        <div class="dateTxt">{{timeList.time}}<i class="arrowIcon"></i></div>
                    </li>
                </ul>
            </div>
        </div>
        <mt-datetime-picker
                ref="picker"
                type="date"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                v-model="dataVal"
        >
        </mt-datetime-picker>
    </div>
    </transition>
</template>

<script>
    import {DatetimePicker} from 'mint-ui';

    export default {
        name: "searchDate",
        data() {
            return {
                transitionName:'slide-right',
                groupId:'',
                dataVal: new Date(),
                setTimeList: [{
                    title: '开始时间',
                    time: '2018/12/1'
                }, {
                    title: '截止时间',
                    time: '2019/1/8'
                },]
            }
        },
        mounted(){
            this.groupId=this.$route.query.groupId;
        },
        comments: {
            DatetimePicker
        },
        methods: {
            openPicker() {
                this.$refs.picker.open();
            }
        }


    }
</script>

<style lang="scss">
    @import "../../assets/css/class/classSearch.scss";
</style>