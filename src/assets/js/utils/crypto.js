import * as CryptoJS from 'crypto-js';


/**
 * @return {string}
 */
export function AESEncrypt({pwd, msg}) {
    const key = CryptoJS.MD5(pwd).toString();
    return CryptoJS.AES.encrypt(msg, key).toString();
}

/**
 * @return {string}
 */
export function AESDecrypt({pwd, msg}) {
    const key = CryptoJS.MD5(pwd).toString();
    return CryptoJS.AES.decrypt(msg, key).toString(CryptoJS.enc.Utf8);
}


