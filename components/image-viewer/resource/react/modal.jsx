/**
 * 弹出层
 * @reference http://stackoverflow.com/questions/28802179/how-to-create-a-react-modalwhich-is-append-to-body-with-transitions
 *
 * Created by genffy on 16/7/26.
 *
 */
import React, {Component} from 'react'
import ReactDom from 'react-dom'
import ImageView from './imgview'

const loop = function(){};

class ModalTemplate extends Component {
    static defaultProps = {
        okCallback: loop,
        cancelCallback: loop,
    };

    constructor(props, context){
        super(props, context)
        this.modalId = 'modal_'+ ((Math.random() * 10000000).toFixed(0));
    }
    // event
    closeHandler(){
        console.log(this)
    }
    okHandler(){

    }
    cancelHandler(){

    }

    render(){
        const {title, file} = this.props;
        return (
            <div className="modal-window">
                <div className="modal-mask"></div>
                <div className="modal-wrap">
                    <div className="modal-header">
                        <span className="close" onClick={::this.closeHandler()}></span>
                        <h2>{title}</h2>
                    </div>
                    <div className="modal-body">
                        <ImageView id={this.modalId} file={file}/>
                    </div>
                    <div className="modal-footer">
                        <button onClick={::this.okHandler()}>确认</button>
                        <button onClick={::this.cancelHandler()}>取消</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default class Modal extends Component {
    constructor(props, context){
        super(props, context)
        this.portalElement = null
    }
    componentDidMount() {
        var p = this.props.className && document.getElementById(this.props.className);
        if (!p) {
            var p = document.createElement('div');
            p.id = this.props.className;
            document.body.appendChild(p);
        }
        this.portalElement = p;
        this.componentDidUpdate();
    }
    componentWillUnmount() {
        document.body.removeChild(this.portalElement);
    }
    componentDidUpdate() {
        ReactDom.render(<ModalTemplate {...this.props}>{this.props.children}</ModalTemplate>, this.portalElement);
    }
    render() {
        return null
    }
}
