/**
 * 密码强度等级说明，字符包括：小写字母、大写字母、数字、特殊字符
 * 1---密码包含其中之一
 * 2---密码包含其中之二
 * 3---密码包含其中之三
 * 4---密码包含其中之四
 */
export function checkStrong(sPW) {
    if (sPW.length < 8 || sPW.length > 20)
        return 0; //密码太短或太长
    let Modes = 0;
    for (let i = 0; i < sPW.length; i++) {
        //测试每一个字符的类别并统计一共有多少种模式.
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}

/**
 * @return {number}
 */
function CharMode(iN) {
    if (iN >= 48 && iN <= 57) //数字
        return 1;
    if (iN >= 65 && iN <= 90) //大写字母
        return 2;
    if (iN >= 97 && iN <= 122) //小写
        return 4;
    else
        return 8; //特殊字符
}

/**
 * 统计字符类型
 */
function bitTotal(num) {
    let modes = 0;
    for (let i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}

export default {
    checkStrong: checkStrong
}
