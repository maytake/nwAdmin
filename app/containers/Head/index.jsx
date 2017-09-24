import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { is, fromJS } from 'immutable';
import { bindActionCreators } from 'redux'


import Base from '../../util/base.js'
import { hashHistory } from 'react-router'

import {HeadCompontent} from '../../components/Head'

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
        <HeadCompontent/>
        
        )
    }
}

export default Head;