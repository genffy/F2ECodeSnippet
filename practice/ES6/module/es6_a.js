// a.js

// 从这一行建立一个引用
// 从 `b.js` 引用 `bar` 
import {bar} from './es6_b.js';
export function foo() {
    // 执行时输出 foo
    console.log('foo');
    // 执行 b.js 中的 bar
    bar();
    console.log('执行完毕');
}
foo();