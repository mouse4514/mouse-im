    define(['angular','config','jquery'], function (angular,config,$) {
    	
        return {
        	factory:function ($http,$cookieStore,$routeParams) {
                var services = {};
                //角色列表
                services.role = function(params,callback){
                    var url = config.apiPath+'/role/index';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param({uid : $cookieStore.get('users').uid,page:params.page,pagesize:params.pagesize}),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        if(data.status){
                            var params = {};
                            params.roles = data.message.roles;
                            params.total = data.message.total;
                            callback(params);
                        }
                    });
                }
                //删除角色
                services.delete = function(id){
                    var url = config.apiPath+'/role/deleterole';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param({uid : $cookieStore.get('users').uid,id:id}),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        config.showMessage(data.message);
                    });
                }
                //新增角色详情页信息
                services.addinfo = function (callback) {
                    var url = config.apiPath+'/role/addinfo';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : {},
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        var params = {};
                        params.role_type = data.message.role_type;
                        params.roles = data.message.roles;
                        callback(params);
                    });
                }
                //新增角色
                services.add = function(params){
                    var url = config.apiPath+'/role/addrole';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param({
                            uid : $cookieStore.get('users').uid,
                            name: params.name,
                            type: params.type,
                            status: params.status,
                            sort: params.sort,
                            pid: params.pid,
                        }),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        config.showMessage(data.message);
                    });
                }
                //编辑角色信息详情
                services.editinfo = function(callback){
                    var url = config.apiPath+'/role/detailrole';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param({id:$routeParams.id}),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        var params = {};
                        params.role_info = data.message.role_info;
                        params.role_type = data.message.role_type;
                        params.roles = data.message.roles;
                        callback(params);
                    });
                }
                //保存角色信息
                services.save = function(params){
                    var url = config.apiPath+'/role/editrole';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param({
                            uid : $cookieStore.get('users').uid,
                            id: $routeParams.id,
                            name: params.name,
                            type: params.type,
                            status: params.status,
                            sort: params.sort,
                            pid: params.pid,
                        }),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        config.showMessage(data.message);
                    });
                }
                //编辑角色权限(action)
                services.action = function(callback){
                    var url = config.apiPath+'/role/editaction';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param({id:$routeParams.id}),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        var params = {};
                        params.controllers = data.message.lists;
                        params.user_action_ids = data.message.user_action_ids;
                        callback(params);
                    });
                }
                /**
                 * 控制器列表
                 */
                services.controller = function(callback){
                    var url = config.apiPath+'/role/ctrllists';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param({id:$routeParams.id}),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        var params = {};
                        params.controllers = data.message;
                        callback(params);
                    });
                }
                //添加角色权限(controller)
                services.addcontroller = function(params){
                    var url = config.apiPath+'/role/rolecontroller';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param({
                            id:$routeParams.id,
                            uid:$cookieStore.get('users').uid,
                            controller_ids:params.controller_id_arr
                        }),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        config.showMessage(data.message);
                    });
                }
                //添加角色权限(action)
                services.addaction = function (params) {
                    var url = config.apiPath+'/role/roleaction';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param({
                            id:$routeParams.id,
                            uid:$cookieStore.get('users').uid,
                            action_ids:params.action_ids
                        }),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        config.showMessage(data.message);
                    });
                }
                return services;

            
            }
        };
    }); 