import React from 'react'
import { Link } from 'react-router'
import { is, fromJS } from 'immutable';
import { Form, Icon, Row, Col, Input, Modal, Button, } from 'antd';
import AddForm from './TableForm.jsx'

class TableAdd extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false,
            confirmLoading: false
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }




    //打开弹窗
    openModel(){
      this.props.handleOpen()
    }
    handleOk(e) {
        this.props.handleClose()
    }
    handleCancel(e) {
       this.props.handleClose()

    }
    render() {
      
        return (
            <div>
              <Modal
                  title="Basic Modal"
                  visible={this.props.visible}
                  onOk={this.handleOk.bind(this)}
                  onCancel={this.handleCancel.bind(this)}
                  >
                  <AddForm/>

              </Modal>

              <Button type="primary" icon="plus-circle-o"  onClick={this.openModel.bind(this)}>
                      Add
              </Button>
            </div>
        );
    }
}

export default TableAdd;
