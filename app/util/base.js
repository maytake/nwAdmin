import { hashHistory } from 'react-router'

import { Modal, } from 'antd';
import { loginOut } from '../fetch/login/index'
import { USER_TOKEN } from '../config/localStoreKey.js'
import localStore from './localStore'


export default {
    tipForm: false,
    //接口地址
    baseUrl: 'http://192.168.1.56:8080/ ',
    //处理后台返回数据
    handleResult: function(result, success, err) {
        var that = this;
        if (result.resultId == "1") { //成功
            success(result);
        } else if (result.resultId == "0") { //失败
            Modal.error({
                title: '系统提示',
                content: result.resultMsg
            });
            err();
        } else if (result.resultId == -10) { //异常
            if (!this.tipForm) {
                Modal.error({
                    title: '系统提示',
                    content: result.resultMsg,
                    onOk() {
                        that.loginOutThing();
                    }
                });
                this.tipForm = true;
            }
        }
    },
    loginOutThing: function() {
        var that = this;
        var result = loginOut().then(data => {
            that.handleResult(data, function() {
                localStore.setItem(USER_TOKEN, "");
                hashHistory.push('/Login');
            })
        })
    },
    //删除含有undefined字段
    delUndefinedCode(obj){
        Object.keys(obj).forEach((item)=>{
            if(obj[item]==undefined){
                delete obj[item]
            }
        })
        return obj;
    },

}