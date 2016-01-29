    define(['angular','config','jquery'], function (angular,config,$) {
    	
        return {
        	factory:function ($http,$cookieStore,$routeParams) {
                var services = {};
                services.user_lists = function(params,callback){
                    var users = $cookieStore.get('users');
                    params['uid'] = users.uid;
                    params['ticket'] = users.ticket;
                    var url = config.apiPath+'/user/index';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param(params),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        if(data.status){
                            var params = {};
                            params.user_lists = data.message.user_lists;
                            params.total = data.message.total;
                            callback(params);
                        }
                    });
                }
                services.deleteuser = function(user_id){
                    var url = config.apiPath+'/user/deleteuser';
                    var users = $cookieStore.get('users');
                    var params = {};
                    params['uid'] = users.uid;
                    params['ticket'] = users.ticket;
                    params['user_id'] = user_id;
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param(params),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        if(data.status){
                           // config.showMessage(data.message);
                        }
                    });
                }
                services.adduser = function(params,callback){
                    var url = config.apiPath+'/user/adduser';
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
                            callback();
                            config.showMessage(data.message);
                        }
                    });
                }
                services.info = function(callback){
                    var url = config.apiPath+'/user/departmentname';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : {},
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        if(data.status){
                            var params = {};
                            params.departments = data.message.departments;
                            params.roles = data.message.roles;
                            callback(params);
                        }
                    });
                }
                //编辑会员信息
                services.userinfo = function(callback){
                    var url = config.apiPath+'/user/getuserinfo';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param({
                            id:$routeParams.id
                        }),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        if(data.status){
                            var params = {};
                            params.userinfo = data.message.userinfo;
                            params.departments = data.message.departments;
                            params.roles = data.message.roles;
                            params.role_ids = data.message.role_ids;
                            callback(params);
                        }
                    });
                }
                //保存会员信息
                services.dosave = function(params){
                    var url = config.apiPath+'/user/edituserinfo';
                    var users = $cookieStore.get('users');
                    params['uid'] = users.uid;
                    params['ticket'] = users.ticket;
                    params['id'] = $routeParams.id;
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param(params),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        config.showMessage(data.message);
                    });
                }
                services.modify = function(params){
                    var url = config.apiPath+'/user/modify';
                    var users = $cookieStore.get('users');
                    params['uid'] = users.uid;
                    params['ticket'] = users.ticket;
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param(params),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        //config.showMessage(data.message);
                        window.location.href="/#/login";
                    });
                }

                return services;

            
            }
        };
    }); 