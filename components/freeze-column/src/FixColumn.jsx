import React, {Component, PropTypes} from 'react';
import ReactDom from 'react-dom'
import $ from 'jquery';
import Styles from '../scss/freeze.scss'

export default class FixColumn extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            // TODO
            styles: {
                contentWidth: 0,
                leftWidth: 0,
            }
        };
        this.styles = {

        };
        this.dom = {
            body: null,
            header: null,
            scroller: null,
            grid:{
                wrapper: null,
                dt: null,
                left: {
                    wrapper: null,
                    head: null,
                    body: null
                }
            }
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.gridSetUp()
    }

    componentWillReceiveProps(nextProps) {
        this._gridLayout();
    }
    componentDidUpdate() {
        this.gridSetUp()
    }

    /**
     * 初始化表格
     */
    gridSetUp(){
        let $dom = $(ReactDom.findDOMNode(this));
        console.log($dom);
        this.dom.body = $dom[0];
        this.dom.scroller = $(".table-fixed-column-scroll-body", $dom)[0];
        //
        this.dom.grid.wrapper = $(".table-fixed-column-scroll", $dom)[0];
        this.dom.grid.body = $(".table-fixed-column-scroll-body", $dom)[0];
        this.dom.grid.header = $(".table-fixed-column-scroll-header", $dom)[0];
        this.dom.grid.headerInner = $(".table-fixed-column-scroll-header-inner", $dom)[0];

        this.dom.grid.left.wrapper = $(".table-fixed-column-left-wrap", $dom)[0];
        this.dom.grid.left.header = $(".table-fixed-column-left-header", $dom)[0];
        this.dom.grid.left.body = $(".table-fixed-column-left-body", $dom)[0];
        this.dom.grid.left.liner = $(".table-fixed-column-left-body-inner", $dom)[0];

        this._gridLayout();
        this._gridScrollHandler();
    }

    /**
     *
     * @private
     */
    _gridScrollHandler(){
        /* Event handlers */
        var that = this;
        var mouseController;
        var mouseDown = false;
        // When the mouse is down (drag scroll) the mouse controller cannot
        // change, as the browser keeps the original element as the scrolling one
        $(this.dom.body).on( 'mousedown', function () {
            mouseDown = true;
            $(document).one( 'mouseup', function () {
                mouseDown = false;
            } );
        } );

        // When the body is scrolled - scroll the left and right columns
        $(this.dom.scroller)
            .on( 'mouseover touchstart', function () {
                if ( !mouseDown ) {
                    mouseController = 'main';
                }
            } )
            .on( 'scroll', function (e) {
                if ( !mouseController && e.originalEvent ) {
                    mouseController = 'main';
                }

                if ( mouseController === 'main' ) {
                    that.dom.grid.left.liner.scrollTop = that.dom.scroller.scrollTop;
                    that.dom.grid.header.scrollLeft = that.dom.scroller.scrollLeft;
                }
            } );

        var wheelType = 'onwheel' in document.createElement('div') ?
            'wheel' :
            'mousewheel';

        // When scrolling the left column, scroll the body and right column
        $(that.dom.grid.left.liner)
            .on( 'mouseover touchstart', function () {
                if ( !mouseDown ) {
                    mouseController = 'left';
                }
            } )
            .on( 'scroll', function ( e ) {
                if ( !mouseController && e.originalEvent ) {
                    mouseController = 'left';
                }

                if ( mouseController === 'left' ) {
                    that.dom.scroller.scrollTop = that.dom.grid.left.liner.scrollTop;
                }
            } )
            .on( wheelType, function(e) {
                // Pass horizontal scrolling through
                var xDelta = e.type === 'wheel' ?
                    -e.originalEvent.deltaX :
                    e.originalEvent.wheelDeltaX;
                that.dom.scroller.scrollLeft -= xDelta;
                that.dom.grid.header.scrollLeft -= xDelta;
            } );
    }
    /**
     * 设置布局
     */
    _gridLayout() {
        // 重置高度
        $(this.dom.grid.wrapper).removeAttr("style");
        var that = this;
        var oGrid = this.dom.grid;
        var oOverflow = that._fnDTOverflow();

        var scrollbarAdjust = function ( node, width ) {
            if ( !oOverflow.bar ) {
                // If there is no scrollbar (Macs) we need to hide the auto scrollbar
                node.style.width = (width+20)+"px";
                node.style.paddingRight = "20px";
                node.style.boxSizing = "border-box";
            }
            else if ( that._firefoxScrollError() ) {
                // See the above function for why this is required
                if ( $(node).height() > 34 ) {
                    node.style.width = (width+oOverflow.bar)+"px";
                }
            }
            else {
                // Otherwise just overflow by the scrollbar
                node.style.width = (width+oOverflow.bar)+"px";
            }
        };

        let setLayout = function(){
            var iBodyHeight = $(that.dom.body.parentNode).outerHeight();
            var iFullHeight = $(that.dom.body.parentNode.parentNode).outerHeight();
            // 计算头部宽度数据
            var iLeftWidth = 0;
            // 计算 body 中header的 的宽度 然后同步到各个地方
            $(oGrid.body).find("tbody tr:first td").each((index, item)=>{
                let iWidth = $(item).outerWidth();
                if ( index < (that.props.fixedColumn || 1)){
                    iLeftWidth += iWidth;
                    // 同步右边头的高度
                    $(oGrid.left.header).find("thead th").eq(index).css("width", iWidth);
                    $(oGrid.left.body).find("thead th").eq(index).css("width", iWidth);
                }
                // sync header width
                $(oGrid.header).find("thead th").eq(index).css("width", iWidth);
                $(oGrid.body).find("thead th").eq(index).css("width", iWidth);
            });
            that.styles.iLeftWidth = iLeftWidth;
            // When x scrolling - don't paint the fixed columns over the x scrollbar
            if ( oOverflow.x )
            {
                iBodyHeight -= oOverflow.bar;
            }

            oGrid.wrapper.style.height = iFullHeight+"px";

            // left
            var leftWrapper = oGrid.left.wrapper;
            leftWrapper.style.width = iLeftWidth+'px';
            leftWrapper.style.height = '1px';

            let scrollTableWidth = $(that.dom.grid.body).find("table").outerWidth();
            $(oGrid.header).find(".table-fixed-column-scroll-header-inner").width(scrollTableWidth);

            var headerHeight = $(that.dom.grid.header).height(),
                diffHeight = iFullHeight - headerHeight,
                leftHeight = diffHeight > that.props.maxHeight ? that.props.maxHeight : diffHeight;

            $(that.dom.grid.left.header).find('table').css("height", $(that.dom.grid.header).height());
            oGrid.left.body.style.height = leftHeight+"px";//iBodyHeight+"px";
            oGrid.left.liner.style.height = leftHeight+"px";//iBodyHeight+"px";
            scrollbarAdjust( oGrid.left.liner, iLeftWidth );
            $(that.dom.scroller).css({
                "max-height": that.props.maxHeight || 400
            });
        };
        setLayout();
        /*setTimeout(function(){
            setLayout();
        },200);*/
    }

    _fnDTOverflow() {
        var nTable = this.dom.body;
        var nTableScrollBody = nTable.parentNode;
        var out = {
            "x": false,
            "y": false,
            "bar": 20
        };

        if ( nTable.offsetWidth > nTableScrollBody.clientWidth )
        {
            out.x = true;
        }

        if ( nTable.offsetHeight > nTableScrollBody.clientHeight )
        {
            out.y = true;
        }

        return out;
    }
    _firefoxScrollError(){
        if ( this._firefoxScroll === undefined ) {
            var test = $('<div/>')
                .css( {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: 10,
                    width: 50,
                    overflow: 'scroll'
                } )
                .appendTo( 'body' );

            // Make sure this doesn't apply on Macs with 0 width scrollbars
            this._firefoxScroll = (
                test[0].clientWidth === test[0].offsetWidth && this._fnDTOverflow().bar !== 0
            );

            test.remove();
        }
        return this._firefoxScroll;
    }
    _getRenderedBody(){
        let dom = this.props.children;
        let main = dom[0], left = dom[1];
        let mainBody = main.props.children[1], mainHead = main.props.children[0],
            leftBody = left.props.children[1], leftHead = left.props.children[0];
        return {
            tbodyLeft: leftBody,
            theadLeft: leftHead,
            tbodyScroll: mainBody,
            theadScroll: mainHead
        }
    }

    render() {
        const {tbodyLeft, theadLeft, tbodyScroll, theadScroll} = this._getRenderedBody();
        return (
            <div className="table-fixed-column">
                <div className="table-fixed-column-scroll">
                    <div className="table-fixed-column-scroll-header">
                        <div className="table-fixed-column-scroll-header-inner">
                            <table className="table" cellPadding="0" cellSpacing="0">
                                {theadScroll}
                            </table>
                        </div>
                    </div>
                    <div className="table-fixed-column-scroll-body">
                        <table className="table" cellPadding="0" cellSpacing="0">
                            {theadScroll}
                            {tbodyScroll}
                        </table>
                    </div>
                </div>
                <div className="table-fixed-column-left-wrap">
                    <div className="table-fixed-column-left-header">
                        <table className="table" cellPadding="0" cellSpacing="0">
                            {theadLeft}
                        </table>
                    </div>
                    <div className="table-fixed-column-left-body">
                        <div className="table-fixed-column-left-body-inner">
                            <table className="table" cellPadding="0" cellSpacing="0">
                                {theadLeft}
                                {tbodyLeft}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}