// 事件代理分发
function touchHandler(event) {
    // var handlers = document.querySelectorAll(".handler");
    // console.log(event.type);
    if(event.srcElement.className.indexOf("handler") != -1){
        
        var evetType = event.type;
        
        switch(evetType){
            case "touchstart":
                console.log("开始啦");
                break;
            case "touchmove":
                console.log("移动了");
                moveUpHandler(event.srcElement, event);
                break;
            case "touchend":
                console.log("结束了");
                break;
            default:
                console.log("这是什么鬼");
                break;
        }
    }
}

// 向上拖动事件处理
function moveUpHandler(current, event) {
    var parentDom = current.parentNode, 
    parentNextDom = parentDom.nextElementSibling,
    startPos = {
        top: current.offsetTop,
        left: current.offsetLeft
    },
    changedTouch = event.changedTouches && event.changedTouches[0],
    currPos = {
        top: changedTouch.pageY,
        left: changedTouch.pageX
    },
    offset = {
        x: currPos.left - startPos.left,
        y: currPos.top - startPos.top
    }
    console.log(startPos, currPos);
}


window.onload = function(events){
    document.addEventListener("touchstart", touchHandler, false);
    document.addEventListener("touchmove", touchHandler, false);
    document.addEventListener("touchend", touchHandler, false);
}