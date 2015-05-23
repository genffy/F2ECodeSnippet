// 问题描述
//各位大大，遇到个关于 node 中 EventEmitter 使用的问题。
//原本是想通过socket来实现 前端与后端 thrift 数据的转发，但是随着程序的运行，数据越来越慢。
//最后定位到，程序运行某一段时间后EventEmitter一直在emit数据，监听事件(on)需要等很久（几分钟）才执行【首次建立连接】。
//数据量大概在100多K。求指教~
//定时获取主机信息
setInterval(function() {
	// 轮询从thrift拿主机排序数据
	var connList = config.connList ? config.connList : {};
	for (var connKey in connList) {
		var args = connList[connKey]['args'];
		// 后端的thrift接口
		client.RealTimeSortReq(args.userId, args.dataSort, args.sortType, args.pageSize, args.pageNum, args.groupId, args.search, args.cancelOffline, (function(connKey){
			return function (err, response) {
				var res = xUtil.convertInt64(response);
				emitter.emit(connKey, res);
				res = null;
			}
		})(connKey));
	}
}, 1000);

//实例化sockjServer
var sockjsServer = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js' });
//建立链接
sockjsServer.on('connection', function(conn) {
    //收到数据
    conn.on('data', function(message) {
    	var msg = JSON.parse(message);
    	config.connList != undefined ? '' : config.connList = {}
        if (msg.args) {
            // 获取thrift数据接口实时数据 callback
            conn.backendDataHandler = function(data){
                if(data){
                    var jsonStr = JSON.stringify(data);
                    conn.write(jsonStr);
                    jsonStr = null;
                }
            };
            // 防止重复绑定
            if(config.connList[conn.id]){
                config.connList[conn.id]['args'] = msg.args;
            }else {
                config.connList[conn.id] = {args: msg.args};
                // 进行一段事件的请求之后 这个事件需要很长的事件才能相应
                emitter.on(conn.id, conn.backendDataHandler);
            }
        }
    });

    //断开链接
    conn.on('close', function() {
        if (config.connList){
            config.connList[conn.id] = null;
            delete config.connList[conn.id];
        }
    });
});

