/**
 * Created by genffy on 16/7/20.
 */

export function addEvent(el, event, handler) {
    if (!el) { return; }
    if (el.attachEvent) {
        el.attachEvent('on' + event, handler);
    } else if (el.addEventListener) {
        el.addEventListener(event, handler, true);
    } else {
        // $FlowIgnore: Doesn't think elements are indexable
        el['on' + event] = handler;
    }
}

export function removeEvent(el, event, handler) {
    if (!el) { return; }
    if (el.detachEvent) {
        el.detachEvent('on' + event, handler);
    } else if (el.removeEventListener) {
        el.removeEventListener(event, handler, true);
    } else {
        // $FlowIgnore: Doesn't think elements are indexable
        el['on' + event] = null;
    }
}

export function outerHeight(node) {
    // This is deliberately excluding margin for our calculations, since we are using
    // offsetTop which is including margin. See getBoundPosition
    let height = node.clientHeight;
    const computedStyle = window.getComputedStyle(node);
    height += int(computedStyle.borderTopWidth);
    height += int(computedStyle.borderBottomWidth);
    return height;
}

export function outerWidth(node) {
    // This is deliberately excluding margin for our calculations, since we are using
    // offsetLeft which is including margin. See getBoundPosition
    let width = node.clientWidth;
    const computedStyle = window.getComputedStyle(node);
    width += int(computedStyle.borderLeftWidth);
    width += int(computedStyle.borderRightWidth);
    return width;
}
export function innerHeight(node) {
    let height = node.clientHeight;
    const computedStyle = window.getComputedStyle(node);
    height -= int(computedStyle.paddingTop);
    height -= int(computedStyle.paddingBottom);
    return height;
}

export function innerWidth(node) {
    let width = node.clientWidth;
    const computedStyle = window.getComputedStyle(node);
    width -= int(computedStyle.paddingLeft);
    width -= int(computedStyle.paddingRight);
    return width;
}


export function isNum(num) {
    return typeof num === 'number' && !isNaN(num);
}

export function int(a) {
    return parseInt(a, 10);
}