import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, } from 'antd';
import { Link } from 'react-router'
import './leftMenu.css'
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
import { is, fromJS } from 'immutable';
import localStore  from '../../util/localStore'
import { DEFAULTPARENT, DEFAULTCURRENT } from '../../config/localStoreKey.js'



class LeftMenuComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    handleClick(e){
        let path = e.keyPath;
        console.log( path)
        localStore.setItem(DEFAULTPARENT, path[1]);
        localStore.setItem(DEFAULTCURRENT, path[0]);
    }
    render() {
        const Menudata = this.props.Menudata;
        if (!Menudata) //第一次渲染没有值
            return false

        const defOpenKeys = localStore.getItem(DEFAULTPARENT) ? localStore.getItem(DEFAULTPARENT) : '4';
        const defSelectedKeys = localStore.getItem(DEFAULTCURRENT) ? localStore.getItem(DEFAULTCURRENT) : 'Organize'
      
        return (
            <Sider
            trigger={null}
            collapsible={true}
            collapsed={this.props.collapsed}
            >
                      
                            <Link to="/"><div className="logo" /></Link>
                            <Menu
                                onClick={this.handleClick.bind(this)}
                                defaultOpenKeys={[defOpenKeys]}
                                defaultSelectedKeys={[defSelectedKeys]}
                                theme="dark"
                                mode="inline"
                                style={{
                                    height: '100%',
                                    borderRight: 0
                                }}
                                >

                                {
                                    Menudata.map(item => {
                                        return (
                                            item.child ?
                                            <SubMenu key={item.id} title={<span><Icon type={item.IconType} /><span>{item.title}</span></span>}>
                                            {
                                                item.child.map(item2 => {
                                                    return (
                                                        <Menu.Item key={item2.src}><Link to={'/' + item2.src}>{item2.title}</Link></Menu.Item>
                                                    )
                                                })
                                            }
                                                                     
                                            </SubMenu> :
                                            <Menu.Item key={item.src}><Link to={'/'}>{item.title}</Link></Menu.Item>
                                        )

                                    })
                                }
                        </Menu>
                   
                    
             </Sider>



        )
    }
}


export default LeftMenuComponent