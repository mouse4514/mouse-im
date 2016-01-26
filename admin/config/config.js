define([], function () {

    //angular会自动根据controller函数的参数名，导入相应的服务
    return  {

            'apiPath':'http://crm-api.local',
    	 	//'apiPath':'/api',


            'showMessage':function(e){
            	alert(e);
            },
            'checkUser':function($cookieStore,$rootScope){
            	var users = $cookieStore.get('users');
                $rootScope.loginUsername = users.username;
            	if($cookieStore.get('users')==undefined){
            		window.location.href = "/#/login";
            	}
            }
        };
});