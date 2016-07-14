/**
 * Created by genffy on 16/7/14.
 */
function classList(e) {
    if(e.classList) return e.classList;
    else return new CSSClassList(e);
}

class CSSClassList{
    constructor(e) {
        this.e = e
    }
    /**
     * 是否包含某个class
     * @param className
     * @returns {boolean}
     */
    contain(className){
        if(className.length == 0 || className.indexOf(' ') != -1)
            throw new Error(`Invalid class Name:${className}`)
        let names = this.e.className
        if(!names) return false
        if(names === className) return true
        return names.search(`\\b${className}\\b`) != -1
    }

    /**
     * 添加class name
     * @param className
     */
    add(className){
        if(this.contain(className)) return
        let names = this.e.className
        if(names && names[names.length-1] != ''){
            className = ' ' + className;
        }
        this.e.className = className
    }

    /**
     * 删除class name
     * @param className
     */
    remove(className) {
        if (className.length || className.indexOf(' ') != -1)
            throw new Error(`Invalid class Name:${className}`)
        let reg = new RegExp(`\\b${className}\\b\\s*`, 'g')
        this.e.className = this.e.className.replace(reg, '')
    }

    /**
     * 添加/删除
     * @param className
     * @returns {boolean}
     */
    toggle(className){
        if(this.contain(className)){
            this.remove(className)
            return false
        }else{
            this.add(className)
            return true
        }
    }

    /**
     * 获取字符串
     * @returns {*}
     */
    toString(){
        return this.e.className
    }

    /**
     * 转换为 class name array
     * @returns {*|Array}
     */
    toArray(){
        return this.e.className.match(/\b\w+\b/g) || []
    }
}