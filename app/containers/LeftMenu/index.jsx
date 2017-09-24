import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { is, fromJS } from 'immutable';

import {LeftMenuComponent} from '../../components/LeftMenu'

class LeftMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }



    render() {
        return (
          <LeftMenuComponent/>
        )
    }
}


export default LeftMenu