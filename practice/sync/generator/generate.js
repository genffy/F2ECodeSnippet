/**
 *
 * Generator 函数是ES6中提供的一种异步编程解决方案.
 * 从语法上理解: Generator函数是一个状态机, 封装了多个内部状态
 *             执行Generator函数会返回一个遍历器对象
 *             Generator函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态
 *
 * 从形式上: Generator函数是一个普通函数, 但有两个明显的特征
 *          1) `function` 关键字与函数名之间有一个星号
 *          2) 函数体内部使用yield语句，定义不同的内部状态
 *
 *
 *
 *
 *
 *
 * @reference http://es6.ruanyifeng.com/#docs/generator
 */

function *helloGenerator(){
    yield 'Hello '
    yield 'sth '
    yield 'for '
    yield 'Generator.'
    return 'Genffy say '
}

const y = helloGenerator()
console.log(y.next())
console.log(y.next())
console.log(y.next())
console.log(y.next())
console.log(y.next())