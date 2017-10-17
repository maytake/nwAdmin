import 'whatwg-fetch'
import 'es6-promise'

import {
    USER_TOKEN
} from '../config/localStoreKey.js'
import Base from '../util/base'
import localStore from '../util/localStore'
// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {
    var result = '';
    for (var item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }

    if (result) {
        result = result.slice(1);
    }

    return result;
}

// 发送 post 请求
export function post(url, paramsObj) {

    let newParamsObj = Object.assign({}, paramsObj, {
        token: localStore.getItem(USER_TOKEN)
    });
    let hosturl = url;
    if (__DEV__) {
        hosturl = Base.baseUrl + url
    }

    var result = fetch(hosturl, {
        method: 'POST',
        mode: "cors",
        credentials: 'include',//表示允许跨越传递cookie，
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Token': localStore.getItem('access_token') || ''
        },
        body: obj2params(newParamsObj)
    }).then(res => {
        return res.json()
    });

    return result;
}
