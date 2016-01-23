var mysql = require('mysql');
exports.connnect = function(){
	var conn = mysql.createConnection({
	    host: global.DB_HOST,
	    user: global.DB_USER,
	    password: global.DB_PASSWROD,
	    database: global.DB_DATABASE,
	    port: global.DB_PORT
	});
	conn.connect(function(err){
		if(err){
			 console.log('error when connecting to db:', err);  
			 //如果断开是否需要重连
		}
	});
	return conn;
}
exports.query = function(conn,sql){
	conn.query(sql, function(err, rows, fields) {
	    if (err) throw err;
	    return rows;
	});
}
exports.insert = function(conn,table,data){  
     
	conn.query('INSERT INTO '+table+' SET ?', data, function(err, result) {  
		if(err){
			return false;
		}
       return result.insertId;  
    });  
};
exports.update = function(conn,table,set,where,data){  
   	 
   	conn.query('UPDATE '+table+' SET '+set+' WHERE '+ where, data, function(err, result) { 
   		if(err){
   			return false;
   		}
   		return true;
});  
};
exports.close = function(conn){
	conn.end();
}