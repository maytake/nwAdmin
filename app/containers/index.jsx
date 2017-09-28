import React from 'react'
import { bindActionCreators } from 'redux'
import { connect, } from 'react-redux'
import { hashHistory } from 'react-router'

import { Modal, Layout, Icon, Button, Breadcrumb, Menu, message, Tooltip, BackTop } from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;



import { is, fromJS } from 'immutable';


import { USER_TOKEN } from '../config/localStoreKey.js'
import localStore from '../util/localStore'
//action
import * as AllDataAction from '../actions/centerinfo'

import Head from './Head'
import LeftMenu from './LeftMenu'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            minHeight: '100%',
        };
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



    render() {
        return (
            <div>
                <Layout style={{
                minHeight: this.state.minHeight
            }}>
                    <Head/>
                    <Layout>
                        <Sider width={200} >
                            <LeftMenu  openKey='4'/>
                        </Sider>
                        <Layout style={{ padding: '24px  0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '12px 0' }}>
                                <Breadcrumb.Item>首页</Breadcrumb.Item>
                                <Breadcrumb.Item>列表页</Breadcrumb.Item>
                                <Breadcrumb.Item>详细页</Breadcrumb.Item>
                            </Breadcrumb>
                          <Content style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                position: "relative"
            }}>
                            
                            {this.props.children}
                          </Content>
                        </Layout>
                    </Layout>
                </Layout>
                <BackTop />
            </div>

        )
    }
}


// ------------------- 绑定 --------------------

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        getMenuData: bindActionCreators(AllDataAction.getMenuData, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)