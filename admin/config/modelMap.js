define([], function () {

    //angular会自动根据controller函数的参数名，导入相应的服务
    return  {
            'cookieModel':{
                path: '../services/cookieModel.js',         //模块的代码路径
                type : 'factory'
            },
            'defaultModel':{
            	  path: '../services/defaultModel.js',         //模块的代码路径
                  type : 'factory'
            },
            'userModel':{
                path: '../services/userModel.js',         //模块的代码路径
                type : 'factory'
            },
            'systemModel':{
                path: '../services/systemModel.js',
                type : 'factory'
            },
            'customerModel':{
                path: '../services/customerModel.js',
                type : 'factory'
            },
            'roleModel':{
                path: '../services/roleModel.js',
                type : 'factory'
            },
            'contactsModel':{
                path: '../services/contactsModel.js',
                type : 'factory'
            },
            'wjtrserverModel':{
                path: '../services/wjtrserverModel.js',
                type : 'factory'
            }
        };
});