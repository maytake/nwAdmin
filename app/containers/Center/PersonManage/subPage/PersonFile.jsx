import React from 'react'
import {
	Upload,
	message,
	Modal,
	Icon,
	Button
} from 'antd';
import {
	is,
	fromJS
} from 'immutable';

import
fileName
from '../../../../static/file/import_person.xlsx'

import {
	USER_TOKEN
} from '../../../../config/localStoreKey.js'
import Base from '../../../../util/base.js'

class PersonFile extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			visible: false
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
	}
	addPersonFunc() {
		this.setState({
			visible: true,
		});
	}
	handleCancel() {
		this.setState({
			visible: false
		});
	}
	render() {
		const {
			visible,
			loading
		} = this.state;
		let hostUrl = '/home/member/import?token=' + Base.getItem(USER_TOKEN)
		let url = this.props.downUrl;
		if (__DEV__) {
			hostUrl = Base.baseUrl + hostUrl;
			url = Base.baseUrl + url;
		}
		const props = {
			name: 'file',
			action: hostUrl,
			accept: '.xlsx',
			headers: {
				authorization: 'authorization-text',
			},

			onChange(info) {
				if (info.file.status === 'done') {
					let status = info.file.response;
					if (status.resultId == 1) {
						message.success(`${info.file.name} 导入成功`, 1, function() {
							location.reload();
						});
					} else {
						Modal.error({
							title: '系统提示',
							content: status.resultMsg,
						});
					}
				} else if (info.file.status === 'error') {
					Modal.error({
						title: '系统提示',
						content: `${info.file.name} 导入格式有误，请检查表格内容，编辑之后再导入。`,
					});
				}
			}
		};
		const marginRight = {
			marginRight: 10
		}

		return (
			<div style={{display:'inline-block'}}>
				<Modal
                  visible={visible}
                  title="导入成员"
                  onCancel={this.handleCancel.bind(this)}
                  footer={[]}
                >
                  <p style={{marginBottom:"15px"}}>请选择导入文件：<a href={fileName} download>下载模板</a></p>
                  <Upload {...props}>
					<Button>
				      <Icon type="upload" />选择文件
				    </Button> 
				   </Upload>
                </Modal>

 				<Button type="primary" onClick={this.addPersonFunc.bind(this)} icon="upload" shape="circle" size="large" style={marginRight}></Button>
 				<a href={url} ><Button type="primary" icon="download" shape="circle" size="large" style={marginRight}></Button></a>
 				 
 			</div>
		)
	}
}
export default PersonFile