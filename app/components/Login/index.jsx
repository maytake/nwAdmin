import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


import './style.less'
import Logo from '../../static/img/logo_line.png';



class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            loading: false
        }
    }
    handleSubmit(e) {
        var that = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const loginHandle = that.props.loginHandle
                {/*加载中...*/}
                that.props.loadInit(true)
                {/*登陆*/}
                loginHandle(values);
       
            }
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
        
        <div className="login-bg"></div>
        
        
        <div id="login-wrap">
          
          <img className="login-logo" src={Logo}/>
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem>
                  {getFieldDecorator('username', {
                rules: [{
                    required: true,
                    message: '请输入员工工号！'
                }],
            })(
                <Input prefix={<Icon type="user" style={{
                    fontSize: 13
                }} />} placeholder="员工工号" />
            )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                rules: [{
                    required: true,
                    message: '请输入登录密码！'
                }],
            })(
                <Input prefix={<Icon type="lock" style={{
                    fontSize: 13
                }} />} type="password" placeholder="登录密码" />
            )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                  {getFieldDecorator('remember', {
                valuePropName: 'checked'
            })(
                <Checkbox>记住密码</Checkbox>
            )}
                </FormItem>
              </Form>
        </div>
        <div className='copyRight'>© 2007-2017 纳网版权所有     信息产业部备案：闽ICP备425号-0</div>
      </div>
        );
    }


}



const LoginComponent = Form.create()(Login);
export default LoginComponent;

