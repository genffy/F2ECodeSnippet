var rd = require('rd');
var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var swig  = require('swig');
var http = require("http");
var url = require("url");

var  filePath = './practices';


// 同步步遍历目录下的所有文件
var fileData = [];
rd.eachSync( filePath, function (f, s) {
  var fileExtention = '';
  if ( !s.isDirectory() ) {
  	var fileExtention = path.extname(f).substr(1);
  	if (fileExtention == 'html') {
      //异步不好操作啊
  		//fs.readFile(f, 'UTF-8', function(err, content){
  			var $ = cheerio.load(fs.readFileSync(f,'UTF-8')),
  				_obj = {};
  			_obj.name = $('title').text().trim();
  			_obj.content = $('meta[name="description"]').attr('content').trim();
  			_obj.path = f.replace(__dirname, '.').replace(/\\/g,'\/');//获取相对路径 
  			fileData.push(_obj);
  		//});
  	}
  };
});

http.createServer(function(request, response) {

  var pathname = url.parse(request.url).pathname;
  var html = '';

  if ( pathname != '/' ) {
    pathname = '.' + pathname;
    //check exists
    path.exists(pathname, function (exists) {
      //redirect to root
      if ( !exists ) {
        response.writeHead(302, {'Location': '/'});
        response.end();
      } else{
        //show file
        var fileType = path.extname(pathname).substr(1);
        fs.readFile(pathname, "binary", function (err, file) {
            response.writeHead(200, {
                'Content-Type': getMineType(fileType)
            });
            response.write(file, "binary");
            response.end();
        });
      }
    });
    
  } else {
    // root show practices floder list
    response.writeHead(200, {"Content-Type": "text/html"});
    //use swig template engine
    html=swig.renderFile('./index.html', {
      pagename: 'F2ECodeSnippet',
      authors: fileData
    });
    response.write(html);
    response.end();
  }
}).listen(8888);

/**
 * get require mine type
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function getMineType (type) {
  var types = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
  };
  return types[type] || "text/plain";
}