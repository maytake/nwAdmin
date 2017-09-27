 import React from 'react'
 import {
 	bindActionCreators
 } from 'redux'
 import {
 	connect
 } from 'react-redux'
 import {
 	is,
 	fromJS
 } from 'immutable';
 import {
 	Link,
 } from 'react-router'

 import {
 	message,
 	Layout,
 	Menu,
 	Icon,
 	Button,
 	Tree,
 	Tooltip,
 	Modal,
 	Input,
 	Form
 } from 'antd';
 const {
 	SubMenu
 } = Menu;
 const {
 	Header,
 	Content,
 	Sider
 } = Layout;
 const TreeNode = Tree.TreeNode;
 const FormItem = Form.Item;


 import * as Request from '../../fetch/center/index.js'
 import Base from '../../util/base.js'
 import * as AllDataAction from '../../actions/centerinfo'
 let ref

 const DepartMentForm = Form.create()(
 	(props) => {
 		const {
 			visible,
 			onCancel,
 			onCreate,
 			form,
 			confirmLoading,
 			title,
 			initModValue
 		} = props;
 		const {
 			getFieldDecorator
 		} = form;
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
		          <FormItem label="部门名称">
		            {getFieldDecorator('name', {
		            	initialValue: initModValue,
		              rules: [{ required: true, message: '请输入20个字以内的名称' }],
		            })(
		              <Input/>
		            )}
		          </FormItem>
		        </Form>
      		</Modal>
 		);
 	}
 );


 class Organize extends React.Component {
 	constructor(props, context) {
 		super(props, context);
 		this.state = {
 			visible: false,
 			visible_mod: false,
 			confirmLoading: false,
 			nowTreeNode: 0,
 			initModValue: '' //修改
 		}
 	}
 	componentDidMount() {
 		this.props.getTreeData();
 	}
 	shouldComponentUpdate(nextProps, nextState) {
 		return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
 	}

 	//关闭弹窗
 	handleCancel() {
 		this.setState({
 			visible: false,
 			visible_mod: false
 		});
 	}

 	saveFormRef(form) {
 		this.form = form;
 	}
 	saveFormRef2(form) {
 		this.form2 = form;
 	}

 	handleSubmit() {
 		var that = this;
 		if (this.state.visible) {
 			let form = this.form;
 			form.validateFields((err, values) => {
 				if (err) {
 					return;
 				}
 				form.resetFields();
 				this.setState({
 					confirmLoading: true
 				});
 				var obj = Object.assign({}, values, {
 					parent_id: this.state.nowTreeNode
 				})
 				Request.addDepartment(obj).then(data => {
 					Base.handleResult(data, function(data) {
 						that.setState({
 							visible: false,
 							confirmLoading: false,
 						});
 						that.props.getTreeData();
 					}, function() {
 						that.setState({
 							confirmLoading: false,
 						});
 					})
 				})
 			});
 		} else {
 			let form = this.form2;
 			form.validateFields((err, values) => {
 				if (err) {
 					return;
 				}
 				form.resetFields();
 				this.setState({
 					confirmLoading: true
 				});
 				var obj = Object.assign({}, values, {
 					id: this.state.nowTreeNode
 				})
 				Request.editDepartment(obj).then(data => {
 					Base.handleResult(data, function(data) {
 						that.setState({
 							visible_mod: false,
 							confirmLoading: false,
 						});
 						that.props.getTreeData();
 					}, function() {
 						that.setState({
 							confirmLoading: false,
 						});
 					})
 				})
 			});
 		}
 	}

 	//展示制定的弹窗
 	showFormWin(type) {
 		ref.destroy();
 		if (type == "edit") {
 			this.setState({
 				visible_mod: true
 			});
 		} else {
 			this.setState({
 				visible: true
 			});
 		}
 	}


 	//显示删除弹窗
 	delOrgFunc() {
 		ref.destroy();
 		var that = this;
 		Modal.confirm({
 			title: '系统提示',
 			content: '确定删除该部门吗？',
 			onOk() {
 				Request.delDepartment({
 					id: that.state.nowTreeNode
 				}).then(data => {
 					Base.handleResult(data, function(data) {
 						that.props.getTreeData();
 					})
 				})
 			}
 		});
 	}

 	//右键事件
 	onRightClick(checkedKeys, info) {
 		this.setState({
 			nowTreeNode: info.node.props.eventKey,
 			initModValue: info.node.props.title.split("(")[0] //处理bug
 		})
 		ref = Modal.info({
 			title: '可以进行以下操作',
 			content: (
 				<div style={{marginTop:24}}>
				 	<Button type="primary" style={{marginRight:10}} onClick={this.showFormWin.bind(this)}>新增</Button> 
					{checkedKeys[0] != "100001" ? <Button style={{marginRight:10}} onClick={this.showFormWin.bind(this,"edit")}>修改</Button> : ""}
					{info.node.props.children ||  checkedKeys[0] == "100001"? "" : <Button type="danger" onClick={this.delOrgFunc.bind(this)}>删除</Button> }
				</div>
 			)
 		});
 	}

 	//获取组织架构
 	generateMenu(menuObj) {
 		let vdom = [];
 		if (menuObj instanceof Array && menuObj.length > 0) {
 			for (var item of menuObj) {
 				vdom.push(this.generateMenu(item));
 			}
 		} else {
 			vdom.push(
 				<TreeNode title={menuObj.label+'(H'+menuObj.value +')'} key={menuObj.key}>
					{
						!!menuObj.children ? this.generateMenu(menuObj.children) : ""
					}
				</TreeNode>
 			);
 		}
 		return vdom;
 	}
 	render() {
 		const _treeData = this.props.tree_data;
 		if (!_treeData)
 			return false;
 		const buttonStyle = {
 			"marginRight": 10
 		}
 		return (
 			<div>
				<DepartMentForm 
					  ref={this.saveFormRef.bind(this)}
			          visible={this.state.visible}
			          onCancel={this.handleCancel.bind(this)}
			          onCreate={this.handleSubmit.bind(this)}
			          confirmLoading={this.state.confirmLoading}
			          title="新建子部门"
				/>
				<DepartMentForm 
					  ref={this.saveFormRef2.bind(this)}
			          visible={this.state.visible_mod}
			          onCancel={this.handleCancel.bind(this)}
			          onCreate={this.handleSubmit.bind(this)}
			          confirmLoading={this.state.confirmLoading}
			          initModValue = {this.state.initModValue}
			          title="修改部门名称"
				/>
				 <p style={{fontSize:20,marginBottom:24}}><span style={{marginRight:15}}>厦门和新电子商务有限公司</span><Tooltip placement="right" title='点击树结构进行操作'><Icon type="exclamation-circle" style={{ color: '#108ee9' }}/></Tooltip></p>  
		        {
		      	   _treeData.treeData.length
				  ?  <Tree showLine
				  	    defaultExpandedKeys = {['和新电商']}
				        onSelect={this.onRightClick.bind(this)}
				      >
				      	{
							this.generateMenu(_treeData.treeData)
						}
					 </Tree>
				  : '暂无数据'
			    }
		      </div>
 		)
 	}
 }


 function mapStateToProps(state) {
 	let treeData = state.centerinfo.tree_data;
 	return {
 		tree_data: treeData,
 	}
 }

 function mapDispatchToProps(dispatch) {
 	return {
 		getTreeData: bindActionCreators(AllDataAction.getTreeData, dispatch),
 		getMenuData: bindActionCreators(AllDataAction.getMenuData, dispatch)
 	}
 }
 export default connect(
 	mapStateToProps,
 	mapDispatchToProps
 )(Organize)