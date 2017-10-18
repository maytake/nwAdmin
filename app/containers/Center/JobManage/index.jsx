import React from 'react'
import { Link } from 'react-router'
import { is, fromJS } from 'immutable';
import { message, Form, Row, Col, Input, Modal, Icon, Button, Table, Popconfirm, Tooltip } from 'antd';

const FormItem = Form.Item;
import * as Request from '../../../fetch/center/index.js'

import { PAGECONF } from '../../../config/localStoreKey.js'

import Base from '../../../util/base.js'
import JobSearch from './subPage/JobSearch'
import JobTool from './subPage/JobTool'
import {post} from '../../../fetch/post.js'



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
            loading: false
        }
    }

    componentDidMount() {
        this.getGWListData();
       /* post('http://192.168.1.56:8080/ebeim-api/home/index/getmenu',{}).then(data=>{
            
        })*/
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    //显示弹窗  ----1
    editRoleInfo(type, record) {
        if (type == "edit") {
            this.setState({
                isVisibleEdit: true,
                record
            })
        } else {
            this.setState({
                isVisible: true,
            })
        }
    }

    //关闭弹窗  ----2
    closeWin() {
        this.setState({
            isVisible: false,
            isVisibleEdit: false
        })
    }

    //删除岗位
    delGwFunc(id) {
        var that = this;
        Request.delRole({
            id: id
        }).then(data => {
            Base.handleResult(data, function(data) {
                that.getGWListSearch();
            })
        })
    }

    //搜索
    onChangeSearch(values) {
        let pager = Object.assign({}, this.state.pagination, {
            current: 1,
        });

        this.setState({
            keyword: values.keyword ? values.keyword : "",
            pagination: pager
        }, () => {
            this.getGWListSearch()
        })
    }
    //获取搜索
    getGWListSearch() {
        const {pagination, keyword} = this.state;
        this.getGWListData({
            pagesize: pagination.pageSize,
            p: pagination.current,
            keyword: keyword
        });
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
        const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: record => ({
            disabled: record.key === 5,    
          }),
        };
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

                return (
                    <div>
						<Tooltip placement="top" title='编辑'>
			              <Icon  onClick={this.editRoleInfo.bind(this, "edit", record)}  type="edit"  size="large" style={{
                        fontSize: 16,
                        marginRight: 5
                    }}/>
			            </Tooltip>
			       
		            	<Popconfirm  title="确定删除该岗位吗？" onConfirm={this.delGwFunc.bind(this, record.role_id)} okText="是" cancelText="否">
			              <Icon  type="delete" style={{
                        fontSize: 16,
                        marginRight: 5
                    }}/>
			            </Popconfirm>
					</div>
                );
            }
        }]
        return (
            <div>
                <JobTool 
                    getDataList = {this.getGWListData.bind(this)}    
                    showEdit = {this.state.isVisibleEdit} 
                    showAdd = {this.state.isVisible}
                    closeWin = {this.closeWin.bind(this)}
                    showWin = {this.editRoleInfo.bind(this)}
                    record = {this.state.record}
                />
        		<JobSearch
            onChangeSearch = {this.onChangeSearch.bind(this)}
            />
        		<Table
            rowSelection={rowSelection} 
            dataSource={this.state.data}
            pagination={this.state.pagination}
            columns={columns}
            loading={this.state.loading}
            rowKey={record => record.role_id}
            bordered/>
        	   
               

        	</div>

        )
    }


}
export default JobManage