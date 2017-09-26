import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, } from 'antd';
import { Link } from 'react-router'
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
import { is, fromJS } from 'immutable';



class LeftMenuComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }



    render() {

        const Menudata = this.props.Menudata;

        if (!Menudata)//第一次渲染没有值
            return false
        console.log(Menudata)
        return (
            <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            theme="dark"
            style={{
                height: '100%',
                borderRight: 0
            }}
            >

        {
            Menudata.map(item => {
                return (
                    item.child ?
                    <SubMenu key={item.id} title={<span><Icon type={item.IconType} />{item.title}</span>}>
                    {

                        item.child.map(item2=>{
                            return(
                                <Menu.Item key={item2.id}><Link to={'/' + item2.index}>{item2.title}</Link></Menu.Item>
                                )
                        })
                    }
                        

                            
                    </SubMenu>:
                    <Menu.Item key={item.index}><Link to={'/'}>{item.title}</Link></Menu.Item>


                )

            })
            }



       

        </Menu>
        )
    }
}


export default LeftMenuComponent