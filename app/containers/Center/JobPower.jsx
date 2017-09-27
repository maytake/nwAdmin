import React from 'react'
import {
	bindActionCreators
} from 'redux'
import {
	Link
} from 'react-router'
import {
	connect
} from 'react-redux'
import {
	is,
	fromJS
} from 'immutable';

import {
	message,
	Icon,
	Button,
	Tree,
	Popconfirm,
	Tooltip,
	Modal
} from 'antd';
const TreeNode = Tree.TreeNode;



import * as Request from '../../fetch/center/index.js'

import Base from '../../util/base.js'

let treeNode = [];

class JobPower extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			treeData: [], //树节点
			checkTree: [], //默认选中的树 初始化用的
			checkDots: [], //选中的节点
			halfDot: [] //半选中的节点
		}
	}
	componentDidMount() {
		this.getTreeData()
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
	}


	goBack() {
		history.back();
	}

	getTreeData() {
		let obj = this.props.params;
		var that = this;
		//岗位的
		if (obj.type == 'role') {
			Request.getRolePower({
				id: obj.tid
			}).then(data => {
				Base.handleResult(data, function(data) {
					let Global = data.resultData.data;
					that.setState({
						treeData: Global.node_list,
						checkTree: Global.node_ids.split(',')
					})
				})

			})
		} else if (obj.type == "person") {
			//成员的
			Request.getMemberPower({
				member_uuid: obj.tid
			}).then(data => {
				Base.handleResult(data, function(data) {
					let Global = data.resultData.data;
					let arr = Global.node_ids ? Global.node_ids.split(',') : [];
					that.setState({
						treeData: Global.node_list,
						checkTree: arr
					})
				})
			})
		}
	}

	onCheck(checkedKeys, e) {
		this.setState({
			checkDots: checkedKeys,
			halfDot: e.halfCheckedKeys
		})
	}

	savePower() {
		let obj = this.props.params;
		var that = this;
		if (obj.type == 'role') {
			//岗位的
			Request.setRolePower({
				id: obj.tid,
				node_ids: this.state.checkDots.concat(this.state.halfDot),
				node_ids_str: this.state.checkDots
			}).then(data => {
				Base.handleResult(data, function(data) {
					message.success(data.resultMsg, 1, function() {
						that.goBack()
					});
				}, function() {
					this.setState({
						confirmLoading: false,
					});
				})
			})
		} else if (obj.type == "person") {
			//成员的
			Request.setMemberPower({
				member_uuid: obj.tid,
				node_ids: this.state.checkDots.concat(this.state.halfDot),
				node_ids_str: this.state.checkDots
			}).then(data => {
				Base.handleResult(data, function(data) {
					message.success(data.resultMsg, 1, function() {
						that.goBack()
					});
				}, function() {
					this.setState({
						confirmLoading: false,
					});
				})
			})
		}
	}

	generateMenu(menuObj, cb) {
		let vdom = [];
		if (menuObj instanceof Array && menuObj.length > 0) {
			for (var item of menuObj) {
				vdom.push(this.generateMenu(item));
			}
		} else {
			vdom.push(
				<TreeNode title={menuObj.title} key={menuObj.id}>
					{
						!!menuObj.child && menuObj.child.length > 0 ? this.generateMenu(menuObj.child) : ""
					}
				</TreeNode>
			);
			if (menuObj.is_select == "1") {
				treeNode.push(menuObj.id)
			}
		}
		return vdom;
	}
	render() {
		return (
			<div>
                <div style={{height:50}}>
                    <Button type="primary" onClick= {this.goBack.bind(this)} style={{marginRight: 5}}>返回</Button>
                    <Button type="primary" onClick= {this.savePower.bind(this)}>保存</Button>  
                </div>
               	 {
		      	   this.state.treeData.length
				  ?  <Tree checkable
				        defaultCheckedKeys={this.state.checkTree}
				        onCheck = {this.onCheck.bind(this)}
				      >
				      	{
							this.generateMenu(this.state.treeData)
						}
					 </Tree>
				  : '正在加载'
			    }   
			</div>
		);
	}
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(JobPower)