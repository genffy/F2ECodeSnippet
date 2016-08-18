/**
 * Created by genffy on 16/8/9.
 */




$(function(){
    // init dom
    this.dom = {
        grid: {
            left: {},
            right: {}
        }
    }
    this.dom.grid.wrapper = $(".DTFC_ScrollWrapper")[0];

    this.dom.grid.left.wrapper = $(".DTFC_LeftWrapper");
    this.dom.grid.left.head = $(".DTFC_LeftHeadWrapper");
    this.dom.grid.left.body = $(".DTFC_LeftBodyWrapper");
    this.dom.grid.left.liner = $('div.DTFC_LeftBodyLiner')[0];


    this.dom.grid.right.wrapper = $(".DTFC_RightWrapper");
    this.dom.grid.right.head = $(".DTFC_RightHeadWrapper");
    this.dom.grid.right.body = $(".DTFC_RightBodyWrapper");
    this.dom.grid.right.liner = $('div.DTFC_RightBodyLiner')[0];

    this.dom.scroller = $('div.dataTables_scrollBody')[0];
    var that = this;
    // nRight.style.right = oOverflow.bar+"px";

    // block = $('div.DTFC_RightHeadBlocker', nSWrapper)[0];
    // block.style.width = oOverflow.bar+"px";
    // block.style.right = -oOverflow.bar+"px";
    // this.dom.grid.right.headBlock = block;

    // block = $('div.DTFC_RightFootBlocker', nSWrapper)[0];
    // block.style.width = oOverflow.bar+"px";
    // block.style.right = -oOverflow.bar+"px";

    // RTL support - swap the position of the left and right columns (#48)
    /*if ( this.s.rtl ) {
        $('div.DTFC_RightHeadBlocker', nSWrapper).css( {
            left: -oOverflow.bar+'px',
            right: ''
        } );
    }*/



    /* Event handlers */
    var mouseController;
    var mouseDown = false;

    // When the mouse is down (drag scroll) the mouse controller cannot
    // change, as the browser keeps the original element as the scrolling one
    $(".dataTables_wrapper").on( 'mousedown', function () {
        mouseDown = true;

        $(document).one( 'mouseup', function () {
            mouseDown = false;
        } );
    } );

    // When the body is scrolled - scroll the left and right columns
    $(this.dom.scroller)
        .on( 'mouseover touchstart', function () {
            if ( ! mouseDown ) {
                mouseController = 'main';
            }
        } )
        .on( 'scroll', function (e) {
            if ( ! mouseController && e.originalEvent ) {
                mouseController = 'main';
            }

            if ( mouseController === 'main' ) {
                that.dom.grid.left.liner.scrollTop = that.dom.scroller.scrollTop;
                that.dom.grid.right.liner.scrollTop = that.dom.scroller.scrollTop;
            }
        } );

    var wheelType = 'onwheel' in document.createElement('div') ?
        'wheel' :
        'mousewheel';

        // When scrolling the left column, scroll the body and right column
    $(that.dom.grid.left.liner)
        .on( 'mouseover touchstart', function () {
            if ( ! mouseDown ) {
                mouseController = 'left';
            }
        } )
        .on( 'scroll', function ( e ) {
            if ( ! mouseController && e.originalEvent ) {
                mouseController = 'left';
            }

            if ( mouseController === 'left' ) {
                that.dom.scroller.scrollTop = that.dom.grid.left.liner.scrollTop;
                that.dom.grid.right.liner.scrollTop = that.dom.grid.left.liner.scrollTop;
            }
        } )
        .on( wheelType, function(e) {
            // Pass horizontal scrolling through
            var xDelta = e.type === 'wheel' ?
                -e.originalEvent.deltaX :
                e.originalEvent.wheelDeltaX;
            that.dom.scroller.scrollLeft -= xDelta;
        } );

    // When scrolling the right column, scroll the body and the left column
    $(that.dom.grid.right.liner)
        .on( 'mouseover touchstart', function () {
            if ( ! mouseDown ) {
                mouseController = 'right';
            }
        } )
        .on( 'scroll.DTFC', function ( e ) {
            if ( ! mouseController && e.originalEvent ) {
                mouseController = 'right';
            }

            if ( mouseController === 'right' ) {
                that.dom.scroller.scrollTop = that.dom.grid.right.liner.scrollTop;
                that.dom.grid.left.liner.scrollTop = that.dom.grid.right.liner.scrollTop;
            }
        } )
        .on( wheelType, function(e) {
            // Pass horizontal scrolling through
            var xDelta = e.type === 'wheel' ?
                -e.originalEvent.deltaX :
                e.originalEvent.wheelDeltaX;
            that.dom.scroller.scrollLeft -= xDelta;
        } );
});