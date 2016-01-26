/**
*	联系人附件上传 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope,Upload, $http,$routeParams,attachModel) {
        	config.checkUser($cookieStore,$rootScope);
            $scope.init = function(){
                attachModel.tags(function(tags){
                    $scope.tags = tags;
                });
            }
            $scope.init();
            /**
             * 选择标签
             */
            var tag_id_arr = [];
            $scope.updateCheckbox = function($event,id){
                var checked = $event.target.checked;
                if(checked){
                    tag_id_arr.push(id);
                }else{
                    var index = tag_id_arr.indexOf(id);
                    if (index > -1) {
                        tag_id_arr.splice(index, 1);
                    }
                }
                $scope.tag_ids = tag_id_arr;
            }
            /**
             * 保存
             */
            $scope.save = function(){
                var file_info = $scope.file_info;
                file_info.tag = $scope.tag;
                attachModel.uploadfile(file_info);
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
                        $scope.file_info = file_info;
                        config.showMessage('上传成功');
                    }else{
                        config.showMessage('上传失败');
                    }
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