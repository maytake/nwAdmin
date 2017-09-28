import React from 'react'
import { Link } from 'react-router'
import { is, fromJS } from 'immutable';

import { Form, Row, Col, Input, Button, } from 'antd';
const FormItem = Form.Item;

class JobSearch extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    handleSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.props.onChangeSearch(values);
        });
    }

    restSearchForm() {
        this.props.form.setFieldsValue({
            keyword: ""
        });

        this.props.onChangeSearch({
            keyword: ""
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            },
        };
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch.bind(this)} >
                <Row gutter={20} type="flex" justify="end">
                  <Col span={6} key="name">
                    <FormItem {...formItemLayout} >
                     {getFieldDecorator('keyword', {
            })(<Input size="large" placeholder="请输入需要查找名称" style={{
                height: "32px"
            }}  />)}
                    </FormItem>
                  </Col>
                  <Col span={4} key="search">
                  	<div className="searchButton">
	                  	<Button type="primary" htmlType="submit"  style={{
                marginRight: 4,
                marginLeft: 4
            }}>查找</Button>
	                  	<Button onClick={this.restSearchForm.bind(this)} style={{
                marginRight: 4,
                marginLeft: 4
            }} >重置</Button>
                  	</div>
                  </Col>
                </Row>
             </Form>
        )
    }
}
export default Form.create()(JobSearch);