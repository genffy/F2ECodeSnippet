// 测试在webpack打包的过程中
// 对于条件引用的情况下，包大小的情况

const random = Math.random()
let result = null
if(random < 0.3){
    result = require('./files/f03')
}
if(random < 0.6 && random >= 0.3){
    result = require('./files/f06')
}

if(random < 0.8 && random >= 0.6){
    result = require('./files/f08')
}

if(random >= 0.8){
    result = require('./files/f00')
}

console.log('result', result)