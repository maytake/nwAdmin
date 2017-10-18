import React from 'react'
import { Form, Row, Col, Input, Button, Select, DatePicker, TimePicker, Switch,InputNumber,  Radio,
  Slider,  } from 'antd';
import './TableForm.less'
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class AddForm extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() { 
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        };
        const rangeConfig = {
          rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
         const config = {
          rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        return (
            <Form >
                    <Row gutter={16}>
                        <Col span={12}>
                          <FormItem label="姓名"   {...formItemLayout}>
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
                      <Col span={12}>
                          <FormItem label="年龄"  {...formItemLayout}>
                            {getFieldDecorator('age', {

                                rules: [{
                                    required: true,
                                    message: '请输入20个字以内的名称'
                                }],
                            })(
                                <Input />
                            )}
                          </FormItem>
                       </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                          <FormItem
                          {...formItemLayout}
                          label=" 请选择日期">
                          
                          {getFieldDecorator('datePicker', config)(
                            <DatePicker />
                          )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                          <FormItem label="查找范围"   {...formItemLayout}>
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
                    </Row>
                     <Row gutter={16}>
                        <Col span={12}>
                            <FormItem
                              {...formItemLayout}
                              label="InputNumber"
                            >
                              {getFieldDecorator('input-number', { initialValue: 3 })(
                                <InputNumber min={1} max={10} />
                              )}
                              <span className="ant-form-text"> machines</span>
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                              {...formItemLayout}
                              label="Switch"
                            >
                              {getFieldDecorator('switch', { valuePropName: 'checked' })(
                                <Switch />
                              )}
                            </FormItem>
                        </Col>
                    </Row>
                    
                    <Row gutter={16}>
                        <Col span={12}>
                             <FormItem
                              {...formItemLayout}
                              label="Select[multiple]"
                            >
                              {getFieldDecorator('select-multiple', {
                                rules: [
                                  { required: true, message: 'Please select your favourite colors!', type: 'array' },
                                ],
                              })(
                                <Select mode="multiple" placeholder="Please select favourite colors">
                                  <Option value="red">Red</Option>
                                  <Option value="green">Green</Option>
                                  <Option value="blue">Blue</Option>
                                </Select>
                              )}
                            </FormItem>

                        </Col>
                        <Col span={12}>
                            <FormItem
                              {...formItemLayout}
                              label="Slider"
                            >
                              {getFieldDecorator('slider')(
                                <Slider marks={{ 0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F' }} />
                              )}
                            </FormItem>

                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
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
                        <Col span={12}>
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
                    </Row>
  

                </Form>
        );
    }
}


export default Form.create()(AddForm);