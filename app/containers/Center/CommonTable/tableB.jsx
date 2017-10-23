import React from 'react'
import { Link } from 'react-router'
import { is, fromJS } from 'immutable';
import { message, Form, Row, Col, Input, Modal, Icon, Button, Table, Popconfirm, Tooltip } from 'antd';


import TableManageList from '../DataManage'


class TableManage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }
    componentDidMount() {
        this.refs.parentsEvents
    }
    render() {
        return(
                <TableManageList ref="parentsEvents"/>
            )
    }

}

export default TableManage