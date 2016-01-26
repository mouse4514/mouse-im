define(['angular','config','jquery'], function (angular,config,$) {

    return {
        factory:function ($http,$cookieStore,$routeParams) {
            var services = {};


            /**
             * 创客空间
             */
            services.makers = function(params,callback){
                var url = config.apiPath + '/wmaker/tree';
                var users = $cookieStore.get('users');
                params['uid'] = users.uid;
                params['ticket'] = users.ticket;
                $http({
                    method: 'POST',
                    url: url,
                    data: $.param(params),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data){
                    if (data.status) {
                        var params = {};
                        params.makers = data.message;
                        callback(params);
                    }
                });
            }
            /**
             * 投融个人信息
             */
            services.userinfo = function(params,callback){
                var url = config.apiPath + '/wuser/userinfo';
                var users = $cookieStore.get('users');
                params['uid'] = users.uid;
                params['ticket'] = users.ticket;
                $http({
                    method: 'POST',
                    url: url,
                    data: $.param(params),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data){
                    if (data.status) {
                        var params = {};
                        params.wuserinfo = data.message;
                        callback(params);
                    }
                });
            }
            /**
             * 创客空间信息
             */
            services.makerinfo = function(params,callback){
                var url = config.apiPath + '/wmaker/detail';
                var users = $cookieStore.get('users');
                params['uid'] = users.uid;
                params['ticket'] = users.ticket;
                $http({
                    method: 'POST',
                    url: url,
                    data: $.param(params),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data){
                    if (data.status) {
                        var params = {};
                        params.makerinfo = data.message;
                        callback(params);
                    }
                });
            }
            return services;


        }
    };
});