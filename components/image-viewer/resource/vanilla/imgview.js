/**
 * Created by genffy on 16/7/20.
 */
const defaultOption = {

};
export default class ImageView {
    constructor(opt){
        this.options = opt;
        this.init();
    }
    init(){
        document.getElementById(this.options.elm).innerText = '真的是一个图片查看器呢。'
    }
}