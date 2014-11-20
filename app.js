var rd = require('rd');
var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var swig  = require('swig');
var http = require("http");

var  filePath = './practices';


// 异步遍历目录下的所有文件
var fileData = [];
rd.eachSync( filePath, function (f, s) {
  var fileExtention = '';
  if ( !s.isDirectory() ) {
  	var fileExtention = path.extname(f).substr(1);
  	// 获取相对路径 
  	if (fileExtention == 'html') {

  		//fs.readFile(f, 'UTF-8', function(err, content){
  			var $ = cheerio.load(fs.readFileSync(f,'UTF-8')),
  				_obj = {};
  			_obj.name = $('title').text().trim();
  			_obj.content = $('meta[name="description"]').attr('content').trim();
  			_obj.path = f.replace(__dirname, '.').replace(/\\/g,'\/');
  			//console.log(_obj.path);
  			fileData.push(_obj);
  			//console.log(fileData);
  		//});
  	}
  };
  //next();
});

//写入
/*swig.renderFile('./index.html', {
    pagename: 'F2ECodeSnippet',
    fileData: fileData
});*/
var template = swig.compileFile('./index.html');
var output = template({
    pagename: 'awesome people',
    authors: fileData
});
console.log(output);


http.createServer(function(request, response) {
  	response.writeHead(200, {"Content-Type": "text/html"});
   var html=swig.renderFile('./index.html', {
	    pagename: 'F2ECodeSnippet',
	    authors: fileData
	});
  	response.write(html);
  	response.end();
}).listen(8888);