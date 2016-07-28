/**
 * 评分打星
 */
import './Star.scss'
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

const loop = function(){};
const levelItem = PropTypes.shape({
    value: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired
});

const levels = [
    {
        value: 20,
        desc: '很不满意'
    },
    {
        value: 40,
        desc: '不满意'
    },
    {
        value: 60,
        desc: '一般'
    },
    {
        value: 80,
        desc: '满意'
    },
    {
        value: 100,
        desc: '很满意'
    }
];
export default class Star extends Component {
    /**
     *
     * @type {{readonly: (*|RegExp|boolean), levels: *}}
     */
    static propTypes = {
        /**
         * 是否可点击编辑
         */
        readonly: PropTypes.bool,
        /**
         * 评分等级数组
         */
        levels: PropTypes.arrayOf(levelItem),
        /**
         * 评分等级
         */
        score: PropTypes.number,
        /**
         * 打分的回调
         */
        callback: PropTypes.func
    };

    static defaultProps = {
        readonly: false,
        levels: levels,
        score: 20,
        callback: loop
    };

    constructor(props, context) {
        super(props, context);
        // 计算
        this.state = {
            score: this.props.score
        };
        this.levelMax = this.props.levels.length-1;

        this.touchStarted = false; // detect if a touch event is sarted
        this.currX = 0;
        this.currY = 0;
        this.cachedX = 0;
        this.cachedY = 0;
    }

    componentWillMount() {
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            score: nextProps.score
        }
    }
    getThisPosition(){
        const node = ReactDOM.findDOMNode(this);
        return node.getBoundingClientRect();
    }

    /**
     * @reference https://jsfiddle.net/gianlucaguarini/56Szw/
     * @param evt
     */
    handlerTap(evt){
        const self = this;
        evt.preventDefault();
        const pointer = self.getPointerEvent(evt);
        // caching the current x
        self.cachedX = self.currX = pointer.pageX;
        // caching the current y
        self.cachedY = self.currY = pointer.pageY;
        // a touch event is detected
        self.touchStarted = true;
        // detecting if after 200ms the finger is still in the same position
        setTimeout(function (){
            if ((self.cachedX === self.currX) && !self.touchStarted && (self.cachedY === self.currY)) {
                // Here you get the Tap event
                // 计算距离
                const nodePos = self.getThisPosition();
                const disX = self.currX - nodePos.left;
                self.getLevel(disX);
            }
        },200);
        // bind move
    }

    handlerEnd(evt) {
        evt.preventDefault();
        const self = this;
        self.touchStarted = false;
    }

    onMouseDownHandler(evt) {
        this.handlerTap(evt)
    }
    onTouchStartHandler(evt) {
        this.handlerTap(evt)
    }
    onMouseUpHandler(evt) {
        this.handlerEnd(evt)
    }
    onTouchEndHandler(evt) {
        this.handlerEnd(evt)
    }
    onMouseMoveHandler(evt) {
    }
    getValue() {
        // 根据 distance 计算背景的位置
        let {score, level} = this.state
        if(level == undefined){
            this.props.levels.map((item, index)=>{
                if(score == item.value){
                    level = index
                }
            });
        }

        const width = (level+1)*27;
        return {
            'level': this.props.levels[(level>this.levelMax ? this.levelMax : level)],
            'width': `${width}px`
        }
    }
    getLevel(val){
        const num = Math.ceil(val/24)-1;
        const levelObj = this.props.levels[(num>this.levelMax ? this.levelMax : num)]
        this.setState({
            level: num
        });
        this.props.callback(levelObj.value, levelObj);
    }
    getPointerEvent(evt) {
        return evt.targetTouches ?
            evt.targetTouches[0] : evt;
    }
    render() {
        const {levels, readonly} = this.props;
        const {width, level} = this.getValue();
        return (
            <div className="q-star-wrap">
                {
                    readonly?(
                        <div className="q-star">
                            <div className="q-star-gray" style={{width: width}}></div>
                        </div>
                    ):(
                        <div className="q-star"
                             onMouseDown={this.onMouseDownHandler.bind(this)}
                             onTouchStart={this.onTouchStartHandler.bind(this)}
                             onMouseUp={this.onMouseUpHandler.bind(this)}
                             onTouchEnd={this.onTouchEndHandler.bind(this)}>
                            <div className="q-star-gray" style={{width: width}}></div></div>
                    )
                }

                <p className="q-star-desc">{level.desc}</p>
            </div>
        );
    }
}