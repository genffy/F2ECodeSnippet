import React, {Component} from 'react'

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: 'wqw'
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
                <input type="text" value={this.state.text} onChange={this.changeHandle.bind(this)}/>
                <div>
                    {this.state.text}
                </div>
            </div>
        )
    }
}