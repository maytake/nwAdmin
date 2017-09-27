import React from 'react'
import { Link } from 'react-router'
import { is, fromJS } from 'immutable';
import { message, Form, Row, Col, Input, Modal, Icon, Button, Table, Popconfirm, Tooltip } from 'antd';

const FormItem = Form.Item;
import * as Request from '../../../fetch/center/index.js'

import { PAGECONF } from '../../../config/localStoreKey.js'

import Base from '../../../util/base.js'



class JobManage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            pagination: PAGECONF,
            loading: false,
            isVisible: false, //控制编辑窗口的现实隐藏
            isVisibleEdit: false,
            keyword: "",
            record: {}, //单行当数据
            loading:false
        }
    }

    componentDidMount() {
        this.getGWListData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }


    //获取当前岗位列表
    getGWListData(params = {}) {
        this.setState({
            loading: true
        });
        var that = this;
        Request.getRoleList(params).then(data => {
            Base.handleResult(data, function(data) {
                let Global = data.resultData;
                let pager = Object.assign({}, that.state.pagination, {
                    total: parseInt(Global.data.count)
                })
                that.setState({
                    loading: false,
                    data: Global.data.list,
                    pagination: pager
                });
            })
        })
    }


    render() {
        	const columns = [{
			title: '岗位编号',
			width: '40%',
			dataIndex: 'role_num',
			key: 'role_num'
		}, {
			title: '岗位名称',
			width: '40%',
			dataIndex: 'role_name',
			key: 'role_name'
		}, {
			title: '操作',
			width: '20%',
			key: 'operation',
			render: (text, record, index) => {
				let _url = "/JobPower/role/" + record.role_id;
				return (
					<div>
						<Tooltip placement="top" title='编辑'>
			              <Icon  onClick={this.editRoleInfo.bind(this,"edit",record)}  type="edit"  size="large" style={{ fontSize: 16 ,marginRight:5}}/>
			            </Tooltip>
			            <Tooltip placement="top" title='设置权限'>
			            	<Link to={_url}>
			              		<Icon type="link" style={{ "color" : "rgba(0, 0, 0, 0.65)",fontSize: 16 ,marginRight:5}}/>
			              	</Link>
			            </Tooltip>
		            	<Popconfirm  title="确定删除该岗位吗？" onConfirm={this.delGwFunc.bind(this,record.role_id)} okText="是" cancelText="否">
			              <Icon  type="delete" style={{ fontSize: 16 ,marginRight:5}}/>
			            </Popconfirm>
					</div>
				);
			}
		}]
        return (
        	<div>
        		<Table 
		        dataSource={this.state.data} 
		        columns={columns}
		        loading={this.state.loading}  
		        bordered/>
        	
        	</div>

        	)
    }


}
export default JobManage