// b.js

// 建立`a.js`的`foo`引用
import {foo} from './es6_a.js';
export function bar() {
    // 执行时，第二行输出 bar
    console.log('bar');
    // 递归执行 foo，一旦随机数
    // 小于等于0.5，就停止执行
    if (Math.random() > 0.5) {
        foo();
    }
}