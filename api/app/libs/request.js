/**
 * post和get获取数据
 */
var querystring = require('querystring');
var options = {
		  hostname: global.PHP_HOST,
		  port: global.PHP_PORT,
		  path: '',
		  method: global.PHP_METHOD_POST,
		 // headers:''
		};

//post 数据到服务器
exports.post= function(http,path,data,callback){
	var post_data=querystring.stringify(data);
	options.path= path;
	options.headers = {
			  'Content-Type':'application/x-www-form-urlencoded',
			  'Content-Length':post_data.length
			  };
	var back_data='';
	var req = http.request(options, function(res) {
		 // console.log('STATUS: ' + res.statusCode);//状态
		  res.setEncoding('utf8');
		  res.on('data', function (chunk) {
			  back_data += chunk;
		  }).on("end",function(){
			  //console.log(back_data);
			  callback(back_data)
		  });
		});
		req.on('error', function(e) {
			console.log(e.message);
		});
		
//		console.log(post_data);
		req.write(post_data);
		req.end();
}

exports.get= function(http,path,callback){
	options.path= path;
	options.method= global.PHP_METHOD_GET;
	options.headers = {
			  'Content-Type':'application/x-www-form-urlencoded',
			  };
	var req = http.request(options, function(res) {
		 // console.log('STATUS: ' + res.statusCode);//状态
		  res.setEncoding('utf8');
		  res.on('data', function (chunk) {
		  //  return JSON.stringify(chunk);
			callback(chunk);
		  });
		});
		req.on('error', function(e) {
			console.log(e.message);
		});
		req.end();
}