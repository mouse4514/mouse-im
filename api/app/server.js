/**
 * socket 服务端
 * Created by mouse on 16/1/23.
 */
<<<<<<< HEAD
/**
 * 服务端
 */
=======
>>>>>>> origin/master
var http = require('http'),
    sio = require('socket.io'),

//自定义模块
    config = require('./config/config'),
<<<<<<< HEAD
    comm = 	require('./lib/socket');
=======
    comm = 	require('./libs/socket');
>>>>>>> origin/master
var server = http.createServer();
var io = sio.listen(server);
var usersWS = {};
io.sockets.on('connection', function(socket){
<<<<<<< HEAD
    console.log("来自客户端 " + socket.id + " ip="+socket.handshake.address+" 连接.");
=======
    console.log("from client :" + socket.id + " ip="+socket.handshake.address+" content.");
>>>>>>> origin/master
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
<<<<<<< HEAD
        console.log("客户端 " + socket.id + " 断开连接.");
=======
        console.log("client " + socket.id + " close.");
>>>>>>> origin/master
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