const COOKIE_LIST = ['role', 'token', 'name', 'openid', 'id', 'accessToken', 'dix_token', 'dix_id', 'mmdId', 'particleRole', 'headimgurl', 'userNick', 'tel', 'email', 'type', 'sceneOid', 'sceneMid'];
const MMDUserAPIUrl = "https://www.thingjs.com/uinoUser";
const SERVERPATH = location.host.indexOf('www.3dmmd.cn')==-1&&(location.host == 'store.thingjs.com' || location.port != ''||location.pathname.indexOf('/thingjs-x/')!=-1) ? 'https://www.thingjs.com' : '';
var userpath;
var headimgurl;
var loginTime;
var tid2 = null;
var timeS = 59;
var timeR = null;
var timeS1 = 59;
var timeR1 = null;
var timeoutid = null;
var storage = window.localStorage;
var flag = storage.flag;
//记录打开登录框来源信息
var loginSource = '';
$(function () {
    init();
    //顶导用户名样式
    var flagLogin = $("#login").html();
    if (flagLogin == "登录") {
        $("#login").css("color", "#fff");
    } else {
        $("#login").css("color", "#36383B");
        $("#login").css("line-height", "28px!important");
    }
    if (SERVERPATH) {
        if(typeof(initEject)!='undefined') initEject();
    } else {
        isLogin();
    }
});
$(".campusLi").mouseover(function () {
    $(".campusUl").css("display", "block");
});
/**2019-6-18 修改
* 修改鼠标进入/离开导航栏中产品的事件
* 新增一个判断方法，使得在新手教程下屏蔽其中不需要的方法
*/
$(".campusLi").mouseout(function () {
    if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
    } else {
        $('.campusUl').css('display', 'none');
    }
});
function getQueryString(name) {
    var result = window.location.href.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    if (result[1].indexOf("#") > 0) {
        result[1] = result[1].substring(0, result[1].indexOf("#"));
    }
    return result[1];
}
function getUserName(name) {
    if (!name) return null;
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    var arr1, reg1 = new RegExp("(^| )" + 'openid' + "=([^;]*)(;|$)");
    var arr2, reg2 = new RegExp("(^| )" + 'headimgurl' + "=([^;]*)(;|$)");
    if (arr1 = document.cookie.match(reg1)) {
        if (arr = document.cookie.match(reg)) {
            userpath = '/uploads/wechat/' + unescape(arr1[2]);
            if (arr2 = document.cookie.match(reg2)) {
                headimgurl = unescape(arr2[2])
                //return Base64.decode(unescape(arr[2]));
                var returnName = '';
                try {
                    returnName = decodeURI(arr[2]);
                } catch (error) {
                    return arr[2];
                }
                try {
                    var returnName2 = decodeURI(returnName);
                } catch (error) {
                    return returnName;
                }
                return returnName2;
            }
        } else
            return null;
    } else {
        if (arr = document.cookie.match(reg)) {
            userpath = '/uploads/moni/' + unescape(arr[2]);
            return unescape(arr[2]);
        } else
            return null;
    }
}
// 获取当前日期
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function init() {
    if (!SERVERPATH) {
        if (getQueryString("m")) {
            if (getQueryString("m") == 'sample' || getQueryString("m") == 'sample_old') {
                var opencodeid = getQueryString("c");
                var secneurl = parseSecneUrl(decodeURIComponent(getQueryString("i")));
                var fileNa = getQueryString("f");
                var projectUrl = getQueryString("o");
                var cityUrl = getQueryString("cbuilder");
                var style = getQueryString("style");
                if (opencodeid) {
                    var u = null;
                    // ***一下要求例子必须以sample_的命名 ***
                    if (opencodeid.slice(0, 7) == 'sample_') {
                        u = './examples/js/' + opencodeid + '.js';
                    } else {
                        u = '../../../demos/' + opencodeid + '/js/' + opencodeid + '.js';
                    }

                    onMenu('sample', u, '#' + opencodeid);
                } else if (secneurl) {
                    if (secneurl == '0') {
                        app_code = '';
                    } else {
                        if (style == 'TechBlue') {
                            var sky = "BlueSky";
                            if (getQueryString("sky")) sky = getQueryString("sky");
                            app_code = '\/\/加载场景代码\nvar app = new THING.App({ \n    \/\/ 场景地址\n    "url": "'
                                + secneurl
                                + '",\n    \/\/背景设置\n    "skyBox" : "' + sky +
                                '",\n    \/\/科幻风格\n    "complete" :function(){ \n        app.root.campuses[0].changeStyle("TechBlue");\n    }\n});';
                        } else {
                            var sky = "BlueSky";
                            if (getQueryString("sky")) sky = getQueryString("sky");
                            app_code = '\/\/加载场景代码\nvar app = new THING.App({ \n    \/\/ 场景地址\n    "url": "'
                                + secneurl
                                + '",\n    \/\/背景设置\n    "skyBox" : "' + sky +
                                '"\n});';
                        }
                    }
                    onMenu('sample', './examples/js/sample_01_Hello.js', 1);
                } else if (fileNa) {
                    var filePath = '/uploads/wechat/' + getUserName('openid') + '/' + fileNa + '.js';
                    onMenu('sample', path + filePath, 1);
                } else if (cityUrl) {
                    cityUrl = '/guide/?m=sample&cbuilder=myProduct'
                    onMenu('sample', path + cityUrl, 1);
                } else if (projectUrl) {
                    if (projectUrl.indexOf("./uploads") == 0) {
                        projectUrl = "." + projectUrl
                    }
                    $.ajax({
                        url: projectUrl,
                        type: 'get',
                        dataType: 'text',
                        success: function (data) {
                            app_code = data;
                            onMenu('sample', './examples/js/sample_01_Hello.js', 1);
                        }
                    })
                } else {
                    onMenu(getQueryString("m"), './examples/js/sample_01_Hello.js');
                }
            } else {
                onMenu(getQueryString("m"));
            }

        } else if (window.location.pathname != '/' && window.location.pathname != '/guide/') {
            var pathname = window.location.pathname;
            pathname = pathname.indexOf("guide/speedCityDetailPages")>-1?"/guide/speedCityDetailPages/":pathname;
            switch (pathname) {
                case "/guide/aboutUs/":
                    onMenu('aboutUs');
                    break;
                case "/guide/price/":
                    onMenu('price');
                    break;
                case "/guide/granary/":
                    onMenu('granary');
                    break;
                case "/guide/port/":
                    onMenu('port');
                    break;
                case "/guide/safety/":
                    onMenu('safety');
                    break;
                case "/guide/fire/":
                    onMenu('fire');
                    break;
                case "/guide/building/":
                    onMenu('building');
                    break;
                case "/guide/pano/":
                    onMenu('pano');
                    break;
                case "/guide/speedcityshow/":
                    onMenu('speedcityshow');
                    break;
                case "/guide/mod/":
                    onMenu('mod');
                    break;
                case "/guide/city/":
                    onMenu('city');
                    break;
                case "/guide/campus/":
                    onMenu('campus');
                    break;
                case "/guide/platform/":
                    onMenu('thingjsPlatform');
                    break;
                case "/guide/main":
                    onMenu('main');
                    break;
                case "/guide/tutorial/":
                    onMenu('tutorial');
                    break;
                case "/guide/speedCityDetailPages/":
                    speed_initSDK()
                    break;
                case "/guide/store/":
                    onMenu('store');
                    break;
                case "/guide/store2/":
                    onMenu('store2');
                break;
                case "/guide/partners/":
                    onMenu('partners');
                    break;
                case "/guide/signupentry/":
                    onMenu('signupentry');
                    break;
                case "/guide/wisdomScenarioVDC/":
                    onMenu('wisdomScenarioVDC');
                    break;
                case "/guide/thingjsvideo/":
                    onMenu('thingjsvideo');
                    break;
                case "/guide/modeldetail/":
                    onMenu('modeldetail');
                    break;
                default:
                    onMenu('main');
                    break;
            }
        } else if (window.location.pathname.indexOf("admin") == -1) {
            onMenu('main');
        }
    }
    // /guide/html/speedCityDetailPages/生成的页面加上单独埋点方法
    function speed_initSDK () {
        window.AnalysysAgent.init({
            appkey: "36a2d06e80f2df66", //APPKEY
            debugMode: 0,
            uploadURL: 'https://www.thingjs.com/argo',
            visitorConfigURL: 'https://www.thingjs.com/argo', // 可视化
            /**如无自定义配置，则与uploadURL相同**/
            autoHeatmap: true, // 点击位置热图、点击元素热图
            autoWebstay: true,
            autoTrack: false, // 全埋点
            encryptType: 1, // 默认不加密0 加密1，2
            // SDKFileDirectory: '../sdk/',       //可视化模块SDK与热图模块SDK存放目录
            autoClickBlackList: function () { //设置全埋点统计黑名单 页面地址`url`内包含'?m=sample'的页面不进行事件采集
                var url = window.location.href
                if (url.indexOf('?m=sample') > -1) {
                    return true
                }
                return false
            },
            heatMapBlackList: function () { // 设置热图黑名单 true 不进行采集; false 采集
                var url = window.location.href;
                var num = url.indexOf('://');
                var urlName = url.slice(num);
                if (urlName == '://www.thingjs.com/guide/' || urlName == '://www.thingjs.com/guide/?m=main' || urlName == '://www.thingjs.com/guide/price') {
                    return false
                }
                if (url.indexOf('/guide/?hmsr=') > -1) { // 外部链接访问
                    return false
                }
                return true
            }
        })
        window.AnalysysAgent && window.AnalysysAgent.profileSetOnce('isregistered', '否'); //默认未注册
        window.AnalysysAgent && window.AnalysysAgent.profileSet('last_access_time', new Date().Format('yyyy-MM-dd hh:mm:ss')); // 最近一次访问时间
    }
    $("#msg").click(function () {
        var openid = getCookie("openid");
        if (!openid) {
            clearAllCookie();
            window.location.href = document.location.origin;
        } else {
            if (getCookie("role") == 'admin') {
                if (getCookie("type") == '1') {
                    $(this).attr("href", "../admin/#/UserList")
                } else if (getCookie("type") == '2') {
                    $(this).attr("href", "../admin/#/State")
                }
            } else if (getCookie("openid")) {
                if (!SERVERPATH) {
                    if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
                        $(this).attr("href", "../admin/#/myScene?intoTheGuide=yes");
                    } else {
                        if (getQueryString('m') == 'sample') return largePanel(null, '项目');
                        $(this).attr("href", "../admin/#/myProduct");
                    }
                } else {
                    window.open('https://www.thingjs.com/admin/#/myProduct');
                }
            }
        }
    })
    $("#sub-site-nav .nav-menu").each(function (i) {
        $(this).children(".dropdown-toggle").click(function () {
            if ($('html').width() <= 1024) {
                window.location.href = window.location.origin + window.location.pathname + $(this).attr("href");
            }
        });
        $(this).children(".dropdown-toggle").dblclick(function () {
            window.location.href = window.location.origin + window.location.pathname + $(this).attr("href");
        });
    })

    var name = getUserName('name');
    if (!name) {
        $('#dcvBtn').hide();
        setCookie("dcvRole", false);
        $('#login').show();
        $('#login').html('登录').attr('data-log', '-1');
        $('.vipLi .login-name').attr('data-log', '-1');
        $('.logouttwo .login-name').attr('data-log', '-1');
        $('#login').removeClass("login-active");
        $('.nav-login-two').show();
        $('#nav-reg').show();
    } else {
        if (getQueryString("back")) {
            if(getQueryString("back").indexOf('?')!='-1'){
                window.location.href = getQueryString("back")+'&token='+getCookie('token');
            }else{
                window.location.href = getQueryString("back")+'?token='+getCookie('token');
            }
            return;
        }
        $('#login').html(name).attr('data-log', '1');
        $('.vipLi .login-name').html(name).attr('data-log', '1');
        $('.logouttwo .login-name').html(name).attr('data-log', '1');
        $('#login').addClass("login-active");
        $('#login').show();
        $('#msg').show();
        $('.nav-login-two').hide();
        if (getCookie('role') !== 'admin') {
            $('#informBell').show();
        } else {
            $('#informBell').hide();
        }
        $('.vipLi').show();
        $('#headimg').show();
        $('#headimgs').show();
        
        if (headimgurl.substring(0, 4) != 'http') {
            $('#headimg').css({
                'background-image': 'url(' + SERVERPATH + headimgurl + ')'
            });
            $('#headimgs').css({
                'background-image': 'url(' + SERVERPATH + headimgurl + ')'
            });
        } else {
            $('#headimg').css({
                'background-image': 'url(' + headimgurl + ')'
            });
            $('#headimgs').css({
                'background-image': 'url(' + headimgurl + ')'
            });
        }
        reloadHeader();
        $("#recharge").css("display", "block");
        $("#modelSer").css("display", "block");
        $("#development").css("display", "block");

        $('#nav-reg').hide();
        if (window.location.pathname != '/admin/' && !SERVERPATH) getMaxNum();
        if (getCookie("role") == 'developer') {
            $(".vip").attr("src", SERVERPATH + '/guide/image/vip.png')
            $(".vip").css({
                "display": "inline"
            });
            $('#developer').hide();
        } else {
            $(".vip").css({
                "display": "none"
            });
            if (getCookie("role") == 'free') { $('#developer').css("display", "block"); }
        }
    }

    // 是否显示课堂
    var mName = getQueryString('m');
    if (window.location.pathname != '/admin/' && window.location.pathname == '/guide/' && (mName == 'main' || mName == 'demo' || mName == '')) {
        $(".right_bottom_corner.QQ").show();
    } else {
        if(mName=='main'||mName=="") {
            $(".right_bottom_corner.QQ").show();
        } else {
            $(".right_bottom_corner.QQ").hide();
        }
    }
}
function indexlogininit(type) {
    loginTime = new Date().Format('yyyy-MM-dd');
    var name = getUserName('name');
    if (!name) {
        //退出
        $('#login').show();
        $('#login').html('登录').attr('data-log', '-1');
        $('.vipLi .login-name').attr('data-log', '-1');
        $('.logouttwo .login-name').attr('data-log', '-1');
        $('#msg').hide();
        $('#emailIcon').hide();
        $('#emailLetter').hide();
        $('#headimg').hide();
        $('#headimgs').hide();
        $('.vipLi').hide();
        $('#login').removeClass("login-active")
        $('.nav-login-two').show();
        $(".vip").css({
            "display": "none"
        });
        $('#developer').hide();
        $('#recharge').hide();
        $('#modelSer').hide();
        $('#development').hide();
        if (SERVERPATH) {
            window.location.href = window.location.protocol + "//" + window.location.host + '/projects';
        } else if (type != 'stopCurrentPage') window.location.href = window.location.protocol + "//" + window.location.host + "/guide/?m=main";
        $('#nav-reg').show();
    } else {
        //登录
        $('#login').html(name).attr('data-log', '1');
        $('.vipLi .login-name').html(name).attr('data-log', '1');
        $('.logouttwo .login-name').html(name).attr('data-log', '1');
        $('#login').addClass("login-active")
        $('#msg').show();
        $('.nav-login-two').hide();
        if (getCookie('role') != 'admin') $("#informBell").show();
        $('#emailIcon').show();
        $('.vipLi').show();
        $('#headimg').show();
        $('#headimgs').show();
        if (headimgurl.substring(0, 4) != 'http') {
            $('#headimg').css({
                'background-image': 'url(' + SERVERPATH + headimgurl + ')'
            });
            $('#headimgs').css({
                'background-image': 'url(' + SERVERPATH + headimgurl + ')'
            });
        } else {
            $('#headimg').css({
                'background-image': 'url(' + headimgurl + ')'
            });
            $('#headimgs').css({
                'background-image': 'url(' + headimgurl + ')'
            });
        }
        reloadHeader();
        $("#recharge").css("display", "block");
        $("#modelSer").css("display", "block");
        $("#development").css("display", "block");

        $('#nav-reg').hide();
        if (getCookie("role") == 'developer') {
            $(".vip").attr("src", SERVERPATH + '/guide/image/vip.png')
            $(".vip").css({
                "display": "inline"
            });
            $('#developer').hide();
        } else {
            $(".vip").css({
                "display": "none"
            });
            if (getCookie("role") == 'free') { $('#developer').css("display", "block"); }
        }
    }

    if (!SERVERPATH) {
        //在线调试页
        if (getQueryString("m") == 'sample' || getQueryString("m") == 'sample_old') {
            if (enableCharts) enableCharts();
            var panelType = "";
            if ($("#moveclose-dialog .panelModel").is(":visible")) {
                panelType = $("#moveclose-dialog .panelModel .panelHeader .panelTitle").text();
                if(panelType=="模型"&&getModels){
                    if (getModels) getModels(queryData, server);
                }
                // if (typeof (bigType) !== 'undefined') {
                //     if (bigType === 'personal') {
                //         if (getCustomModel) getCustomModel(customN, count, curNum, keyword);
                //     }
                // }
            } else if ($("#moveclose-dialog_store .panelModel").is(":visible")) {
                panelType = $("#moveclose-dialog_store .panelModel .panelHeader .panelTitle").text();
                if (panelType == '资源空间' && setPanelModel_1) {
                    setPanelModel_1('', "#moveclose-dialog_store", "资源空间", "store", true);
                }
            }
            if (!sampleTimeout && type != 'stopCurrentPage') domyfile();
            if (getQueryString("cbuilder")) tab_change(1);

            if ($('.setting2 #gf').is(':visible')) {
                $('#list0').find('.item-li.active.lifileActNow').trigger('click');
            } else if ($('.setting2 .filen').is(':visible')) {
                $('.setting2 .filen').trigger('click');
            }
        }
        if (getQueryString("m") === 'model') {
            if (queryData.bigType === 'personal') {
                var small_variety = template('small-variety_3dMax');
                $('.small-variety-ul').html(small_variety);
            }
            if (getNewModels) getNewModels(queryData, server);
        }
        switch (loginSource) {
            case 'modelServer':
                modelServer(true);
                break
            case 'devServer':
                devServer(true)
                break;
            case 'companyServer':
                setCookie("checkSign", true);
                camInfoServer(camInfoType,camInfoMsg);
                break;
            case 'companyServerFirst':
                camInfoServer("companyServerFirst");
                break;
            default:
                showSigninPage("from_login");
                break;
        }
        loginSource = ''
    }
}

