import React from 'react'
import { Link } from 'react-router'
import { is, fromJS } from 'immutable';

import { Form, Row, Col, Input, Button, Select, DatePicker, TimePicker, } from 'antd';
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;

class TableSearch extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    handleSearch(e) {
        let that=this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err){
                return
            }
            that.props.searchTable(values);
        });
    }

    restSearchForm() {
      this.props.form.setFieldsValue({
            keyWord: "",
            timePicker:"",
            selectRange:""
      });
      this.props.searchTable({
            keyWord: "",
            timePicker:"",
            selectRange:""
      });

    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            },
        };
        const rangeConfig = {
          rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch.bind(this)} >
                <Row gutter={16} type="flex" justify="end">
                    <Col span={7}>
                        <FormItem
                          {...formItemLayout}
                          label=" 请选择日期"
                        >
                          {getFieldDecorator('timePicker', rangeConfig)(
                            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                          )}
                        </FormItem>
                    </Col>

                    <Col span={6}>
                        <FormItem label="岗位名称" layout="vertical"  
                          {...formItemLayout}>
                          {getFieldDecorator('keyWord', {
                              initialValue: '',
                              rules: [{
                                  required: true,
                                  message: '请输入20个字以内的名称'
                              }],
                          })(
                              <Input />
                          )}
                        </FormItem>
                    </Col>

                    <Col span={6}>
                        <FormItem
                          {...formItemLayout}
                          label="查找范围"
                          >
                          {getFieldDecorator('selectRange', {
                            rules: [
                              { required: true, message: '请选择范围' },
                            ],
                          })(
                            <Select placeholder="请选择范围">
                              <Option value="red">Red</Option>
                              <Option value="green">Green</Option>
                              <Option value="blue">Blue</Option>
                            </Select>
                          )}
                        </FormItem>
                    </Col>

                    <Col span={3}>
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