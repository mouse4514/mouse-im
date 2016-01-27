/**
 * Created by Administrator on 2016/1/27.
 */
/**
 * 通讯模型
 * mysql	=	require('./lib/mysql')
 */
var http = require('http'),
    config = require('./../config/config'),
    request	=	require('./../libs/request');
/**
 * 消息
 */
exports.message = function(socket){
    socket.on('message', function(message){
        console.log(message);
        socket.emit("message","test");
    });
}
/**
 * 断开连接
 */
exports.disconnect = function(socket){
    socket.on('disconnect', function(){
        console.log("客户端 " + socket.id + " 断开连接.");
    });
}
/**
 * 获得自定义消息
 */
exports.emit = function(socket,usersWS){
    socket.on('public_msg', function(params){
        console.log('public_msg');
        console.log("参数错误");
        //var params = JSON.stringify(params);
        /*
         var model = '';
         if(params['method']){
         Model = require('./../model/'+params['method']);
         }
         if(params['action']){
         var action = params['action'];
         var result = Model.action(action,params);
         public_msg(socket,result);
         reply_msg(socket,result);
         }else{
         console.log("参数错误");
         }
         */
    });
    socket.on('private_msg', function(params){
        var params = JSON.stringify(params);
        console.log('private_msg');
        console.log(params);
        private_msg(usersWS,params);
        /*
         var model = '';
         Model = require('./../model/socket');
         if(params['action']){
         params['from_id'] = socket.handshake.address;
         Model.action(socket,params,function(data){
         //private_msg(socket,usersWS,data['to'],data.action,data);
         eval(data.action+'(socket,usersWS,data["to"],data.action,data)');
         });
         }else{
         console.log("参数错误");
         }
         */
    });
    socket.on('reply_msg', function(params){
        var params = JSON.stringify(data);
        console.log('reply_msg');
        console.log(params.action);
        /*
         var model = '';
         if(params['method']){
         Model = require('./../model/'+params['method']);
         }
         if(params['action']){
         var action = params['action'];
         var result = Model.action(action,params);
         reply_msg(socket,result);
         }else{
         console.log("参数错误");
         }
         */
    });
}
/**
 * 广播
 * action 客户端接口信息方法名
 * data 发送数据
 *  // socket.broadcast.emit('sendUser', { username: data.username });
 */
var public_msg = function(socket,data){
    socket.broadcast.emit("public_msg", data);
}
var private_msg = function(usersWS,data){
    for (var i in usersWS){
        var target = usersWS[i];
        if (target) {
            //console.log(data);
            target.emit("private_msg", data);
        }
    }
}
/**
 * 私有推送
 * action 客户端接口信息方法名
 * data 发送数据
 * socket.emit('sendUser', { username: data.username });
 */
// 向被邀请方发送请求
var createMeeting = function(socket,usersWS,to,action,data){
    //var tos = to.split(',');
    for (var i=0; i<to.length; i++) {
        var target = usersWS[to[i]];
        data['name'] = data['names'][i];
        if (target) {
            //console.log(data);
            target.emit("private_msg", data);
        } else {
            //已断开连接，即拒绝
            Model = require('./../model/socket');
            var params = {};
            params['id'] = data['id'];
            params['is_accept'] = -2;
            params['action'] = "updateMeetingInfo";
            params['from_id'] = to[i];
            Model.action(socket,params,function(data1){
                eval(data.action+'(socket,usersWS,data1[\'to\'],data1.action,data1)');
            });
        }
    }
}
// 向iPad端返回请求结果
var updateMeetingInfo = function(socket,usersWS,to,action,data){
    //var tos = to.split(',');
    for (var i=0; i<to.length; i++) {
        var target = usersWS[to[i]];
        data['name'] = data['names'][i];
        if (target) {
            console.log(data);
            var return_data = {};
            return_data['status'] = data['status'];
            return_data['is_accept'] = data['is_accept'];
            return_data['message'] = data['message'];
            return_data['room_id'] = data['room_id'];
            return_data['names'] = data['names'];
            return_data['clients'] = data['clients'];
            return_data['action'] = data['action'];
            target.emit("private_msg", data);
        } else {
            console.log("ipad断开连接");
        }
    }
}
var callFrontDesk = function(socket,usersWS,to,action,data){
    for (var i=0; i<to.length; i++) {
        var target = usersWS[to[i]];
        data['name'] = data['names'][i];
        if (target) {
            //console.log(data);
            target.emit("alert", {data:data.name + "需要"+ data.service_type});
            socket.emit("alert", {data:"呼叫成功"});
        } else {
            console.log("pc断开连接");
            socket.emit("alert", {data:"pc断开连接"});
        }
    }
}
/**
 * 返回数据给当前连接客户端
 */
var reply_msg = function(socket,data){
    socket.emit("reply_msg", data);
}