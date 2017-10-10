import React from 'react'
import {
	Link
} from 'react-router'
import {
	is,
	fromJS
} from 'immutable';
import * as Request from '../../../../fetch/center/index.js'
import Base from '../../../../util/base.js'

import {
	Form,
	Row,
	Col,
	Input,
	Modal,
	Button,
} from 'antd';
const FormItem = Form.Item;

const RoleForm = Form.create()(
	(props) => {
		
		const {
			visible,
			onCancel,
			onCreate,
			form,
			confirmLoading,
			title,
			record,
		} = props;

		const {
			getFieldDecorator
		} = form;
		var initValue = record ? record.role_name : ""
		return (
			<Modal
		        visible={visible}
		        confirmLoading = {confirmLoading}
		        title={title}
		        okText="确定"
		        onCancel={onCancel}
		        onOk={onCreate}
		      >
		        <Form layout="vertical">
		          <FormItem label="岗位名称">
		            {getFieldDecorator('role_name', {
						initialValue: initValue,
		              rules: [{ required: true, message: '请输入20个字以内的名称' }],
		            })(
		              <Input />
		            )}
		          </FormItem>
		        </Form>
		      </Modal>
		);
	}
);

class JobTool extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			confirmLoading: false
		}
	}
	saveFormRef(form) {
		this.form = form
	}
	saveFormRef2(form) {
		this.form2 = form;
	}
	shouldComponentUpdate(nextProps, nextState) {
		return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
	}


	//创建和修改岗位弹窗  ----3
	handleRoleForm() {
		var that = this;
		if (this.props.showEdit) {
			var form = this.form2;
			form.validateFields((err, params) => {
				if (err) {
					return;
				}
				this.setState({
					confirmLoading: true
				});
				let _params = params
				_params = Object.assign({}, params, {
					id: this.props.record.role_id
				})
				Request.editRole(_params).then(data => {
					Base.handleResult(data, function(data) {
						that.setState({
							confirmLoading: false,
						});
						that.props.closeWin();
						form.resetFields();
						that.props.getDataList();
					}, function() {
						that.setState({
							confirmLoading: false,
						});
					})
				})

			});
		} else {
			var form = this.form;
			form.validateFields((err, params) => {
				if (err) {
					return;
				}
				this.setState({
					confirmLoading: true
				});
				let _params = params

				Request.addRole(_params).then(data => {
					Base.handleResult(data, function(data) {
						that.setState({
							confirmLoading: false,
						});
						that.props.closeWin();
						form.resetFields();
						that.props.getDataList();
					}, function() {
						that.setState({
							confirmLoading: false,
						});
					})
				})
			});
		}
	}
	render() {
		return (
			<div>
				<RoleForm 
				  ref={this.saveFormRef.bind(this)}
		          visible={this.props.showAdd}
		          onCancel={()=>{this.props.closeWin()}}
		          onCreate={this.handleRoleForm.bind(this)}
		          confirmLoading={this.state.confirmLoading}
		          title="添加岗位"
				/>
				<RoleForm
				  ref={this.saveFormRef2.bind(this)}
		          visible={this.props.showEdit}
		          onCancel={()=>{this.props.closeWin()}}
		          onCreate={this.handleRoleForm.bind(this)}
		          confirmLoading={this.state.confirmLoading}
		          record = {this.props.record}
		          title="修改岗位名称"
				/>
				<div style={{position:"absolute",left:24,top:24}}>
                    <Button onClick={this.props.showWin.bind("add")} type="primary" icon="user-add" shape="circle"  size="large" style={{marginRight:'10px'}}></Button>              
                </div>
			</div>
		)
	}
}
export default JobTool;