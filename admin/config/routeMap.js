define([], function () {

    //angular会自动根据controller函数的参数名，导入相应的服务
    return  {
            '/login':{
                path: 'controllers/loginCtrl.js',         //登陆
                controller: 'loginCtrl',     //控制器名称
                tpl:'views/public/login.html',
                model:{}
            },
            '/logout':{
                path: 'config/logoutCtrl.js',         //登出
                controller: 'logoutCtrl',     //控制器名称
                tpl:'views/public/login.html',
                model:{}
            },
            '/main':{
                path: '../config/mainCtrl.js',         //首页
                controller: 'mainCtrl',     			//控制器名称
                tpl:'../views/default/index.html',
                model:{0:'defaultModel'}
            },
            '/applychangelist':{
            	path: '../config/applyChangeListCtrl.js',         //系统管理
                controller: 'applyChangeListCtrl',     			//控制器名称
                tpl:'../views/system/changeapply.html',
                model:{0:'changeapplyModel'}
            },
            '/customer':{
            	path: '../config/customerCtrl.js',         //客户管理
                controller: 'customerCtrl',     			//控制器名称
                tpl:'../views/customer/index.html',
                model:{0:'customerModel'}
            },
            '/user':{
                path: '../config/userCtrl.js',         //会员
                controller: 'userCtrl',     			//控制器名称
                tpl:'../views/user/index.html',
                model:{0:'userModel'}
            },
            '/adduser':{
                path: '../config/useraddCtrl.js',         //新增会员
                controller: 'useraddCtrl',     			//控制器名称
                tpl:'../views/user/add.html',
                model:{0:'userModel'}
            },
            '/edituser/:id':{
                path: '../config/usereditCtrl.js',         //会员编辑
                controller: 'usereditCtrl',     			//控制器名称
                tpl:'../views/user/edit.html',
                model:{0:'userModel'}
            },
            '/customerdetail/:id':{
                path: '../config/customerdetailCtrl.js',         //客户详情
                controller: 'customerdetailCtrl',     			//控制器名称
                tpl:'../views/customer/detail.html',
                model:{0:'customerModel',1:'contactsModel'}
            },
            '/customer_type/:type':{
                path: '../config/customerCtrl.js',         //客户管理 跟进客户
                controller: 'customerCtrl',     			//控制器名称
                tpl:'../views/customer/index.html',
                model:{0:'customerModel'}
            },
            '/contacts':{
                path: '../config/contactsCtrl.js',         //联系人
                controller: 'contactsCtrl',     			//控制器名称
                tpl:'../views/contacts/index.html',
                model:{0:'contactsModel'}
            },
            '/contactsAdd':{
                path: '../config/contactsAddCtrl.js',         //联系人新增
                controller: 'contactsAddCtrl',     			//控制器名称
                tpl:'../views/contacts/add.html',
                model:{0:'contactsModel'}
            },
            '/contactsAdd/:id':{
                path: '../config/contactsAddCtrl.js',         //客户详情中新增联系人
                controller: 'contactsAddCtrl',     			//控制器名称
                tpl:'../views/contacts/add.html',
                model:{0:'contactsModel'}
            },
            '/contactsEdit/:id':{
                path: '../config/contactsEditCtrl.js',         //联系人新增
                controller: 'contactsEditCtrl',     			//控制器名称
                tpl:'../views/contacts/edit.html',
                model:{0:'contactsModel'}
            },
            '/contactsDetail/:id':{
                path: '../config/contactsDetailCtrl.js',         //联系人详情
                controller: 'contactsDetailCtrl',     			//控制器名称
                tpl:'../views/contacts/detail.html',
                model:{0:'customerModel',1:'contactsModel',2:'attachModel'}
            },
            '/customerAdd':{
            	path: '../config/customerAddCtrl.js',         //客户新增
                controller: 'customerAddCtrl',     			//控制器名称
                tpl:'../views/customer/add.html',
                model:{}
            },
            '/undercustomer':{
                path: '../config/undercustomerCtrl.js',         //下属客户
                controller: 'undercustomerCtrl',     			//控制器名称
                tpl:'../views/customer/under.html',
                model:{0:'customerModel'}
            },
            '/customerEdit/:id':{
            	path: '../config/customerEditCtrl.js',         //客户编辑
                controller: 'customerEditCtrl',     			//控制器名称
                tpl:'../views/customer/edit.html',
                model:{0:'customerModel'}
            },
            '/logsEdit/:id':{
                path: '../config/logsEditCtrl.js',         //访问记录编辑
                controller: 'logsEditCtrl',     			//控制器名称
                tpl:'../views/customer/editlogs.html',
                model:{0:'customerModel'}
            },
            '/logsAdd/:customer_id':{
                path: '../config/logsAddCtrl.js',         //访问记录添加
                controller: 'logsAddCtrl',     			//控制器名称
                tpl:'../views/customer/addlogs.html',
                model:{0:'customerModel'}
            },
            '/logsAddByContacts/:contacts_id':{
                path: '../config/logsAddByContactsCtrl.js',         //访问记录编辑
                controller: 'logsAddByContactsCtrl',     			//控制器名称
                tpl:'../views/contacts/addlogs.html',
                model:{0:'contactsModel',1:'customerModel'}
            },
            '/changeuid/:id':{
                path: '../config/changeUidCtrl.js',         //访问记录编辑
                controller: 'changeUidCtrl',     			//控制器名称
                tpl:'../views/customer/change.html',
                model:{0:'customerModel'}
            },
            '/applychange/:id':{
                path: '../config/applyChangeCtrl.js',         //访问记录编辑
                controller: 'applyChangeCtrl',     			//控制器名称
                tpl:'../views/customer/applychange.html',
                model:{0:'customerModel'}
            },
            '/role':{
                path: '../config/roleCtrl.js',         //权限管理
                controller: 'roleCtrl',     			//控制器名称
                tpl:'../views/role/index.html',
                model:{0:'roleModel'}
            },
            '/department':{
                path: '../config/departmentCtrl.js',         //组织架构
                controller: 'departmentCtrl',     			//控制器名称
                tpl:'../views/department/index.html',
                model:{0:'departmentModel'}
            },
            '/addrole':{
                path: '../config/addroleCtrl.js',         //权限管理
                controller: 'addroleCtrl',     			//控制器名称
                tpl:'../views/role/add.html',
                model:{0:'roleModel'}
            },
            '/roleEdit/:id':{
                path: '../config/roleEditCtrl.js',         //权限管理
                controller: 'roleEditCtrl',     			//控制器名称
                tpl:'../views/role/edit.html',
                model:{0:'roleModel'}
            },
            '/roleController/:id':{
                path: '../config/roleControllerCtrl.js',         //权限管理
                controller: 'roleControllerCtrl',     			//控制器名称
                tpl:'../views/role/controller.html',
                model:{0:'roleModel'}
            },
            '/roleAction/:id':{
                path: '../config/roleActionCtrl.js',         //权限管理
                controller: 'roleActionCtrl',     			//控制器名称
                tpl:'../views/role/action.html',
                model:{0:'roleModel'}
            },
            '/operation':{
                path: '../config/operationCtrl.js',         //操作日志
                controller: 'operationCtrl',     			//控制器名称
                tpl:'../views/operation/index.html',
                model:{0:'operationModel'}
            },
            '/uploadfile/:id':{
                path: '../config/uploadFileCtrl.js',         //附件上传和设置Tag
                controller: 'uploadFileCtrl',     			//控制器名称
                tpl:'../views/contacts/file.html',
                model:{0:'attachModel'}
            },
            '/editfile/:id':{
                path: '../config/editFileCtrl.js',         //附件编辑页
                controller: 'editFileCtrl',     			//控制器名称
                tpl:'../views/contacts/fileedit.html',
                model:{0:'contactsModel'}
            },
            '/contactsaddress/:id':{
                path: '../config/contactsAddressCtrl.js',         //联系人详细地址列表页
                controller: 'contactsAddressCtrl',     			//控制器名称
                tpl:'../views/contacts/address.html',
                model:{0:'contactsModel'}
            },
            '/addressEdit/:id':{
                path: '../config/contactsAddressEditCtrl.js',         //联系人详细地址编辑
                controller: 'contactsAddressEditCtrl',     			//控制器名称
                tpl:'../views/contacts/addressedit.html',
                model:{0:'contactsModel'}
            },
            '/addaddress/:id':{
                path: '../config/contactsAddressEditCtrl.js',         //联系人详细地址编辑
                controller: 'contactsAddressEditCtrl',     			//控制器名称
                tpl:'../views/contacts/addressedit.html',
                model:{0:'contactsModel'}
            },
            '/modifypassword':{
                path: '../config/modifyPasswordCtrl.js',         //联系人详细地址编辑
                controller: 'modifyPasswordCtrl',     			//控制器名称
                tpl:'../views/user/modify.html',
                model:{0:'userModel'}
            },
            '/undercontacts':{
                path: '../config/undercontactsCtrl.js',         //下属客户
                controller: 'undercontactsCtrl',     			//控制器名称
                tpl:'../views/contacts/under.html',
                model:{0:'contactsModel'}
            }


    };
});