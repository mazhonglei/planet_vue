import Vue from 'vue'
import Router from 'vue-router'

//导入页面
function loadView(level, component) {
    return () => import(`@/${level}/${component}.vue`)
}

Vue.use(Router)

export default new Router({

    routes: [

        //登录
        {
            path: '/',
            name: 'login',
            component: loadView('views', 'user/login'),
            beforeEnter(to, from, next) {//before钩子函数，检测用户是否登录
                if (!localStorage.getItem('uid')) {
                    next(true);
                } else {
                    next({path: '/home'});
                }
            }
        },
        //注册
        {
            name: 'register',
            path: '/register',
            component: loadView('views', 'user/register'),
        },
        //忘记密码
        {
            name: 'forgotPwd',
            path: '/forgotPwd',
            component: loadView('views', 'user/forgotPwd'),
        },
        //个人中心 我的
        {
            name: 'myInfo',
            path: '/myInfo',
            component: loadView('views', 'user/myInfo'),
        },
        //个人中心 昵称
        {
            name: 'nickName',
            path: '/nickName',
            component: loadView('views', 'user/nickName'),
        },
        //个人中心 签名
        {
            name: 'signature',
            path: '/signature',
            component: loadView('views', 'user/signature'),
        },
        //发红包
        {
            name: 'sendWallet',
            path: '/sendWallet',
            component: loadView('views', 'user/sendWallet'),
        },
        //我的红包
        {
            name: 'myWallet',
            path: '/myWallet',
            component: loadView('views', 'user/myWallet'),
        },
        //红包详情
        {
            name: 'walletDetails',
            path: '/walletDetails',
            component: loadView('views', 'user/walletDetails'),
        },
        //编辑用户信息
        {
            name: 'editUser',
            path: '/editUser',
            component: loadView('views', 'user/editUser'),
        },

        //积分
        {
            name: 'classToken',
            path: '/classToken',
            component: loadView('views', 'wallet/classToken'),
        },
        //草稿箱
        {
            name: 'drafts',
            path: '/drafts',
            component: loadView('views', 'system/drafts'),
        },
        //消息中心
        {
            name: 'message',
            path: '/message',
            component: loadView('views', 'system/message'),
        },
        //消息列表
        {
            name: 'messageList',
            path: '/messageList',
            component: loadView('views', 'system/messageList'),
        },
        //邀请好友
        {
            name: 'invitation',
            path: '/invitation',
            component: loadView('views', 'system/invitation'),
        }
        ,
        //设置首页
        {
            name: 'set',
            path: '/set',
            component: loadView('views', 'set/set'),
        },
        //关于DDUP
        {
            name: 'aboutUs',
            path: '/aboutUs',
            component: loadView('views', 'set/aboutUs'),
        },
        //APP首页
        {
            name: 'home',
            path: '/home',
            component: loadView('views', 'class/home'),
        },
        //班级介绍
        {
            name: 'classInfo',
            path: '/classInfo',
            component: loadView('views', 'class/classInfo'),
        },
        //班级首页
        {
            name: 'classIndex',
            path: '/classIndex',
            component: loadView('views', 'class/classIndex'),
        },
        //班级搜索
        {
            name: 'classSearch',
            path: '/classSearch',
            component: loadView('views', 'class/classSearch'),
        },
        //班级更多
        {
            name: 'classMore',
            path: '/classMore',
            component: loadView('views', 'class/classMore'),
        },
        //班级更多编辑资料
        {
            name: 'editProfile',
            path: '/editProfile',
            component: loadView('views', 'class/editProfile'),
        },
        //班级更多编辑资料
        {
            name: 'classMember',
            path: '/classMember',
            component: loadView('views', 'class/classMember'),
        },
        //班级更多编辑资料
        {
            name: 'classDetails',
            path: '/classDetails',
            component: loadView('views', 'class/classDetails'),
        },
        //班级详情
        {
            name: 'classDetail',
            path: '/classDetail',
            component: loadView('views', 'class/classDetail'),
        },
        //班级详情
        {
            name: 'userDetail',
            path: '/userDetail',
            component: loadView('views', 'class/userDetail'),
        },
        //班级更多班级管理
        {
            name: 'classGovern',
            path: '/classGovern',
            component: loadView('views', 'class/classGovern'),
        },
        //精华主题列表
        {
            name: 'essences',
            path: '/essences',
            component: loadView('views', 'class/essences'),
        },
        //我已购班级
        {
            name: 'myClass',
            path: '/myClass',
            component: loadView('views', 'class/myClass'),
        },
        //搜索班级
        {
            name: 'findClass',
            path: '/findClass',
            component: loadView('views', 'class/findClass'),
        },
        //搜索班级列表
        {
            name: 'classSearchList',
            path: '/classSearchList',
            component: loadView('views', 'class/classSearchList'),
        },
        //搜索主题列表
        {
            name: 'postSearchList',
            path: '/postSearchList',
            component: loadView('views', 'class/postSearchList'),
        },
        //发现页面
        {
            name: 'find',
            path: '/find',
            component: loadView('views', 'class/find'),
        },
        //发表主题
        {
            name: 'sendPost',
            path: '/sendPost',
            component: loadView('views', 'class/sendPost'),
        },
        //创建班级
        {
            name: 'createClass',
            path: '/createClass',
            component: loadView('views', 'class/createClass'),
        },
        //设置费用
        {
            name: 'setMoney',
            path: '/setMoney',
            component: loadView('views', 'class/setMoney'),
        },
        //设置班级信息
        {
            name: 'setClassInfo',
            path: '/setClassInfo',
            component: loadView('views', 'class/setClassInfo'),
        },
        //搜索列表
        {
            name: 'userSearchList',
            path: '/userSearchList',
            component: loadView('views', 'class/userSearchList'),
        },
        //按日期搜索
        {
            name: 'searchDate',
            path: '/searchDate',
            component: loadView('views', 'class/searchDate'),
        },
        //按日期搜索内容
        {
            name: 'dateContent',
            path: '/dateContent',
            component: loadView('views', 'class/dateContent'),
        },
        //重置交易密码
        {
            name: 'resetTradePwd',
            path: '/resetTradePwd',
            component: loadView('views', 'set/resetTradePwd'),
        },
        //修改密码
        {
            name: 'changePwd',
            path: '/changePwd',
            component: loadView('views', 'set/changePwd'),
        },
        //修改支付密码
        {
            name: 'changeTradePwd',
            path: '/changeTradePwd',
            component: loadView('views', 'set/changeTradePwd'),
        },
        //我创建的班级
        {
            name: 'myCreate',
            path: '/myCreate',
            component: loadView('views', 'user/myCreate'),
        },
        //修改支付密码
        {
            name: 'myJoin',
            path: '/myJoin',
            component: loadView('views', 'user/myJoin'),
        },


        //-------------------------------------------钱包页面---------------------------------------------------//

        //我的钱包
        {
            name: 'wallet',
            path: '/wallet',
            component: loadView('views', 'wallet/wallet'),
        },
        {
            name: 'wallet_create',
            path: '/wallet/create',
            component: loadView('views', 'wallet/create'),
        },

        //钱包管理 walletManage
        {
            name: 'wallet_manage',
            path: '/wallet/manage',
            component: loadView('views', 'wallet/manage/index'),
        },
        //导入
        {
            name: 'wallet_manage_import',
            path: '/wallet/manage/import',
            component: loadView('views', 'wallet/manage/import'),
        },
        //导出
        {
            name: 'wallet_manage_private',
            path: '/wallet/manage/private',
            component: loadView('views', 'wallet/manage/private'),
        },

        {
            name: 'wallet_manage_keystore',
            path: '/wallet/manage/keystore',
            component: loadView('views', 'wallet/manage/keystore'),
        },
        // 备份钱包
        {
            name: 'wallet_backup_mnemonic',
            path: '/wallet/backup/mnemonic',
            component: loadView('views', 'wallet/backup/mnemonic'),
        },
        {
            name: 'wallet_backup_tip',
            path: '/wallet/backup/tip',
            component: loadView('views', 'wallet/backup/tip'),
        },
        {
            name: 'wallet_backup_verify',
            path: '/wallet/backup/verify',
            component: loadView('views', 'wallet/backup/verify'),
        },
        //Bancor交易
        {
            name: 'bancor_list',
            path: '/bancor/list',
            component: loadView('views', 'wallet/bancor/list'),
        },
        {
            name: 'bancor_count',
            path: '/bancor/count',
            component: loadView('views', 'wallet/bancor/count'),
        },
        {
            name: 'bancor_buy',
            path: '/bancor/buy',
            component: loadView('views', 'wallet/bancor/buy'),
        },
        {
            name: 'bancor_sell',
            path: '/bancor/sell',
            component: loadView('views', 'wallet/bancor/sell'),
        },
        {
            name: 'bancor_transfer_list',
            path: '/bancor/transfer/list',
            component: loadView('views', 'wallet/bancor/transfer/list'),
        },
        {
            name: 'bancor_transfer_detail',
            path: '/bancor/transfer/detail',
            component: loadView('views', 'wallet/bancor/transfer/detail'),
        },
        {
            name: 'bancor_transfer_index',
            path: '/bancor/transfer/index',
            component: loadView('views', 'wallet/bancor/transfer/index'),
        },

        //我的资产
        {
            name: 'assets',
            path: '/wallet/bancor/assets',
            component: loadView('views', 'wallet/bancor/assets'),
        },
        //vns
        {
            name: 'vns_list',
            path: '/vns/list',
            component: loadView('views', 'wallet/vns/list'),
        },
        {
            name: 'vns_detail',
            path: '/vns/detail',
            component: loadView('views', 'wallet/vns/detail'),
        },
        {
            name: 'vns_receive',
            path: '/vns/receive',
            component: loadView('views', 'wallet/vns/receive'),
        },
        {
            name: 'vns_transfer',
            path: '/vns/transfer',
            component: loadView('views', 'wallet/vns/transfer'),
        },

        //零钱 change
        {
            name: 'change_asset',
            path: '/change/asset',
            component: loadView('views', 'wallet/change/asset'),
        },
        {
            name: 'change_list',
            path: '/change/list',
            component: loadView('views', 'wallet/change/list'),
        },
        {
            name: 'token_list',
            path: '/change/tokenList',
            component: loadView('views', 'wallet/change/tokenList'),
        },
        {
            name: 'change_detail',
            path: '/change/detail',
            component: loadView('views', 'wallet/change/detail'),
        },
        {
            name: 'change_recharge',
            path: '/change/recharge',
            component: loadView('views', 'wallet/change/recharge'),
        },
        {
            name: 'change_withdraw',
            path: '/change/withdraw',
            component: loadView('views', 'wallet/change/withdraw'),
        },

        //合约部署
        {
            name: 'deploy',
            path: '/deploy',
            component: loadView('views', 'wallet/deploy'),
        },
    ]
})
