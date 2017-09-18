import {
	hashHistory
} from 'react-router'

export default {
	tipForm: false,
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
						that.loginOut();
					}
				});
				this.tipForm = true;
			}
		}
	},

}