function openInform(informId) {
    location.href = SERVERPATH + '/admin/#/sysMsg';
}

function loginwindowon(type, tri) {
    loginclose();
    $('.wxLogin-win span.close.iconfont.icon-close').hide();
    $('.login-window').show().removeClass('fadeOut fadeOutReg').addClass('fadeIn');
    $('.other-login').css('margin-top', '15px');
    $('.pay-mb').show();
    if (type) {
        if (type == 'wid') {
            var e = {
                target: $('.img-pho')
            }
            imgPhoClick(e);
            $('.wxlogin1').trigger('click');
            $('.wxLogin-win span.close.iconfont.icon-close').show();
            $('.img-weixin').hide();
            $('.img-win').hide();
        } else if (type == 'uname') {
            $('.img-win').trigger('click');
            $('.img-wx').hide();
        } else if (type == 'help') {
            window.location.href = "https://thingjs.kf5.com/hc/"
        }
        $('.login-window-header span').text('账号绑定');
        $('.poptip').hide();
    }
    if (tri) {
        if (tri == "2") {
            SERVERPATH ? loginRegOn() : navRegOn();
        } else if (tri == "3") {
            loginForgetOn();
        }
    }
}

function loginwindowhide() {
    $('.login-window').hide();
    $('.pay-mb').hide();
}
$('.vipLi, .vip').mouseover(function (e) {
    // console.log('in')
    if ($(this).attr('data-log') == '-1') {
        loginwindowon();
        //loginqr();
    } else {
        $('.userInfoBox').show();
    }
})
$('.vipLi, .vip').mouseout(
    function (e) {
        // console.log('out')
        if ($(this).attr('data-log') == '-1') {
            loginwindowhide();
            //loginqr();
        } else {
            if (SERVERPATH || document.getElementById("startTeach") && document.getElementById("startTeach").style.color !== 'red') {
                $('.userInfoBox').hide();
            }
        }
    }
)

$('.nav-login,.nav-login-two').on("click", function (e) {
    if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
        setTimeout("introTwo_login()", 500);
    }
    if (e && e.stopPropagation) {
        e.stopPropagation();
    } else {
        window.event.cancelable = true;
    }
    if ($(this).attr('data-log') == '-1') {
        $('.login-window').removeClass('fadeIn');
        if ($('.login-window').hasClass('fadeOut') || $('.login-window').hasClass('fadeOutReg') || !$('.login-window').is(':visible')) {
            $('.login-window').removeClass('fadeOut fadeOutReg').addClass('fadeIn');
        } else {
            $('.login-window').addClass('fadeOut');
        }
        $('.pay-mb').toggle();
        $('.login-window').show();
        $('.tologin-tittle div').eq(0).addClass('login-tab').siblings().removeClass('login-tab');
        $(".verifica-code-login").hide();
        $(".password-login").show();
        $(".login-window").css("height", "358px");
        $('.pay-mb').css("z-index", "801")
    }
});
$('#logout').click(function () {
    $('.vipLi').hide();
    $("#recharge").hide();
    $("#development").show();
    $("#modelSer").show();
    clearAllCookie();
    indexlogininit();
    // 埋点 用户退出
    if (typeof(AnalysysAgent)!='undefined'&&!SERVERPATH) {AnalysysAgent.track('user_dropout');}
});
$('#logouttwo').click(function () {
    $('.vipLi').hide();
    $("#recharge").hide();
    $("#development").show();
    $("#modelSer").show();
    $('#logouttwo').hide();
    clearAllCookie();
    indexlogininit();
    // 埋点 用户退出
    if (typeof(AnalysysAgent)!='undefined'&&!SERVERPATH) {AnalysysAgent.track('user_dropout');}
});

window.onclick = function () {
    $('#sub-site-nav').removeClass('navbar-nav-show');
}

// 移动端菜单按钮
$('.navbar-toggler').click(function (ev) {
    var oEvent = ev || event;
    oEvent.cancelBubble = true;
    oEvent.stopPropagation();
    $('#sub-site-nav').toggleClass('navbar-nav-show');
});


// 21年4.23新改动移动端抽屉式按钮
// 展开
function wapNavPut(){
    $('.wap-nav-put').toggle();
    $('.wap-nav-on').toggle();
    $('.wap-nav-drawer').css('transform','translateX(0)');
    $('#bg-shadow1').css('display','block');

    $('.logouttwo').css('transform','translateY(-100%)');
    $('#bg-shadow2').css('display','none');
}
// 收起
function wapNavOn(){
    $('.wap-nav-put').toggle();
    $('.wap-nav-on').toggle();
    $('.wap-nav-drawer').css('transform','translateX(-100%)');
    $('#bg-shadow1').css('display','none');
}

//登陆
function loginqr() {
    var AppID = 'wx22c16866ca548e70';
    var redirect = 'https://www.thingjs.com/mp';
    var obj = new WxLogin({
        id: "login_container",
        appid: AppID,
        scope: "snsapi_login",
        redirect_uri: redirect,
        //state: "STATE",
    });
}

function getCookie(name, decode) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        if (decode) {
            return decodeURIComponent(arr[2]);
        } else {
            return (arr[2]);
        }
    } else
        return null;
}

function clearAllCookie() {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    var id = getCookie('id');
    var mmdId = getCookie('mmdId');
    loginout_mmd(id, mmdId);
    if (keys) {
        for (var i = keys.length; i--;) {
            if (COOKIE_LIST.indexOf(keys[i]) >= 0) {
                document.cookie = keys[i] + "=; expires=" + date.toGMTString();
                document.cookie = keys[i] + "=;domain=.thingjs.com;expires=" + date.toGMTString() + ";path=/";
                document.cookie = keys[i] + "=;domain=.3dmmd.cn;expires=" + date.toGMTString() + ";path=/";
                $.removeCookie(keys[i], { path: '/' });
                $.removeCookie(keys[i]);
            }
        }
    }
}
function loginout_mmd(id, mmdId) {
    window.localStorage.removeItem('LOGINTIMEOUT');
    $('body span.setTimeSpan').remove();
    isLoginOther = false;
    if (id != null && mmdId != null) {
        $.ajax({
            url: SERVERPATH + '/mp/loginout_mmd?id=' + id + '&mmdId=' + mmdId,
            type: 'get',
            success: function (data) {
                if (data.code == 200) {
                    console.log(data.message);
                }
            }
        })
    }

    // 埋点
    // AnalysysAgent.reset()
}

/**
*当处于指引状态下，用户点击×按钮（退出按钮）无效
*/
function fadeOut() {
    if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
        //如果处于指引状态，则啥也不能干，不在则正常运行
    } else {
        if ($(".login-window").is(':visible')) {
            if ($(".login-window").hasClass('login-reg-over')) {
                $(".login-window").addClass('fadeOutReg');
            } else {
                $(".login-window").addClass('fadeOut');
            }
            $(".login-window").removeClass('fadeIn fadeInReg');
        }

    }
}
function userCfadeIn() {
    $(".user-complete-window").addClass('fadeInC');
    $(".user-complete-window").removeClass('fadeOutC');
}
function userCfadeOut() {
    if ($(".user-complete-window").is(':visible')) {
        $(".user-complete-window").addClass('fadeOutC');
        $(".user-complete-window").removeClass('fadeInC');
    }
}
function loginclose() {
    if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
        //当处于指引状态，则不让登录关闭
    } else {
        if (!SERVERPATH && $('.forgetTel').hasClass('layui-this')) {
            $('.forgetEmail').trigger('click')
        }
        forgetwindowdone();
        regwindowdone();

        $('.forget-window').hide();
        $('.login-form-box').show();
        $('.login-window').removeClass('forgetClass').css({ 'height': '358px', 'width': '380px' });
        $('.pay-mb').hide();
        $('.error-hint-box').hide();
        $(".verifica-code-login").hide();
        $(".password-login").show();
        $('.tologin-tittle div').eq(0).addClass('login-tab').siblings().removeClass('login-tab');
        $('.pay-mb').css('z-index','800')
    }
}

function setCookie(name, value, d, domain) {
    var Days = 2;
    if (d) Days = d;
    var exp = new Date();
    // exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    exp.setTime(setTamp());

    var hostName = window.location.hostname;
    if (hostName == (SERVERPATH ? "store.thingjs.com" : "www.thingjs.com")) {
        domain = ".thingjs.com";
    } else if (hostName == "www.3dmmd.cn") {
        domain = ".3dmmd.cn";
    }

    if (domain) {
        document.cookie = name + "=" + escape(value) + ";domain=" + domain + ";expires=" + exp.toGMTString() + "; path=/;";
    } else {
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
    }
}
function setTamp() {
    var curDate = new Date();
    //当前时间戳
    var curTamp = curDate.getTime();
    //当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态
    var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
    //当日已经过去的时间（毫秒）
    var passedTamp = curTamp - curWeeHours;
    //当日剩余时间
    var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
    return leftTamp + curTamp;
}
$(document).keyup(function (event) {
    if (event.keyCode == 13 && $("#login-btn").is(':visible')) {
        $("#login-btn").trigger("click");
    }
});
$('.login-window').on('click', '#login-btn', function () {
    $('.login-tip').text("");
    var username = encodeURIComponent($("#username").val());
    var password = encodeURIComponent($("#password").val());
    if (username.length == 0 || password.length == 0) {
        $("div[data-error=username]").show();
        $("div[data-error=password]").show();
    } else {
        $("div[data-error=username]").hide();
        $("div[data-error=password]").hide();
        var login_mmd_url = "/mp/login_mmd";
        if ($('.login-window-header span').text() == '账号绑定') {
            login_mmd_url = "/mp/login_mmd?binding=b";
        }
        var data = {
            username: encodeBase64.base64encode(username),
            password: encodeBase64.base64encode(password)
        }
        document.getElementById("login-btn").innerHTML="登录中...";
        document.getElementById("login-btn").style.opacity="0.5";
        $.ajax({
            url: SERVERPATH + login_mmd_url,
            type: "post",
            data: {
                data: encodeBase64.base64encode(JSON.stringify(data))
            },
            success: function (res) {
                document.getElementById("login-btn").innerHTML="立即登录";
                document.getElementById("login-btn").style.opacity="1";
                if (res.code == 200) {
                    // 手机端登录
                    if(typeof(meteor)!='undefined'&&meteor) {meteor.track("form", {convert_id: "1698450524307459"})};
                    clearAllCookie();
                    setCookie('role', res.role);
                    setCookie('token', res.token);
                    setCookie('accessToken', res.accessToken);
                    setCookie('id', res.id);
                    setCookie("mmdId", res.mmdId);
                    // var haveOne = res.haveOne ? res.haveOne : '';
                    // setCookie('haveOne', haveOne);

                    logingoon(res);
                    $('.nav-login-two').hide()
                    $('.pay-mb').css('z-index','800')
                    // loginContinue(res);
                    if (typeof(AnalysysAgent)!='undefined'&&!SERVERPATH) {
                        // 埋点_账号关联
                        AnalysysAgent.alias(res.mmdId + '');
                        // 埋点 用户登录成功
                        AnalysysAgent.track('user_login_success');
                    }
                } else if (res.code == 201) {
                    setCookie('id', res.id);
                    setCookie('accessToken', res.accessToken);
                    alert('绑定成功', 'sucsure');
                    if ($('#ifBindUN').is(':visible')) {
                        $('#ifBindUN').html(res.uname + ' <span class="bindButton"</span>')
                    }
                    loginwindowhide();
                    checkNavColor();
                    // window.location.reload();
                    //window.location.href = 'http://' + window.location.host + "/guide/?"+window.location.search;
                } else if (res.code == 205) {
                    var fn = function () {
                        window.localStorage.removeItem('LOGINTIMEOUT');
                        $('body span.setTimeSpan').remove();
                        if (typeof (isLoginOther) == 'boolean') isLoginOther = false;
                        if (swal_close) swal_close();
                        $.ajax({
                            url: SERVERPATH + login_mmd_url,
                            type: "post",
                            data: {
                                data: encodeBase64.base64encode(JSON.stringify(data)),
                                isOver: true
                            },
                            success: function (res) {
                                if (res.code == 200) {
                                    // 手机端登录
                                    if(typeof(meteor)!='undefined'&&meteor) {meteor.track("form", {convert_id: "1698450524307459"})};
                                    clearAllCookie();
                                    setCookie('role', res.role);
                                    setCookie('token', res.token);
                                    setCookie('accessToken', res.accessToken);
                                    setCookie('id', res.id);
                                    setCookie("mmdId", res.mmdId);
                                    // var haveOne = res.haveOne ? res.haveOne : '';
                                    // setCookie('haveOne', haveOne);
                                    // if (!res.phoneVerify) {
                                    //     loginwindowhide();
                                    //     if (SERVERPATH && loginSuccessCallback) {
                                    //         window.localStorage.setItem('showCaminfo', 'showCaminfo');
                                    //         loginSuccessCallback();
                                    //     } else {
                                    //         // camInfoServer();
                                    //     }
                                    //     window.localStorage.setItem('loginMessage', JSON.stringify(res));
                                    //     return
                                    // }
                                    logingoon(res, 1);
                                }
                            }
                        })
                    }
                    coverLogin(fn, res);
                } else {
                    if (res.message) {
                        // $('.login-tip').text(res.message)
                        layer.msg(res.message);
                    } else {
                        // $('.login-tip').text("用户名或密码错误");
                        layer.msg("用户名或密码错误", { offset: ['45%', '46.5%'], time: 1500 });
                    }
                }
            }
        })
    }

})

$('.login-window').on('focus', '.login-input-cont', function () {
    $(this).parent('.login-input').addClass('login-focu-input');
    $('.login-tip').text('');
})

$('.login-window').on('blur', '.login-input-cont', function () {
    $(this).parent('.login-input').removeClass('login-focu-input');
})

$('.img-pho,.wx-login').on('click', imgPhoClick)

function checkNavColor() {
    var colorFlag = $('.swiper-slide-active').attr('data-swiper-slide-index');
    switch (colorFlag) {
        case '0':
        case '1':
        case '3':
        case '4':
            $('.login-active').css('color', '#000')
            break;
        case '2':
            $('.login-active').css('color', '#fff')
            break;
        default:
    }
    var addFlag = window.location.search;
    if (addFlag != '' || addFlag != '?m=main') {
        $('.login-active').css('color', '#000')
    }
    if (addFlag == '?m=price') {
        $('.login-active').css('color', '#fff')
    }
}

function imgPhoClick(e) {

    var tg = e.target;

    if ($(tg).hasClass('img-wx')) {
        $(tg).addClass('img-win').removeClass('img-wx');
        $('.poptip .poptip-content').html("<i class='iconfont icon-dunpai'></i>账号登录");
        $('.login-window-header span').text('微信登录');
        forgetwindowdone();//忘记密码框
        $('.login-window-in').hide();
        $('.wxlogin').show();
        $('.login-footer').hide();
        if (!tid2) tid2 = getLoginQR();
    } else {
        $(tg).addClass('img-wx').removeClass('img-win');
        $('.poptip .poptip-content').html("<i class='iconfont icon-dunpai'></i>微信登录");
        $('.login-window-header span').text('账号登录');
        forgetwindowdone();
        $('.login-window-in').show();
        $('.wxlogin').hide();
        $('.login-footer').show();
    }
}

//忘记密码
$('.login-window').on('click', '#login-forget', loginForgetOn)
function loginForgetOn() {
    $(".forget-window").show();
    $(".login-form-box").hide();
    $(".login-window").addClass("forgetClass").css({ 'width': '400px', 'height': '450px' });
    $('.error-hint-box').hide();
    //忘记密码-邮箱验证码初始化
    $('#getForgetNum').unbind('click').bind('click', forget_tel_send)
    $('#getForgetNum').css('cursor', 'pointer').css('background', '#ff8700')

    $('#username').val('')
    $('#password').val('')

    $('#loginOtherDiv').hide();
    $('.other-login').hide();
    $('.loginTitleDiv').hide();
    $('.login-other').css('bottom', '0');
    $('.login-window-in').hide();
    $('.login-forget-window').show();
    $('.forget-tel-window').show();
    $('.login-footer #login-forget').hide();
    $('.login-window-header span').text("找回密码");
    $('.login-other').hide();
    $('#login-fas').show();
    $('#login-fas').css('right', '0');
    $('.login-other').text('还没有优锘账户？');
    $('.login-footer #login-reg').text("立即注册");
}

$('.login-window').on('focus', '#forgetinp', function () {
    $(this).parent('.forget-input').addClass('forget-focu-input');
    $('.forget-tip').text('');
})

