/**
 * Created by genffy on 16/7/20.
 */
import React from 'react'
import ReactDom from 'react-dom'
import ImageView from '../resource/react/imgview'

class Demo extends React.Component {
    constructor(props, context) {
        super(props, context)
        console.log(this.props.files)
    }
    render(){
        return (
            <div>
                <ImageView file={this.props.files[0]}></ImageView>
            </div>
        )
    }
}

const files = [
    {
        id: 1,
        url: './imgs/1.jpg',
        name: 'aaa'
    },{
        id: 2,
        url: './imgs/2.jpg',
        name: 'bbb'
    },{
        id: 3,
        url: './imgs/3.jpg',
        name: 'ccc'
    },{
        id: 4,
        url: './imgs/4.jpg',
        name: 'ddd'
    },{
        id: 5,
        url: './imgs/5.jpg',
        name: 'eee'
    },{
        id: 6,
        url: './imgs/6.jpg',
        name: 'fff'
    },{
        id: 7,
        url: './imgs/7.png',
        name: 'ggg'
    },{
        id: 8,
        url: './imgs/8.jpg',
        name: 'hhh'
    },{
        id: 9,
        url: './imgs/9.jpg',
        name: 'iii'
    }
];

ReactDom(
    <Demo files={files}></Demo>,
    document.getElementById('img_view')
)