/**
 * 评分打星
 */
import './Star.less'
import React, {Component, PropTypes} from 'react';
import ReactDom from 'react-dom';

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
        level: PropTypes.number.isRequired
    };

    static defaultProps = {
        readonly: false,
        levels: levels,
        level: 20
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            // TODO
        }
    }

    componentWillMount() {
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

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
        evt.preventDefault();
        var pointer = this.getPointerEvent(evt);
        // caching the current x
        cachedX = currX = pointer.pageX;
        // caching the current y
        cachedY = currY = pointer.pageY;
        // a touch event is detected
        touchStarted = true;
        $touchArea.text('Touchstarted');
        // detecting if after 200ms the finger is still in the same position
        setTimeout(function (){
            if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
                // Here you get the Tap event
                // 计算距离
                const nodePos = this.getThisPosition()
                console.log(nodePos)
            }
        },200);
        // bind move

    }

    onMouseDownHandler(evt) {
        this.handlerTap(evt)
    }
    onTouchStartHandler(evt) {
        this.handlerTap(evt)
    }
    onMouseUpHandler(evt) {
        console.log(evt)
    }
    onTouchEndHandler(evt) {
        console.log(evt)
    }
    onMouseMoveHandler(evt) {
        console.log(evt)
    }
    getStyles() {
        // 根据 distance 计算背景的位置
        return {
            'width': '50%'
        }
    }
    getPointerEvent(evt) {
        return evt.originalEvent.targetTouches ?
            evt.originalEvent.targetTouches[0] : evt;
    }
    render() {
        const {levels, readonly} = this.props;
        const styles = this.getStyles()
        return (
            <div className="q-star-wrap">
                <div className="q-star"
                     style={styles}
                     onMouseDown={::this.onMouseDownHandler}
                     onTouchStart={::this.onTouchStartHandler}
                     onMouseUp={::this.onMouseUpHandler}
                     onTouchEnd={::this.onTouchEndHandler}><div className="q-star-gray"></div></div>
                <p className="q-star-desc">满意</p>
            </div>
        );
    }
}