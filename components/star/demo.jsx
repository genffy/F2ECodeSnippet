/**
 * Created by genffy on 16/7/29.
 */

import React from 'react'
import ReactDom from 'react-dom'
import Star from './Star'

class Demo extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            score: 20
        }
    }
    setScore(){
        this.setState({
            score: 40
        })
    }
    setReadonly(){
        this.setState({
            readonly: !this.state.readonly
        })
    }
    callbackHandler(score){
        if(score < 40){
            if(confirm("亲,给个好评呗?")){
                this.setState({
                    score: 60
                })
            }else{
                alert('那你必须告诉哪里需要改进哟~')
            }
        }
    }
    render() {
        return (
            <div>
                <Star score={this.state.score} readonly={this.state.readonly} callback={this.callbackHandler.bind(this)}/>
                <div style={{"marginTop":'1rem'}}>
                    <button onClick={this.setScore.bind(this)}>设置评分</button> &nbsp;
                    <button onClick={this.setReadonly.bind(this)}>是否只读({this.state.readonly?'是':' 否'})</button>
                </div>
            </div>
        )
    }
};
ReactDom.render(
    <Demo/>, document.getElementById('star')
)