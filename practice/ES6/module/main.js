var a = require('./commonjs_a.js');
var b = require('./commonjs_b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);