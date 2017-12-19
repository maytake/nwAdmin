import React from 'react'
import { Link } from 'react-router'
import { is, fromJS } from 'immutable';

import { Form, Row, Col, Input, Button, Select, Switch, Radio,
 Slider, Icon, DatePicker, TimePicker, InputNumber, AutoComplete,} from 'antd';
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;



class TableSearch extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    //获取提交的values
    handleSearch(e) {
        let that=this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err){
                return
            }
            console.log(values)
            that.props.searchTable(values);
        });
    }


    //重置
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

        const ColProps = {
          xs: 24,
          sm: 12,
          style: {
            marginBottom: 16,
          },
        }

        const TwoColProps =Object.assign({}, ColProps, { xl: 96 }) 

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            },
        };

        const config = {
          rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        
        const rangeConfig = {
          rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };

        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch.bind(this)} >
                <Row gutter={24} >
                    <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
                        <FormItem
                          {...formItemLayout}
                          label=" 请选择日期"
                        >
                          {getFieldDecorator('timePicker', rangeConfig)(
                            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                          )}
                        </FormItem>
                    </Col>

                    <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
                        <FormItem
                          {...formItemLayout}
                          label="请选择日期"
                        >
                          {getFieldDecorator('date-time-picker', config)(
                            <DatePicker  format="YYYY-MM-DD HH:mm:ss" />
                          )}
                        </FormItem>
                    </Col>

                    <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
                        <FormItem label="岗位名称" layout="vertical"  
                          {...formItemLayout}>
                          {getFieldDecorator('keyWord', {
                              initialValue: '',
                              rules: [{
                                  required: true,
                                  message: '请输入20个字以内的名称'
                              }],
                          })(
                              <Input type="text" placeholder="请输入20个字以内的名称" />
                          )}
                        </FormItem>
                    </Col>

                    <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
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
                  
                    <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
                       <FormItem label="输入密码" layout="vertical"  
                          {...formItemLayout}>
                          {getFieldDecorator('password', {
                              initialValue: '',
                              rules: [{
                                  required: true,
                                  message: '请输入20个字以内的名称'
                              }],
                          })(
                              <Input  type="password" placeholder="Password" />
                          )}
                        </FormItem>
                    </Col>

                    <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
                        <FormItem label="inline"
                          label="选择日期"
                          {...formItemLayout}
                        >
                          <Col span={11}>
                            <FormItem >
                              {getFieldDecorator('date-time-picker', config)(
                                <DatePicker  format="YYYY-MM-DD HH:mm:ss" />
                              )}
                            </FormItem>
                          </Col>
                          <Col span={2}>
                            <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                              -
                            </span>
                          </Col>
                          <Col span={11}>
                            <FormItem>
                              {getFieldDecorator('date-time-picker', config)(
                                <DatePicker  format="YYYY-MM-DD HH:mm:ss" />
                              )}
                            </FormItem>
                          </Col>
                        </FormItem>
                    </Col> 

                    <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
                        <FormItem
                          {...formItemLayout}
                          label="输入数字"
                        >
                          {getFieldDecorator('input-number', { initialValue: 3 })(
                            <InputNumber min={1} max={10} />
                          )}
                          <span className="ant-form-text"> machines</span>
                        </FormItem>
                    </Col>

                    <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
                        <FormItem
                          {...formItemLayout}
                          label="Switch"
                        >
                          {getFieldDecorator('switch', { valuePropName: 'checked' })(
                            <Switch />
                          )}
                        </FormItem>
                    </Col>

                    <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
                          <FormItem
                            {...formItemLayout}
                            label="Radio.Group"
                          >
                            {getFieldDecorator('radio-group')(
                              <RadioGroup>
                                <Radio value="a">item 1</Radio>
                                <Radio value="b">item 2</Radio>
                                <Radio value="c">item 3</Radio>
                              </RadioGroup>
                            )}
                          </FormItem>
                    </Col>

                    <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
                          <FormItem
                            {...formItemLayout}
                            label="Radio.Button"
                          >
                            {getFieldDecorator('radio-button')(
                              <RadioGroup>
                                <RadioButton value="a">item 1</RadioButton>
                                <RadioButton value="b">item 2</RadioButton>
                                <RadioButton value="c">item 3</RadioButton>
                              </RadioGroup>
                            )}
                          </FormItem>
                    </Col>


                    <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
                       <FormItem label="输入密码" layout="vertical"  
                          {...formItemLayout}>
                          {getFieldDecorator('password', {
                              initialValue: '',
                              rules: [{
                                  required: true,
                                  message: '请输入20个字以内的名称'
                              }],
                          })(
                              <Input  type="password" placeholder="Password" />
                          )}
                        </FormItem>
                    </Col>

                    <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
                       <FormItem label="输入密码" layout="vertical"  
                          {...formItemLayout}>
                          {getFieldDecorator('password', {
                              initialValue: '',
                              rules: [{
                                  required: true,
                                  message: '请输入20个字以内的名称'
                              }],
                          })(
                              <Input  type="password" placeholder="Password" />
                          )}
                        </FormItem>
                    </Col>


                </Row>


                <Row gutter={16} type="flex" justify="end" style={{marginBottom: 16}}>

                   <Col span={24}>
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