import React from 'react'
import { Form, Icon, Row, Col, Input, Modal, Button, } from 'antd';
const FormItem = Form.Item;



class AddForm extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() { 
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
          labelCol: { span: 5 },
          wrapperCol: { span: 19 },
        };
        return (
            <Form >
                  <FormItem label="岗位名称" layout="vertical"  {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: '你老师',
                        rules: [{
                            required: true,
                            message: '请输入20个字以内的名称'
                        }],
                    })(
                        <Input />
                    )}
                  </FormItem>
                  <FormItem label="年龄" layout="vertical"  {...formItemLayout}>
                    {getFieldDecorator('age', {

                        rules: [{
                            required: true,
                            message: '请输入20个字以内的名称'
                        }],
                    })(
                        <Input />
                    )}
                  </FormItem>
                </Form>
        );
    }
}


export default Form.create()(AddForm);