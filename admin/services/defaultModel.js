    define(['angular','config','jquery'], function (angular,config,$) {
    	
        return {
        	factory:function ($http,$cookieStore) {
        		var services = {};
        		var _attr = 'aaaa';

        		services.init = function(callback){
        			var url = config.apiPath+'/default/index';
        			$http({
	   			        method  : 'POST',
	   			        url     : url,
	   			        data    : $.param({uid : $cookieStore.get('users').uid}),
	   			        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
	   			    }).success(function(data) {
	   			        if(data.status){
							var params = {};
							params.info = data.message;
							callback(params);
	   			        }else{
	        				return ;
	   			        }
	   			    });
        		}
        		services.setAttr = function(attr){
        			var url = config.apiPath+'/default/index';
        			$http({
	   			        method  : 'GET',
	   			        url     : url,
	   			        data    : {},
	   			        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
	   			    }).success(function(data) {
	   			        if(data.status){
	   			        	attr = data.message;
	   			        	
	   			        }else{
	        				return ;
	   			        }
	   			    });
        			_attr = attr;
        		}
        		services.getAttr = function(){
        			return _attr;
        		}

//        		services.getInfo = function(){
//        			var url = config.apiPath+'/default/index';
//        			var deferred = $q.defer();
//        			$http({
//	   			        method  : 'GET',
//	   			        url     : url,
//	   			        data    : {},
//	   			        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
//	   			    }).success(function(data) {
//	   			        if(data.status){
//	   			        	//retData.username = data.message;
//	   			        	deferred.resolve({'username':'aa'});
//	   			        }else{
//	   			        	config.showMessage(data.message);
//	        				return ;
//	   			        }
//	   			    });
//        			return deferred.promise;
//        		}
   			 return services;
            }
        }
    }); 