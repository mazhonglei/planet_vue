let emptyFunc = function () {

};
/* eslint-disable */

export function myAlert({msg, callBack = emptyFunc, title = '', button = "确定"}) {
    if (typeof plus != 'undefined') {
        plus.nativeUI.alert(msg, callBack, title, button);
    } else {
        alert(msg);
        callBack();
    }
}