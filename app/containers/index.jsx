import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LocalStore from '../util/localStore'
import { CITYNAME } from '../config/localStoreKey'
import * as userInfoActionsFromOtherFile from '../actions/userinfo' 

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);//性能优化，减少对比
        this.state = {
            initDone: true
        }
    }
    render() {
        return (
            <div>
                <div>这是首页</div>

              
            </div>
        )
    }
    componentDidMount() {

    }
}


module.exports = App