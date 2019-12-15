import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import {mapActions} from 'vuex'
import ElementUI from 'element-ui'
import Mui from 'vue-awesome-mui'
import Loading from './components/loading';
import VueClipboard from 'vue-clipboard2';
// 多语言插件
import VueI18n from 'vue-i18n'
import {emoji} from './utils/emoji'

import fastClick from 'fastclick'

fastClick.attach(document.body);			//手机环境点击0.2秒延迟强制取消

Vue.prototype.emoji = emoji
Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: localStorage.getItem("lang") ? localStorage.getItem("lang") : 'zh-CN',
    messages: {
        'zh-CN': require('./assets/js/language/cn/index'),   // 中文语言包
        'en-US': require('./assets/js/language/en/index')    // 英文语言包
    }
});
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.use(Mui)
Vue.use(Mint);
Vue.use(ElementUI);
Vue.component('Loading', Loading);


import Vuex from 'vuex'
import uploader from 'vue-easy-uploader'

Vue.use(Vuex);
Vue.use(uploader, store)

import Tabbar from './components/Tabbar';

Vue.component('Tabbar', Tabbar)
//引入遮罩层
import SharePopup from './components/SharePopup'

Vue.component('SharePopup', SharePopup)

Vue.use(VueClipboard);

Vue.config.productionTip = false

Vue.prototype.showEmojifir = function (tBody) {
    // to do
    return emoji(tBody);
};

Vue.mixin({
    /* eslint-disable */
    filters: {
        //舍入过滤器
        roundOff(num, digit) {
            num = parseFloat(num);
            return (Math.floor(num * Math.pow(10, digit)) / Math.pow(10, digit)).toFixed(digit);
        },

        time2Date: function (timestamp) {
            let time = new Date(timestamp * 1000);
            let y = time.getFullYear();
            let m = time.getMonth() + 1;
            let d = time.getDate();
            let h = time.getHours();
            let mm = time.getMinutes();
            let s = time.getSeconds();
            return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
        },

        imgPath: function (value, defaultImg = 'head_default') {
            if (value) {
                return site + value;
            } else {
                return require('@/assets/img/' + defaultImg + '.png');
            }
        }
    },
    computed: {
        // ...mapState(['alert_shot','fromRouter']),
        // ...mapMutations(['mAlert_shot','mFromRouter'])
        /*...mapState("wallet", [
            "walletActive", "walletCreate", "walletDecode"
        ]),
        ...mapState("modal", [
            "alert_shot", "success", "alert_little", "prompt"
        ]),*/

    },
    created() {
        //禁止滚动
        function disabledMouseWheel() {
            if (document.addEventListener) {
                document.addEventListener('DOMMouseScroll', scrollFunc, false);
            }//W3C
            window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome
        }

        function scrollFunc(evt) {
            evt = evt || window.event;
            if (evt.preventDefault) {
                // Firefox
                evt.preventDefault();
                evt.stopPropagation();
            } else {
                // IE
                evt.cancelBubble = true;
                evt.returnValue = false;
            }
            return false;
        }

        window.onload = disabledMouseWheel;
    },
    methods: {
        changeRoute(newRoute, routeQuery = {}) {
            router.push({path: newRoute, query: routeQuery});
        },
        backRoute() {
            router.go(-1);
        },
        replaceRoute(newRoute, routeQuery = {}) {
            router.replace({path: newRoute, query: routeQuery});
        },
        addressSub(address = '', length = 10) {
            return address.substring(0, length) + "..." + address.substring(address.length - length, address.length);
        },
        isImmersed: function () {
            if (typeof plus != "undefined") {
                return plus.navigator.isImmersedStatusbar();
            } else {
                return false;
            }
        },
        ...mapActions([
            "aAlert_shot", "aFromRouter"
        ]),
        ...mapActions('wallet', [
            'aWalletCreate',
            'aWalletActive',
            "aWalletDecode"
        ]),
        ...mapActions('modal', [
            'aSuccess',
            'aAlert_shot',
            'aAlert_little',
            'aPrompt'
        ]),
    }
});

new Vue({
    router,
    i18n,
    store,
    render: h => h(App),
}).$mount('#app')
