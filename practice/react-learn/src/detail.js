import React, {Component} from 'react'

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