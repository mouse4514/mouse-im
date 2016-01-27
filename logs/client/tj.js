/**
 * Created by Administrator on 2016/1/19.
 */
(function(window,document,undefined){
    // upLogger对象是采集脚本对外提供的操作对象
    if (window.upLogger){//如果不为空，直接返回，避免重复安装
        return;
    }
    var upBeaconUtil ={//日志记录工具类
            jsName:'tj.js',//程序名称
            defaultVer:201601020,//版本日期
            getVersion:function(){//获取版本号
                var e = this.jsName;
                var a = new RegExp(e + "(\\?(.*))?$");
                var d = document.getElementsByTagName("script");
                for (var i = 0;i < d.length;i++){
                    var b = d[i];
                    if (b.src && b.src.match(a)){
                        var z = b.src.match(a)[2];
                        if (z && (/^[a-zA-Z0-9]+$/).test(z)){
                            return z;
                        }
                    }
                }
                return this.defaultVer;
            },
            setCookie:function(sName,sValue,oExpires,sPath,sDomain,bSecure){//设置cookie信息
                var currDate = new Date(),
                    sExpires = typeof oExpires == 'undefined'?'':';expires=' + new Date(currDate.getTime() + (oExpires * 24 * 60 * 60* 1000)).toUTCString();
                document.cookie = sName + '=' + sValue + sExpires + ((sPath == null)?'':(' ;path=' + sPath)) + ((sDomain == null)?'':(' ;domain=' + sDomain)) + ((bSecure == true)?' ; secure':'');
            },
            getCookie:function(sName){//获取cookie信息
                var regRes = document.cookie.match(new RegExp("(^| )" + sName + "=([^;]*)(;|$)"));
                return (regRes != null)?unescape(regRes[2]):'-';
            },
            getRand:function(){// 生产页面的唯一标示
                var currDate = new Date();
                var randId = currDate.getTime() + '-';
                for (var i = 0;i < 32;i++)
                {
                    randId += Math.floor(Math.random() * 10);
                }
                return randId;
            },
            parseError:function(obj){
                var retVal = '';
                for (var key in obj){
                    retVal += key + '=' + obj[key] + ';';
                }
                return retVal;
            },
            getParam:function(obj,flag){// 参数转化方法
                var retVal = null;
                if (obj){
                    if (upBeaconUtil.isString(obj) || upBeaconUtil.isNumber(obj)){
                        retVal = obj;
                    }else{
                        if (upBeaconUtil.isObject(obj)){
                            var tmpStr = '';
                            for (var key in obj){
                                if (obj[key] != null && obj[key] != undefined){
                                    var tmpObj = obj[key];
                                    if (upBeaconUtil.isArray(tmpObj)){
                                        tmpObj = tmpObj.join(',');
                                    }else{
                                        if (upBeaconUtil.isDate(tmpObj)){
                                            tmpObj = tmpObj.getTime();
                                        }
                                    }
                                    tmpStr += key + '=' + tmpObj + '&';
                                }
                            }
                            tmpStr = tmpStr.substring(0,tmpStr.length - 1);
                            retVal = tmpStr;
                        }else{
                            if (upBeaconUtil.isArray(obj)){
                                if (upBeaconUtil.length & upBeaconUtil.length > 0){
                                    retVal = obj.join(',');
                                }
                            }else{
                                retVal = obj.toString();
                            }
                        }
                    }
                }

                if (!retVal){
                    retVal = '-';
                }

                if (flag){
                    retVal = encodeURIComponent(retVal);
                    retVal = this.base64encode(retVal);
                }
                return retVal;
            },
            base64encode: function(G) {//base64加密
                var A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                var C, E, z;
                var F, D, B;
                z = G.length;
                E = 0;
                C = "";
                while (E < z) {
                    F = G.charCodeAt(E++) & 255;
                    if (E == z) {
                        C += A.charAt(F >> 2);
                        C += A.charAt((F & 3) << 4);
                        C += "==";
                        break
                    }
                    D = G.charCodeAt(E++);
                    if (E == z) {
                        C += A.charAt(F >> 2);
                        C += A.charAt(((F & 3) << 4) | ((D & 240) >> 4));
                        C += A.charAt((D & 15) << 2);
                        C += "=";
                        break
                    }
                    B = G.charCodeAt(E++);
                    C += A.charAt(F >> 2);
                    C += A.charAt(((F & 3) << 4) | ((D & 240) >> 4));
                    C += A.charAt(((D & 15) << 2) | ((B & 192) >> 6));
                    C += A.charAt(B & 63)
                }
                return C
            },
            getDomain:function(){//获取网站的域名
                return document.URL.substring(document.URL.indexOf("://") + 3,document.URL.lastIndexOf("\/"));
            },
            isString:function(obj){// 判断是不是String类型
                return (obj != null) && (obj != undefined) && (typeof obj == 'string') && (obj.constructor == String);
            },
            isNumber:function(obj){// 判断是否是数组
                return (typeof obj == 'number') && (obj.constructor == Number);
            },
            isDate:function(obj){// 判断是否是日期
                return obj && (typeof obj == 'object') && (obj.constructor == Date);
            },
            isArray:function(obj){//判断是否是数组
                return obj && (typeof obj == 'object') && (obj.constructor == Array);
            },
            isObject:function(obj){//判断是否是对象
                return obj && (typeof obj == 'object') && (obj.constructor == Object)
            },
            trim:function(str){// 去除左右两边空格
                return str.replace(/(^\s*)|(\s*$)/, "");;
            }
        },
        beacon_vist_num = isNaN(beacon_vist_num = +upBeaconUtil.getCookie('up_beacon_vist_count')) ? 1:beacon_vist_num + 1;// 从cookie里获取访问次数
    upBeaconUtil.setCookie('up_beacon_vist_count',beacon_vist_num);//记录新的访问次数
    var setUpBeaconId = function(){
            var sUpBeaconId = upBeaconUtil.trim(upBeaconUtil.getCookie('up_beacon_id'));
            if (sUpBeaconId == undefined || sUpBeaconId == null || sUpBeaconId == '' || sUpBeaconId == '-'){
                upBeaconUtil.setCookie('up_beacon_id',(upBeaconUtil.getDomain() + '.' + (new Date()).getTime()));
            }
        }(),
        beaconMethod = {
            uvId:'up_beacon_id',//
            memId:'up_dw_track',
            beaconUrl:'tj.wjtr.com/wjtr_app.gif',//记录访问日志的url
            errorUrl:'tj.wjtr.com/wjtr_app.gif',//记录错误日志的url
            clickUrl:'tj.wjtr.com/wjtr_app.gif',//记录click日志的url
            pageId:typeof _beacon_pageid != 'undefined'?_beacon_pageid:(_beacon_pageid = upBeaconUtil.getRand()),//生产pageId(页面唯一标示)
            authId:'d8a8a907555ea11727d4de05ea3170bea491ca3c',
            protocol:function(){//请求的协议例如http://
                var reqHeader = location.protocol;
                if ('file:' === reqHeader){
                    reqHeader = 'http:';
                }
                return reqHeader + '//';
            },
            tracking:function(data){// 记录访问日志的方法（对外）
                this.beaconLog(data);
            },
            getRefer:function(){// 获取上游页面信息
                var reqRefer = document.referrer;
                reqRefer == location.href && (reqRefer = '');
                try{
                    reqRefer = '' == reqRefer ? opener.location:reqRefer;
                    reqRefer = '' == reqRefer ? '-':reqRefer;
                }catch(e){
                    reqRefer = '-';
                }
                return reqRefer;
            },
            beaconLog:function(data){// 记录访问日志方法
                try{
                    var httpUrlContent = document.URL,
                        hisPageUrl = this.getRefer(),
                        ptId = upBeaconUtil.getCookie(this.memId),
                        cId = upBeaconUtil.getCookie(this.uvId),
                        btsVal = upBeaconUtil.getCookie('b_t_s'),
                        beanconMObj = {};
                    var btsFlag = btsVal == '-' || btsVal.indexOf('s') == -1;
                    if (ptId != '-'){
                        beanconMObj.memId = ptId;
                    }
                    if (btsFlag){
                        beanconMObj.subIsNew = 1;
                        upBeaconUtil.setCookie('b_t_s',btsVal == '-' ? 's' : (btsVal + 's'),10000,'/');
                    }else{
                        beanconMObj.subIsNew = 0;
                    }
                    var logParams = beanconMObj,
                        logPageId = this.pageId,
                        logTitle = document.title;
                    if (logTitle.length > 25){
                        logTitle = logTitle.substring(0,25);
                    }
                    logTitle = encodeURIComponent(logTitle);
                    var logCharset = (navigator.userAgent.indexOf('MSIE') != -1) ? document.charset : document.characterSet;
                    var logQuery = {
                        pageId:logPageId,
                        title:logTitle,
                        charset:logCharset,
                        sr:(window.screen.width + '*' + window.screen.height)
                    };
                    var sparam = {
                        logUrl:httpUrlContent,
                        logHisRefer:hisPageUrl,
                        logParams:logParams,
                        logQuery:logQuery
                    };
                    var postData = {};
                    //请求和用户提交数据
                    postData.action = data.action;
                    postData.method = data.method;
                    postData.authId = this.authId;
                    delete data.action;
                    delete data.method;
                    sparam.appParams = data.appParams;
                    postData.data = JSON.stringify(sparam);
                    this.sendPost(this.beaconUrl,postData);
                }catch(ex){
                    this.sendError(ex);
                }
            },
            clickLog:function(sparam){// 记录点击日志
                try{
                    // 获得pageId
                    var clickPageId = this.pageId,
                        httpUrlContent = document.URL,
                        hisPageUrl = this.getRefer()
                        ;
                    if (!clickPageId){// 当pageId值为空，重新计算pageId
                        this.pageId = upBeaconUtil.getRand();
                        clickPageId    = this.pageId;
                    }
                    var clickAuthId = this.authId;//authId是针对某个网站的唯一标示
                    if (!clickAuthId){
                        clickAuthId = '-';
                    }
                    sparam.pageId = clickPageId;
                    var postData = {
                        logUrl:httpUrlContent,
                        logHisRefer:hisPageUrl
                    };
                    //请求和用户提交数据
                    postData.action = sparam.action;
                    postData.method = sparam.method;
                    postData.authId = clickAuthId;
                    delete sparam.action;
                    delete sparam.method;
                    postData.data = JSON.stringify(sparam);
                    this.sendPost(this.clickUrl,postData);
                    //this.sendRequest(this.clickUrl, sparam);// 发送点击日志
                }catch(ex){
                    this.sendError(ex);
                }
            },
            sendRequest:function(url,params){// 日志发送方法
                var urlParam = '',currDate = new Date();
                try{
                    if (params){
                        urlParam = upBeaconUtil.getParam(params,false);
                        urlParam = (urlParam == '')?urlParam:(urlParam + '&');
                    }
                    var tmpUrlParam = 'ver=' + upBeaconUtil.getVersion() + '&time=' + currDate.getTime();
                    url = this.protocol() + url + '&' + urlParam + tmpUrlParam;

                    var logImage = new Image();
                    logImage.onload = function(){
                        logImage = null;
                    }
                    logImage.src = url;
                }catch(e){
                    this.sendError(e);
                }
            },
            sendPost:function(url,postData){
                try {
                    postData = (function (obj) { // 转成post需要的字符串.
                        var str = "";
                        for (var prop in obj) {
                            str += prop + "=" + obj[prop] + "&";
                        }
                        var newstr=str.substring(0,str.length-1);
                        return newstr;
                    })(postData);

                    var xhr = new XMLHttpRequest();

                    xhr.open("POST", 'http://' + url, true);
                    xhr.withCredentials = true;//放在 open 方法后面比较靠谱
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    //xhr.setRequestHeader("Content-type", "application/json");
                    xhr.onreadystatechange = function () {
                        var XMLHttpReq = xhr;
                        if (XMLHttpReq.readyState == 4) {
                            if (XMLHttpReq.status == 200) {
                                var text = XMLHttpReq.responseText;

                                console.log(text);
                            }
                        }
                    };
                    xhr.send(postData);
                }catch(e) {
                    this.sendError(e);
                }
            },
            sendError:function(ex){// 发送错误日志
                var errURIParams = upBeaconUtil.parseError(ex),
                    errURL = this.errorUrl + '&type=send&exception=' + encodeURIComponent(errURIParams.toString()),
                    errImage = new Image();
                errImage.onload = function(){
                    errImage = null;
                };
                errImage.src = this.protocol() + errURL;
            }
        };
    //beaconMethod.tracking();//访问日志
    window.upLogger = beaconMethod;//构建window的upLogger对象
})(window,document);