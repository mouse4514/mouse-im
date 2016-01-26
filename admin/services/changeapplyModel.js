define(['angular','config','jquery'], function (angular,config,$) {
    /**
     * 客户变更申请
     */
    return {
        factory:function ($http,$cookieStore) {
            var services = {};
            services.lists = function(params,callback){
                var url = config.apiPath+'/customer/changeapplylists';
                var users = $cookieStore.get('users');
                params['uid'] = users.uid;
                params['ticket'] = users.ticket;
                $http({
                    method  : 'POST',
                    url     : url,
                    data    : $.param(params),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data){
                    callback(data.message);
                });
            }
            services.applychange = function(params){
                var url = config.apiPath+'/customer/changecustomeruser';
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



            return services;
        }
    };
});