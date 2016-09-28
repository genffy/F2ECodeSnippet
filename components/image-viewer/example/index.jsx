/**
 * Created by genffy on 16/7/20.
 */
import React from 'react'
import ReactDom from 'react-dom'
import Modal from '../resource/react/modal'

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

class Demo extends  React.Component {
    constructor(props){
        super(props)
        this.state = {
            file: {
                id: 1,
                url: './imgs/1.jpg',
                name: 'aaa'
            }
        };
        this.showModal = false
    }
    show() {
        const file = files[parseInt(Math.random() * 20) % 10] || files[0];
        this.setState({
            file: file
        });
        this.showModal = true;
    }
    render(){
        return (
            <div>
                <button onClick={::this.show}>点击我显示图片预览</button>
                <Modal className="image-view-demo" is-show={this.showModal} file={this.state.file}/>
            </div>
        )
    }
}
ReactDom.render(
    <Demo/>,
    document.getElementById('img_view')
)