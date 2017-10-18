import React from 'react'
import { bindActionCreators } from 'redux'
import { connect, } from 'react-redux'
import { hashHistory,Link,} from 'react-router'

import { Modal,  Layout, Icon, Button, Breadcrumb, Menu, message, Tooltip, BackTop } from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;



import { is, fromJS } from 'immutable';


import { USER_TOKEN } from '../config/localStoreKey.js'
import localStore from '../util/localStore'
//action
import * as AllDataAction from '../actions/centerinfo'
import * as Action from '../actions/collapsed'

import Head from './Head'
import LeftMenu from './LeftMenu'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            minHeight: '100%',
            collapsed: false
        };
        let obj = this.state.collapsed
        this.props.actionCollapsed(obj);

    }

    componentDidMount() {
        //如果不存在token 则直接掉转到登录页
        if (!localStore.getItem(USER_TOKEN)) {
            hashHistory.push('/Login')
        }
        this.setState({
            minHeight: window.innerHeight
        })
        //获取菜单数据
        this.props.getMenuData();


    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    componentDidUpdate(nextProps, nextState) {
        this.setState({
            collapsed: this.props.collapsed
        })
    }

    render() {

        return (
            <div>
                <Layout style={{
                minHeight: this.state.minHeight
            }}>
                <div className="ant-layout ant-layout-has-sider">
                        <LeftMenu collapsed={this.state.collapsed} openKey='4'/>

                        <Layout>
                            <Head />
                            <Content style={{
                                    margin: '20px 20px 0',
                                    position: "relative",
                                    overflow: 'initial'
                                }}>
                                <Breadcrumb style={{
                                    margin: '0 0 6px'
                                }}>
                                    <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item><Link to="/TableManage">列表页</Link></Breadcrumb.Item>
                                    <Breadcrumb.Item>详细页</Breadcrumb.Item>
                                </Breadcrumb>
                                <div style={{
                                        padding: 24,
                                        background: '#fff',
                                        minHeight: 360,
                                        position:'relative'
                                    }}>
                                    {this.props.children}
                                </div>
                            </Content>
                        </Layout>
                   </div> 

                </Layout>
                <BackTop />
            </div>

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
        getMenuData: bindActionCreators(AllDataAction.getMenuData, dispatch),
        actionCollapsed: bindActionCreators(Action.collapsed, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)