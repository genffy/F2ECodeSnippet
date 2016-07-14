/**
 * 一些正则的🌰
 * Created by genffy on 16/7/14.
 */

// 获取文件名
_path = '/Users/genffy/Documents/GitHub/F2ECodeSnippet/practice/html5/css3-canvas-clock.html'

nFileName = _path.split('/').pop()
gFileName = _path.match(/[^/]*$/)

// 在html标签里加属性
// <html lang="en-US"> => <html manifest="index.appcache" lang="en-US">
'<html lang="en-US">'.replace(/(^<html.*)\d*(.*>)/, `$1 manifest="index.appcache" $2`)