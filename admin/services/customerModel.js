    define(['angular','config','jquery'], function (angular,config,$) {
    	
        return {
        	factory:function ($http,$cookieStore,$routeParams) {
                var services = {};
                //客户列表
                services.customer_list = function (params,callback) {
                    var url = config.apiPath + '/customer/customerlist';
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
                            params.customer_list = data.message.customer_lists;
                            params.total = data.message.total;
                            callback(params);
                        }
                    });
                }
                //客户详情页
                services.detail = function (params,callback) {
                	var url = config.apiPath + '/customer/detailcustomer';
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
                            params.detail = data.message.data;
                            params.types = data.message.types;
                            callback(params);
                        }
                    });
                }
                //客户列表(我下属的客户)
                services.customer_under_list = function (callback) {
                    var url = config.apiPath + '/customer/customerlistbyunder';
                    $http({
                        method: 'POST',
                        url: url,
                        data: $.param({uid: $cookieStore.get('uid')}),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function (data) {
                        if (data.status) {
                            var params = {};
                            params.customer_under_list = data.message;
                            callback(params);
                        }
                    });
                }
                //新建客户
                services.addcustomer = function (params) {
                    var url = config.apiPath + '/customer/addcustomer';
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
                //更新客户
                services.editcustomer = function(params){
                    var url = config.apiPath + '/customer/editcustomer';
                    var users = $cookieStore.get('users');
                    params['uid'] = users.uid;
                    params['ticket'] = users.ticket;
                    params['id'] = $routeParams.id;
                    $http({
                        method: 'POST',
                        url: url,
                        data: $.param(params),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function (data) {
                        config.showMessage(data.message);
                    });
                }
                //删除客户
                services.deletecustomer = function(id){
                    var url = config.apiPath + '/customer/deletecustomer';
                    $http({
                        method: 'POST',
                        url: url,
                        data: $.param({
                            uid: $cookieStore.get('users').uid,
                            id: id
                        }),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(data){
                        if (data.status) {
                          //  config.showMessage(data.message);
                        }
                    });
                }
                /**
                 * 访问记录列表
                 */
                services.logslist = function(params,callback){
                    var url = config.apiPath+'/customer/customervisitlist';
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
                            params.lists = data.message.lists;
                            params.total = data.message.total;
                            callback(params);
                        }
                    });
                }
                /**
                 * 删除访问记录
                 */
                services.deletelogs = function(id){
                    var url = config.apiPath+'/customer/deletecustomervisit';
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
                        if(data.status){
                            config.showMessage(data.message);
                        }
                    });
                }
                /**
                 * 附件列表
                 */
                services.filelists = function(params,callback){
                    var url = config.apiPath+'/customer/filelistbycustomerid';
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
                            params.lists = data.message.lists;
                            params.total = data.message.total;
                            callback(params);
                        }
                    });
                }
                /**
                 * 访问记录编辑
                 */
                services.logdetail = function(params,callback){
                    var url = config.apiPath+'/customer/detailcustomervisit';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param(params),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        if(data.status){
                            var params = {};
                            params.info = data.message.info;
                            params.detail = data.message.detail;
                            callback(params);
                        }
                    });
                }
                /**
                 * 访问记录保存
                 */
                services.logsave = function(params){
                    var url = config.apiPath+'/customer/editcustomervisit';
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
                /**
                 * 添加访问记录(信息页)
                 */
                services.addlogsdetail = function(params,callback){
                    var url = config.apiPath+'/customer/customervisitdetail';
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
                /**
                 * 添加访问记录(插入)
                 */
                services.addlogs = function(params,callback){
                    var url = config.apiPath+'/customer/addcustomervisit';
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
                        callback();
                    });
                }
                /**
                 * 会员选择展示
                 */
                services.userlist = function(params,callback){
                    var url = config.apiPath+'/customer/userlistsbycustomerid';
                    $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param(params),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data){
                        var params = {};
                        params.user_lists = data.message.user_lists;
                        params.uid = data.message.uid;
                        callback(params);
                    });
                }
                /**
                 * 变更责任人
                 */
                services.changeuser = function(params){
                    var url = config.apiPath+'/customer/customerchangeuser';
                    var users = $cookieStore.get('users');
                    params['user_id'] = users.uid;
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
                /**
                 * 下属客户
                 */
                services.under_customer_list = function(params,callback){
                    var url = config.apiPath + '/customer/customerlistbyunder';
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
                            params.customer_list = data.message.lists;
                            params.total = data.message.total;
                            callback(params);
                        }
                    });
                }
                /**
                 * 客户上传
                 */
                services.uploadexcel = function(params,callback){
                    var url = config.apiPath + '/customer/uploadexcel';
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
                /**
                 * 申请变更责任人
                 * @param params
                 */
                services.changeapply = function(params){
                    var url = config.apiPath + '/customer/changeapply';
                    var users = $cookieStore.get('users');
                    params['user_id'] = users.uid;
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