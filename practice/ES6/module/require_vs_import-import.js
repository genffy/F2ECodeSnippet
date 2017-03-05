// 测试在webpack打包的过程中
// 对于条件引用的情况下，包大小的情况
import f03 from './files/f03'
import f06 from './files/f06'
import f08 from './files/f08'
import f00 from './files/f00'

const random = Math.random()
let result = 0.5
if(random < 0.3){
    result = f03
}
if(random < 0.6 && random >= 0.3){
    result = f06
}

if(random < 0.8 && random >= 0.6){
    result = f08
}

if(random >= 0.8){
    result = f00
}

console.log('result', result)