$('.login-window').on('blur', '#forgetinp', function () {
    forgetemail($('#forgetinp').val());
})

function sendemail() {
    var res = verifyCode.validate(document.getElementById("forgetinp-telreg-img").value);
    if (!res) {
        $('div[data-error="forgetTel-img"]').show();
        return
    }
    verifyCode.refresh();
    forgetSecByPhone();
}

function forgetemail(mailtxt, send) {
    var res = verifyCode1.validate(document.getElementById("forgetinp-telreg-img-email").value);
    var mailtxt = $('#forgetinp-email').val();
    var mailreg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (mailtxt.length == 0) {
        $('.forget-tip').text('邮箱格式错误');
        verifyCode1.refresh();
    } else if (!mailreg.test(mailtxt)) {
        $('.forget-tip').text('邮箱格式错误');
        verifyCode1.refresh();
    } else if (res == false) {
        $('.forget-pic-tip').text('验证码错误');
        $('.forget-pic-tip').css('top', '7px').css('right', '142px').css('width', '26%');
        $('.forget-pic-tip').show();
        $('.cuowu2').css('left', '96px');
        $('.cuowu2').show();

    } else {
        $(this).parent('.forget-input').removeClass('forget-focu-input');
        $('.forget-tip').text('');
        $('.forget-pic-tip').hide();
        layer.msg('请求已发送', { offset: ['40%', '48%'] })
        verifyCode1.refresh();
        $.ajax({
            url: "https://www.thingjs.com/uinapi/register/forgetPassword",
            type: 'get',
            data: {
                email: mailtxt
            },
            success: function (res) {
                if (res.code == '0') {
                } else {
                    verifyCode1.refresh();
                    layer.msg(res.msg, { offset: ['40%', '48.2%'] })

                }
            },
            error: function (res) {
                layer.msg(res.msg, { offset: ['40%', '48.2%'] })
            }
        })

    }
}


function forgetwindowdone() {
    $('.login-reg-window').find('.reg-false').removeClass('reg-false');
    $('.login-reg-window').find('.reg-right').removeClass('reg-right');
    $('.login-reg-window').find('.reg-input-tip').text('');
    $('.login-reg-window .login-reg-item input').val('');

    $('.forget-tel-window').find('.reg-false').removeClass('reg-false');
    $('.forget-tel-window').find('.reg-right').removeClass('reg-right');
    $('.forget-tel-window').find('.forget-focu-input').removeClass('forget-focu-input');
    $('.forget-tel-window').find('.forget-input-tip').text('');
    $('.forget-tel-window input').val('');

    $('.forget-email-window').find('.forget-tip').text('');
    $('.forget-email-window input').val('');
    clearInterval(timeR);
    $('.forget-send-outh').text('获取验证码');
    $('.forget-send-outh').removeClass('forget-send-outh-false');

    $('.login-forget-window').hide();
    $('.login-other').hide();
    $('.login-footer #login-forget').show();
    $('.login-footer #login-reg').text("免费注册");
    $('.forget-email-window').show();
    $('.forget-tel-window').hide();
    $('.login-window').removeClass('login-forget-tel');
    $(".reg-footer input").attr("checked", true);
}

//注册账号
$('.login-window').on('click', '#login-reg', loginRegOn)

function loginRegOn() {
    $('.other-login').css('display', 'block');
    $('.loginTitleDiv').css('display', 'block');
    $('.login-window-in').hide();
    $('.login-forget-window').hide();
    $('.login-footer #login-forget').hide();
    $('.login-footer #login-reg').hide();
    $('.poptip').hide();
    $('.img-pho').hide();
    $('.login-window-header span').text("新用户注册");
    $('.login-other').show();
    $('.login-other').text('已有账号？');
    $('#login-fas').show();
    $('#login-fas').css('right', '0px');
    $('.login-reg-window').show();
    $('.login-window').removeClass('fadeOut fadeOutReg');
    if (!$('.login-window').hasClass('fadeIn') && !$('.login-window').is(':visible')) $('.login-window').addClass('fadeInReg');
    $('.login-window').removeClass('login-forget-tel').addClass('login-reg-over');
    $('.forget-email-window').show();
    $('.forget-tel-window').hide();
    $(".reg-footer input").attr("checked", true);
    $('#loginOtherDiv').css('display', 'none');
    $('.other-login').css('margin-top', '14px')

    $('.other-login').css('margin-bottom', '0');

    $(".loginMethod li").eq(0).show();
    $(".loginMethod li").eq(3).show();

    if (!verifyCode_tel) {
        var options = {
            id: "v_container_tel",
            canvasId: "verifyCode_tel",
            height: 40
        }
        var verifyCode_tel = new GVerify(options);
    }

    if ($("#reg-btn").attr("regtype") == "phone") {
        $('.loginTitleSpan').text('手机号注册');
        verifyCode_tel.refresh();
    } else if ($("#reg-btn").attr("regtype") == "email") {
        $('.loginTitleSpan').text('邮箱注册');
        verifyCode_email.refresh();
    }

    $("#getPhoneRegNum,#getEmailRegNum").addClass("noEvents").css("background-color", "rgb(153, 153, 153)");
    $("#reg-btn").addClass("noEvents").css("background-color", "rgb(153, 153, 153)");
    $("input[data-name=phonePsw],input[data-name=emailPsw]").attr('readonly', true);
    $("input[data-name=phoneCode],input[data-name=emailCode]").attr('readonly', true);

}

$('#get_phone_code').unbind('click').bind('click', refresh_auth_img)
function refresh_auth_img() {
    var res = verifyCode_tel.validateForCheck(document.getElementById("reg-telreg-img").value);
    if (!res) {
        layer.msg("图形校验码错误！");
        return;
    }
    if ($('#login-reg-tel').val().length == 0) {
        layer.msg('请填写手机号');
    } else {
        $('#get_phone_code').unbind('click')
        $('#get_phone_code').css('cursor', 'default').css('color', '#999')
        $('#get_phone_code').val('60s后重新获取');
        $('#get_phone_code').addClass('reg-auth-img-false');
        timeS = 59;
        timeR = setInterval(function () {
            if (timeS > 0) {
                $('#get_phone_code').val(timeS + 's后重新获取'); ``
                timeS--;
            } else {
                clearInterval(timeR);
                $('#get_phone_code').val('获取验证码');
                $('#get_phone_code').removeClass('reg-auth-img-false');
                $('#get_phone_code').unbind('click').bind('click', refresh_auth_img)
                $('#get_phone_code').css({ 'cursor': 'pointer', 'color': '#ff6600' });
            }
        }, 1000)
        $.ajax({
            url: "https://www.thingjs.com/uinapi/register/getPhoneVCodeForRegister?phoneNumber=" + $('#login-reg-tel').val(),
            type: "get",
            success: function (res) {
                if (res.code == '0') {
                    layer.msg(res.msg);
                } else if (res.code == '500') {
                    layer.msg(res.msg);
                    $('#login-reg-tel').addClass('reg-false');
                }
            }
        })
    }
}

var logouttwoToggle = false;
function audittojjles(){
    let auditmmdId = getCookie("mmdId");
    logouttwoToggle = !logouttwoToggle;
    if(auditmmdId){
        if(logouttwoToggle){
            $('.logouttwo').css('transform','translateY(0)');
            $('#bg-shadow2').css('display','block');


            $('.wap-nav-put').show();
            $('.wap-nav-on').hide();
            $('.wap-nav-drawer').css('transform','translateX(-100%)');
            $('#bg-shadow1').css('display','none');
        }else{
            $('.logouttwo').css('transform','translateY(-100%)');
            $('#bg-shadow2').css('display','none');
        }
    }
}

// 点击移动端菜单遮罩时菜单隐藏
$('#bg-shadow1').on('click',function(){
    wapNavOn()
})
// 点击移动端菜单遮罩时菜单隐藏
$('#bg-shadow2').on('click',function(){
    audittojjles()
})

$('#getEmailRegNum').unbind('click').bind('click', refresh_auth_emailNum);
function refresh_auth_emailNum() {
    var res = verifyCode_email.validateForCheck(document.getElementById("reg-emailreg-img").value);
    if (!res) {
        layer.msg("图形校验码错误！");
        return;
    }
    if ($('#login-reg-email').val().length == 0) {
        layer.msg('请填写邮箱');
    } else {
        if ($('#login-reg-email').length) {
            if ($('#login-reg-email').val().indexOf('sharklasers.com') != '-1' ||
                $('#login-reg-email').val().indexOf('guerrillamail.info') != '-1' ||
                $('#login-reg-email').val().indexOf('grr.la') != '-1' ||
                $('#login-reg-email').val().indexOf('guerrillamail.biz') != '-1' ||
                $('#login-reg-email').val().indexOf('guerrillamail.com') != '-1' ||
                $('#login-reg-email').val().indexOf('guerrillamail.de') != '-1' ||
                $('#login-reg-email').val().indexOf('guerrillamail.net') != '-1' ||
                $('#login-reg-email').val().indexOf('guerrillamail.org') != '-1' ||
                $('#login-reg-email').val().indexOf('guerrillamailblock.com') != '-1' ||
                $('#login-reg-email').val().indexOf('pokemail.net') != '-1' ||
                $('#login-reg-email').val().indexOf('spam4.me') != '-1' ||
                $('#login-reg-email').val().indexOf('027168.com') != '-1' ||
                $('#login-reg-email').val().indexOf('meantinc.com') != '-1' ||
                $('#login-reg-email').val().indexOf('mailcatch.com') != '-1' ||
                $('#login-reg-email').val().indexOf('besttempmail.com') != '-1' ||
                $('#login-reg-email').val().indexOf('liaohigh.com') != '-1' ||
                $('#login-reg-email').val().indexOf('powerencry.com') != '-1' ||
                $('#login-reg-email').val().indexOf('unicodeworld.com') != '-1' ||
                $('#login-reg-email').val().indexOf('groupbuff.com') != '-1' ||
                $('#login-reg-email').val().indexOf('itiomail.com') != '-1' ||
                $('#login-reg-email').val().indexOf('classesmail.com') != '-1' ||
                $('#login-reg-email').val().indexOf('fft-mail.com') != '-1' ||
                $('#login-reg-email').val().indexOf('mailboxt.com') != '-1') {
                layer.msg("获取验证码失败");
                $('#login-reg-email').addClass('reg-false');
                $('#getEmailRegNum').css('cursor', 'pointer').css('background', '#ff8700');
                return;
            }
        }
        $.ajax({
            url: "https://www.thingjs.com/uinapi/register/emailCode?email=" + $('#login-reg-email').val(),
            type: "get",
            success: function (res) {
                if (res.success) {
                    layer.msg("发送验证码成功");
                } else {
                    layer.msg(res.msg);
                    clearInterval(timeR1);
                    $('#getEmailRegNum').text('获取验证码');
                    $('#getEmailRegNum').removeClass('reg-auth-img-false');
                    $('#getEmailRegNum').unbind('click').bind('click', refresh_auth_emailNum)
                    $('#getEmailRegNum').css('cursor', 'pointer').css('background', '#ff8700')
                    $('#login-reg-email').addClass('reg-false');
                }
            },
            error: function (res) {
                layer.msg("获取验证码失败");
                $('#login-reg-email').addClass('reg-false');
                $('#getEmailRegNum').css('cursor', 'pointer').css('background', '#ff8700');
            }
        })

        $('#getEmailRegNum').unbind('click')
        $('#getEmailRegNum').css('cursor', 'default').css('background', '#999')
        $('#getEmailRegNum').text('60s后重新获取');
        $('#getEmailRegNum').addClass('reg-auth-img-false');

        timeS1 = 59;
        timeR1 = setInterval(function () {
            if (timeS1 > 0) {
                $('#getEmailRegNum').text(timeS1 + 's后重新获取');
                timeS1--;
            } else {
                clearInterval(timeR1);
                $('#getEmailRegNum').text('获取验证码');
                $('#getEmailRegNum').removeClass('reg-auth-img-false');
                $('#getEmailRegNum').unbind('click').bind('click', refresh_auth_emailNum);
                $('#getEmailRegNum').css('cursor', 'pointer').css('background', '#ff8700')
            }
        }, 1000)

    }
}

//注册检测
$('.login-window').on('blur', '.tologin-input input', function () {
    var inputid = $(this).attr('id');
    var text = $(this).val();
    switch (inputid) {
        case 'login-reg-email':  //邮箱验证
            var mailreg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if (text.length == 0) {
                $('#reg-tip-email').text('邮箱格式错误');
                $('.cuowu1').show();
                $('#reg-tip-email').show();
            } else if (!mailreg.test(text)) {
                $('#reg-tip-email').text('邮箱格式错误');
                $('.cuowu1').show();
                $('#reg-tip-email').show();
            } else {
                $('.cuowu1').hide();
                $('#reg-tip-email').hide();
            }
            break;
        case 'login-reg-username':   //用户名验证
            var unreg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
            if (text.length == 0) {
                $('#reg-tip-tel').text('请填写信息');
                inputfalse($(this));
            } else if (!unreg.test(text)) {
                $('#reg-tip-tel').text('用户名为2-12位字符');
                inputfalse($(this));
            } else {
                regEmailOrUsername(text, $(this), 0)
            }
            break;
        case 'login-reg-tel': //电话验证
            if (text.length == 0) {
                $('div[data-error="phone"]').show();
                $('div[data-error="phone"] span').text('手机号格式错误');
            } else {
                var isMob = /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/;
                if (!isMob.test(text)) {
                    inputfalse($(this));
                    $('div[data-error="phone"]').show();
                    $('div[data-error="phone"] span').text('手机号格式错误');
                } else {
                    inputtrue($(this));
                    $('div[data-error="phone"]').hide();
                }
            };
            break;
        case 'login-reg-password':  //密码验证
            if (text.length < 6 || text.length > 18) {
                $('.cuowu1').show();
                $('#reg-tip-pass').text('密码格式错误');
                $('#reg-tip-pass').show();
                inputfalse($(this));
            } else if (text.length == 0) {
                $('.cuowu1').show();
                $('#reg-tip-pass').text('请输入密码');
                $('#reg-tip-pass').show();
                inputfalse($(this));
            } else {
                inputtrue($(this));
                $('#reg-tip-pass').text('').hide();
                $('.cuowu3').hide();
            }
            break;
        case 'login-reg-repassword': //再次输入密码验证
            if (text.length == 0) {
                $('#reg-tip-tel')('请输入密码');
                inputfalse($(this));
            } else if (text == $('#login-reg-password').val()) {
                inputtrue($(this));
                $('#reg-tip-pass').text('').hide();
                $('.cuowu3').hide();
            } else {
                layer.msg('两次输入密码不一致');
                inputfalse($(this));
            }
            break;
        case 'login-reg-auth':  //验证码验证
            if (text.length < 6) {
                $('div[data-error="phoneVe"]').show();
                $('div[data-error="phoneVe"] span').text('验证码错误');
                inputfalse($('#login-reg-auth'));
            } else if (text.length == 0) {
                $('div[data-error="phoneVe"]').show();
                $('div[data-error="phoneVe"] span').text('请输入验证码');
                inputfalse($('#login-reg-auth'));
            } else {
                $.ajax({
                    url: "https://www.thingjs.com/uinapi/register/isPhoneVCodeValid?phoneNumber=" + $('#login-reg-tel').val() + "&vcode=" + $('#login-reg-auth').val(),
                    type: "get",
                    success: function (res) {
                        if (res.code == '0') {
                            inputtrue($('#login-reg-auth'));
                        } else {
                            inputfalse($('#login-reg-auth'));
                        }
                    }
                });
                $('div[data-error="phoneVe"]').hide();
            }
            break;
        default: break;
    }
})

$('.login-window').on('click', '.forget-change-mob', function () {

    $('.forget-email-window').hide();
    $('.forget-tel-window').show();
    $('.login-window').addClass('login-forget-tel');
    $('.login-forget-window').css('margin-top', '0px');
    $('.login-other').css('bottom', '28px');
})

