// 一些关于修饰器的demo［装饰者模式］
import {readonly, override} from 'core-decorators'
class DefineMath {
	// 一个坑 http://stackoverflow.com/questions/33635511/simple-es7-decorator-with-babel
	@readonly
	entree = 'steak'
	// 生成id的几种姿势
	constructor () {
		this._id = (()=>parseInt(Math.random()*100000))()
	}
	get id() {
		return this._id;
	}
	set id(value) {
		console.log("强制设置_id", value)
		this._id = value 
	} 
	@log
	add(a, b) {
		return a + b;
	}
	cb_add() {}
}

class extraMath extends DefineMath {
	@override
	cb_add() {
		console.log("嗯！确实重写你了")
	}
	log() {
		console.log('搞毛啊');
	}
}

function log(target, name, descriptor) {
	var oldValue = descriptor.value
	
	descriptor.value = function() {
		console.log(`Calling "${name}" whith`, arguments);
		return oldValue.apply(null, arguments)
	}
	
	return descriptor
}

const math = new extraMath()

math.add(2, 4)
math.canRead = true

// math.cb_add = ()=> console.log(this._id)
// console.log(math._id)
// math.entree = "能修改？"

console.log(math.id)

math.id = "改个屁啊"
console.log(math.id)

console.log(math.entree)
math.cb_add()