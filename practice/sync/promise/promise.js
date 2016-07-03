/**
 * promise 是ES6中的一个标准，Promise 对象代表一个异步操作，有三种状态：Pending、Resoved 和 Rejected，
 * 其状态是不可逆的。
 * 
 * 主要特点是
 * 1) 对象的状态不受外界影响
 * 2) 一旦状态改变，就不会再变，任何时候都可以得到这个结果
 *
 * @note:
 * 当你从“then”的回调函数返回的时候，这里有点小魔法。
 * 如果你返回一个值，它就会被传给下一个“then”的回调；
 * 而如果你返回一个“类 Promise”的对象，则下一个“then”就会等待这个 Promise 明确结束（成功/失败）才会执行。
 *
 * @reference
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * http://es6.ruanyifeng.com/#docs/promise
 *
 */


/**
 * 一些关于promise的小实验
 */
setTimeout(function () {
    console.log('three');
}, 0);

Promise.resolve().then(function () {
    console.log('two');
});

console.log('one');

/**
 * some best practice
 * TODO
 */

