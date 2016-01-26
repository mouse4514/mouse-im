    define(['angular','config','jquery'], function (angular,config,$) {
    	
        return {
        	factory:function ($http,$cookieStore,$routeParams) {
                var services = {};
//                //角色列表
//                services.role = function(callback){
//                    var url = config.apiPath+'/role/index';
//                    $http({
//                        method  : 'POST',
//                        url     : url,
//                        data    : $.param({uid : $cookieStore.get('uid')}),
//                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
//                    }).success(function(data){
//                        if(data.status){
//                            var params = {};
//                            params.controllers = data.message;
//                            callback(params);
//                        }
//                    });
//                }
//                //动作
//                services.action = function($code,callback){
//                    var url = config.apiPath+'/role/action';
//                    $http({
//                        method  : 'POST',
//                        url     : url,
//                        data    : $.param({uid : $cookieStore.get('uid'),code : $code}),
//                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
//                    }).success(function(data){
//                        if(data.status){
//                            var params = {};
//                            params.action = data.message;
//                            callback(params);
//                        }
//                    });
//                }
//
                /**
                 * 城市二级联动
                 */
                services.zone = function(callback){
                    var url = config.apiPath + '/default/zone';
                    $http({
                        method: 'POST',
                        url: url,
                        data: $.param({
                            id: $routeParams.id
                        }),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        if (data.status) {
                            var params = {};
                            params.zoneTree = data.message.zoneTree;
                            callback(params);
                        }
                    });
                }
                /**
                 * 常用类型
                 */
                services.types = function(callback){
                    var url = config.apiPath + '/default/types';
                    $http({
                        method: 'POST',
                        url: url,
                        data: {},
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        if (data.status) {
                            var params = {};
                            params.types = data.message;
                            callback(params);
                        }
                    });
                }
                /**
                 * 客户下拉框
                 */
                services.selectedlists = function(callback){
                    var url = config.apiPath + '/customer/selectedlists';
                    $http({
                        method: 'POST',
                        url: url,
                        data: $.param({
                            uid: $cookieStore.get('users').uid,
                            ticket: $cookieStore.get('users').ticket
                        }),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(data){
                    	 var params = {};
                         params.lists = data.message;
                    	callback(params);
                    });
                }
                return services;

            
            }
        };
    }); 