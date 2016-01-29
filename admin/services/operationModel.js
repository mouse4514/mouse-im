    define(['angular','config','jquery'], function (angular,config,$) {  
    	
        return {
        	factory:function ($http,$cookieStore) {
        		var services = {};
        		/**
        		 * 列表
        		 */
	              services.lists = function(params,callback){
	              var url = config.apiPath+'/operation/lists';
	              var users = $cookieStore.get('users');
	              params['uid'] = users.uid;
	              params['ticket'] = users.ticket;
	              $http({
	                  method  : 'POST',
	                  url     : url,
	                  data    : $.param(params),
	                  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
	              }).success(function(data){
	                  if(data.status){
	                      var params = {};
	                      params.data = data.message;
	                      callback(params);
	                  }
	              });
	          }
	            

        		return services;
            }
        };
    }); 