import React from 'react'
import {
    Router,
    Route,
    IndexRoute,
    IndexRedirect,
    withRouter
} from 'react-router'


import App from '../containers'
import WrappedLogin from '../containers/Login'
import Home from '../containers/Home'
import NotFound from '../containers/404'

import { Action } from './index'

class RouterMap extends React.Component {
    render() {
        return (
            <Router history={this.props.history}>
                
                <Route path='/Login(/:router)' component={WrappedLogin}></Route>

                <Route path='/'>
                    <IndexRedirect to="/Organize"/>
                </Route>

                <Route path='/Oa' component={App}>
                    <IndexRedirect to="/Organize"/>
                    <Route path='/Organize' getComponent={Action.JobManage}/>
                    <Route path='/TableManage' getComponent={Action.TableManage}/>
                    <Route path='/tableA' getComponent={Action.tableA}/>
                    <Route path='*' component={NotFound}/>
                </Route>
                <Route path='/erp' component={App}>
                    <IndexRedirect to="/ShopManage"/>
                    <Route path='/ShopManage' getComponent={Action.AreaManage}/>
                </Route>

            </Router>
        )
    }
}

export default RouterMap
