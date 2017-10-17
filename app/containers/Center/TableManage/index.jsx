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
import ModalForm from './subPage/ModalForm.jsx'


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
            selectRange:"",
            timePicker:"",
            record: {}, //单行当数据
            loading: false,
            editId:"",
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
    reloadListData(data) {
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
                let datalist=data.resultData.data;
                _this.setState({
                    data:datalist,
                    loading: false
                })
            })
        })
    }

    //添加显示
    addShowModel(){

        this.setState({
            visible:true,
            isVisibleEdit:false
        })
    }

    //编辑表格
    editListData(id){
          
         this.setState({
            visible:true,
            isVisibleEdit:true,
            editId : id
        })
    }
    //搜索内容
    searchTable(values){
        let pager = Object.assign({}, this.state.pagination, {
            current: 1,
        });
        this.setState({
            keyWord: values.keyWord ? values.keyWord : "",
            timePicker: values.timePicker ? values.timePicker : "",
            selectRange: values.selectRange ? values.selectRange : "",
            pagination: pager
        },()=>{
            this.getSearchTable()
        })
        
    }
    //获取搜索
    getSearchTable(){
        const {pagination, keyWord, timePicker, selectRange}=this.state;
        console.log(timePicker)
        this.getListData({
            pagesize: pagination.pageSize,
            p: pagination.current,
            keyWord: keyWord,
            timePicker:timePicker,
            selectRange:selectRange
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
        const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          }

        };
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
            { title: 'Column 8', dataIndex: 'address', key: '8', width: 150  },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 150,
                render: (text, record, index) => {
                    return(
                        <div>
                        <Button onClick={this.editListData.bind(this, record.key)} size="small" type="primary" icon="delete" style={{
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
                    
                    <ModalForm 
                    visible={this.state.visible}
                    isVisibleEdit={this.state.isVisibleEdit} 
                    handleOpen={this.handleOpen.bind(this)} 
                    handleClose={this.handleClose.bind(this)}
                    getListData = {this.getListData.bind(this)}
                    reloadListData = {this.reloadListData.bind(this)}
                    editId = {this.state.editId}
                    />
                    <Button type="primary" icon="plus-circle-o"  onClick={this.addShowModel.bind(this)} style={{position:"absolute",left:24,top:24}}>
                      添加
                    </Button>


                    <TableSearch searchTable={this.searchTable.bind(this)}/>
                </div>
                <div className="ant-table-wrapper TableList">
                    <Table
                    rowSelection={rowSelection} 
                    columns={columns} 
                    dataSource={this.state.data}
                    pagination={this.state.pagination} 
                    loading={this.state.loading}
                    rowKey={record => record.key}
                    scroll={{
                        x: 1500
                      
                    }} />
                  </div>
            </div>
          
            

        )
    }
}



export default TableManage