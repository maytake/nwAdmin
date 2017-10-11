import React from 'react'
import { Link } from 'react-router'
import { is, fromJS } from 'immutable';
import { message, Form, Row, Col, Input, Modal, Icon, Button, Table, Popconfirm, Tooltip } from 'antd';

import './TableList.less'
const FormItem = Form.Item;
import * as Request from '../../../fetch/center/index.js'
import { PAGECONF } from '../../../config/localStoreKey.js'
import Base from '../../../util/base.js'

//添加栏和搜索
import TableAdd from './subPage/TableAdd.jsx'
import TableSearch from './subPage/TableSearch.jsx'


class TableManage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            pagination: PAGECONF,
            loading: false,
            visible: false, //控制编辑窗口的现实隐藏
            isVisibleEdit: false,
            keyWord: "",
            record: {}, //单行当数据
            loading: false
        }
    }

    componentDidMount() {
        this.getListData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    //获取表格数据
    getListData(params = {}) {
        this.setState({
            loading: true
        });
        let that = this;
        Request.getTableList(params).then(data => {
          Base.handleResult(data, function(data) {
              let datalist = data.resultData.data;
              let pager =  Object.assign({}, that.state.pagination, {
                    total: parseInt(datalist.count)
                })
              that.setState({
                data:datalist.list,
                pagination:pager,
                loading: false
              })
          })
        })

    }

    //添加表格
    addListData(data) {
        this.setState({
            data
        })
    }
    
    //删除一行表格
    delRow(id){
        this.setState({
            loading: true
        });
        var _this=this;
        Request.addTableList({
            id: id
        }).then(data=>{
            
            Base.handleResult(data, function(data){
                console.log(data)
                let datalist=data.resultData.data;
                console.log(datalist);
                _this.setState({
                    data:datalist,
                    loading: false
                })
            })
        })
    }
    //搜索内容
    searchTable(values){
        let pager = Object.assign({}, this.state.pagination, {
            current: 1,
        });
        this.setState({
            keyWord: values.keyWord ? values.keyWord : "",
            pagination: pager
        },()=>{
            this.getSearchTable()
        })
        
    }
    //获取搜索
    getSearchTable(){
        const {pagination, keyWord}=this.state;
        this.getListData({
            pagesize: pagination.pageSize,
            p: pagination.current,
            keyWord: keyWord
        })
    }
    //打开弹窗
    handleOpen(){
        this.setState({
            visible:true
        })
    }
    //关闭弹窗
    handleClose(){
        this.setState({
             visible:false
        })
    }
    render() {
        const columns = [
            { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
            { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
            { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
            { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
            { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
            { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
            { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
            { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
            { title: 'Column 8', dataIndex: 'address', key: '8' },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 150,
                render: (text, record, index) => {
                    return(
                        <div>
                        <Button size="small" type="primary" icon="delete" style={{
                                marginRight: 5
                            }}>编辑</Button>
                            
                        <Popconfirm  title="确定删除该岗位吗？" onConfirm={this.delRow.bind(this, record.key)} okText="是" cancelText="否">
                          <Button size="small" type="danger" icon="delete" style={{
                                marginRight: 5
                            }}>删除</Button>
                        
                        </Popconfirm>
                        </div>
                        )

                },
            },
        ];
        return (
            <div>

                <div >
                    
                    <TableAdd 
                    visible={this.state.visible} 
                    handleOpen={this.handleOpen.bind(this)} 
                    handleClose={this.handleClose.bind(this)}
                    getListData = {this.getListData.bind(this)}
                    addListData = {this.addListData.bind(this)}
                    />
                    <TableSearch searchTable={this.searchTable.bind(this)}/>
                </div>
                <div className="ant-table-wrapper TableList">
                    <Table 
                    columns={columns} 
                    dataSource={this.state.data}
                    pagination={this.state.pagination} 
                    loading={this.state.loading}
                    rowKey={record => record.key}
                    scroll={{
                        x: 1500,
                        y: 300
                    }} />
                  </div>
            </div>
          
            

        )
    }
}



export default TableManage