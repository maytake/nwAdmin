import React from 'react'
import { Link } from 'react-router'
import { is, fromJS } from 'immutable';
import { message, Form, Row, Col, Input, Modal, Icon, Button, Table, Popconfirm, Tooltip } from 'antd';


import TableManageList from '../DataManage'
import * as Request from '../../../fetch/center/index.js'
import Base from '../../../util/base.js'

class TableManage extends React.Component {
    constructor(props, context) {
        super(props, context);

        
        this.state = {
            columns:'',
            getTableListFn:Request.getTableList,
            delTableListFn:Request.delTableList
        }
    }
    componentDidMount() {
        
    }
    parentsEvents(TableManageList){
        //获取表格
        /*TableManageList.getListData({},Request.getTableList);
        TableManageList.delRow(id,Request.delTableList);*/
        
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    render() {

        //划分表格行列
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
            { title: 'Column 8', dataIndex: 'address', key: '8', width: 150 },
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
        return(
                <TableManageList 
                ref={this.parentsEvents.bind(this)} 
                columns={columns}
                getTableListFn={this.state.getTableListFn}
                delTableListFn={this.state.delTableListFn}
                editListData= {this.editListData.bind(this, record.key)}
                delRow= {this.delRow.bind(this, record.key)}
                 />
                
                
                
            )
    }

}

export default TableManage