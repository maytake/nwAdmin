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


class TableManageList extends React.Component {
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
        let getTableListFn = this.props.getTableListFn;
        this.getListData({}, getTableListFn);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    //获取表格数据
    getListData(params = {}, fn) {
        if(!(typeof fn == 'function')){
            fn=this.props.getTableListFn
        } 
        this.setState({
            loading: true
        });
        let that = this;
        fn(params).then(data => {
            //处理获取的数据
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
    delRow(id,fn){
        if(!(typeof fn == 'function')){
            fn=this.props.delTableListFn
        } 
        this.setState({
            loading: true
        });
        var _this=this;
        fn({
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

    //编辑显示
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

        return (
            <div>

                <div style={{ position:'relative'}}>  
                    <ModalForm
                    editListDataFn={this.props.editListDataFn}
                    visible={this.state.visible}
                    isVisibleEdit={this.state.isVisibleEdit} 
                    handleOpen={this.handleOpen.bind(this)} 
                    handleClose={this.handleClose.bind(this)}
                    getListData = {this.getListData.bind(this)}
                    reloadListData = {this.reloadListData.bind(this)}
                    editId = {this.state.editId}
                    />

                    <TableSearch searchTable={this.searchTable.bind(this)}/>

                    <Button type="primary" icon="plus-circle-o"  onClick={this.addShowModel.bind(this)} style={{position:'absolute',bottom:'0'}}>
                      添加
                    </Button>
                    
                </div>
                <div className="ant-table-wrapper TableList">
                    <Table
                    rowSelection={rowSelection} 
                    columns={this.props.columns} 
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



export default TableManageList