import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { is, fromJS } from 'immutable';
import { Layout, Menu, Avatar, Dropdown } from 'antd'
const {Header} = Layout
import { bindActionCreators } from 'redux'
//引入常量
import { CURFIRSTMENU, DEFAULTPARENT, DEFAULTCURRENT } from '../../config/localStoreKey.js'
import localStore from '../../util/localStore.js'

import Base from '../../util/base.js'
import { hashHistory } from 'react-router'

class HeadCompontent extends React.Component {
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

    clickMenu(item) {

        this.props.menuAction({
            flag: item.key
        });
        localStore.setItem(CURFIRSTMENU, item.key);



    }

    render() {
        const firstMenu = this.props.firstMenu;
        if (!firstMenu)
            return false;

        const menu = (
        <Menu  onClick={this.exitLogin.bind(this)}>
              <Menu.Item key="100033">
              </Menu.Item>
              <Menu.Item key="100022">
                 <span >退出登录</span>
              </Menu.Item>
            </Menu>
        )
        let DefMenu = localStore.getItem(CURFIRSTMENU) ? localStore.getItem(CURFIRSTMENU) : "Oa"
        return (
            <Header className="header">
                <div style={{
                marginLeft:'-50px'
            }} className="logo" />
                <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[DefMenu]}
            style={{
                lineHeight: '80px'
            }}
            onClick={this.clickMenu.bind(this)}
            >

             {
            firstMenu.map(item => {
                return (
                    <Menu.Item key={item.index}><Link to={item.index}>{item.title}</Link></Menu.Item>
                )
            })
            }
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

export default HeadCompontent;