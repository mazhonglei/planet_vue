'use strict'
import axios from "axios";
import sha1 from 'sha1';
import {site, apiKey} from './site.js';

export function sendMsg(ctx, mobile, type, uid=0){
    let info = {
        mobile: mobile,
        type: type,
        uid: uid,
        accessToken: sha1(mobile + type + uid + apiKey)
    };
    let url = site + '/api/apis/sendMsg';
    let that = ctx;
    axios.post(url, info).then(function (response) {
        if (response.data.status == 1 && response.data.code == 0) {
            that.msg = "发送成功";
            //return true;
        } else {
            if(response.data.code == 2){
                that.msg = "手机号码不存在";
            }else{
                that.msg = "发送失败";
            }
            //return false;
        }
    }).catch(function (error) {
        that.msg = "发送失败";
        //return false;
    });
}
