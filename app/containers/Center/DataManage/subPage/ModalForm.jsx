import React from 'react'
import { Link } from 'react-router'
import { is, fromJS } from 'immutable';
import { Form, Icon, Row, Col, Input, Modal, Button, } from 'antd';
import AddForm from '../../../../components/Form/TableForm.jsx'
import './centerModal.less'
import * as Request from '../../../../fetch/center/index.js'
import Base from '../../../../util/base.js'
class ModalForm extends React.Component {
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
    saveFormRef(form) {
      this.form = form;
    }

    //创建和修改岗位弹窗 
    handleForm() {
        var that = this;
        var form = this.form;
        let isEditShow = this.props.isVisibleEdit
       if(isEditShow){
          //编辑状态下的弹窗
          form.validateFields((err, params) => {
            if (err) {
              return;
            }
            this.setState({
              confirmLoading: true
            });
            let _params = params
            let editId = this.props.editId;
            _params = Object.assign({}, params,{id:editId})
            this.props.editListDataFn(_params).then(data => {
              Base.handleResult(data, function(result) {
                that.setState({
                  confirmLoading: false,
                });
                that.props.handleClose();
                form.resetFields();
                //重新加载数据
                let resdata = result.resultData.data
                that.props.reloadListData(resdata)
              }, function() {
                that.setState({
                  confirmLoading: false,
                });
              })
            })

          });
       }else{
          form.validateFields((err, params) => {
            if (err) {
              return;
            }
            this.setState({
              confirmLoading: true
            });
            let _params = params
            _params = Object.assign({}, params)
            this.props.editListDataFn(_params).then(data => {
              Base.handleResult(data, function(result) {
                that.setState({
                  confirmLoading: false,
                });
                that.props.handleClose();
                form.resetFields();
                //重新加载数据
                let resdata = result.resultData.data
                that.props.reloadListData(resdata)
              }, function() {
                that.setState({
                  confirmLoading: false,
                });
              })
            })

          });
       }

      
    }


    //打开弹窗

    handleOk(e) {
        this.handleForm()
    }
    handleCancel(e) {
       this.props.handleClose()

    }
    render() {
      
        return (
            <div>
              <Modal
                  width = '820px'
                  title="添加表格"
                  confirmLoading={this.state.confirmLoading}
                  wrapClassName="vertical-center-modal"
                  visible={this.props.visible}
                  onOk={this.handleOk.bind(this)}
                  onCancel={this.handleCancel.bind(this)}
                  >
                  <AddForm 
                  ref={this.saveFormRef.bind(this)}
                  handleForm={this.handleForm.bind(this)}
                  />
              </Modal>
              
            </div>
        );
    }
}

export default ModalForm;
