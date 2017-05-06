import React, {Component} from 'react'
import {render} from 'react-dom'
import {Router, Route, Redirect, Link} from 'react-router-dom'
import createHashHistory from 'history/createHashHistory'

class Index extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <h1>这是一个首页</h1>
                <p>跳转到详细的链接 <Link to="/detail" >详细</Link></p>
            </div>
        )
    }
}

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    changeHandle(e) {
        this.setState({
            text: e.target.value
        })
    }
    render(){
        return (
            <div>
                <input type="text" onChange={this.changeHandle.bind(this)}/>
                <div>
                    {this.state.text}
                </div>
            </div>
        )
    }
}

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
