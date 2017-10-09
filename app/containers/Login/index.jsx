import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import { message, Button, Spin } from 'antd';
//设置缓存
import localStore from '../../util/localStore'
import Base from '../../util/base'

//引入action
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import * as Actions from '../../actions/centerinfo'
import LoginComponent from '../../components/Login'
import { loginIn } from '../../fetch/login'


import { USER_TOKEN,
    DEFAULTPARENT,
    DEFAULTCURRENT,
    INITPARENT,
    CURFIRSTMENU,
    INITCURRENT } from '../../config/localStoreKey.js'

class WrappedLogin extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            checking: true,
            loading: false 
        }
    }

    render() {

        return (
            <div>
                {
            // 等待验证之后，再显示登录信息
            this.state.checking
                ? <div>{ /* 等待中 */ }</div>
                : <div>
                    <div className="loginspin">
                        <Spin spinning={this.state.loading} tip="Loading..." size="large"/>
                    </div>  
                    <LoginComponent loginHandle={this.loginHandle.bind(this)} loadInit={loading=>this.loadInit(loading)} />
                </div>
            }
                    
            </div>
        );
    }

    componentDidMount() {
        // 判断是否已经登录
        this.doCheck();
        this.clearMenuStore();
    }

    doCheck() {
        if (localStore.getItem(USER_TOKEN)) {
            // 已经登录，则跳转到用户主页
            this.goUserPage();
        } else {
            // 未登录，则验证结束
            this.setState({
                checking: false
            })
        }
    }
    //改变菜单
    clearMenuStore() {
        localStore.setItem(CURFIRSTMENU, "Oa");
        this.props.menuChange({
            flag: "Oa"
        });
        localStore.setItem(DEFAULTPARENT, INITPARENT);
        localStore.setItem(DEFAULTCURRENT, INITCURRENT)
    }
    //登陆loading状态传入
    loadInit(loading){
        this.setState({
            loading
        })
    }

    // 处理登录之后的事情
    loginHandle(subinfo) {
        var that = this;

        // 跟新用户信息
        const actions = this.props.userInfoActions
        let userinfo = this.props.userinfo
        userinfo = subinfo
        actions.update(userinfo)




        //提交登陆信息
        loginIn(subinfo).then(data => {
            Base.handleResult(data, function(data) {
                let Global = data.resultData.data;
                message.success(data.resultMsg, 1, function() {

                    that.setState({loading: false})
                    localStore.setItem(USER_TOKEN, Global.token);


                    //从其他页面跳到登陆会传个参数params={router: "/detail/123"}登陆后跳转到指定页面
                    const params = that.props.params
                    const router = params.router
                    if (router) {
                        hashHistory.push(router)
                    } else {
                        that.goUserPage();
                    }

                });

            })
        })

    }



    goUserPage() {
        hashHistory.push('/')
    }



}





// -------------------绑定react--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
        menuChange: bindActionCreators(Actions.menuChange, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedLogin)