import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { is, fromJS } from 'immutable';
import { Layout, Menu, Icon } from 'antd';
import LeftMenuComponent from '../../components/LeftMenu'



class LeftMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }



    render() {
        return (
         /*   <Sider
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
                width={200} >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
            </Sider>*/
         <LeftMenuComponent Menudata={this.props.menu_data} collapsed={this.props.collapsed}/>
        )
    }
}

{/*-------------------bind react-------------------------*/}
function mapStateToProps(state) {
    return {
        menu_data: state.centerinfo.menu_data.secondMenu
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftMenu)