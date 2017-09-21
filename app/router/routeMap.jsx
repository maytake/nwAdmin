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


class RouterMap extends React.Component {
    render() {
        return (
            <Router history={this.props.history}>
                
                <Route path='/Login(/:router)' component={WrappedLogin}></Route>
                <Route path='/'>
                    <IndexRedirect to="/Organize"/>
                </Route>
                <Route path='/Oa' component={App}>
                    <Route path='/Organize' component={Home}></Route>
                </Route>
                
            </Router>
        )
    }
}

export default RouterMap
