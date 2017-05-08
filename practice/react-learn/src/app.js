import React, {Component} from 'react'
import {render} from 'react-dom'
import {Router, Route, Redirect, Link} from 'react-router-dom'
import createHashHistory from 'history/createHashHistory'

import Index from './index'
import Detail from './detail'

class App extends Component {
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
render( <App/>, document.getElementById('app'))
