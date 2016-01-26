    define(['angular','config','jquery'], function (angular,config,$) {  
    	
        return {
        	factory:function ($http,$cookieStore) {
        		var services = {};
        		/**
        		 * 列表
        		 */
	              services.lists = function(callback){
	              var url = config.apiPath+'/department/lists';
	              var users = $cookieStore.get('users');
	              $http({
	                  method  : 'POST',
	                  url     : url,
	                  data    : $.param({uid : users.uid,ticket:users.ticket}),
	                  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
	              }).success(function(data){
	                  if(data.status){
	                      var params = {};
	                      params.lists = data.message;
	                      callback(params);
	                  }
	              });
	          }
	          /**
	           * 新增
	           */  
	              services.add = function(params,callback){
		              var url = config.apiPath+'/department/add';
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
		                      params.lists = data.message;
		                      callback(params);
		                  }
		              });
		          }  
	              /**
	               * 修改
	               */
	              services.edit = function(params,callback){
		              var url = config.apiPath+'/department/edit';
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
		                      params.lists = data.message;
		                      callback(params);
		                  }
		              });
		          }  
	              /**
	               * 删除
	               */
	              services.del = function(params,callback){
		              var url = config.apiPath+'/department/del';
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
		                      params.lists = data.message;
		                      callback(params);
		                  }else{
							  config.showMessage(data.message);
						  }
		              });
		          } 
	              /**
	               * 获得部门成员
	               */
	              services.getUserNoDepart = function(callback){
		              var url = config.apiPath+'/department/departmentuser';
		              var users = $cookieStore.get('users');
		              var params = {};
		              params['id'] = 0;
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
		                      params.lists = data.message;
		                      callback(params);
		                  }
		              });
		          }   
	              
	              /**
	               * 获得部门成员
	               */
	              services.getDepartUser = function(params,callback){
		              var url = config.apiPath+'/department/departmentuser';
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
		                      params.lists = data.message;
		                      callback(params);
		                  }
		              });
		          }   
	              /**
	               * 部门新增成员
	               */
	              services.addDepartUser = function(params,callback){
		              var url = config.apiPath+'/department/adddepartuser';
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
		                      params.lists = data.message;
		                      callback(params);
		                  }
		              });
		          }  
	              /**
	               * 部门删除成员
	               */
	              services.delDepartUser = function(params,callback){
		              var url = config.apiPath+'/department/deldepartuser';
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
		                      params.lists = data.message;
		                      callback(params);
		                  }
		              });
		          }  
        		return services;
            }
        };
    }); 