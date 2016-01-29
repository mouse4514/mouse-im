/**
*	客户管理(详情页) 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,$routeParams,Upload,customerModel,contactsModel,wjtrserverModel) {
        	config.checkUser($cookieStore,$rootScope);
            var user = $cookieStore.get('users');
			customerModel.detail({id:$routeParams.id},function(params){
				$scope.detail = params.detail;
                //判定是否为无界投融用户
                $scope.isWjtrMaker = false;
                if(params.detail.maker_id>0){
                    $scope.isWjtrMaker = true;
                }
                $scope.authority();
			});
			$scope.isPageShow = false;
            $scope.content = 'common';
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
                $scope.changeShow = ($scope.isAdministrator==1);
                $scope.isSelf = (user.uid==$scope.detail.uid);
                $scope.actionShow = ($scope.isAdministrator==1)||(user.uid==$scope.detail.uid);
            }



            /**
             * 基本信息 isPageShow 是否显示分页
             */
            $scope.tabCommon = function(name){
            	$scope.isPageShow = false;
                $scope.content = name;
            }
            $scope.pageSize = 10;
            /**
             * 无界投融 创客空间信息
             */
            $scope.tabWjtrmaker = function(name){
                $scope.isPageShow = false;
                $scope.content = name;
                wjtrserverModel.makerinfo({'maker_id':$scope.detail.maker_id},function(params){
                    $scope.makerinfo = params.makerinfo;
                })
            }
            /**
             * 联系人Tab切换页面
             */
            $scope.tabContacts = function(name,page){
            	$scope.isPageShow = true;
                $scope.content = name;
                var params = {};
                params.page = page?page:1;
                params.pagesize = $scope.pageSize;
                contactsModel.lists(params,function(params){
                    $scope.lists = params.data.lists;
                    $scope.total = params.data.total;
                    $scope.page = page?page:1;
                });
            }

            /**
             * 访问记录Tab切换页面
             */
            $scope.tabLogs = function(name,page){
            	$scope.isPageShow = true;
                $scope.content = name;
                var params = {};
                params.page = page?page:1;
                params.pagesize = $scope.pageSize;
                customerModel.logslist(params,function(params){
                    $scope.visitlists = params.lists;
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
                 params.customer_id = $routeParams.id;
                 params.page = page?page:1;
                 params.pagesize = $scope.pageSize;
                 customerModel.filelists(params,function(params){
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
             * 删除联系人
             */
            $scope.deletecontacts = function(id){
                contactsModel.delete(id);
                var content =  $scope.content;
                var page =  $scope.page;
                $scope.tabContacts(content,page);
            }
            /**
             * 删除访问记录
             */
            $scope.deletelogs = function(id){
                customerModel.deletelogs(id);
                var content =  $scope.content;
                var page =  $scope.page;
                $scope.tabLogs(content,page);
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


        }
    };
});