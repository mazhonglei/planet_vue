import {ethers} from 'ethers';
import * as bip39 from "bip39";

import {AESEncrypt} from '@/assets/js/utils/crypto'

function localStorageUtil(address) {
    let wallets = JSON.parse(localStorage.getItem("wallets")) ? JSON.parse(localStorage.getItem("wallets")) : [];
    if (wallets.indexOf(address) < 0) {
        wallets.push(address);
        localStorage.setItem("wallets", JSON.stringify(wallets));
        localStorage.setItem("walletActive", address);
        if (wallets.length === 1) {
            localStorage.setItem("walletCreate", address);
        }
        return true;
    } else {
        return false;
    }
}

///////////////////////////////////////////////////// 导入钱包 //////////////////////////////////////////////////////
/*
 * 导入钱包->keystore
 */
export function importByKeystore({keystore, pwd}) {

    return ethers.Wallet.fromEncryptedJson(keystore, pwd).then(function (wallet) {
        let address = wallet.address;
        let privateKey = wallet.privateKey;
        if (!localStorageUtil(address)) throw new Error("创建失败。");

        // 保存在本地
        localStorage.setItem(address, JSON.stringify({
            keystore: AESEncrypt({
                pwd: pwd,
                msg: keystore,
            }),
            mnemonic: "",
            pKey: AESEncrypt({
                pwd: pwd,
                msg: privateKey
            }),
            name: "",
            tip: "",
            backUp: 1,
            // avatar: require(`../../img/avatar/${count() % 10}.png`),
            index: count()
        }));
        return wallet;
    });
}

/*
 * 导入钱包->privateKey
 */
export function importByPrivate({privateKey, pwd, tip = ""}) {
    return new Promise(async (resolve, reject) => {
        try {
            let wallet = new ethers.Wallet(privateKey);
            let address = wallet.address;
            //TODO
            wallet.encrypt(pwd).then((keystore) => {
                let obj = JSON.parse(localStorage.getItem(address));
                obj.keystore = AESEncrypt({
                    pwd: pwd,
                    msg: keystore,
                });
                localStorage.setItem(address, JSON.stringify(obj));
            });

            if (!localStorageUtil(address)) reject("创建失败。");
            // 保存在本地
            localStorage.setItem(address, JSON.stringify({
                keystore: "",
                mnemonic: "",
                pKey: AESEncrypt({
                    pwd: pwd,
                    msg: privateKey
                }),
                name: "",
                tip: tip,
                backUp: 1,
                // avatar: require(`../../img/avatar/${count() % 10}.png`),
                index: count()
            }));
            resolve(wallet);
        } catch (e) {
            reject(e);
        }
    });
}


/*
 * 导入钱包->助记词
 */
export function importByWord({mnemonic, pwd, path = "m/44'/60'/0'/0/0", tip}) {
    return new Promise(async (resolve, reject) => {
        try {
            let wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
            let address = wallet.address;
            let privateKey = wallet.privateKey;
            //TODO
            wallet.encrypt(pwd).then((keystore) => {
                let obj = JSON.parse(localStorage.getItem(address));
                obj.keystore = AESEncrypt({
                    pwd: pwd,
                    msg: keystore,
                });
                localStorage.setItem(address, JSON.stringify(obj));
            });

            if (!localStorageUtil(address)) reject("创建失败。");

            // 保存信息到本地
            localStorage.setItem(address, JSON.stringify({
                keystore: "",
                mnemonic: AESEncrypt({
                    pwd: pwd,
                    msg: mnemonic,
                }),
                pKey: AESEncrypt({
                    pwd: pwd,
                    msg: privateKey
                }),
                name: "",
                tip: tip,
                backUp: 1,
                // avatar: require(`../../img/avatar/${count() % 10}.png`),
                index: count()
            }));
            // avatar: Math.floor(Math.random() * 10 + 1),

            resolve(wallet);
        } catch (e) {
            reject(e);
        }

    });
}


///////////////////////////////////////////////////// 创建钱包 //////////////////////////////////////////////////////
export function create({path = "m/44'/60'/0'/0/0", pwd = 'x', name = "", tip = ""}) {
    return new Promise(async (resolve, reject) => {
        try {
            let mnemonic = bip39.generateMnemonic();
            let wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
            let address = wallet.address;
            let privateKey = wallet.privateKey;
            //TODO
            wallet.encrypt(pwd).then((keystore) => {
                let obj = JSON.parse(localStorage.getItem(address));
                obj.keystore = AESEncrypt({
                    pwd: pwd,
                    msg: keystore,
                });
                localStorage.setItem(address, JSON.stringify(obj));
            });
            if (!localStorageUtil(address)) reject("创建失败。");

            //3.地址对应的keystore、助记词
            localStorage.setItem(address, JSON.stringify({
                keystore: "",
                mnemonic: AESEncrypt({
                    pwd: pwd,
                    msg: mnemonic,
                }),
                pKey: AESEncrypt({
                    pwd: pwd,
                    msg: privateKey
                }),
                name: name,
                tip: tip,
                backUp: 0,
                // avatar: require(`../../img/avatar/1.png`),
                index: 1
            }));
            // avatar: Math.floor(Math.random() * 10 + 1),

            resolve(wallet);
        } catch (e) {
            reject(e);
        }

    });

}

/*
 * 生成keystore
 */
export async function generateKeystore({pwd, pKey}) {
    let wallet = new ethers.Wallet(pKey);
    let address = wallet.address;
    return await wallet.encrypt(pwd).then((keystore) => {
        let obj = JSON.parse(localStorage.getItem(address));
        obj.keystore = AESEncrypt({
            pwd: pwd,
            msg: keystore,
        });
        localStorage.setItem(address, JSON.stringify(obj));
        return keystore;
    });
}


///////////////////////////////////////////////////// 导入钱包 //////////////////////////////////////////////////////
/*
 * 完成备份
 */
export function backupDone() {
    return new Promise((resolve, reject) => {
        try {
            let address = localStorage.getItem("walletActive");
            let json = JSON.parse(localStorage.getItem(address));
            json.backUp = 1;
            localStorage.setItem(address, JSON.stringify(json));
            resolve()
        } catch (e) {
            reject(e)
        }
    });
}

///////////////////////////////////////////////////// 钱包查询 //////////////////////////////////////////////////////
export function count() {
    let wallets = JSON.parse(localStorage.getItem("wallets")) ? JSON.parse(localStorage.getItem("wallets")) : [];
    return wallets.length;
}





