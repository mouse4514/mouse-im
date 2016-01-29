/**
*	客户管理(详情页) 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,$routeParams,Upload,customerModel,contactsModel,attachModel,wjtrserverModel) {
        	config.checkUser($cookieStore,$rootScope);
            var user = $cookieStore.get('users');
            $scope.isPageShow = false;
            $scope.pageSize = 10;
            $scope.content = 'common';

			contactsModel.detail({id:$routeParams.id},function(params){
				$scope.detail = params.detail;
                $scope.authority();
                //判定是否为无界投融用户
                $scope.isWjtrUser = false;
                if(params.detail.wjtr_uid>0){
                    $scope.isWjtrUser = true;
                }
			});

            /**
             * 基本信息
             */
            $scope.tabCommon = function(name){
            	$scope.isPageShow = false;
                $scope.content = name;
            }

            /**
             * 详情页权限控制
             */
            $scope.authority = function(){
                $scope.isAdministrator = -1;
                angular.forEach(user.role,function(n,i){
                    if($.inArray(n.type,['System','Normal'])==1){
                        $scope.isAdministrator = 1;
                    }
                });
                $scope.actionShow = ($scope.isAdministrator==1)||(user.uid==$scope.detail.uid);
            }
            /**
             * 投融信息
             */
            $scope.tabWjtrinfo = function(name){
                $scope.isPageShow = false;
                $scope.content = name;
                wjtrserverModel.userinfo({'wjtr_uid':$scope.detail.wjtr_uid},function(params){
                    $scope.wjtrinfo = params.wuserinfo;
                })
            }
            /**
             * 联系人Tab切换页面
             */
            $scope.tabCustomer = function(name){
            	$scope.isPageShow = false;
                $scope.content = name;
                var params = {};
                params.contacts_id = $routeParams.id;
                contactsModel.customer_detail(params,function(params){
                    $scope.customer_detail = params.customer_detail;
                });
            }

            /**
             * 访问记录Tab切换页面
             */
            $scope.tabVisit = function(name,page){
            	$scope.isPageShow = true;
                $scope.content = name;
                var params = {};
                params.page = page?page:1;
                params.pagesize = $scope.pageSize;
                params.contacts_id = $routeParams.id;
                contactsModel.visitlist(params,function(params){
                    $scope.visitlists = params.visitlists;
                    $scope.total = params.total;
                    $scope.page = page ? page:1;
                });
            }
            /**
             * 附件
             */
            $scope.tabAttach = function(name,page){
            	$scope.isPageShow = true;
            	 $scope.content = name;
                 var params = {};
                 params.contacts_id = $routeParams.id;
                 params.page = page?page:1;
                 params.pagesize = $scope.pageSize;
                 contactsModel.filelists(params,function(params){
                     $scope.filelists = params.lists;
                     $scope.total = params.total;
                     $scope.page = page ? page:1;
                 });
            }
            /**
             * 分页查询
             */
            $scope.search = function(page){
            	var content =  $scope.content;
            	if(content == 'contacts'){
            		$scope.tabContacts(content,page);
            	}else if(content == 'logs'){
            		$scope.tabLogs(content,page);
            	}else if(content == 'attach'){
            		$scope.tabAttach(content,page);
            	}
            }
            /**
             * 删除访问记录
             */
            $scope.deletevisits = function(id){
                customerModel.deletelogs(id);
                var content =  $scope.content;
                var page =  $scope.page;
                setTimeout(function(){
                    $scope.tabVisit(content,page);
                },100);
            }
            /**
             * 删除附件
             */
            $scope.deletefile = function(id){
                contactsModel.deletefile(id);
                var content =  $scope.content;
                var page =  $scope.page;
                $scope.tabAttach(content,page);
            }
       	 /**
       	  * 上传
       	  */
       	 $scope.upload = function (file) {
       		 var url = config.apiPath+'/upload/upload';
       	        Upload.upload({
       	            url: url,
       	            data: {
       	            	myfile: file, 
       	            	'username': $scope.username
       	            	}
       	        }).then(function (resp) {
                    if(resp.status==200){
                        var file_info = {};
                        file_info = resp.data;
                        file_info.contacts_id = $routeParams.id;
                        attachModel.uploadfile(file_info);
                        var content =  $scope.content;
                        var page =  $scope.page;
                        $scope.tabAttach(content,page);
                    }
       	            console.log(resp);
       	        }, function (resp) {
       	            console.log('Error status: ' + resp.status);
       	        }, function (evt) {
       	        	//进度
       	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
       	            console.log('progress: ' + progressPercentage + '% ');
       	        });
         };
        }
    };
});