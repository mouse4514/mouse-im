/**
 * rooms模型
 */
var config = require('./../config/config'),
    request	=	require('./../libs/request'),
    mysql = require('./../libs/mysql');
exports.action = function(res,params){
    eval(params.action+'(params,res)');
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


/**
 * 保存单击记录
 */
var save = function(params,res){
    var data = JSON.parse(params.data);
    var conn = mysql.connnect();

    var sql_data = {
        uid: data.uid,
        logUrl:decodeURI(params.logUrl),
        logHisRefer:decodeURI(params.logHisRefer),
        pageId:data.pageId,
        clickTarget:data.clickTarget,
        content:params.data,
        headers:JSON.stringify(params.headers),
        insert_time:Date.now()/1000
    };
    mysql.insert(conn,'log_click',sql_data);
    echo(res);
};