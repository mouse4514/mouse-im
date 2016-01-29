/**
 * 服务端
 */
var http = require('http'),
	sio = require('socket.io'),

	//自定义模块
	config = require('./config/config'),
	comm = 	require('./lib/socket');
var server = http.createServer();
var io = sio.listen(server);
var usersWS = {};
io.sockets.on('connection', function(socket){
    console.log("来自客户端 " + socket.id + " ip="+socket.handshake.address+" 连接.");
	var test = function() {
		for (var i in usersWS){
			// 同一个ip只有一个连接
			if (usersWS[i].handshake.address == socket.handshake.address) {
				usersWS[i].emit("alert", {data:"同一ip已有设备连接"})
				usersWS[i].disconnect();
			}
		}
	}
	test();
	
    usersWS[socket.handshake.address] = socket;
	var refresh_online = function(){
		var n = [];
		for (var i in usersWS){
			n.push(i);
		}
		//io.sockets.emit('online list', n);//所有人广播
	}
	refresh_online(usersWS);

    //获得客户端send数据
    comm.message(socket);
    //客户的断开连接
	socket.on('disconnect', function(){
		delete usersWS[socket.handshake.address];
		console.log("客户端 " + socket.id + " 断开连接.");
		refresh_online();
	});
    //获得客户端emit数据
    comm.emit(socket,usersWS);
    //console.log(usersWS);
    socket.emit("sid", {data:socket.id});
});
//监听端口
server.listen(global.PORT,function(){
	console.log('server listening on http://127.0.0.1:'+global.PORT);
});