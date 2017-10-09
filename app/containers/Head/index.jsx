import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { is, fromJS } from 'immutable';
import { bindActionCreators } from 'redux'


import Base from '../../util/base.js'
//action
import * as Actions from '../../actions/centerinfo'

import { hashHistory } from 'react-router'

import HeadCompontent from '../../components/Head'

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


    render() {
        const firstMenu = this.props.menu_data;
        return (
            <HeadCompontent firstMenu={ this.props.menu_data } menuAction={this.menuAction.bind(this)} />
        )



    }
    //切换菜单
    menuAction(obj) {
        const menuChange = this.props.menuChange(obj)
    }

}
{
    /*--------------connect----------------*/
}
function mapStateToProps(state) {
    return {
        menu_data: state.centerinfo.menu_data.firstMenu
    }
}

function mapDispatchToProps(dispatch) {
    return {
        menuChange: bindActionCreators(Actions.menuChange, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Head)