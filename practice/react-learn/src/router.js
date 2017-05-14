import React, {Component} from 'react'
import {Router, Route, Redirect} from 'react-router-dom'
import createHashHistory from 'history/createHashHistory'

import Index from './index'
import Detail from './detail'

export default class AppRouter extends Component {
    constructor(props) {
        super(props)
        this.history = new createHashHistory()
    }
    render() {
        return (
            <Router history={this.history}>
                <div>
                    <Route path='/index' component={Index}/>
                    <Route path='/detail' component={Detail}/>
                    <Redirect from="/" to="/index"/>
                </div>
            </Router>
        )
    }
}