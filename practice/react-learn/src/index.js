import React, {Component} from 'react'

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