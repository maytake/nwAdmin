import React from 'react'
import {
	is,
	fromJS
} from 'immutable';
import {
	message,
	Form,
	Row,
	Col,
	Input,
	Modal,
	Button,
	Radio,
	TreeSelect,
	Select
} from 'antd';
import {
	bindActionCreators
} from 'redux'
import {
	connect
} from 'react-redux'
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const Option = Select.Option;

import {
	USER_TOKEN
} from '../../../../config/localStoreKey.js'
import Base from '../../../../util/base.js'

import * as Request from '../../../../fetch/center/index.js'


//批量修改的表单
const BatchForm = Form.create()(
	(props) => {
		const {
			visible,
			onCancel,
			onCreate,
			form,
			confirmLoading,
			title,
			Data,
			action
		} = props;
		const {
			getFieldDecorator
		} = form;
		const _label = action == "depart" ? "部门" : "岗位";
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
          <FormItem label={_label}>
               {
                  action == "depart"  ? (getFieldDecorator('department_id', {
                      rules: [{ required: true, message: '请选择部门' }],
                  })(
                     <TreeSelect
                      showSearch
                      treeNodeFilterProp = 'label'
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={Data}
                    treeDefaultExpandAll
                    placeholder="请选择部门"
                  />
                  )) : (getFieldDecorator('role_id', {
                          rules: [{ required: true, message: '请选择岗位' }],
                        })(
                         <Select 
                            showSearch
						    optionFilterProp="children"
                         	placeholder="请选择岗位"
                          >
                              {
                                Data.map(item =>{
                                  return (
                                    <Option key={item.value} value={item.value}>{item.title}</Option>
                                  )
                                })
                              }
                      </Select>
                    ))
                 }
          </FormItem>
        </Form>
      </Modal>
		);
	}
);

class PersonBat extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			confirmLoading: false
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
	}

	saveFormRef(form) {
		this.form = form;
	}
	saveFormRef2(form) {
		this.form2 = form;
	}

	showBatchMod(str) {
		if (this.props.rowData == "") {
			message.warning('请选择后,再进行操作');
			return false;
		}
		if (str == "1") {
			this.setState({
				"isVisibleDepart": true
			})
		} else {
			this.setState({
				"isVisibleRole": true
			})
		}
	}

	//批量修改
	batchMod() {
		var that = this;
		let form;
		let result;

		if (this.state.isVisibleDepart) {
			form = this.form;
		} else if (this.state.isVisibleRole) {
			form = this.form2;
		}
		form.validateFields((err, params) => {
			if (err) {
				return;
			}

			this.setState({
				loading: true
			});
			params.member_uuid_str = this.props.rowData;

			if (this.state.isVisibleDepart) {
				result = Request.batSetDepartment(params);
			} else if (this.state.isVisibleRole) {
				result = Request.batSetRole(params);
			}

			result.then(data => {
				Base.handleResult(data, function(data) {
					form.resetFields();
					that.setState({
						loading: false
					});
					that.closeUsrInfo();
					that.props.getDataList()
				})
			})
		})
	}

	closeUsrInfo() {
		this.setState({
			isVisibleDepart: false,
			isVisibleRole: false
		})
	}

	//批量启用禁用
	batSetStart(status) {
		if (this.props.rowData == "") {
			message.warning('请选择后,再进行操作');
			return false;
		}
		var that = this;
		Request.batSetStatus({
			member_uuid_str: this.props.rowData,
			status: status
		}).then(data => {
			Base.handleResult(data, function(data) {
				that.props.getDataList();
			})
		})
	}

	render() {
		const treeData = this.props.tree_data;
		const gwData = this.props.gw_data
		if (!treeData || !gwData)
			return false;
		const marginRight = {
			marginRight: 10
		}
		let newTreeData = Object.assign({}, treeData);
		if (newTreeData.treeData.length > 0) {
			newTreeData.treeData[0].disabled = true; //把第一个节点禁用掉
		}
		return (
			<div className="inlineBlock">
 					
 				<Button size="large" type="primary" onClick={this.showBatchMod.bind(this,"1")} style={marginRight}>批量编辑部门</Button>
	            <Button size="large" type="primary" onClick={this.showBatchMod.bind(this,"2")} style={marginRight}>批量编辑岗位</Button>
	            <ButtonGroup>
	              <Button size="large" type="primary" onClick={this.batSetStart.bind(this,"1")}>批量启用</Button>
	              <Button size="large" type="primary" onClick={this.batSetStart.bind(this,"2")}>批量禁用</Button>
	            </ButtonGroup>

	             <BatchForm 
		              ref={this.saveFormRef.bind(this)}
		              visible={this.state.isVisibleDepart}
		              onCancel={this.closeUsrInfo.bind(this)}
		              onCreate={this.batchMod.bind(this)}
		              confirmLoading={this.state.confirmLoading}
		              title="批量编辑部门"
		              Data = {newTreeData.treeData}
		              action = "depart"
		          />
		          <BatchForm 
		              ref={this.saveFormRef2.bind(this)}
		              visible={this.state.isVisibleRole}
		              onCancel={this.closeUsrInfo.bind(this)}
		              onCreate={this.batchMod.bind(this)}
		              confirmLoading={this.state.confirmLoading}
		              title="批量编辑岗位"
		              Data = {gwData.zhiWeiData}
		              action ="role"
		          />
 			</div>
		)
	}
}

function mapStateToProps(state) {
	let gwData = state.centerinfo.zhiwei_data;
	let treeData = state.centerinfo.tree_data;
	return {
		tree_data: treeData,
		gw_data: gwData
	}
}

function mapDispatchToProps(dispatch) {
	return {}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PersonBat)