//忘记密码-手机-检测
$('.login-window').on('blur', '.forget-tel-window input', function () {
    var inputid = $(this).attr('id');
    var text = $(this).val();
    switch (inputid) {
        case 'forgetinp-tel': //电话验证
            if (text.length == 0) {
                $('div[data-error="forgetTel"]').show();
                inputfalse($(this));
            } else {
                var isMob = /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/;
                if (!isMob.test(text)) {
                    $('div[data-error="forgetTel"]').show();
                    inputfalse($(this));
                } else {
                    $('div[data-error="forgetTel"]').hide();
                    inputtrue($(this));
                }
            };
            break;

        case 'forgetinp-telsec':  //密码验证
            if (text.length < 6 || text.length > 18) {
                $('div[data-error="forgetTel-pwd"]').show();
                inputfalse($(this));
            } else {
                $('div[data-error="forgetTel-pwd"]').hide();
                inputtrue($(this));
            }
            break;
        case 'forgetinp-telsec-again': //再次输入密码验证
            if (text.length == 0) {
                $('div[data-error="forgetTel-pwd1"]').show();
                inputfalse($(this));
            } else if (text == $('#forgetinp-telsec').val()) {
                inputtrue($(this));
                $('div[data-error="forgetTel-pwd1"]').show();
            } else {
                $('div[data-error="forgetTel-pwd"]').hide();
                inputfalse($(this));
            }
            break;
        case 'forgetinp-telreg':  //验证码验证
            if (text.length < 6 && text.length > 0) {
                $('div[data-error="forgetTel-code"]').show();
            } else if (text.length == 0) {
                $('div[data-error="forgetTel-code"]').show();
            } else {
                $.ajax({
                    url: "https://www.thingjs.com/uinapi/register/isPhoneVCodeValid?phoneNumber=" + $('#forgetinp-tel').val() + "&vcode=" + $('#forgetinp-telreg').val(),
                    type: "get",
                    success: function (res) {
                        if (res.code == '0') {
                            inputtrue($('#forgetinp-telreg'));
                        } else {

                            inputfalse($('#forgetinp-telreg'));
                        }
                        $('div[data-error="forgetTel-code"]').hide();
                    }
                });
            }
            break;


        case 'forgetinp-email': //邮箱验证
            if (text.length == 0) {
                $('div[data-error="forgetEmail"]').show();
                inputfalse($(this));
            } else {
                var mailreg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                // var isMob = ^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$;
                if (!mailreg.test(text)) {
                    $('div[data-error="forgetEmail"]').show();
                    inputfalse($(this));
                } else {
                    $('div[data-error="forgetEmail"]').hide();
                    inputtrue($(this));
                }
            };
            break;

        case 'forgetinp-telsec-email':  //密码验证
            if (text.length < 6 || text.length > 18) {
                $('div[data-error="forgetEmail-pwd"]').show();
                inputfalse($(this));
            } else {
                $('div[data-error="forgetEmail-pwd"]').hide();
                inputtrue($(this));
            }
            break;
        case 'forgetinp-telsec-again-email': //再次输入密码验证
            if (text.length == 0) {
                $('div[data-error="forgetEmail-pwd1"]').show();
                inputfalse($(this));
            } else if (text == $('#forgetinp-telsec-email').val()) {
                inputtrue($(this));
                $('div[data-error="forgetEmail-pwd1"]').hide();
            } else {
                $('div[data-error="forgetEmail-pwd1"]').show();
                inputfalse($(this));
            }
            break;
        case 'forgetinp-telreg-email':  //验证码验证
            if (text.length < 6 && text.length > 0) {
                $('div[data-error="forgetEmail-code"]').show();
                // $('.forget-yzm-tip').text('验证码错误');
                // $('.forget-yzm-tip').css('top','24px').css('right','142px').css('width','26%');
                // $('.forget-yzm-tip').show();
                // $('.cuowu3').css('top','26px')
                // $('.cuowu3').show();
            } else if (text.length == 6) {
                $('div[data-error="forgetEmail-code"]').hide();
                // $('.forget-yzm-tip').hide();
                // $('.cuowu3').hide();
            }
            break;
        default: break;
    }
})

$('.login-window').on('focus', '.forget-tel-window input', function () {
    $(this).addClass('forget-focu-input');
})
$('#getForgetNum').on('click', forget_tel_send)
function forget_tel_send() {
    var res = verifyCode.validate(document.getElementById("forgetinp-telreg-img").value);
    if ($('#forgetinp-tel').val().length == 0) {
        $('div[data-error="forgetTel"]').show();
        // $('.forget-tel-tip').text('手机号格式错误');
        // $('.forget-tel-tip').css('top','7px').css('right','4px').css('width','33%');
        // $('.forget-tel-tip').show();
        // $('.cuowu1').show();
    } else if (res == false) {
        // layer.msg('图形验证码输入错误');
        $('div[data-error="forgetTel-img"]').show();
        // $('.forget-pic-tip').text('图形验证码错误');
        // $('.forget-pic-tip').css('top','7px').css('right','142px').css('width','33%');
        // $('.forget-pic-tip').show();
        // $('.cuowu2').show();
        return;
    } else {
        $('#getForgetNum').unbind('click')
        $('.forget-pic-tip').text('');
        $('.forget-pic-tip').css('top', '7px').css('right', '4px').css('width', '33%');
        $('.forget-pic-tip').hide();
        $('.cuowu2').hide();
        $('#getForgetNum').text('60s后重新获取');
        $('#getForgetNum').addClass('forget-send-outh-false');
        $('#getForgetNum').css('cursor', 'default').css('background', '#999');
        timeS = 59;
        timeR = setInterval(function () {
            if (timeS > 0) {
                $('#getForgetNum').text(timeS + 's后重新获取');
                timeS--;
            } else {
                clearInterval(timeR);
                $('#getForgetNum').text('获取验证码');
                $('#getForgetNum').removeClass('forget-send-outh-false');
                $('#getForgetNum').css('background', '#ff8700').css('cursor', 'pointer');
                $('#getForgetNum').bind('click', forget_tel_send);
            }
        }, 1000)
        $.ajax({
            url: "https://www.thingjs.com/uinapi/register/getPhoneVCodeForForgetPwd?phoneNumber=" + $('#forgetinp-tel').val(),
            type: "get",
            success: function (res) {
                if (res.code == '0') {
                    layer.msg('发送验证码成功');
                } else if (res.code == '500') {
                    layer.msg('该手机号未注册');
                    $('#forgetinp-tel').addClass('reg-false');
                    // $('#getForgetNum').bind('click',forget_tel_send)
                    $('#getForgetNum').css('background', '#999');
                }
            }
        })
    }
}

//邮箱获取验证码
function getEmailNum() {
    if(forgetEmail&&forgetEmail.validate) {
        var emailCheck = forgetEmail.validate(document.getElementById("forgetinp-emailreg-img").value);
    }
    if (!emailCheck) {
        $('.forget-pic-tip').text('图形验证码错误');
        $('.forget-pic-tip').css('top', '7px').css('right', '142px').css('width', '33%');
        $('.forget-pic-tip').show();
        $('.cuowu2').show();
        return;
    } else {
        $('.forget-pic-tip').text('').hide();
        $('.cuowu2').hide();
    }

    var email = $('#forgetinp-email').val();
    var token = 'Bearer ' + getCookie('accessToken');
    var mailreg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$");

    if (email == '') {
        $('.forget-tel-tip').text('邮箱格式错误');
        $('.forget-tel-tip').css('top', '7px').css('right', '4px').css('width', '33%');
        $('.forget-tel-tip').show();
        $('.cuowu1').show();
        return false;
    } else if (!mailreg.test(email)) {
        $('.forget-tel-tip').text('邮箱格式错误');
        $('.forget-tel-tip').css('top', '7px').css('right', '4px').css('width', '33%');
        $('.forget-tel-tip').show();
        $('.cuowu1').show();
        return false;
    } else {
        layer.msg('验证码已发送');
        $('#getVerificaEmail').unbind('click')
        $('#getVerificaEmail').addClass('forget-send-outh-false');
        $('#getVerificaEmail').css('cursor', 'default').css('background', '#999');
        timeD = 59;
        timeT = setInterval(function () {
            if (timeD > 0) {
                $('#getVerificaEmail').text('60s后重新获取');
                $('#getVerificaEmail').text(timeD + 's后重新获取');
                timeD--;
            } else {
                clearInterval(timeT);
                $('#getVerificaEmail').text('获取验证码');
                $('#getVerificaEmail').removeClass('forget-send-outh-false');
                $('#getVerificaEmail').css('background', '#ff8700').css('cursor', 'pointer');
                $('#getVerificaEmail').bind('click', getEmailNum);
            }
        }, 1000)
        $.ajax({
            url: "https://www.thingjs.com/uinapi/register/forgetPasswordByEmail?email=" + email,
            type: "get",
            dataType: 'json',
            async: true,
            headers: { 'Authorization': token },
            success: function (res) {
                if (res.status == '0') {


                } else if (res.status == '1') {
                    layer.msg(res.msg);
                    clearInterval(timeT);
                    $('#getVerificaEmail').text('获取验证码');
                    $('#getVerificaEmail').unbind('click').bind('click', getEmailNum);
                    // $('#getVerificaEmail').css('background','#19b955').css('color','#fff').css('border','0').css('cursor','pointer')
                    // $('#login-reg-tel').addClass('reg-false');
                }
            }
        });
    }
}
$('#getVerificaEmail').on('click', getEmailNum)
//忘记密码通过手机找回密码
function forgetSecByPhone() {
    var canreg = true;
    if (canreg) {
        var data = {
            phoneNumber: $('#forgetinp-tel').val(),
            vcode: $('#forgetinp-telreg').val(),
            newPassword: $('#forgetinp-telsec-again').val(),
        };
        $.ajax({
            url: 'https://www.thingjs.com/uinapi/register/forgetPwdPhone',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (res) {
                if (res.code == '0') {
                    layer.msg('密码修改成功', { time: 1500 });
                    loginclose();
                    $("#login").trigger("click");
                } else {
                    if (res.msg == '手机号格式不正确') {
                        res.msg = '手机号格式错误'
                    }
                    layer.msg('密码修改失败,' + res.msg);
                }
            }
        })
    } else return;
}
//忘记密码通过邮箱找回密码
function forgetSecByEmail() {

    var emailCheck = forgetEmail.validate(document.getElementById("forgetinp-emailreg-img").value);
    if (!emailCheck) {
        $('div[data-error="forgetEmail-img"]').show();
        return;
    }
    var email = $('#forgetinp-email').val();
    var code = $('#forgetinp-telreg-email').val();
    var psw = $('#forgetinp-telsec-again-email').val();
    var opsw = $('#forgetinp-telsec-email').val();
    var mailreg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$");

    if (email == '') {
        $('.forget-email-tip').text('邮箱格式错误');
        $('.forget-email-tip').css('top', '7px').css('right', '4px').css('width', '33%');
        $('.forget-email-tip').show();
        $('.cuowu1').show();
        return;
    } else if (!mailreg.test(email)) {
        $('.forget-email-tip').text('邮箱格式错误');
        $('.forget-email-tip').css('top', '7px').css('right', '4px').css('width', '33%');
        $('.forget-email-tip').show();
        $('.cuowu1').show();
        return;
    } else if (code == '') {
        $('.forget-yzm-tip').text('验证码错误');
        $('.forget-yzm-tip').css('top', '23px').css('right', '142px').css('width', '26%');
        $('.forget-yzm-tip').show();
        $('.cuowu3').css('top', '25px')
        $('.cuowu3').show();
        return;
    } else if (psw == '' || psw.length < 6 || psw.length > 18 || psw != opsw) {
        return;
    } else if (opsw == '') {
        return;
    } else {
        var data = {
            email: email,
            code: code,
            password: psw,
        };
        $.ajax({
            url: 'https://www.thingjs.com/uinapi/register/resetPasswrodByEmail',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (res) {
                if (res.status == '0') {
                    layer.msg('密码修改成功', { time: 1500 });
                    loginclose();
                    $("#login").trigger("click");
                } else {
                    if (res.msg == '手机号格式不正确') {
                        res.msg = '手机号格式错误'
                    }
                    layer.msg('密码修改失败,' + res.msg);
                }
            }
        })
    }


}
function regEmailOrUsername(vle, th, type) {
    if (type == '1') {
        var checkURL = 'https://www.thingjs.com/uinapi/register/checkEmail?email=' + vle;
    } else {
        var checkURL = 'https://www.thingjs.com/uinapi/register/checkUsername?username=' + vle;
    }
    $.ajax({
        url: checkURL,
        type: 'get',
        success: function (res) {
            if (res.code == '500') {
                if (type == '1') {
                    $('#reg-tip-email').text('邮箱已被注册');
                } else {
                    $('#reg-tip-uname').text('该用户名已存在');
                }
                inputfalse(th);
            } else if (res.code == '0') {
                if (type == '1') {
                    $('#reg-tip-email').text('');
                } else {
                    $('#reg-tip-uname').text('');
                }
                inputtrue(th);
            }
        },
        error: function (res) {
            if (type == '1') {
                $('#reg-tip-email').text('邮箱已被注册');
            } else {
                $('#reg-tip-uname').text('该用户名已存在');
            }
            inputfalse(th);
        }
    })
}

function inputfalse(i) {
    i.addClass('reg-false');
    i.removeClass('reg-right reg-focu-input');
}

function inputtrue(i) {
    i.addClass('reg-right');
    i.removeClass('reg-false reg-focu-input');
}

function regwindowdone() {
    clearInterval(timeR);
    $('.reg-auth-img').text('获取验证码');
    $('.reg-auth-img').removeClass('reg-auth-img-false');
    $('.login-window').removeClass('login-reg-over');
    $('.login-footer #login-forget').show();
    $('.login-footer #login-reg').show();
    $('#login-fas').hide();
    $('.login-reg-window').hide();
    $('.poptip').show();
    $('.img-pho').show();
}

$('.login-window').on('focus', '.reg-input input', function () {
    $(this).addClass('reg-focu-input');
    $(this).removeClass('reg-right reg-false');
})

$('.login-window').on('blur', '.reg-input input', function () {
    $(this).removeClass('reg-focu-input');
})

$('.login-window').on('click', '#login-fas', function () {
    $(".forget-window").hide();
    $(".login-form-box").show();
    $(".login-window").removeClass("forgetClass").css({ 'width': '380px', 'height': '358px' });
    $('.error-hint-box').hide();
    //注册验证码
    $('#getPhoneRegNum').unbind('click').bind('click', refresh_auth_img)
    $('#getPhoneRegNum').css('cursor', 'pointer').css('background', '#ff8700')

    var type = null;
    if ($.cookie('openid')) type = 'uname';
    loginwindowon(type);
})

$('.login-window').on('click', '.reg-footer input', function () {
    if ($(".reg-footer input").attr("checked")) {
        $(".reg-footer input").removeProp("checked");
    } else {
        $(".reg-footer input").prop("checked", true);
    }
})

$(".switch-login-box").on('click', function () {
    $('.error-hint-box').hide();
    $(this).addClass('login-tab').siblings().removeClass('login-tab');
    if ($(this).attr('tab-index') == '0') {
        $(".verifica-code-login").show();
        $(".password-login").hide();
        $(".login-window").css("height", "418px");
    } else {
        $(".verifica-code-login").hide();
        $(".password-login").show();
        $(".login-window").css("height", "358px");
    }

})

//注册
$('.login-window').on('click', "#reg-btn", function () {
    var phone = $('#login-reg-tel').val();
    var phoneCode = $('#phone-code').val();
    var login_mmd_url = "/mp/login_thingjs";
    document.getElementById("reg-btn").innerHTML="注册中...";
    document.getElementById("reg-btn").style.opacity="0.5";
    $.ajax({
        url: SERVERPATH + login_mmd_url,
        type: "post",
        data: {
            data: JSON.stringify({
                phone: phone,
                phoneCode: phoneCode
            })
        },
        success: function (res) {
            document.getElementById("reg-btn").innerHTML="登录/注册";
            document.getElementById("reg-btn").style.opacity="1";
            if (res.code == 200) {
                clearAllCookie();
                setCookie('role', res.role);
                setCookie('token', res.token);
                setCookie('accessToken', res.accessToken);
                setCookie('id', res.id);
                setCookie('name', res.name);
                setCookie('openid', res.openid);
                if(res.login_times == 1){
                    loginSource = 'companyServerFirst';
                    // 手机端注册
                    if(typeof(meteor)!='undefined'&&meteor) {meteor.track("form", {convert_id: "1698450524307459"})};
                }
                logingoon(res);
                if (window.AnalysysAgent && SERVERPATH) {
                    // 埋点_账号关联
                    window.AnalysysAgent && window.AnalysysAgent.alias(res.mmdId + '');
                    // 埋点 用户登录成功
                    window.AnalysysAgent && window.AnalysysAgent.track('user_login_success');
                }
            } else if (res.code == 205) {
                var fn = function () {
                    window.localStorage.removeItem('LOGINTIMEOUT');
                    $('body span.setTimeSpan').remove();
                    if (typeof (isLoginOther) == 'boolean') isLoginOther = false;
                    if (swal_close) swal_close();
                    $.ajax({
                        url: SERVERPATH + login_mmd_url,
                        type: "post",
                        data: {
                            data: JSON.stringify({
                                phone: phone,
                                phoneCode: phoneCode
                            }),
                            isOver: true
                        },
                        success: function (res) {
                            if (res.code == 200) {
                                clearAllCookie();
                                setCookie('role', res.role);
                                setCookie('token', res.token);
                                setCookie('accessToken', res.accessToken);
                                setCookie('id', res.id);
                                setCookie('name', res.name);
                                setCookie('openid', res.openid);
                                if(res.login_times == 1){
                                    loginSource = 'companyServerFirst';
                                    // 手机端注册
                                    if(typeof(meteor)!='undefined'&&meteor) {meteor.track("form", {convert_id: "1698450524307459"})}
                                }
                                logingoon(res, 1);
                            } else {
                                layer.msg("验证码错误", { offset: ['45%', '46.5%'], time: 1500 });
                            }
                        }
                    });
                }
                coverLogin(fn, res);
            } else {
                layer.msg("验证码错误", { offset: ['45%', '46.5%'], time: 1500 });
            }
        }
    });
})

function emailRegister() {
    var res = verifyCode_email.validate(document.getElementById("reg-emailreg-img").value);
    verifyCode_email.refresh();
    if (!res) return;
    var data = {
        email: $('#login-reg-email').val(),
        username: $('#login-reg-email').val(),
        emailCode: $('#emailRegister .login-reg-auth').val(),
        password: $('#emailRegister .login-reg-password').val(),
    };

    $.ajax({
        url: "https://www.thingjs.com/uinapi/register/emailRegister",
        type: 'post',
        dataType: 'json',
        data: data,
        success: function (res) {
            if (res.success) {
                alert('注册成功', 'sucsure');
                $("#login-fas").trigger("click");
                $.ajax({
                    url: 'https://www.thingjs.com/uinapi/register/images',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        image: getHeadImg(data.username),
                        username: data.username
                    }
                })
            } else {
                layer.msg('注册失败，' + res.msg);
            }
        }
    })
}

