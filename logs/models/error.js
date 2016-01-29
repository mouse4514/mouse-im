/**
 * Created by Administrator on 2016/1/19.
 */
/**
 * rooms模型
 */
var config = require('./../config/config'),
    http	=	require('http'),
    request	=	require('./../libs/request'),
    mysql = require('./../libs/mysql');
var data = {};
data['status'] = 1;
exports.action = function(res,params){
    console.log(params.action);
    eval(params.action+'(params,res)');
};
/**
 * get输出
 */
var echo_get = function(){
    request.get(http,path,function(data){
        res.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end(data);
    });
};
/**
 * post输出
 */
var echo_post = function(res,path,params){
    //需要处理提交数据的时候开启
    request.post(http,path,params,function(data){
        console.log(data);
        res.writeHead(200, {
            'Content-Type': 'text/plain;charset=utf-8'
        });
        res.write(data);
        res.end();
    });
};
/**
 * echo
 */
var echo = function(res){
    res.writeHead(200, {
        "Content-Type": "text/plain;charset=utf-8"
    });
    res.end();
};


var save = function(params,res){
    echo(res);
};