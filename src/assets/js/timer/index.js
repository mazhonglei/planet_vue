import {getVNSBalance} from "../etherjs/account";
import store from "@/store/index";
import axios from "axios";
import {site} from '@/assets/js/config/site.js';

export function synBalance() {
    // 获取当前walletActive
    synBalanceOnce();
    setInterval(() => {
        synBalanceOnce();
    }, 15000);
}

export function synBalanceOnce() {
    // 获取当前walletActive
    let address = localStorage.getItem("walletActive");
    if (address) {
        try {
            // getETHBalance(address).then((ETH) => {
            //     store.dispatch('aBalance', {ETH})
            // });
            return getVNSBalance(address).then((VNS) => {
                store.dispatch('balance/aBalance', {VNS})
            });
        } catch (err) {
            console.log(err)
        }

    }
}

export function synCurrency() {
    axios.get(site + '/api/publics/getPrice').then((response) => {
        let VNS = response.data.data.last;
        store.dispatch('balance/aCurrency', {VNS});
    }).catch((err) => {
        console.log(err);
    })
}

export async function synExchange() {
    try {
        let USD = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot').then((response) => {
            return response.data.data.amount;
        });
        let CNY = await axios.get('https://api.coinbase.com/v2/prices/BTC-CNY/spot').then((response) => {
            return response.data.data.amount;
        });
        let rate = CNY / USD;
        let type = localStorage.getItem("currency") ? localStorage.getItem("currency") : "USD";

        store.dispatch('balance/aExchange', {rate, type});
    } catch (e) {
        console.log(e);
    }

}

export function synWallet() {
    //1.active地址
    let addressActive = localStorage.getItem("walletActive");
    if (addressActive) {
        let obj = JSON.parse(localStorage.getItem(addressActive));
        let addressObj = {
            address: addressActive,
            keystore: obj.keystore,
            backUp: obj.backUp,
            mnemonic: obj.mnemonic ? obj.mnemonic : "",
            name: obj.name ? obj.name : "",
            pKey: obj.pKey,
            tip: obj.tip ? obj.tip : "",
            avatar: obj.avatar,
            index: obj.index
        };
        store.dispatch('wallet/aWalletActive', addressObj)
    }

    //2.create地址
    let addressCreate = localStorage.getItem("walletCreate");
    if (addressCreate) {
        let obj = JSON.parse(localStorage.getItem(addressCreate));
        let addressObj = {
            address: addressCreate,
            keystore: obj.keystore,
            backUp: obj.backUp,
            mnemonic: obj.mnemonic ? obj.mnemonic : "",
            name: obj.name ? obj.name : "",
            pKey: obj.pKey,
            tip: obj.tip ? obj.tip : "",
            avatar: obj.avatar,
        };
        store.dispatch('wallet/aWalletCreate', addressObj)
    }
}