function phoneRegister() {
    var res = verifyCode_tel.validate(document.getElementById("reg-telreg-img").value);
    verifyCode_tel.refresh();
    if (!res) return;
    var emailRollA = emailAdd();
    var canreg = true;
    var data = {
        email: emailRollA,
        username: $('#login-reg-tel').val(),
        password: $('#phoneRegister .login-reg-password').val(),
        company: $('#login-reg-company').val(),
        phone: $('#login-reg-tel').val(),
        phoneCode: $('#phoneRegister .login-reg-auth').val()
    };

    if (canreg) {
        $.ajax({
            url: "https://www.thingjs.com/uinapi/register/register",
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (res) {
                if (res.code == "0") {
                    //jiangzuokun  新增对于注册的判断，当用户处于指引情况下注册，并且成功会进入对应的登录指引。
                    if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
                        layer.msg('注册成功');
                        setTimeout('userRegAndNeedlogin()', 200);
                    } else {
                        alert('注册成功', 'sucsure');
                    }
                    $("#login-fas").trigger("click");
                    $.ajax({
                        url: 'https://www.thingjs.com/uinapi/register/images',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            image: getHeadImg(data.phone),
                            username: data.username
                        }
                    })

                } else {
                    layer.msg('注册失败，' + res.msg);
                }
            }
        })
    } else return;
}
//服务条款
$('.login-window').on('click', '.reg-footer span', function () {
    $('.reg-col').show();
    $('.reg-col-close').on('click', function () {
        $('.reg-col').hide();
    })
    $('#reg-col-suc').on('click', function () {
        $('.reg-col').hide();
        $(".reg-footer input").prop("checked", true);
    })
})

$('#nav-reg').on('click', navRegOn);

//注册框

function emailAdd() {
    var emailRoll;
    $.ajax({
        url: 'https://www.thingjs.com/uinapi/register/randomEmail',
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (res) {
            if (res.success == true) {
                emailRoll = res.data

            }
        }
    })

    return emailRoll;
}

function navRegOn() {
    $('.login-window').removeClass('fadeOut fadeOutReg fadeIn');
    $('.login-window').addClass('fadeIn');

    loginwindowon();

    // 添加延时函数，当点击导航栏中的注册时调用introTow_reg方法，跟踪并且显示用户注册指引。
    if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
        setTimeout("introTwo_reg()", 500);
    }
    $('.tologin-tittle div').eq(1).addClass('login-tab').siblings().removeClass('login-tab');
    $(".verifica-code-login").show();
    $(".password-login").hide();
    $(".login-window").css("height", "418px");
}

function goBackLogin() {
    $('.login-form-box').show();
    $('.wxLogin-win').hide();

    if ($('.login-tab').attr('tab-index') == '1') {
        $('.login-window').removeClass('forgetClass').css('height', '358px');
    } else {
        $('.login-window').removeClass('forgetClass').css('height', '418px');
    }
}
function getLoginQR() {

    $('.wxLogin-win').show();
    $('.login-window').addClass('forgetClass').css('height', '385px');
    $('.login-form-box').hide();
    var id = null;
    $.ajax({
        type: "GET",
        url: SERVERPATH + "/api/wloginid",
        dataType: "text",
        //jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
        contentType: "text/html; charset=utf-8",
        async: false,
        success: function (data) {
            id = data;
        }
    });
    var url = 'https://open.weixin.qq.com/connect/qrcode/' + id;
    // window.location.href = url
    $('.wxlogin2').html("<img onclick='goBackLogin()' class='img-weixin' style='position: absolute;top: 25px;right: 40px; width:32px; cursor:pointer ' src='https://www.thingjs.com/guide/image/wincom.png'><img style='margin-left: 10px; margin-top: 12px;' src='" + url + "' width='280px' height='280px'><div><span style='display: block;text-align: center;'>请使用微信扫描二维码登录</span></div>");
    var t = Date.parse(new Date());
    function _gettoken(t) {
        var check = 'https://long.open.weixin.qq.com/connect/l/qrconnect?uuid=' + id + (t ? "&last=" + t : "");
        $.ajax({
            type: "GET",
            url: check,
            dataType: "script",
            cache: false,
            timeout: 0,//1700, //超时时间设置，单位毫秒
            success: function () { //请求成功的回调函数
                var c = window.wx_errcode;
                switch (c) {
                    case 405:
                        // 这里写登录刷新
                        var login_wx_url = "/api/wxlogin?code=" + window.wx_code;
                        if ($('.login-window-header span').text() == '账号绑定') {
                            login_wx_url = "/api/wxlogin" + "?binding=b" + "&code=" + window.wx_code
                        }
                        $.ajax({
                            type: "GET",
                            url: SERVERPATH + login_wx_url,
                            success: function (res) {
                                if (res.code == 200) {
                                    clearAllCookie();
                                    setCookie('role', res.role);
                                    setCookie('token', res.token);
                                    setCookie('accessToken', res.accessToken);
                                    setCookie('id', res.id);
                                    setCookie("mmdId", res.mmdId);

                                    if(res.login_times == 1){
                                        loginSource = 'companyServerFirst';
                                    }
                                    logingoon(res);
                                } else if (res.code == 202) {
                                    if (window.location.protocol == "https:") {
                                        if (res.headimgurl.indexOf("http:") == 0) {
                                            res.headimgurl = "https" + res.headimgurl.substring(4);
                                        }
                                    }
                                    setCookie('headimgurl', res.headimgurl);
                                    if (headimgurl.substring(0, 4) != 'http') {
                                        $('#headimg').css({
                                            'background-image': 'url(' + SERVERPATH + headimgurl + ')'
                                        });
                                        $('#headimgs').css({
                                            'background-image': 'url(' + SERVERPATH + headimgurl + ')'
                                        });
                                    } else {
                                        $('#headimg').css({
                                            'background-image': 'url(' + headimgurl + ')'
                                        });
                                        $('#headimgs').css({
                                            'background-image': 'url(' + headimgurl + ')'
                                        });
                                        reloadHeader();
                                    }
                                    $("img[data-type='imgurl']").attr('src', res.headimgurl + '?v=' + Math.random());
                                    $("[data-type='nick']").html(res.nick + '（' + res.wid + '）');
                                    $(".item-btn-edit.nick").html('更换微信');
                                    alert('绑定成功', 'sucsure');
                                    // if($('#ifBindWX').is(':visible')){
                                    //     $('#ifBindWX').html(res.nick + ' <span class="bindButton" onclick=loginwindowon("wid")>换绑</span>')
                                    // }
                                    loginwindowhide();
                                } else if (res.code == 500 && $('.login-window-header span').text() == '账号绑定') {
                                    alert(res.message, 'warning');
                                    loginwindowhide();
                                } else if (res.code == 205) {
                                    var userInfo = JSON.stringify(res.data);
                                    var fn = function () {
                                        window.localStorage.removeItem('LOGINTIMEOUT');
                                        $('body span.setTimeSpan').remove();
                                        if (tyoeof(isLoginOther) == 'boolean') isLoginOther = false;
                                        if (swal_close) swal_close();
                                        $.ajax({
                                            type: "GET",
                                            url: SERVERPATH + login_wx_url + '&isOver=true' + '&userInfo=' + userInfo,
                                            success: function (res) {
                                                if (res.code == 200) {
                                                    clearAllCookie();

                                                    setCookie('role', res.role);
                                                    setCookie('token', res.token);
                                                    setCookie('accessToken', res.accessToken);
                                                    setCookie('id', res.id);
                                                    setCookie("mmdId", res.mmdId);
                                                    // var haveOne = res.haveOne ? res.haveOne : '';
                                                    // setCookie('haveOne', haveOne);

                                                    // if (!res.phoneVerify) {
                                                    //     loginwindowhide();
                                                    //     if (SERVERPATH) {
                                                    //         window.localStorage.setItem('showCaminfo', 'showCaminfo');
                                                    //         loginSuccessCallback();
                                                    //     } else {
                                                    //         // camInfoServer();
                                                    //     }
                                                    //     window.localStorage.setItem('loginMessage', JSON.stringify(res));
                                                    //     return
                                                    // }
                                                    logingoon(res, 1);
                                                } else if (res.code == 202) {
                                                    if (window.location.protocol == "https:") {
                                                        if (res.headimgurl.indexOf("http:") == 0) {
                                                            res.headimgurl = "https" + res.headimgurl.substring(4);
                                                        }
                                                    }
                                                    setCookie('headimgurl', res.headimgurl);
                                                    if (headimgurl.substring(0, 4) != 'http') {
                                                        $('#headimg').css({
                                                            'background-image': 'url(' + SERVERPATH + headimgurl + ')'
                                                        });
                                                        $('#headimgs').css({
                                                            'background-image': 'url(' + SERVERPATH + headimgurl + ')'
                                                        });
                                                    } else {
                                                        $('#headimg').css({
                                                            'background-image': 'url(' + headimgurl + ')'
                                                        });
                                                        $('#headimgs').css({
                                                            'background-image': 'url(' + headimgurl + ')'
                                                        });
                                                        reloadHeader();
                                                    }
                                                    $("img[data-type='imgurl']").attr('src', res.headimgurl + '?v=' + Math.random());
                                                    $("[data-type='nick']").html(res.nick + '（' + res.wid + '）');
                                                    $(".item-btn-edit.nick").html('更换微信');
                                                    alert('绑定成功', 'sucsure');
                                                    // if($('#ifBindWX').is(':visible')){
                                                    //     $('#ifBindWX').html(res.nick + ' <span class="bindButton" onclick=loginwindowon("wid")>换绑</span>')
                                                    // }
                                                    loginwindowhide();
                                                } else if (res.code == 500 && $('.login-window-header span').text() == '账号绑定') {
                                                    alert(res.message, 'warning');
                                                    loginwindowhide();
                                                } else {
                                                    alert(res.message, 'warning');
                                                }
                                                if (timeoutid) {
                                                    clearTimeout(timeoutid);
                                                    timeoutid = null;
                                                }
                                            }
                                        })
                                    }
                                    coverLogin(fn, res);
                                } else {
                                    alert(res.message, 'warning');
                                }
                                if (timeoutid) {
                                    clearTimeout(timeoutid);
                                    timeoutid = null;
                                }
                            }
                        })
                        break;
                    case 404:
                        if (timeoutid) clearTimeout(timeoutid);
                        timeoutid = setTimeout(_gettoken, 100, c);
                        break;
                    case 403:
                        if (timeoutid) clearTimeout(timeoutid);
                        timeoutid = setTimeout(_gettoken, 2e3, c);
                        break;
                    case 402:
                    case 500:
                        //console.error(500);
                        break;
                    case 408:
                        if (timeoutid) {
                            clearTimeout(timeoutid);
                            timeoutid = null
                        };
                        if (!$('.img-pho').hasClass('img-wx')) {
                            timeoutid = setTimeout(_gettoken, 700);
                        } else {
                            if (tid2) {
                                clearTimeout(timeoutid);
                                timeoutid = null;
                                tid2 = null;
                            }
                        }
                }
            },
            error: function (r, text, e) {
                if (timeoutid) clearTimeout(timeoutid);
                timeoutid = setTimeout(_gettoken, 1500, 408);
            }
        });
    }
    if (timeoutid) clearTimeout(timeoutid);
    timeoutid = setTimeout(_gettoken, 100);
    return timeoutid;
}

