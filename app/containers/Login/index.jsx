import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import localStore from '../../util/localStore'
import Base from '../../util/base' 
import { message, Button } from 'antd';
//引入action
import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 
import LoginComponent from '../../components/Login'
import {loginIn} from '../../fetch/login'

import {USER_TOKEN} from '../../config/localStoreKey.js'

class WrappedLogin extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            checking: true
        }
    }

  render() {
    
    return (
     <div>
        <div>
               {
                    // 等待验证之后，再显示登录信息
                    this.state.checking
                    ? <div>{/* 等待中 */}</div>
                    : <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
                }
                
        </div>
       
      </div>
    );
  }

  componentDidMount() {
        // 判断是否已经登录
        this.doCheck()
    }
    doCheck() {
        if (localStore.getItem(USER_TOKEN)){
            // 已经登录，则跳转到用户主页
            this.goUserPage();
        } else {
            // 未登录，则验证结束
            this.setState({
                checking: false
            })
        }
    }
    
    // 处理登录之后的事情
    loginHandle(subinfo) {
        var that =this;
        // 保存用户名
        const actions = this.props.userInfoActions
        let userinfo = this.props.userinfo
        userinfo = subinfo
        actions.update(userinfo)


        const params = this.props.params
        const router = params.router
        if (router) {
            // 跳转到指定的页面
            hashHistory.push(router)
        } 

        //提交登陆信息
        loginIn(subinfo).then(data => {
          Base.handleResult(data, function(data) {
            let Global = data.resultData.data;
            message.success(data.resultMsg, 1, function() {
              localStore.setItem(USER_TOKEN, Global.token);
              that.goUserPage();
            });

          })
        })


    }

    goUserPage() {
        hashHistory.push('/')
    }



}





// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedLogin)