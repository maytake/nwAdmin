import React from 'react'
import { Form, Icon, Row, Col, Input, Modal, Button, } from 'antd';
const FormItem = Form.Item;



class AddForm extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.props.form.validateFields();
    }

    render() {
      console.log(this.props)
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="vertical">
                  <FormItem label="岗位名称">
                    {getFieldDecorator('role_name', {
                        initialValue: '请输入名称',
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