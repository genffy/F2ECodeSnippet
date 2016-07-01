/**
 * 顺序请求文章章节
 * @reference http://www.html5rocks.com/zh/tutorials/es6/promises/
 */
const DATA_ROOT_PATH = 'data/'
function get(url) {
    // 返回一个新的 Promise
    return new Promise((resolve, reject) => {
        // 简单的 XHR 操作
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = () => {
            // 当发生 404 等状况的时候调用此函数
            // 所以先检查状态码
            if (req.status == 200) {
                // 以响应文本为结果，完成此 Promise
                resolve(req.response);
            }
            else {
                // 否则就以状态码为结果否定掉此 Promise
                // （提供一个有意义的 Error 对象）
                reject(Error(req.statusText));
            }
        }

        // 网络异常的处理方法
        req.onerror = () => {
            reject(Error("Network Error"));
        }
        // 发出请求
        req.send();
    });
}

function addHtmlToPage(data, type='content') {
    let domNode = null
    if(type == 'title'){
        domNode = document.createElement('h1')
    }else{
        domNode = document.createElement('p')
    }
    domNode.innerHTML = data;
    document.body.appendChild(domNode)
}

/**
 * 获取url的json数据
 * @param url
 * @returns {Promise.<TResult>|*}
 */
function getUrlData(url){
    if(url == 'chapter-3.json'){
        console.log("延迟")
        let i = 0;
        while (i<100000){
            i++;
        }
    }
    return get(DATA_ROOT_PATH + url).then(JSON.parse)
}

getUrlData('story.json').then((response) => {
    // 添加文章标题
    addHtmlToPage(response.heading, 'title');
    /**
     * 创建顺序请求的序列
     * @reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
     */
    /*return response.chapterUrls.reduce((seq, url)=>{
        return seq.then(()=>{
            return getUrlData(url)
        }).then((res)=>{
            addHtmlToPage(res.html);
        })
    }, Promise.resolve())*/
    // 优化版本
    return response.chapterUrls.map(getUrlData).reduce((seq, resPromise, index, arr)=>{
        return seq.then(()=>{
            return resPromise
        }).then((res)=>{
            addHtmlToPage(res.html);
        })
    }, Promise.resolve())
    /*
    // map 版本
    let seq = Promise.resolve()
    response.chapterUrls.map((url)=>{
        seq = seq.then(()=>{
            return getUrlData(url)
        }).then((res)=>{
            addHtmlToPage(res.html);
        })
    })
    return seq*/
}).then(()=>{
    addHtmlToPage("--EOF");
}).catch((err)=>{
    console.log("万一有错误了呢")
}).then(()=>{
    console.log("无论如何都要执行下")
})