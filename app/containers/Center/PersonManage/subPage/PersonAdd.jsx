import React from 'react'
import {
	is,
	fromJS
} from 'immutable';
import {
	bindActionCreators
} from 'redux'
import {
	connect
} from 'react-redux'
import * as Request from '../../../../fetch/center/index.js'
import Base from '../../../../util/base.js'

import {
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
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: {
		span: 4
	},
	wrapperCol: {
		span: 16
	},
};
const MemberForm = Form.create()(
	(props) => {
		const {
			visible,
			onCancel,
			onCreate,
			form,
			treedata,
			gwdata,
			rowData,
			actionType,
			isPowerName
		} = props;
		const {
			getFieldDecorator
		} = form;
		let _title = actionType != "edit" ? "添加员工" : "编辑员工";
		return (
			<Modal
            visible={visible}
            title={_title}
            okText="确定"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              {
              	actionType == "add" ? "" : (
					 <FormItem {...formItemLayout} label="员工工号">
		                {
		                  rowData.job_id            
		                }
		              </FormItem>
              	)
              }
             
                <FormItem {...formItemLayout} label="姓名">
                {
                  actionType != "edit" || isPowerName == "1" ? (getFieldDecorator('member_name', {
                    initialValue: rowData.member_name,
                    rules: [{ required: true, message: '请输入20个以内姓名' ,max:20}],
                  })(
                    <Input />
                  )) : rowData.member_name
                 }
              </FormItem>
               <FormItem {...formItemLayout} label="部门">
                 {
                 	treedata.length > 0 || actionType != "edit" ? (getFieldDecorator('department_id', {
	                  initialValue: rowData.department_id,
	                  rules: [{ required: true, message: '请选择部门' }],
	                })(
	                   <TreeSelect
	                  showSearch
                      treeNodeFilterProp = 'label'
	                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
	                  treeData={treedata}
	                  placeholder="请选择部门"
	                  treeDefaultExpandAll
	                />
	                )) : rowData.department_name
                 }
              </FormItem>
                <FormItem {...formItemLayout} label="岗位">
                {
                	gwdata.length > 0 || actionType != "edit" ?(getFieldDecorator('role_id', {
	                  initialValue: rowData.role_id,
	                  rules: [{ required: true, message: '请选择岗位' }],
	                })(
	                 <Select 
						showSearch
						optionFilterProp="children"
	                 	placeholder="请选择岗位">
	                      {
	                        gwdata.map(item =>{
	                          return (
	                            <Option key={item.value} value={item.value}>{item.title}</Option>
	                          )
	                        })
	                      }
		             </Select>
	                )): rowData.role_name
                }
              </FormItem>
               <FormItem {...formItemLayout} label="性别" className="collection-create-form_last-form-item">
                {getFieldDecorator('sex', {
            initialValue: rowData.sex=="男" ? '1' : '2',
                })(
                  <Radio.Group>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </Radio.Group>
                )}
              </FormItem>
                <FormItem {...formItemLayout} label="手机号码">
                {getFieldDecorator('mobile', {
                  initialValue: rowData.mobile,
                  rules: [{ required: true, message: '请输入纯数字的手机号'}],
                })(
                  <Input />
                )}
              </FormItem>
               <FormItem {...formItemLayout} label="状态" className="collection-create-form_last-form-item">
                {getFieldDecorator('status', {
                  initialValue:rowData.status ? rowData.status : '1',
                })(
                  <Radio.Group>
                    <Radio value="0">屏蔽</Radio>
                    <Radio value="1">正常</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            </Form>
          </Modal>
		);
	}
);

class PersonAdd extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			confirmLoading: false,
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
	}
	saveFormRef3(form) {
		this.form3 = form;
	}
	sureAddFunc(departArr, roleArr) {
		const form = this.form3;
		var that = this;
		const _act = this.props.actionType;
		const _valid = ['mobile', 'status', 'sex']

		if (_act == "add") {
			_valid.push('member_name', 'department_id', 'role_id');
		} else {
			//有权限的时候 ， 再进行校验
			if (this.props.isPowerName == "1") {
				_valid.push('member_name');
			}
			if (departArr.length > 0) {
				_valid.push('department_id')
			}
			if (roleArr.length > 0) {
				_valid.push('role_id');
			}
		}

		form.validateFields(_valid, (err, params) => {
			if (err) {
				return;
			}
			this.setState({
				loading: true
			});
			let result;

			if (_act == "edit") {
				let newParams = Object.assign({}, this.props.record, params)
				newParams.member_uuid = this.props.record.uuid;
				result = Request.editMember(newParams);
			} else {
				result = Request.addMember(params);
			}

			result.then(data => {
				Base.handleResult(data, function(data) {
					form.resetFields();
					that.setState({
						loading: false
					});
					that.props.closeWin();
					that.props.getDataList();
				})
			})
		});
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
				<MemberForm
	              visible = {this.props.visible}
	              onCancel={() =>{this.props.closeWin();this.form3.resetFields();}}
	              onCreate={()=> {this.sureAddFunc(newTreeData.treeData,gwData.zhiWeiData)}}
	              ref={this.saveFormRef3.bind(this)}
				  treedata={newTreeData.treeData}
				  gwdata={gwData.zhiWeiData}
	              rowData = {this.props.record}
	              actionType = {this.props.actionType}
	              isPowerName = {this.props.isPowerName}
	            />
				 <Button onClick={()=>{this.props.showWin("add")}} type="primary" icon="user-add" shape="circle"  size="large" style={marginRight}></Button>
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
)(PersonAdd)