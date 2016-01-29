 var memcache = require('memcache');
 exports.connnect = function(){
	var MClient = new memcache.Client("11211","10.0.0.224");
	MClient.connect();
	MClient.on('connect', function(){
		MClient.connected = true;
	});
	return MClient;
 }
 exports.close = function(MClient){
	 MClient.on('close', function(){
		 MClient.connected = false;
	});
 }
 exports.get = function(MClient,key,callback){
	 MClient.get(key, function(error, result){
         if(!error){
             if(result){
                // cacheObject[key] = result;
            	 //callback(result);
                 console.log(result);
                 callback(result);
             } else {
            	console.log(error); 
             }
         }
 });
}
 exports.set = function(MClient,key,value,lifetime,callback){
	 MClient.set(key, value, lifetime, callback);
}

exports.del = function(MClient,key,callback){
	MClient.delete(key, function(error){
	
	})
}