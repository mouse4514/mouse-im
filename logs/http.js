/**
 * http 请求的统一路口
 */
var authOrigin = 'http://test.local';
var key = '123414';
var http = require('http'),
	config = require('./config/config'),
	url = require('url'),
	request	=	require('./libs/request'),
	querystring = require('querystring'),
	crypto = require('crypto'),
	server;
	var shasum = crypto.createHash('sha1');
	shasum.update(authOrigin+key);
	var passwd = shasum.digest('hex');
	server = http.createServer(function(req, res){
		if(req.headers.origin != authOrigin){
			res.writeHead(405, {
				"Content-Type": "text/plain;charset=utf-8"
			});
			res.end();
			return;
		}
	 // 设置接收数据编码格式为 UTF-8
	    req.setEncoding('utf-8');
		res.setHeader('Access-Control-Allow-Origin', req.headers.origin);//注意这里不能使用 *
		res.setHeader('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
		res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

		var pathname = url.parse(req.url).pathname;
		if('/wjtr_app.gif' == pathname){
			var params = '';
			if(req.method == "POST"){
				var postData = ""; //POST
				var headers = req.headers;
				// 数据块接收中
				req.on("data", function (postDataChunk) {
					postData += postDataChunk;
				});
				// 数据接收完毕，执行回调函数
				req.on("end", function () {
					params = querystring.parse(postData);//POST 解释表单数据部分
					if(params.authId == passwd){
						params.headers = headers;
						init(res,params);
					}else{
						res.writeHead(405, {
							"Content-Type": "text/plain;charset=utf-8"
						});
						res.end();
						return;
					}
				});
			}else if(req.method == "GET"){
				params = url.parse(req.url, true).query;
				init(res,params);
			}
		}else{
			res.writeHead(404, {
				"Content-Type": "text/plain;charset=utf-8"
			});
			res.end();
			return;
		}

	    
       
	});

function init(res,params){
	 if(params['method']){
     	Model = require('./models/'+params['method']);
     }
     if(params['action']){
     	Model.action(res,params);
     }
}


server.listen(global.PORT);
console.log('Server running at http://127.0.0.1:'+global.PORT);
