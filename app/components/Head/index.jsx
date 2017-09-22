import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { is, fromJS } from 'immutable';
import { Layout, Menu, Avatar, Dropdown } from 'antd'
const {Header} = Layout
import { bindActionCreators } from 'redux'


import Base from '../../util/base.js'
import { hashHistory } from 'react-router'

class Head extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isVisible: false, //控制密码窗口的显示
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }


    //退出事件
    exitLogin({key}) {
        if (key == 100022) {
            Base.loginOutThing();
        }
    }

    showModal() {
        this.setState({
            isVisible: true
        });
    }



    render() {

        const menu = (
        <Menu  onClick={this.exitLogin.bind(this)}>
             
              <Menu.Item key="100033">

              </Menu.Item>
              <Menu.Item key="100022">
                 <span >退出登录</span>
              </Menu.Item>
            </Menu>
        )
        let DefMenu = "1"
        return (
            <Header className="header">
                <div className="logo" />
                <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[DefMenu]}
            style={{
                lineHeight: '80px'
            }}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
                <div className="userHead">
                  <Dropdown overlay={menu} placement="bottomCenter">
                     <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="large" />
                  </Dropdown>
                </div>
            </Header>
        )
    }
}

export default Head;