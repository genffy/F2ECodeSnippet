import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {inputChange} from './action'

class Detail extends Component {
    static propTypes = {
        textValue: PropTypes.string,
        loading: PropTypes.bool
    };
    constructor(props) {
        super(props)
        this.state = {
            text: 'wqw'
        }
    }
    changeHandle(e) {
        // this.setState({
        //     text: e.target.value
        // })
        const { dispatch} = this.props
        dispatch(inputChange(e.target.value))
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

export default connect((state)=>{
    const {text, isFetching} = state
    return {
        textValue: text,
        loading: isFetching
    }
})