//addKf5Sample
function addKf5Sample(url) {
    var iWidth = 350;                          //弹出窗口的宽度;
    var iHeight = 478;                         //弹出窗口的高度;
    //获得窗口的垂直位置
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2 + 80;
    //获得窗口的水平位置
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2 + 696;
    window.open(url, '_blank', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=1,toolbar=1,menubar=1,location=1,resizable=1,scrollbars=0,titlebar=1');
}
// kf5
function addKf5(url) {
    var iWidth = 350;                          //弹出窗口的宽度;
    var iHeight = 478;                         //弹出窗口的高度;
    //获得窗口的垂直位置
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2 + 80;
    //获得窗口的水平位置
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2 + 696;
    window.open(url, '_blank', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=1,toolbar=1,menubar=1,location=1,resizable=1,scrollbars=0,titlebar=1');
}
function addQQ(url) {
    var iWidth = 720;                          //弹出窗口的宽度;
    var iHeight = 600;                         //弹出窗口的高度;
    //获得窗口的垂直位置
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
    //获得窗口的水平位置
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
    window.open("//shang.qq.com/wpa/qunwpa?idkey=6469ad973d51c06fdc1f92232873e6c18dddb701a1f0dbc2dece2ad9d901f5c3", '_blank', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}

function checkLogin() {
    storage.setItem("flag", 'true');
    var userId = getUserName('id');
    var token = 'Bearer ' + getCookie('accessToken');
    if (userId == null) {

        $('.login-window').addClass('fadeIn');
        $('.login-window').show().removeClass('fadeOut fadeOutReg');
        $('.other-login').css('margin-top', '30px');

    } else {
        $.ajax({
            url: 'https://www.thingjs.com/uinapi/register/kf5?userId=' + userId,
            type: 'get',
            dataType: 'json',
            headers: { 'Authorization': token },
            success: function (res) {
                // console.log(res.data);
                if (res.status == '0') {
                    // window.open(res.data)
                    window.location.href = res.data;
                    storage.setItem("flag", 'false');
                }
            }
        });
    }
}
function dcvFile() {
    storage.setItem("flag", 'true');
    var userId = getUserName('id');
    if (userId == null) {
        $('.login-window').addClass('fadeIn');
        $('.login-window').show().removeClass('fadeOut fadeOutReg');
        $('.other-login').css('margin-top', '30px');
    } else {
        window.location.href = "https://www.thingjs.com/guide/dcv_api";
    }
}

function checkHelpLogin(flag) {
    var userId = getUserName('id');
    var token = 'Bearer ' + getCookie('accessToken');
    if (flag == 'true') {
        $.ajax({
            url: 'https://www.thingjs.com/uinapi/register/kf5?userId=' + userId,
            type: 'get',
            dataType: 'json',
            headers: { 'Authorization': token },
            success: function (res) {
                // console.log(res.data);
                if (res.status == '0') {

                    window.location.href = res.data;
                }
            }
        });
        storage.setItem("flag", 'false');
    }
}

//获取内网ip
var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
var RTCPeerUserIP = '';
if (RTCPeerConnection) (function () {
    var rtc = new RTCPeerConnection({ iceServers: [] });
    if (1 || window.mozRTCPeerConnection) {
        rtc.createDataChannel('', { reliable: false });
    };

    rtc.onicecandidate = function (evt) {
        if (evt.candidate) grepSDP("a=" + evt.candidate.candidate);
    };
    rtc.createOffer(function (offerDesc) {
        grepSDP(offerDesc.sdp);
        rtc.setLocalDescription(offerDesc);
    }, function (e) { console.warn("offer failed", e); });

    var addrs = Object.create(null);
    addrs["0.0.0.0"] = false;
    function updateDisplay(newAddr) {
        if (newAddr in addrs) return;
        else addrs[newAddr] = true;
        var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });
        for (var i = 0; i < displayAddrs.length; i++) {
            if (displayAddrs[i].length > 16) {
                displayAddrs.splice(i, 1);
                i--;
            }
        }
        RTCPeerUserIP = displayAddrs[0];      //打印出内网ip
    }

    function grepSDP(sdp) {
        var hosts = [];
        sdp.split('\r\n').forEach(function (line, index, arr) {
            if (~line.indexOf("a=candidate")) {
                var parts = line.split(' '),
                    addr = parts[4],
                    type = parts[7];
                if (type === 'host') updateDisplay(addr);
            } else if (~line.indexOf("c=")) {
                var parts = line.split(' '),
                    addr = parts[2];
                updateDisplay(addr);
            }
        });
    }
})();

// 验证码
if (window.location.pathname !== '/admin/') {
    var verifyCode = new GVerify("v_container");
    $('.changeVerify').on('click', function () {
        verifyCode.refresh();
    })

    var options_forget = {
        id: "forget-email",
        canvasId: "forget_email"
    }
    var forgetEmail = new GVerify(options_forget);
    $('.changeVerify_forEmail').on('click', function () {
        forgetEmail.refresh();
    })

    var options = {
        id: "v_container_tel",
        canvasId: "verifyCode_tel"
    }
    var verifyCode_tel = new GVerify(options);
    $('.changeVerify_tel').on('click', function () {
        verifyCode_tel.refresh();
        $('div[data-error="phoneVe"]').hide();
    })
    $('#v_container_tel').on('click', function () {
        // verifyCode_tel.refresh();
        $('div[data-error="phoneVe"]').hide();
    })
}
function qqlogin(userinfo, type) {
    var url = 'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101582476&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.thingjs.com%2Fmp%2Fqq';
    if (userinfo && type) {
        $.ajax({
            url: SERVERPATH + '/mp/qqlogin',
            type: 'post',
            data: { "isOver": true, "userinfo": JSON.stringify(userinfo) },
            success: function (data) {
                if (data.code == 200) {
                    var res = data.data;
                    clearAllCookie();
                    setCookie('role', res.role);
                    setCookie('token', res.token);
                    setCookie('accessToken', res.accessToken);
                    setCookie('id', res.id);
                    // if(res.login_times == 1){
                    //     loginSource = 'companyServerFirst';
                    // }
                    logingoon(res, 1);
                    return;
                }
                console.log(data);
            },
            error: function (err) {
                console.log(err);
                return;
            }
        })
        return;
    }
    if (SERVERPATH) {
        if(window.location.pathname=='/thingjs-x/') {
            url = url + '&state=4'
        } else if (window.location.protocol == "http:") {
            url = url + '&state=2'
        } else if (window.location.protocol == "https:") {
            url = url + '&state=3'
        }
    } else {
        if (window.location.protocol == "https:") {
            url = url + '&state=1'
        }
    }
    var iWidth = 734;                          //弹出窗口的宽度;
    var iHeight = 386;                         //弹出窗口的高度;
    //获得窗口的垂直位置
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2 + 40;
    //获得窗口的水平位置
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
    window.open(url, '_blank', 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');

    $(".other-login .loginMethod li div").css("borderColor", "#bae2f6");
    $(".other-login .loginMethod li").eq(1).siblings().find("div").css("borderColor", "#ffffff");
}

function emailLogin() {
    $("#emailRegister").show();
    $("#phoneRegister").hide();
    $('.loginTitleSpan').text('邮箱注册');
    $("#reg-btn").attr("regType", "email");

    $(".other-login .loginMethod li div").eq(3).css("borderColor", "#ffdfcf");
    $(".other-login .loginMethod li").eq(3).siblings().find("div").css("borderColor", "#ffffff");
    if (!verifyCode_email.validate(document.getElementById("reg-emailreg-img").value)) {
        $("#reg-btn").addClass("noEvents").css("background-color", "rgb(153,153,153)");
        $("#getEmailRegNum").css("background-color", "rgb(153,153,153)");
    } else {
        $("#reg-btn").removeClass("noEvents").css("background-color", "rgb(255, 135, 0)");
    }
}
function phoneLogin() {
    $("#emailRegister").hide();
    $("#phoneRegister").show();
    $('.loginTitleSpan').text('手机号注册');
    $("#reg-btn").attr("regType", "phone");
    $('.login-window').css('height', '430px');

    $(".other-login .loginMethod li div").eq(0).css("borderColor", "#ffdfcf");
    $(".other-login .loginMethod li").eq(0).siblings().find("div").css("borderColor", "#ffffff");

    if (!verifyCode_tel.validate(document.getElementById("reg-telreg-img").value)) {
        $("#reg-btn").addClass("noEvents").css("background-color", "rgb(153,153,153)");
    } else {
        $("#reg-btn").removeClass("noEvents").css("background-color", "rgb(255, 135, 0)");
    }
}

function receiveMessage(event) {
    //event.origin是指发送的消息源，一定要进行验证！！！
    //if (event.origin !== ) return;
    //event.data是发送过来的消息。
    //event.source是指子窗口，主动向子窗口发送消息可以用popup
    //postMessage有两个参数，消息和自己的源(例如http://www.baidu.com)，自己的源应该和目标源相同。否则发送会失败。
    try {
        if (event.data.auth == '购买在线部署成功') {
            window.AnalysysAgent && window.AnalysysAgent.track('pay_button_success',{
                'buyPackageName': event.data.titleName,     // 购买的类型
                'PaymentType': '在线部署',                  // 付费类型
                'price': '2888',                            // 金额
                'unit': '个/年'                             // 单位
            })
            window.AnalysysAgent && window.AnalysysAgent.profileSet('PaymentType_deploy', '在线部署'+'(个/年)');
            return;
        }
        // 现在这个没用了 event.data.auth不叫购买_成功
        if (event.data.auth == '购买_成功') {
            window.AnalysysAgent && window.AnalysysAgent.track('pay_button_success',{
                'buyPackageName': event.data.content.type,     // 购买的类型
                'PaymentType': event.data.content.type,        // 付费类型
                'pirce': event.data.content.pirce + '',
                'unit': '个'
            })
            return;
        }
        var edata = decodeURIComponent(event.data);
        var res = JSON.parse(decodeURI(edata));
        if (!res.auth || res.auth != "thingjsLoginMessage") return;
        if (res.code == 202) {
            if (window.location.protocol == "https:") {
                if (res.headimgurl.indexOf("http:") == 0) {
                    res.headimgurl = "https" + res.headimgurl.substring(4);
                }
            }
            setCookie('headimgurl', res.headimgurl);
            $('#headimg').css({
                'background-image': 'url(' + SERVERPATH + res.headimgurl + ')'
            });
            $('#headimgs').css({
                'background-image': 'url(' + SERVERPATH + res.headimgurl + ')'
            });
            reloadHeader();
            $("img[data-type='imgurl']").attr('src', res.headimgurl + '?v=' + Math.random());
            $("[data-type='qqnick']").html(res.nick + '（' + res.qqid + '）');
            alert('绑定成功', 'sucsure');
            loginwindowhide();
            return;
        } else if (res.code == 500) {
            // console.log('500')
            alert(res.message, 'warning');
            loginwindowhide();
            return;
        } else if (res.code == 205) {
            var fn = function () {
                window.localStorage.removeItem('LOGINTIMEOUT');
                $('body span.setTimeSpan').remove();
                if (typeof (isLoginOther) == 'boolean') isLoginOther = false;
                if (swal_close) swal_close();
                qqlogin(res.data, 1);
            }
            coverLogin(fn, res);
            return;
        }
    } catch (error) {
        return;
    }
    clearAllCookie();
    setCookie('role', res.role);
    setCookie('token', res.token);
    setCookie('accessToken', res.accessToken);
    setCookie('id', res.id);
    setCookie("mmdId", res.mmdId);
    // var haveOne = res.haveOne ? res.haveOne : '';
    // setCookie('haveOne', haveOne);
    // if(!res.phoneVerify){
    //     loginwindowhide();
    //     camInfoServer();
    //     window.localStorage.setItem('loginMessage', JSON.stringify(res));
    //     return
    // }
    if(res.login_times == 1){
        loginSource = 'companyServerFirst';
    }
    logingoon(res, "QQ");
}

//添加消息接收函数
window.addEventListener("message", receiveMessage, false);
function getHeadImg(name) {
    // let hash = crypto.createHash('md5')
    // hash.update(userNick); // 传入用户名
    var hash = md5(name);
    var data = new Identicon(hash, 420).toString();
    // let imgData = new Identicon(hash.digest('hex')).toString()
    let imgUrl = 'data:image/png;base64,' + data // 这就是头像的base64码
    return imgUrl;
}
function encodeAno(a) {
    if (a.indexOf('/client/ThingJS/') >= 0) {
        return a;
    }
    a = encodeURI(a);
    return a.substr(0, a.lastIndexOf('/')) + a.substr(a.lastIndexOf('/')).replace(/0/g, '02').replace(/%/g, '01');
}

layui.use('element', function () {
    var element = layui.element;

    //一些事件监听

    element.on('tab(docDemoTabBrief)', function (data) {
        $('.forget-input-tip').hide();
        $('.icon-cuowu').hide();

    });
});
$('.forgetTel').on('click', function () {
    verifyCode.refresh();
    $('.error-hint-box').hide();
    //   $('.login-window').css('width','400px').css('height','450px');
})
$('.forgetEmail').on('click', function () {
    verifyCode.refresh();
    $('.error-hint-box').hide();
    // $('.login-window').css('width','400px').css('height','450px');
    // $('.forget-email-btn').css('margin-top','17px');
})
if (getCookie('userNick') != null) {
    $("#login").html(decodeURI(decodeURI(getCookie('userNick'))));
}

//充值
function recharge() {
    var openid = getCookie("openid");
    if (!openid) {
        clearAllCookie();
        window.location.href = document.location.origin;
    } else {
        var index = layer.open({
            type: 2,
            move: false,
            title: false,
            closeBtn: 0,
            scrollbar: false,
            area: ['535px', '416px'],
            resize: false,
            content: ['https://www.thingjs.com/static/payment/0726/recharge.html?userId=' + $.cookie('mmdId'), 'no'],
        });
        window.addEventListener('message', function (event) {
            if (event.data == 'closeRecharge') {
                layer.close(index);
            }
        });
    }
}
function updatepriceVIP(){
    // window.open(path+'/guide/?m=price','sample');
    window.open('https://www.thingjs.com/guide/price/','sample')
};


//升级VIP
function updateVIP(flag,msg){
    if(flag){
        var msg = {title:'开通VIP'}
        camInfoServer('fromVIPServer',msg);
        return
    }
    var endTime = '';
    $.ajax({
        url: SERVERPATH+'/api/User_info'+(SERVERPATH?'?token='+$.cookie('token'):''),
        type: 'get',
        async: false,
        success: function (data) {
            var user = {};
            user = data;
            endTime = new Date(user.vip_end);
            endTime.setDate(endTime.getDate() + 1);
            endTime = new Date(endTime).Format('yyyy-MM-dd hh:mm:ss');

            var currentTime = new Date().Format('yyyy-MM-dd hh:mm:ss');;
            if(endTime<currentTime) endTime = '';
        }
    })

    var userId = $.cookie('mmdId');
    var result = {
        'title': '开通VIP',
        'imgsrc': (SERVERPATH?SERVERPATH:window.location.protocol + "//" + window.location.host) +
            '/guide/image/thingjs_vip.png',
        'describe': '购买VIP（商业开发者）<br/>有效期：' + getNowFormatDatevip(endTime, 0) + ' - ' + getNowFormatDatevip(endTime, 1,-1) + "。<br/><br/><span ng-show='!publicPay'>付款后VIP（商业开发者）即时生效。</span><span ng-show='publicPay'>请在对公付款后及时与平台客服联系。谢谢！</span>",
        'price': 2998,
        'id': userId,
        'type': "ThingJS_VIP",
        'step':msg.step
    }
    var openid = getCookie("openid");
    if (!openid) {
        clearAllCookie();
        window.location.href = document.location.origin;
    } else {
        layer.open({
            type: 2,
            title: false,
            closeBtn: 0,
            area: ['535px', '558px'],
            content: ['https://www.thingjs.com/static/payment/0726/payment.html?type=ThingJS_VIP&userId=' + userId,  'no'],
            skin: 'buyModelDiv',
            success: function () {
                document.getElementsByClassName('buyModelDiv')[0].querySelector('.layui-layer-content').children[0].contentWindow.postMessage(result, '*');
            }
        });
        createListener();
    }
}
// 弹窗关闭事件
function createListener () {
    function myFunc (event) {
            if (event.data == 'closeWin') { // 验证 测试一下 用不用加remove
                clearAllCookie();
                window.location.href = document.location.origin;
            }
            if (event.data == 'close') {
                layer.closeAll();
                // 埋点 支付页面关闭事件
                // AnalysysAgent.track('pay_close')
                window.removeEventListener('message', myFunc ,true);
            }
            if (event.data.auth == '购买成功') {
                if (event.data.titleName == '开通VIP') {
                    window.AnalysysAgent && window.AnalysysAgent.track('pay_button_success',{
                        'buyPackageName': event.data.titleName,     // 购买的类型
                        'PaymentType': '在线开发',                  // 付费类型
                        'price': 2998 + '', // 金额
                        'unit': '个/年'                            // 单位
                    })
                    window.AnalysysAgent && window.AnalysysAgent.profileSet('PaymentType_development', '在线开发'+'(个/年)');
                }
            }
    }
    window.addEventListener('message', myFunc ,true)
}
function getNowFormatDatevip(endTime, next,day) {
    var date;
    var _index = endTime.indexOf("1970");
    if (endTime && _index != 0) {
        date = new Date(endTime);
    } else {
        date = new Date();
    }
    if(next<1){
        date.toLocaleString(date.setMonth(date.getMonth() + next*10));
    }else{
        date.toLocaleString(date.setFullYear(date.getFullYear() + next));
    }
    date.setDate(date.getDate()+(day||0));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();

    var currentdate = year + '年' + month + '月' + strDate + '日';
    return currentdate;
}
//申请建模
function modelServer(flag,info) {
    var height = (info && info.toolInfo)?'551px':'637px';
    var openid = getCookie("openid");
    if (!openid) {
        loginSource = 'modelServer'
        loginwindowon();
        clearAllCookie();
        // window.location.href = document.location.origin;
    } else {
        if(flag){
            var msg = {title:'申请建模'}
            camInfoServer('fromModelServer',msg);
            return
        }
        // if(flag){
        //     var msg = {title:'申请建模',height:'637px'};
        //     if(info && info.toolInfo){
        //         msg.title = info.toolInfo.title;
        //         msg.height = info.toolInfo.height;
        //         msg.toolInfo = info.toolInfo;
        //     }
        //     camInfoServer('fromModelServer',msg);
        //     return
        // }
        // var height = info.toolInfo.height;
        var index = layer.open({
            type: 2,
            move: false,
            title: false,
            closeBtn: 0,
            scrollbar: false,
            area: ['658px', height],
            resize: false,
            skin: 'applySkin',
            content: ['https://store.thingjs.com/modelsever?userId=' + $.cookie('mmdId'), 'no'],
            // content: ['http://127.0.0.1:8080/modelsever?userId=' + $.cookie('mmdId'), 'no'],
            success: function () {
                document.getElementsByClassName('applySkin')[0].children[0].children[0].contentWindow.postMessage({showModel:'showModel',info:info,mmdId:$.cookie('mmdId')}, '*');
            }
        });
        window.addEventListener('message', function (event) {
            if (event.data == 'close') {
                layer.close(index);
            }
        });
    }
}
//申请开发
function devServer(flag,info) {
    var openid = getCookie("openid");

    if (!openid) {
        loginSource = 'devServer'
        loginwindowon();
        clearAllCookie();
        // window.location.href = document.location.origin;
    } else {
        if(flag){
            var msg = {title:'请求协助',class:'devBlue'}
            camInfoServer('fromdevServer',msg);
            return
        }
        var index = layer.open({
            type: 2,
            move: false,
            title: false,
            closeBtn: 0,
            scrollbar: false,
            area: ['658px', '659px'],
            resize: false,
            skin: 'applySkin',
            content: ['https://store.thingjs.com/devsever?userId=' + $.cookie('mmdId'), 'no'],
            success: function () {
                document.getElementsByClassName('applySkin')[0].children[0].children[0].contentWindow.postMessage({showdev:'showdev',info:info}, '*');
            }
        });
        window.addEventListener('message', function (event) {
            if (event.data == 'close') {
                layer.close(index);
            }
        });
    }
}
//企业信息补全
var camInfoType = '';
var camInfoMsg = '';
function camInfoServer(type,msg) {
    var openid = getCookie("openid");
    
    if (!openid) {
        loginSource = 'companyServer';
        camInfoType = type;
        camInfoMsg = msg;
        loginwindowon();
        clearAllCookie();
        // window.location.href = document.location.origin;
    }else{
        $.ajax({
            url: SERVERPATH + '/api/User_info',
            type: 'get',
            success: function (data) {
                var openPage = '';
                if(!data.phoneVerify) openPage = 'phone';
                if(!data.office || !data.company || !data.namebyCam) openPage = openPage?openPage+'.info':'info';

                if(openPage){//缺
                    if (type) data.type = type;
                    data.msg = {pages:openPage}
                    if (msg) Object.assign(data.msg, msg);
                    
                    var url = 'https://store.thingjs.com/campanysever';
                    var height = '398px';
                    if(openPage.indexOf('phone')>-1) height = '303px';
                    if(type == "companyServerFirst"){
                        data.msg = {title:'注册',titleTip:'请填写您的完整信息，谢谢！',pages:openPage}
                    } 

                    var index = layer.open({
                        type: 2,
                        move: false,
                        title: false,
                        closeBtn: 0,
                        fixed: false,
                        scrollbar: false,
                        area: ['540px', height],
                        resize: false,
                        skin: 'caminfoSkin',
                        content: [url, 'no'],
                        isOutAnim: false,
                        success:function(){
                            document.getElementsByClassName('caminfoSkin')[0].children[0].children[0].contentWindow.postMessage({openCampanyPanel:data}, '*');
                            $('.layui-layer').css("background-color","rgba(0,0,0,0)");
                            $('.layui-layer').css("box-shadow","none");
                        }
                    });
                    window.addEventListener('message', function (event) {
                        $('.caminfoSkin').children().children('iframe').css("height",height);
                        $('.caminfoSkin').css("width","540px");
                        if (event.data == 'closePanel') {
                            layer.close(index);
                            var loginGo = window.localStorage.getItem('signal');
                            if (loginGo) {
                                var loginMessage = window.localStorage.getItem('loginMessage');
                                loginContinue(JSON.parse(loginMessage));
                            }
                            window.localStorage.removeItem('signal');
                            window.localStorage.removeItem('loginMessage');

                        } else if(event.data == 'addMoreStyle'){
                            $('.caminfoSkin').children().children('iframe').css("height","573px");
                            $('.caminfoSkin').css({"width":"594px","overflow": "visible"});
                        } else if (event.data == 'buy') {
                            showPayment(subject);
                        } else if (event.data == 'document') {
                            if (subject == "RTSP") { window.open("http://3dmomoda.oss-cn-beijing.aliyuncs.com/common/LiveServer%20RTSP%20%E9%83%A8%E7%BD%B2%E5%8C%85%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3.pdf"); }
                            else { window.open("http://3dmomoda.oss-cn-beijing.aliyuncs.com/common/LiveServer%20GB28181%20%E9%83%A8%E7%BD%B2%E5%8C%85%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3.pdf"); }
                        } else if (event.data == "releasePro") {
                            releasePro();
                        } else if (event.data.type == "next") {
                            layer.style(index, { height: '398px' });
                        } else if(event.data.to){
                            var from = event.data.to;
                            if(from == "fromModelServer"){
                                modelServer(false,event.data);
                            }else if(from == "fromdevServer"){
                                devServer(false,event.data);
                            }else if(from == "buy"){
                                subject = subject?subject:event.data.subject;
                                if(subject == "SellProject"){
                                    sell(false,event.data);
                                    return
                                } 
                                showPayment(false,event.data);
                            }else if (from == 'document') {
                                if (event.data.subject == "RTSP") { window.open("http://3dmomoda.oss-cn-beijing.aliyuncs.com/common/LiveServer%20RTSP%20%E9%83%A8%E7%BD%B2%E5%8C%85%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3.pdf"); }
                                else { window.open("http://3dmomoda.oss-cn-beijing.aliyuncs.com/common/LiveServer%20GB28181%20%E9%83%A8%E7%BD%B2%E5%8C%85%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3.pdf"); }
                            }else if (from.indexOf("releasePro")>-1) {
                                releasePro(from,event.data);
                            }else if(type == "expand"){
                                expand(false,event.data);
                            }else if(from == "fromVIPServer"){//来自首页、在线开发
                                updateVIP(false,event.data);
                                return;
                            }else if(from == "view"){
                                var funcName = event.data.subject;
                                window[funcName](false,event.data.toolInfo);
                                // visualization(false,event.data.toolInfo)
                            }
                        }
                        if (event.data.type == "showDialog") {
                            document.getElementsByClassName('caminfoSkin')[0].children[0].children[0].contentWindow.postMessage("showDialog", '*');
                            // layer.iframeAuto(index);
                            var width = event.data.width ? event.data.width : '396px';
                            layer.style(index, { width: width, height: event.data.height });
                            $(".caminfoSkin").css({ top: '50%', left: '50%', transform: "translate(-50%,-50%)", "-webkit-transform": "translate(-50%,-50%)" });
                        }
                        if (event.data.signal) {//刷新可能有问题
                            window.localStorage.setItem('signal', true);
                        }

                    });
                }else{//不缺
                    var isCheck = getCookie("checkSign");
                    if (type == "buy" && msg) {
                        if(msg.subject == "ThingJS_VIP_no"){//来自首页、在线开发
                            updateVIP(false);
                            return;
                        } else if(msg.subject == "SellProject"){
                            sell(false,msg)
                            // buyProject(msg)
                        }else{
                            showPayment(false,msg);
                        }
                    } else if (type == 'document') {
                        if (msg.subject == "RTSP") { window.open("http://3dmomoda.oss-cn-beijing.aliyuncs.com/common/LiveServer%20RTSP%20%E9%83%A8%E7%BD%B2%E5%8C%85%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3.pdf"); }
                        else { window.open("http://3dmomoda.oss-cn-beijing.aliyuncs.com/common/LiveServer%20GB28181%20%E9%83%A8%E7%BD%B2%E5%8C%85%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3.pdf"); }
                        if(isCheck) showSigninPage("from_login");
                    } else if (type == "releasePro" || type == "releasePro_Q") {
                        releasePro(type);
                    } else if(type == "fromModelServer" ){                        
                        modelServer(false,msg);
                    } else if(type == "fromdevServer"){
                        devServer(false,msg);
                    } else if(type == "expand"){
                        expand(false);
                    } else if(type == "fromVIPServer"){
                        updateVIP(false,msg)
                    } else if(type == "view"){
                        if(isCheck) showSigninPage("from_login");
                        var funcName = msg.subject;
                        window[funcName](false,msg.toolInfo);
                        // visualization(false,msg.toolInfo)
                    }
                    setCookie("checkSign","");
                }
                // 埋点
                if (type === undefined) {
                    // 设置用户属性
                    var userProperties = {
                        'userNick': data.userNick,
                        'namebyCam': data.namebyCam,
                        'company': data.company,
                        'office': data.office,
                        'phoneVerify': data.phoneVerify,
                        'registered_time': new Date(data.first_login).Format('yyyy-MM-dd hh:mm:ss'),
                        'sex': data.sex,
                        'isregistered': '是',
                    }
                    var mmdId_ = data.mmdId
                    data.vip_end === null ? '' : userProperties['vip_end'] = data.vip_end;
                    if(data.company) {
                        $.ajax({
                            url: SERVERPATH + '/api/queryCompanyAddress',
                            type: 'post',
                            dataType: 'json',
                            data: {
                                companyName: data.company
                            },
                            success: function (data) {
                                var data_ = data[0]
                                var allinfo =  $.parseJSON(data_.allinfo)
                                try {
                                    if ( allinfo.Scope ) {
                                        var industry_ =  allinfo.Scope.split('、', 3)
                                        userProperties['industry'] = industry_.toString() + '...';
                                    }
                                } catch (e) {
                                    // console.log(e);
                                }
                                userProperties['province'] = data_.province;
                                userProperties['city'] = data_.city;
                                userProperties['city_s'] = data_.city_s; // 区
                                window.AnalysysAgent && window.AnalysysAgent.alias(mmdId_ + '')
                                window.AnalysysAgent && window.AnalysysAgent.profileSet(userProperties);

                            }
                        })
                    }
                    // 账号关联
                    if(typeof(AnalysysAgent)!='undefined'&&!SERVERPATH) {
                        AnalysysAgent.alias(data.mmdId + '')
                        AnalysysAgent.profileSet(userProperties);
                    }

                    // 注册事件
                    if (data.login_times === 1) {
                        if(typeof(AnalysysAgent)!='undefined'&&!SERVERPATH) {
                            AnalysysAgent.track('user_registered', { '$signup_time': new Date().toLocaleDateString() })
                            AnalysysAgent.profileSet('$signup_time', new Date().toLocaleDateString());
                        }
                    }
                }
            }
        });
    }
}
//查询个人信息 为了埋点
function camInfoServerToAnalysysAgent() {
    $.ajax({
      url: SERVERPATH + "/api/User_info",
      type: "get",
      success: function(data) {
        // 埋点
        if (window.AnalysysAgent && data) {
          // 设置用户属性
          var userProperties = {
            userNick: data.userNick,
            namebyCam: data.namebyCam,
            company: data.company,
            office: data.office,
            phoneVerify: data.phoneVerify,
            registered_time: new Date(data.first_login).Format(
              "yyyy-MM-dd hh:mm:ss"
            ),
            sex: data.sex,
            isregistered: "是"
          };
          var mmdId_ = data.mmdId;
          data.vip_end === null ? "" : (userProperties["vip_end"] = data.vip_end);
          if (data.company) {
            $.ajax({
              url: SERVERPATH + "/api/queryCompanyAddress",
              type: "post",
              dataType: "json",
              data: {
                companyName: data.company
              },
              success: function(data) {
                var data_ = data[0];
                var allinfo = $.parseJSON(data_.allinfo);
                try {
                  if (allinfo.Scope) {
                    var industry_ = allinfo.Scope.split("、", 3);
                    userProperties["industry"] = industry_.toString() + "...";
                  }
                } catch (e) {
                  // console.log(e);
                }
                userProperties["province"] = data_.province;
                userProperties["city"] = data_.city;
                userProperties["city_s"] = data_.city_s; // 区
                window.AnalysysAgent && window.AnalysysAgent.alias(mmdId_ + "");
                window.AnalysysAgent && window.AnalysysAgent.profileSet(userProperties);
              }
            });
          }
          // 账号关联
          if (typeof AnalysysAgent != "undefined" ) {
            AnalysysAgent.alias(data.mmdId + "");
            AnalysysAgent.profileSet(userProperties);
          } 
  
          // 注册事件
          if (data.login_times === 1) {
            if (typeof AnalysysAgent != "undefined") {
              AnalysysAgent.track("user_registered", {
                $signup_time: new Date().toLocaleDateString()
              });
              AnalysysAgent.profileSet(
                "$signup_time",
                new Date().toLocaleDateString()
              );
            }
          }
        }
      }
    });
  }
// 跳转
function openProduct() {
    if (getQueryString('m') == 'sample') return largePanel(null, '项目');
    window.open(SERVERPATH + '/guide/?m=sample', '项目');
}
function openScene() {
    if (getQueryString('m') == 'sample') return largePanel(null, '园区');
    window.open(SERVERPATH + '/guide/?m=sample', '园区');
}
function openTicket() {
    if (getQueryString('m') == 'sample') return largePanel(null, '我的订单');
    window.open(SERVERPATH + '/guide/?m=sample', '我的订单');
}
function openPer() {
    if (getQueryString('m') == 'sample') return largePanel(null, '个人信息');
    window.open(SERVERPATH + '/guide/?m=sample', '个人信息');
}
function openMsg() {
    if (getQueryString('m') == 'sample') return largePanel(null, '系统消息');
    window.open(SERVERPATH + '/guide/?m=sample', '系统信息');
}

//扩容
function expand(flag,msg) {
    if(flag){
        var msg = {title:'购买资源空间'}
        camInfoServer('expand',msg);
        return
    }
    var data = {
        'title': '购买资源空间',
        'imgsrc': window.location.protocol + "//" + window.location.host +
            '/guide/image/expand.jpg',
        'describe': '资源空间扩容1G/年<br/>有效期：' + getExpandNowFormatDate('', 0) + ' - ' + getExpandNowFormatDate('', 1, -1)+'<br/><br/><span ng-show="!publicPay">付款后即时生效。</span><span ng-show="publicPay">请在对公付款后及时与平台客服联系。谢谢！</span>',
        'price': 99.9,
        'id': $.cookie('mmdId'),
        'type': "ThingJS_Expansion",
        'step':msg?msg.step:''
    }
    var openid = getCookie("openid");
    if (!openid) {
        clearAllCookie();
        window.location.href = document.location.origin;
    } else {
        layer.open({
            type: 2,
            title: false,
            closeBtn: 0,
            area: ['535px', '558px'],
            content: ['https://www.thingjs.com/static/payment/0726/payment.html?type=ThingJS_Expansion&userId=' + $.cookie('mmdId'), 'no'],
            skin: 'buyModelDiv',
            success: function () {
                document.getElementsByClassName('buyModelDiv')[0].children[0].children[0].contentWindow.postMessage(data, '*');
            }
        });
        window.addEventListener('message', function (event) {
            if (event.data == 'close') {
                layer.closeAll();
            }
            if (event.data == 'closeWin') {
                if(initStore) initStore();
                layer.closeAll();
            }
        })
    }
}

function getExpandNowFormatDate(endTime, next, day) {
    var date;
    var _index = endTime.indexOf("1970");
    if (endTime && _index != 0) {
        date = new Date(endTime);
    } else {
        date = new Date();
    }
    date.toLocaleString(date.setFullYear(date.getFullYear() + next));
    date.setDate(date.getDate() + (day || 0));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();

    var currentdate = year + '年' + month + '月' + strDate + '日';
    return currentdate;
}
function checkEmailCode() {
    var res_email = verifyCode_email.validateForCheck(document.getElementById("reg-emailreg-img").value);
    if (res_email) {
        $("#getEmailRegNum").removeClass("noEvents").css("background-color", "rgb(255, 135, 0)");
        $("#reg-btn").removeClass("noEvents").css("background-color", "rgb(255, 135, 0)");
        $("input[data-name=emailPsw]").removeAttr('readonly');
        $("input[data-name=emailCode]").removeAttr('readonly');
        $('#reg-tip-imgE').text('').hide();
        $('#reg-tip-imgE + .cuowu2').hide();
    } else {
        $("#getEmailRegNum").addClass("noEvents").css("background-color", "rgb(153,153,153)");
        $("#reg-btn").addClass("noEvents").css("background-color", "rgb(153,153,153)");
        $("input[data-name=emailPsw]").attr('readonly', true);
        $("input[data-name=emailCode]").attr('readonly', true);
        $('#reg-tip-imgE').text('验证码错误').show();
        $('#reg-tip-imgE + .cuowu2').show();
    }
}
function checkPhoneCode() {
    var res_tel = verifyCode_tel.validateForCheck(document.getElementById("reg-telreg-img").value);
    if (res_tel) {
        $('div[data-error="phoneVe"]').hide();
        $("#get_phone_code").removeClass("noEvents").css("color", "rgb(255, 135, 0)");
        $("#reg-btn").removeClass("noEvents").css("background-color", "rgb(255, 135, 0)");
    } else {
        $('div[data-error="phoneVe"]').show();
        $('div[data-error="phoneVe"] span').text('验证码错误');
        $("#get_phone_code").addClass("noEvents").css("color", "rgb(153,153,153)");
        $("#reg-btn").addClass("noEvents").css("background-color", "rgb(153,153,153)");
    }
}
function emailCheckImg(type) {
    var res;
    if (type == "tel") {
        res = verifyCode.validate(document.getElementById("forgetinp-telreg-img").value);
    } else {
        res = forgetEmail.validate(document.getElementById("forgetinp-emailreg-img").value);
    }

    if (!res) {
        $('div[data-error="forgetEmail-img"]').show();
        return;
    } else {
        $('div[data-error="forgetEmail-img"]').hide();
    }
}

function loginContinue(res) {
    if (SERVERPATH) {
        // 资源中心
        $.post('https://store.thingjs.com:3000/user/loginGoon?token=' + $.cookie('token'), { userid: res.mmdId, uid: res.openid }, function (result) {
            var data = JSON.parse(result);
            if (data.code == 200) {
                setCookie('openid', res.openid);
                setCookie('dix_token', res.dix_token);
                setCookie('dix_id', res.id);
                setCookie("saveSetSwitch", 0);
                setCookie("mmdId", res.mmdId);
                setCookie('name', res.name);
                if (!res.headimgurl) {
                    setCookie('headimgurl', 'https://www.thingjs.com/guide/image/tx.png');
                } else {
                    if (window.location.protocol == "https:") {
                        if (res.headimgurl.indexOf("http:") == 0) {
                            res.headimgurl = "https" + res.headimgurl.substring(4);
                        }
                    }
                    setCookie('headimgurl', res.headimgurl);
                }
                indexlogininit();
                loginwindowhide();
                if (flag == true) {
                    checkHelpLogin(flag);
                }
                if (window.location.pathname === '/admin/') {
                    window.location.href = 'https://www.thingjs.com/admin/#/myProduct'
                }
                if (getQueryString("back")) {
                    if(getQueryString("back").indexOf('?')!='-1'){
                        window.location.href = getQueryString("back")+'&token='+res.token;
                    }else{
                        window.location.href = getQueryString("back")+'?token='+res.token;
                    }
                    return;
                }
                window.localStorage.setItem('showCaminfo', 'showCaminfo');
                if(typeof(loginSuccessCallback)!='undefined') loginSuccessCallback();

                $("#recharge").show();
                $("#development").show();
                $("#modelSer").show();
            }
        });
    } else {
        // ThingJS网站
        $.ajax({
            url: SERVERPATH + '/api/wxloginGoOn',
            type: 'post',
            dataType: 'json',
            data: {
                userid: res.mmdId,
                uid: res.openid
            },
            success: function (result) {
                if (result.code == 200) {
                    setCookie('role', res.role);
                    setCookie('token', res.token);
                    setCookie('name', res.name);
                    setCookie('openid', res.openid);
                    setCookie('id', res.id);
                    setCookie('accessToken', res.accessToken);
                    setCookie('dix_token', res.dix_token);
                    setCookie('dix_id', res.id);
                    setCookie("saveSetSwitch", 0);
                    setCookie("mmdId", res.mmdId);
                    $.ajax({
                        url: SERVERPATH + '/api/particleRole',
                        type: 'post',
                        success: function (res) {
                            if (res.state) {
                                setCookie("particleRole", true);
                            } else {
                                setCookie("particleRole", false);
                            }
                            if (typeof (getParticlesAuth) != 'undefined') getParticlesAuth();
                        }
                    });
                    $.ajax({
                        url: SERVERPATH + '/api/dcvRole',
                        type: 'post',
                        success: function (res) {
                            if (res.state) {
                                $('#dcvBtn').show();
                                setCookie("dcvRole", true);
                            } else {
                                setCookie("dcvRole", false);
                            }
                        }
                    });
                    if(checkUserAuth&&checkUserAuth()) {
                        setCookie("musics", true);
                        setCookie("skyboxes", true);
                    } else {
                        setCookie("musics", false);
                        setCookie("skyboxes", false);
                    }
                    // $.ajax({
                    //     url: SERVERPATH + '/api/musicsRole',
                    //     type: 'post',
                    //     success: function (res) {
                    //         if (res.state) {
                    //             setCookie("musics", true);
                    //         } else {
                    //             setCookie("musics", false);
                    //         }
                    //         if (typeof (getMusicsAuth) != 'undefined') getMusicsAuth();
                    //     }
                    // });
                    // $.ajax({
                    //     url: SERVERPATH + '/api/skyboxRole',
                    //     type: 'post',
                    //     success: function (res) {
                    //         if (res.state) {
                    //             setCookie("skyboxes", true);
                    //         } else {
                    //             setCookie("skyboxes", false);
                    //         }
                    //         if (typeof (getSkyboxAuth) != 'undefined') getSkyboxAuth();
                    //     }
                    // });
                    if (!res.headimgurl) {
                        setCookie('headimgurl', path + '/guide/image/tx.png');
                        // 生成随机头像
                        // setCookie('headimgurl','suiji');

                    } else {
                        if (window.location.protocol == "https:") {
                            if (res.headimgurl.indexOf("http:") == 0) {
                                res.headimgurl = "https" + res.headimgurl.substring(4);
                            }
                        }
                        setCookie('headimgurl', res.headimgurl);
                    }
                    indexlogininit();
                    loginwindowhide();
                    // camInfoServer();
                    if (getQueryString("g") == 1 && !$('.filen-edit').is(':visible')) {
                        CreProductList('/api/scenefiles', '.self_cre')
                        pannelShow();
                    }
                    if (getQueryString("m") == 'sample') {
                        if (ORIGINOPENID && ORIGINOPENID != res.openid) {
                            var reloadSample = function () {
                                location.reload();
                            }
                            newAlert('登录成功（当前账号与与上次登录账号不同，将重新刷新当前页面）', 'success', '', reloadSample, 'false');
                            return;
                        } else {
                            ORIGINOPENID = res.openid;
                        }
                        $(".login-close").show();
                        if ($("#moveclose-dialog .panelModel .panelHeader.move .panelTitle").text() == '页面资源') {
                            createFileMenu();
                        }
                        if ($("#moveclose-dialog .panelModel .panelHeader.move .panelTitle").text() == '场景资源') {
                            createMenuScene();
                        }
                        if (getCookie("role") == 'developer') {
                            $(".btn-tb").show();
                        }
                        if (getQueryString("f") || getQueryString("i") || getQueryString("o")) {
                            if (sampleType !== 'tab_change') return;
                            tab_change(1);
                            $('#gf').hide();
                            $('.filen').show();
                            if (getQueryString("f")) {
                                $('#gf').show();
                                $('.filen').hide();
                                var fileN = decodeURI(getQueryString("f"));
                                $('#list1 li[data-name="' + fileN + '"] i.icon-file').trigger('click', 'f');
                                $('#list1 li ul p.pro_main[data-name="' + fileN + '"]').trigger('click');
                                if (getCookie("debugSwitch") == 0) {
                                    debugSwitchFalse();
                                }
                                $('.bg-upload.sceneUpload.fileUpload').hide();
                                $('.add_file_li').remove();
                                reloadIframe();
                            } else if (getQueryString("i") || getQueryString("o")) {
                                monacoModel.setValue(app_code);
                                if (getCookie("debugSwitch") == 0) {
                                    debugSwitchFalse();
                                } else {
                                    reloadIframe();
                                }
                                $('#bfilen').text('Untitled.js').attr('type', 'new');
                                typeinit('new');
                                setUrl(null, []);
                            }
                        }
                        if (getQueryString('cityBuilder') == 'true') {
                            largePanel(null, '地图', 'createProject');
                        }
                    }
                    if (flag == true) {
                        checkHelpLogin(flag);
                    }
                    if (window.location.pathname === '/admin/') {
                        if (getQueryString('m') == 'sample') return largePanel(null, '项目');
                        if(window.parent.location.search=='?m=sample') {
                            var iframeBody=$(window.parent.document).find('#iframeBody')[0];
                            if(iframeBody) {
                                if(window.location.hash.indexOf('#/User_Msg?sampleIframe=true')!=-1) {
                                    return window.parent.largePanel(null, '个人信息');
                                }
                                if(window.location.hash.indexOf('#/Scene?sampleIframe=true')!=-1) {
                                    return window.parent.largePanel(null, '园区');
                                }
                                if(window.location.hash.indexOf('#/User_Ticket?sampleIframe=true')!=-1) {
                                    return window.parent.largePanel(null, '我的订单');
                                }
                                if(window.location.hash.indexOf('#/Product?sampleIframe=true')!=-1) {
                                    return window.parent.largePanel(null, '项目');
                                }
                            }
                        }
                        window.location.href = window.location.origin + '/' + 'admin/#/myProduct';
                    }
                    if (getQueryString("back")) {
                        if(getQueryString("back").indexOf('?')!='-1'){
                            window.location.href = getQueryString("back")+'&token='+res.token;
                        }else{
                            window.location.href = getQueryString("back")+'?token='+res.token;
                        }
                        return;
                    }
                    checkNavColor();
                    //帮助中心跳转
                    //  window.location.href = 'http://' + window.location.host + "/guide/?"+window.location.search;
                    // window.location.reload();
                    //新增引导功能 判断当前是否出于引导状态
                    if (document.getElementById("startTeach").style.color == 'red') {
                        //console.log('新增引导功能 判断当前是否出于引导状态，用于引导页面判断是否登录成功了，登录成功，则进入introThree的新手教程');
                        introJs().exit();
                        fadeOut();
                        introThree();
                    }
                    switch (loginSource) {
                        case 'modelServer':
                            modelServer(true)
                            break
                        case 'devServer':
                            devServer(true)
                            break;
                        default:
                            break
                    }
                    loginSource = '';
                    camInfoType = '';
                }
            }
        })
    }
}
function setPwdClose(type) {
    if (type) {
        $(".setPwdTip").hide();
        $(".pay-mb").hide();
    } else {
        $(".setPwd-win").hide();
        $(".pay-mb").hide();
    }
    clearAllCookie();
}

function setPwd() {
    var passwordOld = $('#pwdOld').val();
    var password = $('#pwdAgain').val();

    var psw = encodeBase64.base64encode(password).substring(5);
    var userId = getUserName('id');
    userId = $.cookie('id');
    var token = 'Bearer ' + getCookie('accessToken');
    var data = {
        userId: userId,
        newPwd: psw
    }
    if (password == '') {
        layer.msg("密码不允许为空");
        return false;
    } else if (password.length < 6 || password.length > 18) {
        layer.msg("密码格式错误");
    } else if (password != passwordOld) {
        layer.msg('两次输入密码不一致');
    } else {
        $.ajax({
            url: 'https://www.thingjs.com/uinapi/user/updatePwd',
            type: 'post',
            dataType: 'json',
            data: data,
            headers: { 'Authorization': token },
            success: function (res) {
                if (res.status == '0') {
                    setPwdClose();
                    $(".setPwdTip").show();
                    $(".pay-mb").show();
                } else {
                    layer.msg('密码设置失败！');
                }
            }
        })
    }
}
function logingoon(res, type) {
    if (res.role) setCookie('role', res.role);
    if (res.token) setCookie('token', res.token);
    if (res.name) setCookie('name', res.name);
    setCookie('openid', res.openid);
    if (res.id) setCookie('id', res.id);
    if (res.accessToken) setCookie('accessToken', res.accessToken);
    setCookie('dix_token', res.dix_token);
    setCookie('dix_id', res.id);
    setCookie("saveSetSwitch", 0);
    setCookie("mmdId", res.mmdId);
    setCookie('name', res.name);
    if (type == "QQ") {
        setCookie('name', encodeURI(res.name));
    }        
    if((window.location.hostname=='www.thingjs.com'||window.location.hostname=='127.0.0.1')&&window.location.pathname.indexOf('/guide/check/')!=-1) {
        if(typeof(accountAccess)!='undefined') accountAccess();
    }
    if (!SERVERPATH) {
        $.ajax({
            url: SERVERPATH + '/api/particleRole',
            type: 'post',
            success: function (res) {
                if (res.state) {
                    setCookie("particleRole", true);
                } else {
                    setCookie("particleRole", false);
                }
                if (typeof (getParticlesAuth) != 'undefined') getParticlesAuth();
            }
        });
        $.ajax({
            url: SERVERPATH + '/api/dcvRole',
            type: 'post',
            success: function (res) {
                if (res.state) {
                    $('#dcvBtn').show();
                    setCookie("dcvRole", true);
                } else {
                    setCookie("dcvRole", false);
                }
            }
        });
        if(checkUserAuth&&checkUserAuth()) {
            setCookie("musics", true);
            setCookie("skyboxes", true);
        } else {
            setCookie("musics", false);
            setCookie("skyboxes", false);
        }
        // $.ajax({
        //     url: SERVERPATH + '/api/musicsRole',
        //     type: 'post',
        //     success: function (res) {
        //         if (res.state) {
        //             setCookie("musics", true);
        //         } else {
        //             setCookie("musics", false);
        //         }
        //         if (typeof (getMusicsAuth) != 'undefined') getMusicsAuth();
        //     }
        // });
        // $.ajax({
        //     url: SERVERPATH + '/api/skyboxRole',
        //     type: 'post',
        //     success: function (res) {
        //         if (res.state) {
        //             setCookie("skyboxes", true);
        //         } else {
        //             setCookie("skyboxes", false);
        //         }
        //         if (typeof (getSkyboxAuth) != 'undefined') getSkyboxAuth();
        //     }
        // });
    }
    if (!res.headimgurl) {
        setCookie('headimgurl', SERVERPATH + '/guide/image/tx.png');
    } else {
        if (window.location.protocol == "https:") {
            if (res.headimgurl.indexOf("http:") == 0) {
                res.headimgurl = "https" + res.headimgurl.substring(4);
            }
        }
        setCookie('headimgurl', res.headimgurl);
    }
    indexlogininit();
    loginwindowhide();
    if (!SERVERPATH) {
        // camInfoServer();
        camInfoServerToAnalysysAgent()
        if (getQueryString("g") == 1 && !$('.filen-edit').is(':visible')) {
            CreProductList('/api/scenefiles', '.self_cre')
            pannelShow();
        }
        if (getQueryString("m") == 'sample') {
            if (ORIGINOPENID && ORIGINOPENID != res.openid) {
                var reloadSample = function () {
                    location.reload();
                }
                newAlert('登录成功（当前账号与与上次登录账号不同，将重新刷新当前页面）', 'success', '', reloadSample, 'false');
                return;
            } else {
                ORIGINOPENID = res.openid;
                if(singiRole) singiRole();
                if(sourceRoles) sourceRoles();
            }
            $(".login-close").show();
            if ($("#moveclose-dialog .panelModel .panelHeader.move .panelTitle").text() == '页面资源') {
                createFileMenu();
            }
            if ($("#moveclose-dialog .panelModel .panelHeader.move .panelTitle").text() == '场景资源') {
                createMenuScene();
            }
            if (getCookie("role") == 'developer') {
                $(".btn-tb").show();
            }
            if (getQueryString("f") || getQueryString("i") || getQueryString("o")) {
                if (sampleType !== 'tab_change') return;
                tab_change(1);
                $('#gf').hide();
                $('.filen').show();
                if (getQueryString("f")) {
                    $('#gf').show();
                    $('.filen').hide();
                    var fileN = decodeURI(getQueryString("f"));
                    $('#list1 li[data-name="' + fileN + '"] i.icon-file').trigger('click', 'f');
                    $('#list1 li ul p.pro_main[data-name="' + fileN + '"]').trigger('click');
                    if (getCookie("debugSwitch") == 0) {
                        debugSwitchFalse();
                    }
                    $('.bg-upload.sceneUpload.fileUpload').hide();
                    $('.add_file_li').remove();
                    reloadIframe();
                } else if (getQueryString("i") || getQueryString("o")) {
                    monacoModel.setValue(app_code);
                    if (getCookie("debugSwitch") == 0) {
                        debugSwitchFalse();
                    } else {
                        reloadIframe();
                    }
                    $('#bfilen').text('Untitled.js').attr('type', 'new');
                    typeinit('new');
                    setUrl(null, []);
                }
            }
            if (getQueryString('cityBuilder') == 'true') {
                largePanel(null, '地图', 'createProject');
            }
        }
        if (window.location.pathname === '/admin/') {
            if (getQueryString('m') == 'sample') return largePanel(null, '项目');
            if(window.parent.location.search=='?m=sample') {
                var iframeBody=$(window.parent.document).find('#iframeBody')[0];
                if(iframeBody) {
                    if(window.location.hash.indexOf('#/User_Msg?sampleIframe=true')!=-1) {
                        return window.parent.largePanel(null, '个人信息');
                    }
                    if(window.location.hash.indexOf('#/Scene?sampleIframe=true')!=-1) {
                        return window.parent.largePanel(null, '园区');
                    }
                    if(window.location.hash.indexOf('#/User_Ticket?sampleIframe=true')!=-1) {
                        return window.parent.largePanel(null, '我的订单');
                    }
                    if(window.location.hash.indexOf('#/Product?sampleIframe=true')!=-1) {
                        return window.parent.largePanel(null, '项目');
                    }
                }
            }
            window.location.href = window.location.origin + '/' + 'admin/#/myProduct';
        }
        checkNavColor();
        //帮助中心跳转
        if (document.getElementById("startTeach") && document.getElementById("startTeach").style.color == 'red') {
            //console.log('新增引导功能 判断当前是否出于引导状态，用于引导页面判断是否登录成功了，登录成功，则进入introThree的新手教程');
            introJs().exit();
            fadeOut();
            introThree();
        }
        switch (loginSource) {
            case 'modelServer':
                modelServer(true)
                break
            case 'devServer':
                devServer(true)
                break;
            case 'companyServer':
                camInfoServer(camInfoType);
                break;
            case 'companyServerFirst':
                camInfoServer("companyServerFirst");
                break;
            default:
                break
        }
        loginSource = ''
    } else if (location.host == 'store.thingjs.com') {
        // 资源中心登录 __ 用于埋点
        camInfoServerToAnalysysAgent()
    }

    if (flag == true) {
        checkHelpLogin(flag);
    }
    if (getQueryString("back")) {
        if(getQueryString("back").indexOf('?')!='-1'){
            window.location.href = getQueryString("back")+'&token='+res.token;
        }else{
            window.location.href = getQueryString("back")+'?token='+res.token;
        }
        return;
    };
    if (SERVERPATH) {
        if(loginSource) window.localStorage.setItem('loginSource', loginSource);
        if(typeof(loginSuccessCallback)!='undefined') loginSuccessCallback();
        $("#recharge").show();
        $("#development").show();
        $("#modelSer").show();
        loginSource = '';
    }
}
if (SERVERPATH) checkHelpLogin(flag);

//显示签到页
var signinData;
function showSigninPage(flag){
    var openid = getCookie("openid");
    if (!openid) {
        // loginSource = 'modelServer'/*  */
        loginwindowon();
        clearAllCookie();
        // window.location.href = document.location.origin;
    }else{
        $.ajax({
            url:'/api/signin',
            type: 'post',
            async:false,
            data:{
                sign:0
            },
            success: function (data) {
                if(data.code == 200){
                    signinData = data.msg;
                    signinData.from = flag;
                }
            }
        })
        if(flag=="from_login" && signinData.todaySign) return;
        $.ajax({
            url: '/guide/dialog/signin.html',
            dataType: 'html',
            success: function (htmlData) {
                $(".bg-upload").show();
                $(".signinBox").append($(htmlData)).show();;
            }
        })
    }
}

//vip功能校验
function checkUserAuth(type){
    var checkData = false;
    $.ajax({
        url: '/api/getUserAuth'+(type?"?type="+type:""),
        type: 'get',
        async: false,
        success: function(data){
            if(data && data.code && data.code == 200){
                checkData = true;
            }
        }
    })
    return checkData;
}
function reloadHeader() {
    if(typeof(querySketchUser)=='function') {
        querySketchUser();
    }
    if(typeof(WSVDCLoginJudge)=='function'&&(getQueryString("m")=='wisdomScenarioVDC'||location.pathname.split('/').pop()=='wisdomScenarioVDC')) {
        WSVDCLoginJudge();
    }
}
$(function(){
    iswisdomScenarioVDC = window.location.href.indexOf('wisdomScenarioVDC'); 
    issample = window.location.href.indexOf('sample');
    if(iswisdomScenarioVDC == -1 && issample == -1){
        // var _localStorage = window.localStorage;
        // if(!_localStorage){
        //     return false;
        // }
        // getPopUp()
        // showQuestionnairePage()
    }
})
// 弹窗页面
function showQuestionnairePage(){
    return;
    let localData = window.localStorage.getItem("keyPopUp")
    console.log(localData)
    let localDataObj = JSON.parse(localData);
    // 判断检测有localStorage
    if(!localDataObj || localDataObj.versionNo == "Questionnaire"){
        $.ajax({
            // url: window.location.protocol+'//www.thingjs.com/guide/dialog/questionnaire.html',
            url: 'http://192.168.10.48/guide/dialog/questionnaire.html',
            dataType: 'html',
            success: function (htmlData) {
                if($('.introjs-overlay:visible').length) $('.introjs-exitbutton').trigger('click');
                $(".bg-upload").show();
                $(".questionnaire").show();
                $(".questionnaire_content").show();
                $("body").append($(htmlData))
            }
        })
        setPopUp('Questionnaire')
        var exp = new Date().setTime(setTamp());
        window.localStorage.setItem("keyPopUpto", JSON.stringify({time: exp}));
    }
}
// 通过改变localStorage的value值来判断当天是否还要弹出
const setPopUp = (valuePopUP) => {
    window.localStorage.setItem("keyPopUp", JSON.stringify({ versionNo: valuePopUP}));
};
// 对比时间，判断数据是否过期
const getPopUp = () => {
    const localData = window.localStorage.getItem("keyPopUpto");
    if(localData) {
        const localDataObj = JSON.parse(localData);
        const nowTime = new Date().getTime();
        if (nowTime > localDataObj.time) {
            console.log("数据已过期");
            //删除
            window.localStorage.removeItem("keyPopUp");
            return false;
        }
    }
};