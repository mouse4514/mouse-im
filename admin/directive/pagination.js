define(['angular','app'],function(angular,app,scope){
	
	function build(scope,attrs){
    	var maxPage =  Math.ceil(scope.total/ scope.pageSize) ;
    	scope.isShow = true;
    	if(maxPage<=1){
    		scope.isShow = false;
    	}
        var pageNo = scope.page;
        var item = {value: 1,title: '',liClass: '',action: function () {}};
        scope.pageNo = pageNo;
        scope.lists = [];
            if(maxPage > 8){
                if(pageNo > 3){
                	itemFirst = {value: pageNo-1,title: '<<',liClass: 'first',action: function () {internalAction(scope, this.value);}};
                	scope.lists.push(itemFirst);
                	item = {value: 0,title: '...',liClass: '',action: function () {return;}};
                    scope.lists.push(item);
                }
               
                for(var i= pageNo <=2?1:pageNo -2 ;i<= (pageNo >= maxPage-2?maxPage:pageNo +2) ;i++ ){
                    if(i == 1){
                        if(pageNo == 1){
                        	//只有在pageNO<3情况
                        	itemPrev = {value: pageNo,title: '<<',liClass: 'first',action: function () {internalAction(scope, this.value);}};
                        	scope.lists.push(itemPrev);
                        	
                            item = {value: i,title: i,liClass: 'active',action: function () {internalAction(scope, this.value);}};
                            scope.lists.push(item);
                        }else{
                        	itemPrev = {value: pageNo-1,title: '<<',liClass: 'first',action: function () {internalAction(scope, this.value);}};
                        	scope.lists.push(itemPrev);
                        	
                            item = {value: i,title: i,liClass: '',action: function () {internalAction(scope, this.value);}};
                            scope.lists.push(item);
                        }
                    }else if(i == maxPage){
                        if(pageNo == maxPage){
                        	item = {value: i,title: i,liClass: 'active',action: function () {internalAction(scope, this.value);}};
                            scope.lists.push(item);
                            itemNext = {value: pageNo,title: '>>',liClass: 'last',action: function () {internalAction(scope, this.value);}};
                        	scope.lists.push(itemNext);
                        }else{
                        	item = {value: i,title: i,liClass: '',action: function () {internalAction(scope, this.value);}};
                            scope.lists.push(item);
                            itemNext = {value: pageNo+1,title: '>>',liClass: 'last',action: function () {internalAction(scope, this.value);}};
                        	scope.lists.push(itemNext);
                        }
                    }else{
                        if(pageNo == i){
                        	item = {value: i,title: i,liClass: 'active',action: function () {internalAction(scope, this.value);}};
                            scope.lists.push(item);
                        }else{
                        	item = {value: i,title: i,liClass: '',action: function () {internalAction(scope, this.value);}};
                            scope.lists.push(item);
                        }
                    }
                }
                if(pageNo < maxPage - 2){
                	item = {value: 0,title: '...',liClass: '',action: function () {return;}};
                    scope.lists.push(item);
                    itemNext = {value: pageNo+1,title: '>>',liClass: 'last',action: function () {internalAction(scope, this.value);}};
                	scope.lists.push(itemNext);
                }
            }else{
                for(var i=1 ; i<=maxPage ; i++){
                    if(i == 1){
                        if(pageNo == 1){
                        	itemPrev = {value: pageNo-1,title: '<<',liClass: 'first',action: function () {internalAction(scope, this.value);}};
                        	scope.lists.push(itemPrev);
                        	item = {value: i,title: i,liClass: 'active',action: function () {internalAction(scope, this.value);}};
                            scope.lists.push(item);
                        }else{
                          	itemPrev = {value: pageNo-1,title: '<<',liClass: 'first',action: function () {internalAction(scope, this.value);}};
                        	scope.lists.push(itemPrev);
                        	item = {value: i,title: i,liClass: '',action: function () {internalAction(scope, this.value);}};
                            scope.lists.push(item);
                        }
                    }else if(i == maxPage){
                        if(pageNo == maxPage){
                        	item = {value: i,title: i,liClass: 'active',action: function () {internalAction(scope, this.value);}};
                            scope.lists.push(item);
                            itemNext = {value: pageNo,title: '>>',liClass: 'last',action: function () {internalAction(scope, this.value);}};
                        	scope.lists.push(itemNext);
                        }else{
                        	item = {value: i,title: i,liClass: '',action: function () {internalAction(scope, this.value);}};
                            scope.lists.push(item);
                            itemNext = {value: pageNo+1,title: '>>',liClass: 'last',action: function () {internalAction(scope, this.value);}};
                        	scope.lists.push(itemNext);
                        }
                    }else{
                        if(pageNo == i){
                        	item = {value: i,title: i,liClass: 'active',action: function () {internalAction(scope, this.value);}};
                            scope.lists.push(item);
                        }else{
                        	item = {value: i,title: i,liClass: '',action: function () {internalAction(scope, this.value);}};
                            scope.lists.push(item);
                        }
                    }
                }
            }
	}
	/**
	 * 单击时触发
	 */
    function internalAction(scope, page) {
        
        if (scope.page == page) {
            return;
        }
        if(page <= 0){
        	return;
        }
        scope.page = page;
        scope.pagingAction({
            page: page
        });

    }
    
	//pageNo按照现实中的习惯，从1开始计数。SQL语句中需做相应处理
	app.directive('pageination', function () {
        return {
            restrict : 'AE',
            replace : false,
            template : 
            '<div ng-show="isShow" ><span class="l ml10">每页显示{{pageSize}}条</span><span class="l ml20">跳转到第<input type="text" ng-change="pageChange(pageNo)" ng-model="pageNo" value="{{page}}">页</span>'
			+'<span class="r ml30 mr10">共{{total}}条</span>'
			+'<ul id="lists" class="r lists">'
			+'<li ng-click="list.action()" ng-repeat="list in lists"><a class="{{list.liClass}}" href="javascript:;">{{list.title}}</a></li>'
			+'</ul></div>',
            scope: {
            	 page: '=',
                 pageSize: '=',
                 total: '=',
            	 pagingAction: '&'
            }, 
            link: function (scope, element, attrs) {
                var temp = scope, tempattrs = attrs;
                scope.$watch('page', function(newvalue) {
                        temp.page = newvalue;
                        build(temp, tempattrs);
                });
                scope.$watch('total', function(newvalue) {
                        temp.total = newvalue;
                        build(temp, tempattrs);
                });
                scope.pageChange = function(pageNo){
                	var page = parseInt(pageNo);
                	var maxPage =  Math.ceil(scope.total/ scope.pageSize) ;
                	if(maxPage<page){
                		page = maxPage;
                	}
                	scope.pagingAction({
                        page: page
                    });
           	 }
            }
        };
	});
	
})