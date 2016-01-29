    define(['angular','config','jquery'], function (angular,config,$) {  
    	
        return {
        	factory:function ($http,$cookieStore,$routeParams) {
        		var services = {};
        		/**
        		 * 列表
        		 */
	              services.lists = function(params,callback){
	              var url = config.apiPath+'/contacts/contactslist';
	              var users = $cookieStore.get('users');
	              params['uid'] = users.uid;
	              params['ticket'] = users.ticket;
				  params['customer_id'] = $routeParams.id;
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
	             /**
	              * 详情
	              */
	              services.detail = function (params,callback) {
	                	var url = config.apiPath + '/contacts/detailcontacts';
	                	var users = $cookieStore.get('users');
	   	              	params['uid'] = users.uid;
	   	              	params['ticket'] = users.ticket;
	                    $http({
	                        method: 'POST',
	                        url: url,
	                        data: $.param(params),
	                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	                    }).success(function (data) {
	                        if (data.status) {
	                            var params = {};
	                            params.detail = data.message;
	                            callback(params);
	                        }
	                    });
	                }
	              /**
	               * 新建联系人
	               */
	                services.add = function (params,callback) {
	                    var url = config.apiPath + '/contacts/addcontacts';
	                    var users = $cookieStore.get('users');
	                	params['uid'] = users.uid;
	   	              	params['ticket'] = users.ticket;
	                    $http({
	                        method: 'POST',
	                        url: url,
	                        data: $.param(params),
	                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	                    }).success(function (data) {
	                    	config.showMessage(data.message);
	                    }).error(function(data){
	                    	//config.showMessage(data.message);
	                    });
	                }
	                /**
	                 * 更新联系人
	                 */
	                services.edit = function(params){
	                	 var url = config.apiPath + '/contacts/editcontacts';
		                    var users = $cookieStore.get('users');
		                	params['uid'] = users.uid;
		   	              	params['ticket'] = users.ticket;
		                    $http({
		                        method: 'POST',
		                        url: url,
		                        data: $.param(params),
		                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		                    }).success(function (data) {
		                    	config.showMessage(data.message);
		                    }).error(function(data){
		                    	//config.showMessage(data.message);
		                    });
	                }

				/**
				 * 删除联系人
				 */
				services.del = function(id){
					var url = config.apiPath+'/contacts/deletecontacts';
					var users = $cookieStore.get('users');
					var params = {};
					params['uid'] = users.uid;
					params['ticket'] = users.ticket;
					params['id'] = id;
					$http({
						method  : 'POST',
						url     : url,
						data    : $.param(params),
						headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function(data){
						config.showMessage(data.message);
					});
				}
				/**
				 * 联系人详情页的客户信息
				 */
				services.customer_detail = function(params,callback){
					var url = config.apiPath+'/contacts/detailcustomerbycontacts';
					$http({
						method  : 'POST',
						url     : url,
						data    : $.param(params),
						headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function(data){
						var params = {};
						params.customer_detail = data.message;
						callback(params);
					});
				}
				/**
				 * 联系人访问列表
				 */
				services.visitlist = function(params,callback){
					var url = config.apiPath+'/contacts/contactsvisitlist';
					var users = $cookieStore.get('users');
					params['uid'] = users.uid;
					params['ticket'] = users.ticket;
					$http({
						method  : 'POST',
						url     : url,
						data    : $.param(params),
						headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function(data){
						var params = {};
						params.visitlists = data.message.lists;
						params.total = data.message.total;
						callback(params);
					});
				}
				/**
				 *  联系人附件列表
				 */
				services.filelists = function(params,callback){
					var url = config.apiPath+'/customer/filelistbycontactsid';
					var users = $cookieStore.get('users');
					params['uid'] = users.uid;
					params['ticket'] = users.ticket;
					$http({
						method  : 'POST',
						url     : url,
						data    : $.param(params),
						headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function(data){
						var params = {};
						params.lists = data.message.lists;
						params.total = data.message.total;
						callback(params);
					});
				}
				/**
				 *  删除附件
				 */
				services.deletefile = function(id){
					var url = config.apiPath+'/contacts/deletefile';
					var users = $cookieStore.get('users');
					var params = {};
					params['uid'] = users.uid;
					params['ticket'] = users.ticket;
					params['id'] = id;
					$http({
						method  : 'POST',
						url     : url,
						data    : $.param(params),
						headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function(data){
						config.showMessage(data.message);
					});
				}
				/**
				 *  添加访问记录
				 */
				services.addlogsdetail = function(params,callback){
					var url = config.apiPath+'/contacts/contactsvisitdetail';
					$http({
						method  : 'POST',
						url     : url,
						data    : $.param(params),
						headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function(data){
						callback(data.message);
					});
				}
				services.addresslist = function(params,callback){
					var url = config.apiPath+'/contacts/contactsaddresslist';
					$http({
						method  : 'POST',
						url     : url,
						data    : $.param(params),
						headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function(data){
						if(data.status){
							var params = {};
							params.lists = data.message.lists;
							params.contacts_name = data.message.contacts_name;
							params.total = data.message.total;
							params.contacts_id = data.message.contacts_id;
							params.uid = data.message.uid;
							callback(params);
						}
					});
				}
				services.addressinfo = function(params,callback){
					var url = config.apiPath+'/contacts/contactsaddressinfo';
					$http({
						method  : 'POST',
						url     : url,
						data    : $.param(params),
						headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function(data){
						if(data.status){
							var params = {};
							params.formData = data.message;
							callback(params);
						}
					});
				}
				services.saveaddress = function(params){
					var url = config.apiPath+'/contacts/savecontactsaddress';
					var users = $cookieStore.get('users');
					params['uid'] = users.uid;
					params['ticket'] = users.ticket;
					$http({
						method  : 'POST',
						url     : url,
						data    : $.param(params),
						headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function(data){
						config.showMessage(data.message);
					});
				}
				services.addaddress = function(params){
					var url = config.apiPath+'/contacts/addcontactsaddress';
					var users = $cookieStore.get('users');
					params['uid'] = users.uid;
					params['ticket'] = users.ticket;
					$http({
						method  : 'POST',
						url     : url,
						data    : $.param(params),
						headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function(data){
						config.showMessage(data.message);
					});
				}
				services.exportExl = function(params){
					var url = config.apiPath+'/test/export';
					var users = $cookieStore.get('users');
					params['uid'] = users.uid;
					params['ticket'] = users.ticket;
					$http({
						method  : 'GET',
						url     : url,
						data    : $.param(params),
						headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function(data){
			
					});
				}
				services.addressdelete = function(id){
					var url = config.apiPath+'/contacts/deleteaddress';
					var users = $cookieStore.get('users');
					var params = {};
					params['uid'] = users.uid;
					params['ticket'] = users.ticket;
					params['id'] = id;
					$http({
						method  : 'POST',
						url     : url,
						data    : $.param(params),
						headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function(data){
						config.showMessage(data.message);
					});
				}
				services.underlists = function(params,callback){
					var url = config.apiPath+'/contacts/contactslistbyunder';
					var users = $cookieStore.get('users');
					params['uid'] = users.uid;
					params['ticket'] = users.ticket;
					$http({
						method  : 'POST',
						url     : url,
						data    : $.param(params),
						headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
					}).success(function(data){
						var params = {};
						params.data = data.message;
						callback(params);
					});
				}
				services.uploadexcel = function(params,callback){
					var url = config.apiPath + '/contacts/uploadexcel';
					var users = $cookieStore.get('users');
					params['uid'] = users.uid;
					params['ticket'] = users.ticket;
					$http({
						method: 'POST',
						url: url,
						data: $.param(params),
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function (data) {
						config.showMessage(data.message);
						callback();
					});
				}
				services.filedetail = function(params,callback){
					var url = config.apiPath + '/contacts/filetag';
					$http({
						method: 'POST',
						url: url,
						data: $.param(params),
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function (data) {
						if (data.status) {
							var params = {};
							params.tag = data.message.tag;
							params.filename = data.message.filename;
							callback(params);
						}
					});
				}
				services.savefiletag = function(params){
					var url = config.apiPath + '/contacts/savefiletag';
					var users = $cookieStore.get('users');
					params['uid'] = users.uid;
					params['ticket'] = users.ticket;
					$http({
						method: 'POST',
						url: url,
						data: $.param(params),
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).success(function (data) {
						config.showMessage(data.message);
					});
				}
        		return services;
            }
        };
    }); 