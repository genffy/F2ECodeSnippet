/**
 * Created by genffy on 16/7/20.
 */

import React,{PropTypes} from 'react';
import ReactDom from 'react-dom';
import Draggable from './draggable'
import Styles from '../scss/imageview.scss';

export default class ImageView extends React.Component{
    static propTypes = {
        classPrefix: PropTypes.string,
        componentTag: PropTypes.string
    };

    static defaultProps = {
        classPrefix: 'iv_',
        componentTag:'div',
        file:{
            name:'',
            url:''
        },
        id:''
    };

    constructor(props,context){
        super(props,context);

        //this.imageSliderId = this.uniqueId();
        this.imgId = 'img-v'+ ((Math.random() * 10000000).toFixed(0));
        this.transform = 'scale(1, 1) rotate(0deg)';
        this.state = {
            maxHeight: (document.documentElement.clientHeight*1-100),
            maxWidth: (document.documentElement.clientWidth*1-100),
            imgWrap: {
                height: 'auto',
                width: 'auto'
            },
            modifyImgStyle: null
        }
    }
    cssEnhance(type){
        const val = this.transform.match(/-?\d+\.?\d*/g);
        if(val && val.length>=3){
            let {zoom, rotate} = 0;
            switch (type){
                case 'rotate':
                    zoom = 0;
                    rotate = 90;
                    break;
                case 'max':
                    zoom = 0.5;
                    rotate = 0;
                    break;
                case 'min':
                    zoom = -0.5;
                    rotate = 0;
                    break;
            }
            this.calculatePosition(zoom, rotate, type);
        }
    }
    componentDidMount () {

    }
    componentWillUnmount() {

    }
    componentWillReceiveProps (nextProps) {
        this.transform = 'scale(1, 1) rotate(0deg)';
        this.setState({
            imgWrap: {
                height: 'auto',
                width: 'auto'
            },
            modifyImgStyle: null
        })
    }

    onLoadHandler (e) {
        // 获取首次加载图片的大小
        this.imgSize = e.target.getBoundingClientRect();
        this.setState({
            imgWrap : {
                width: this.imgSize.width,
                height: this.imgSize.height,
            }
        })
    }
    getDegCos (deg) {
        switch(deg/180%2){
            case 0:
            case 1:
                deg = 0;
                break;
            case 0.5:
                deg = 1;
                break;
            case 1.5:
                deg = -1;
                break;
            default:
                deg = 0;
        }
        return deg;

    }
    /**
     *
     * @param zoom 放大/缩小
     * @param rotate 旋转
     * @param type 操作类型
     */
    calculatePosition (zoom, rotate, type) {
        let vals = this.transform.match(/-?\d+\.?\d*/g);
        const scaleVal = vals[0]*1+zoom;
        const rotateVal = vals[2]*1+rotate;
        let diff = vals[3] || vals[4] || 0;
        if(type=='rotate'){
            const tx = this.getDegCos(rotateVal);
            if( tx == 0){
                // 重置为正常
                diff = 0;
                // 正常的显示
                this.setState({
                    imgWrap : {
                        width: this.imgSize.width,
                        height: this.imgSize.height
                    },
                    modifyImgStyle: null
                })
            }else{
                // 图片的宽高比
                const imgScaleHW = this.imgSize.width/this.imgSize.height;
                let iH = this.state.imgWrap.height;
                let iW = this.state.imgWrap.width;
                const mW = this.state.maxWidth;
                const mH = this.state.maxHeight;
                // wrap 的宽高转换
                if(iH > mW){
                    // 计算 iw 的值
                    iH = mW
                    iW = imgScaleHW * iH
                } else if(iW > mH){
                    // 计算ih 的值 mW
                    iW = mH
                    iH = iW/ imgScaleHW
                }
                // 计算偏移
                diff = tx * (iW-iH)/2;
                this.setState({
                    imgWrap : {
                        width: iH,
                        height: iW,
                    },
                    modifyImgStyle: {
                        width: iW,
                        height: iH,
                    }
                })
            }
        }else{
            // 重置拖放的位置
            this.draggable.reset();
        }
        let diffVal = diff*1;
        // 计算是否缩放
        let _zoom = zoom || scaleVal-1;
        if(_zoom != 0){
            _zoom = _zoom > 0 ? 0.5: 2
            diffVal = _zoom * diffVal;
        }
        this.transform = `scale(${scaleVal}, ${scaleVal}) rotate(${rotateVal}deg) translate(${diffVal}px, ${diffVal}px)`;
        // 渲染生效
        setTimeout((function () {
            ReactDom.findDOMNode(this.refs[this.imgId]).style.transform = this.transform;
        }).bind(this))
    }
    render() {
        let {file} = this.props;
        return (
            <div>
                <div className={"img-wrap "+ (this.props.overflow? 'img-wrap-hidden':'img-wrap-show')}
                     style={{
                        height: this.state.imgWrap.height,
                        width: this.state.imgWrap.width
                     }}>
                    <Draggable ref={(draggable)=>{
                        this.draggable = draggable;
                    }}>
                        <img draggable="false" id={this.imgId}
                             onLoad={this.onLoadHandler.bind(this)}
                             ref={this.imgId}
                             src={file.url}
                             alt=""
                             style={{
                             maxHeight: this.state.maxHeight+'px',
                             maxWidth: this.state.maxWidth+'px',
                             transform: this.transform,
                             ...this.state.modifyImgStyle
                             }}/>
                    </Draggable>
                </div>
                <div className="icon-box">
                    <div onClick={this.cssEnhance.bind(this,'rotate')} className="upload-icon" name="radio_unchecked" alt="旋转"></div>
                    <div onClick={this.cssEnhance.bind(this,'max')} className="upload-icon"  name="add" alt="放大"></div>
                    <div onClick={this.cssEnhance.bind(this,'min')} className="upload-icon" name="remove" alt="缩小"></div>
                </div>
            </div>
        );
    }
}