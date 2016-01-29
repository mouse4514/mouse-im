    define(['angular','config','jquery'], function (angular,config,$) {
        /**
         * 附件
         */
        return {
        	factory:function ($http,$cookieStore) {
                var services = {};
                //上传附件
                services.uploadfile = function(params){
                    var url = config.apiPath+'/upload/uploadfile';
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
                services.tags = function(callback){
                    var url = config.apiPath+'/upload/tags';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : {},
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        if(data.status){
                            var tags = data.message;
                            callback(tags);
                        }
                    });
                }

              

                return services;
            }
        };
    }); 