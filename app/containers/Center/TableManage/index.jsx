import React from 'react'
import { Link } from 'react-router'
import { is, fromJS } from 'immutable';
import { message, Form, Row, Col, Input, Modal, Icon, Button, Table, Popconfirm, Tooltip } from 'antd';

import './TableList.less'
const FormItem = Form.Item;
import * as Request from '../../../fetch/center/index.js'
import { PAGECONF } from '../../../config/localStoreKey.js'
import Base from '../../../util/base.js'


class TableManage extends React.Component {
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
        this.getListData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    getListData(params = {}) {
        let that = this;
        Request.getTableList(params).then(data => {
          console.log(data)
          Base.handleResult(data, function(data) {
              let datalist = data.resultData.data;
              console.log(datalist)
              that.setState({data:datalist})
          })
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
                width: 100,
                render: () => <a href="#">action</a>,
            },
        ];
        return (
          <div className="TableList">
            <Table columns={columns} dataSource={this.state.data} scroll={{
                x: 1500,
                y: 300
            }} />
          </div>
            

        )
    }
}



export default TableManage