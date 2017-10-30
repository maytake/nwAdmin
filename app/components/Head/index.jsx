import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { is, fromJS } from 'immutable';
import { Layout, Menu, Avatar, Dropdown, Icon } from 'antd'
const {Header} = Layout
import { bindActionCreators } from 'redux'
//引入常量
import { CURFIRSTMENU, DEFAULTPARENT, DEFAULTCURRENT } from '../../config/localStoreKey.js'
import localStore from '../../util/localStore.js'
import * as Action from '../../actions/collapsed'
import Base from '../../util/base.js'
import { hashHistory } from 'react-router'
import './Head.css'
class HeadCompontent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isVisible: false, //控制密码窗口的显示
            collapsed: true
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
    toggle() {
        let collapsedInfo = this.props.collapsed;
        collapsedInfo=!collapsedInfo
        this.props.actionCollapsed(collapsedInfo)

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
               <Icon
            className="trigger"
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle.bind(this)}
            />
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
                        <Menu.Item key={item.src}><Link to={item.src}>{item.title}</Link></Menu.Item>
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

// ------------------- 绑定 --------------------

function mapStateToProps(state) {
    return {
        collapsed: state.collapsed
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionCollapsed:bindActionCreators(Action.collapsed, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeadCompontent)