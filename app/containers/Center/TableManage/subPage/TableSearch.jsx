import React from 'react'
import { Link } from 'react-router'
import { is, fromJS } from 'immutable';

import { Form, Row, Col, Input, Button, Select, DatePicker, TimePicker, } from 'antd';
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;


class TableSearch extends React.Component {
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
        const rangeConfig = {
          rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch.bind(this)} >
                <Row gutter={16} type="flex" justify="end">
                    <Col span={6}>
                        <FormItem
                          {...formItemLayout}
                          label=" 请选择日期"
                        >
                          {getFieldDecorator('range-time-picker', rangeConfig)(
                            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                          )}
                        </FormItem>
                    </Col>

                    <Col span={5}>
                        <FormItem label="岗位名称" layout="vertical"  
                         {...formItemLayout}>
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
                    </Col>

                    <Col span={5}>
                        <FormItem
                          {...formItemLayout}
                          label="查找范围"
                        >
                          {getFieldDecorator('select-single', {
                            rules: [
                              { required: true, message: 'Please select your favourite colors!' },
                            ],
                          })(
                            <Select placeholder="Please select favourite colors">
                              <Option value="red">Red</Option>
                              <Option value="green">Green</Option>
                              <Option value="blue">Blue</Option>
                            </Select>
                          )}
                        </FormItem>
                    </Col>

                    <Col span={2}>
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
export default Form.create()(TableSearch);