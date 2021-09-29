/*
 * @Description: In User Settings Edit
 * @Author: uinnova
 * @Date: 2019-08-28 16:42:26
 * @LastEditTime: 2021-07-23 20:32:16
 * @LastEditors: Please set LastEditors
 */
var menudic = {
    'main': './html/mainNew.html', //0
    'thingjsPlatform': './html/thingjsPlatform.html',
    'tutorial': './html/tutorial.html',
    'sample': 'html/sample_test.html',
    'help': './html/help.html',
    'price': './html/priceNew.html',
    'store': './html/store.html',
    'store2': './html/store2.html',
    'storeD': './html/storeDetails.html',
    'campus': './html/campus.html',
    'city': './html/city.html',
    'chart': './html/chart.html',
    'pano': './html/pano.html',
    'speedcity': './html/speedcity.html',
    'speedcityshow': './html/speedcityshow.html',
    'speedCityDetailPages': './html/speedCityDetailPages.html',
    'mod': './html/mod.html',
    'safety': './html/safety.html',
    'building': './html/building.html',
    'fire': './html/fire.html',
    'archive': './html/archive.html',
    'granary': './html/granary.html',
    'port': './html/port.html',
    'aboutUs': './html/aboutUs.html',
    'course': './html/courseIframe.html',
    'partners': './html/partners.html',
    'particle': './html/particle.html',
    'signupentry': './html/signUpEntry.html',
    'wisdomScenarioVDC': './html/wisdomScenarioVDC/wisdomScenarioVDC.html',
    'builderPro': './html/builderPro.html',
    'thingjsvideo': './html/thingjsvideo.html',
    'ex':'./html/ex.html',
	'modelDetail':'./html/modelDetail.html'
};
var menutitle = {
    'main': 'ThingJS - 物联网3D可视化开发平台 - 数字孪生可视化平台', //0
    'thingjsPlatform': 'ThingJS平台 - 面向物联网的3D可视化开发平台，快速开发数字孪生可视化应用 - ThingJS',
    'tutorial': 'ThingJS - 物联网3D可视化PaaS平台',
    'sample': 'ThingJS - 在线开发',
    'help': 'ThingJS - 物联网3D可视化PaaS平台',
    'price': '产品和服务 - ThingJS',
    'store': 'ThingJS应用商店，专业数字孪生项目开发软件商店 - ThingJS',
    'storeD': 'ThingJS - 物联网3D可视化PaaS平台',
    'campus': 'CampusBuilder - 简单好用的3D场景搭建工具，0基础制作三维场景 - ThingJS',
    'city': 'CityBuilder - 聚焦城市的三维地图搭建工具，快速生成3D城市模型 - ThingJS',
    'chart': 'ThingJS - ChartBuilder',
    'pano': 'ThingJS - ThingPano',
    'speedcity': '三维智慧城市应用 快速应用智慧3D城市 - ThingJS',
    'speedcityshow': '一键城市 - 快速生成三维城市模型场景，开发智慧城市应用 - ThingJS',
    'mod': 'ThingDepot - 专业3D模型网站，拥有上万种3D模型，涵盖数十个行业 - ThingJS',
    'safety': 'ThingJS - 安防管理',
    'building': 'ThingJS - 智慧建筑',
    'fire': 'ThingJS - 智慧消防',
    'archive': 'ThingJS - 档案管理',
    'granary': 'ThingJS - 智慧仓储',
    'port': 'ThingJS - 数字港口',
    'aboutUs': 'ThingJS - 关于我们',
    'course': 'ThingJS - 物联网3D可视化PaaS平台',
    'partners': 'ThingJS - 合作伙伴',
    'signupentry': '物联网可视化开发师职业认证 - 物联网3D可视化领域新职业 - ThingJS',
    'wisdomScenarioVDC': '数字孪生智慧场景开发大赛 - ThingJS',
    'thingjsvideo': 'ThingJS教程（2020版） - ThingJS',
    'builderPro': 'BuilderPro - 更专业的3D地图场景搭建工具，在线编辑更多彩的三维地图 - ThingJS'
};
var menuKeywords = {
    'main': '物联网,三维,可视化,数字孪生,数字孪生城市,智慧城市,智慧校园,智慧社区,智慧生活,智慧园区解决方案,智慧党建,智慧交通,智慧水务,智慧医院',
    'platform': '数字孪生,物联网,三维,可视化,数字孪生,数字孪生城市,智慧城市,智慧园区,3D建模,3D场景,三维场景',
    'campus': '数字孪生,三维场景,3D场景,物联网,智慧社区,智慧校园,智慧园区,智慧生活,智慧党建,智慧医院,智慧水务,智慧楼宇,智慧安防',
    'price':'ThingJS,物联网,数字孪生,开发者,部署,建模,开发服务,套餐组合',
    'city': '数字孪生城市,三维地图,3D地图,3D城市,智慧城市,智慧农业,能源管理,公安应用,智慧交通,geojson',
    'mod': '3D模型,模型网站,3D建模,3D人物模型,3D人体模型,3D场景,3D城市,数字孪生',
    'store': '应用商店,软件商店,三维,可视化,数字孪生,3D城市,城市模型,物联网',
    'speedcity': 'ThingJS三维智慧城市应用原生支持智慧社区、智慧交通、智慧安防、智慧消防、智慧教育、智慧医疗等10余个行业。交互好、图表全、特效丰富，仅需数据对接即可部署应用。',
    'speedcityshow': '智慧城市,3D城市应用,智慧城市大屏应用,3D地图,智慧城市系统,智慧城市产品,智慧城市运营,智慧城市展示,智能城市,城市三维模型',
    'signupentry': '物联网3D可视化,数字孪生开发,智慧城市开发,智慧园区开发,3D城市开发,3D园区开发',
    'wisdomScenarioVDC': '数字孪生,开发者大赛,3D场景,优锘科技,ThingJS,智慧园区,智慧城市,智慧楼宇'
};
var menuDescription = {
    'main': 'ThingJS物联网三维可视化开发平台，拥有自主研发数字孪生技术，用户借助平台已开发智慧城市、智慧社区、智慧校园、智慧园区、智慧党建、智慧农业、能源管理、公安应用、智慧交通等多种三维可视化解决方案。',
    'platform': 'ThingJS物联网三维可视化开发平台旗下开发工具，遵循WebGL协议，基于JavaScript技术开发。可在3D建模场景基础上，开发智慧城市、智慧园区类型数字孪生项目应用。',
    'campus': 'ThingJS物联网三维可视化开发平台旗下园区级3D场景搭建工具，可快速搭建物联3D场景，用于开发智慧社区、智慧校园、智慧园区等数字孪生可视化解决方案。',
    'price':'ThingJS平台提供包含商业开发者授权、部署授权、建模服务、开发服务在内的多种授权和服务，可根据具体数字孪生业务需要自由搭配套餐组合。',
    'city': 'ThingJS物联网三维可视化开发平台旗下城市级3D场景搭建工具，可快速生成三维地图，用于开发数字孪生城市、智慧城市、智慧农业、能源管理、公安应用、智慧交通等三维可视化解决方案。',
    'mod': 'ThingDepot是ThingJS旗下3D模型网站，面向3D建模师，提供上万种3D模型，可用于CampusBuilder、CityBuilder中轻松搭建数字孪生三维场景。',
    'store': 'ThingJS应用商店，专业数字孪生项目开发软件商店，为客户提供应有尽有的三维可视化开发软件。',
    'speedcity': '智慧城市,3D城市,三维城市,数字城市,智慧城市疫情,智慧城市方案,智慧交通,智慧安防,智慧社区,智慧商业,智慧能源,智慧旅游,数字孪生城市,数字孪生城市案例,数字孪生城市应用',
    'speedcityshow': 'ThingJS 3D城市应用，具有完整3D城市数据，全套3D程序源码，仅需数据对接，即可构建3D智慧城市应用、数字孪生城市应用',
    'signupentry': '面向物联网3D可视化领域的开发工程师认证，由中关村物联网产业联盟和北京优锘科技有限公司联合推出。具备成熟前端开发经验即可参加认证，通过认证即认为具备物联网3D可视化开发能力。',
    'wisdomScenarioVDC': '优锘科技ThingJS数字孪生场景开发大赛，在中国工业互联网研究院 、中关村物联网联盟指导下开展。活动主要面向物联网行业从业者及爱好者，提交3D场景作品即可参加活动评选。'
};
// const ModelUrl = "http://47.93.81.139:3000"
// const ModelServer = "http://modeldepot.3dmomoda.com:3000"
const ModelServer = "https://store.thingjs.com:3000"
// const ModelServer="http://127.0.0.1:3000"
// const ModelServer="http://model.3dmomoda.cn/support/api"
// const MaxUrl = 'http://47.93.81.139:9115';
const MaxUrl = 'https://www.thingjs.com/3dmodel/api';
const Modelfilter = ['已购买的模型', '已上传的模型', 'CB上传的模型', 'Skfb'];
var sketchfabModel = [];
var ObjModel = [],
    BuyModel = [];
var app_code = null;
var js_nums;
var scene_nums;
const FILEUPL_FAIL = " \\\/:*?\"<>|'#@%&$";
const SCENE_TYPE = ['.zip', '.tjs'];
const UPLOAD_TYPE = ['.html', '.javascript', '.js', '.css', '.json', '.icon', '.jpg', '.png', '.gif', '.jpeg', '.woff', '.ttf', '.gltf', '.rvt', '.ifc', '.mp3','.srt','.ass','.otf','.woff2','.eot','.geojson'];
const CANEDIT_TYPE = ['html', 'javascript', 'css', 'json', 'js', 'cht', 'map', 'cps'];
const TEXTURE_TYPE = ['.jpg', '.png', '.jpeg'];
const MUSIC_TYPE = ['.mp3', '.wav', '.ogg'];
const FILEUPLOADPATTEN = new RegExp('[' + FILEUPL_FAIL + ']', "m");
const myscenePageSize = 8;
const sceneNameLength = 128; // 上传场景文件名长度限制
var sampleType;
var ORIGINOPENID;
var sampleTimeout;

function onMenu(n, url, menu) {
    if(location.href.indexOf('www.thingjs.com/thingjs-x')!=-1) {
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
        return;
    }
    if($('#sub-site-nav .nav-link[data-name='+n+']')){
        $('#sub-site-nav .pingtaiyuyingyong').removeClass("nav-barTwo");
        $('#sub-site-nav .nav-link[data-name='+n+']').addClass("nav-bar").siblings().removeClass("nav-bar");
    }
    if(n == 'campus' 
        || n == 'city' 
        || n == 'mod' 
        || n == 'building' 
        || n == 'fire' 
        || n == 'safety' 
        || n == 'port' 
        || n == 'granary'
    ){
        $('#sub-site-nav .pingtaiyuyingyong').addClass("nav-barTwo").siblings()
    }else if(n == 'thingjsPlatform' || n == 'pano'){
        $('#sub-site-nav .pingtaiyuyingyong').addClass("nav-barThree").siblings()
    }
    
    if (window.location.pathname == '/admin/') return;
    if (!menudic[n]&&window.location.search!='') {
        console.error('参数错误');
        return;
    }
    // if(n.indexOf("speedpro-")==0){
    //     menudic[n] = './html/speedCityDetailPages/'+n.split("-")[1];
    // }else{
    //     if (!menudic[n]) {
    //         console.error('参数错误');
    //         return;
    //     }
    // }
    if (n === 'sample' || n === 'wisdomScenarioVDC') {
        $('.navHeader.slide-bottom.fix').remove();
    }
    if (n === 'sample' && window.location.search.indexOf('?m=sample') < 0) {
        window.open(window.location.protocol + "//" + window.location.host + '/guide/?m=sample');
    }
    if(window.location.search!='') {
        $('#THINGJSTITLE').text(menutitle[n]);
        if (menuKeywords[n]) {
            $('meta[name=keywords]').attr('content', menuKeywords[n]);
        } else {
            $('meta[name=keywords]').attr('content', menuKeywords['main']);
        }
        if (menuDescription[n]) {
            $('meta[name=description]').attr('content', menuDescription[n]);
        } else {
            $('meta[name=description]').attr('content', menuDescription['main']);
        }
    }
    // init JS-SDK (after title change)
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
    if(location.pathname!='/guide/'&&location.search=='') {
        if ($('footer').length == 1 && n !== 'wisdomScenarioVDC') {
            $.ajax({
                url: '/guide/html/footer.html',
                type: "GET",
                dataType: "html",
                success: function (d) {
                    var dcvRole = getCookie("dcvRole");
                    if (dcvRole == 'true') {
                        var d1 = d.replace(/style="display:none;"/, '');
                        $('footer')[0].innerHTML = d1;
                    } else {
                        $('footer')[0].innerHTML = d;
                    }
                }
            });
        }
    } else {
        $.ajax({
            url: menudic[n],
            type: 'get',
            dataType: 'html',
            success: function (htmlData) {
                $('#content').html(htmlData);
                if (url) {
                    var m = '#sample_01_Hello';
                    if (menu) m = menu;
                    if (menu == 1) {
                        manageSample(m, url);
                    } else {
                        manageSample($(m), url);
                    }
                }
                //添加页脚
                // n !== 'wisdomScenarioVDC'是在那个页面不插入footer
                if ($('footer').length == 1 && n !== 'wisdomScenarioVDC') {
                    $.ajax({
                        url: '/guide/html/footer.html',
                        type: "GET",
                        dataType: "html",
                        success: function (d) {
                            var dcvRole = getCookie("dcvRole");
                            if (dcvRole == 'true') {
                                var d1 = d.replace(/style="display:none;"/, '');
                                $('footer')[0].innerHTML = d1;
                            } else {
                                $('footer')[0].innerHTML = d;
                            }
                        }
                    });
                }
            }
        });
    }
    

    var aObj = $('.navbar-nav').find('.nav-link');
    // for (var i = 0; i < aObj.length; i++) {
    //     if (n == aObj[i].getAttribute('data-act')) {
    //         $(aObj[i]).addClass('active');
    //         $(aObj[i]).parent("li").parent("ul").parent(".nav-menu").find('.nav-link').first().addClass('active');
    //     } else {
    //         $(aObj[i]).removeClass('active');
    //     }
    // }
    if ((getCookie("openid") == null || getCookie("openid") == '') && (getQueryString("login") == '1' || getQueryString("login") == 't')) {
        loginwindowon();
    }
    if (getQueryString("login") == 'o') {
        clearAllCookie();
        indexlogininit();
    }
    if (getQueryString("login") == '2') {
        loginwindowon(null, "2");
    }
    if (getQueryString("login") == '3') {
        loginwindowon(null, "3");
    }
    // if(getQueryString("trigger")=="help"){
    //     checkLogin()
    // }
}

var path = window.location.protocol + "//" + window.location.host;

function getUserPath() {
    var filename = $('#bfilen').data('nameBefore');
    if (userpath) {
        var datapushpath = userpath + "/" + filename + ".json";
    } else {
        var datapushpath = "../examples/js/" + filename + ".json";
    }
    return datapushpath;
}
var isLoginOther = false;
var isALert = false;

// function changeAutoPlayFlag(string) {
//     if (string == 'end') {
//         //console.log(swiper + 'show swiper');
//         swiper.navigation.$nextEl.css('display', 'block');
//         swiper.navigation.$prevEl.css('display', 'block');
//         swiper.autoplay.stop();
//        // console.log('swiper.autoplay.stop()----')
//     } else {
//         swiper.navigation.$nextEl.css('display', 'none');
//         swiper.navigation.$prevEl.css('display', 'none');
//         swiper.autoplay.start();
//        // console.log('swiper.autoplay.start()--------')
//     }
// }

/**
 *为指引功能增加判断
 */
// 成为开发者
var subject;
window.alert = function (msg, type, msgType, title) {
    try{
        if($(str).length) if($(msg).text().split('').pop() != '！') msg += '！';
    } catch (e) {
        if (msg.split('').pop() != '！') msg += '！'
    }
    if (type == undefined) {
        type = 'info'
    }
    if (type == 'success') {
        newAlert(msg, type, null, null, 'false');
    } else if (type == 'sucsure') {
        newAlert(msg, 'success');
    } else if (type == 'error' && msg == '登录已过期，请重新登录！') {
        newAlert(msg, type);
    } else {
        newAlert(msg, type);
    }
    if (msgType == 'code') {
        swal({
            // position: 'top',
            title: title ? title : "请复制授权码",
            html: title ? $('<textarea>').addClass('swal2-textarea swal2-json').html(msg) : $('<textarea>').addClass('swal2-textarea').html(msg),
            confirmButtonText: '复制',
            showConfirmButton: true
        }).then(function (value) {
            if (value.value) {
                var code = $('.swal2-textarea');
                code.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                newAlert('复制成功！', 'success', null, null, 'false');
            }
        })
        $('.swal2-container').addClass('newalert').find('.swal2-content').css({
            'width': 400
        });
    }
    if (msgType == 'renewal') {
        swal({
            // position: 'top',
            type: 'error',
            title: msg,
            confirmButtonText: '确定',
            showConfirmButton: true
        }).then(function (value) {
            if (value) {
                window.close();
            }
        });
        $('.swal2-container').addClass('newalert');
    }
}

function randomWord(randomFlag, min, max) {
    //var feed = Math.random();
    var feed = 0.5;
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    if (randomFlag) {
        range = Math.round(feed * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        pos = Math.round(feed * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}
//获取hashcode
function gethashcode() {
    //定义一个时间戳，计算与1970年相差的毫秒数  用来获得唯一时间
    var timestamp = (new Date()).valueOf();
    var myRandom = randomWord(false, 6);
    var hashcode = hashCode(myRandom + timestamp.toString());
    return hashcode;
}

function getNum(num) {
    var price = String(num);
    if (price.length > 3) {
        var arr = price.split('');
        arr = arr.reverse();
        arr.splice(3, 0, ',');
        arr = arr.reverse();
        price = arr.join('');
    }
    return price;
}

// 版本下载
/** 新增判断，当用户处于指引状态下，屏蔽退出按钮 */
function closeDwn() {
    if (document.getElementById("startTeach")&&document.getElementById("startTeach").style.color == 'red') {} else {
        $(".DwnSel").hide()
        $(".shadowPage").hide()
        $(".toolContainer").hide()
    }
}

function showDwn() {
    var openid = getCookie("openid");
    if (!openid) {
        clearAllCookie();
        loginwindowon();
    }else{
        //新增点击下载CampusBuilder触发的事件
        if (document.getElementById("startTeach")&&document.getElementById("startTeach").style.color == 'red') {
            setTimeout('introThree_addThree()', 300);
        }
        $(".shadowPage").show()
        $(".toolContainer").show()
        $(".DwnSel").show()
        $.ajax({
            url: "https://www.thingjs.com/static/CampusBuilder/index.json",
            type: "get",
            dataType: "json",
            success: function (data) {
                $('#client_version').text(data.版本号);
                $('#client_size').text(data.文件大小);
                $('#client_time').text(data.更新时间);
                $('#client_md5').text(data.MD5);
                $('#client_64').attr('onclick', "javascript:void(location.href='" + data['64位下载'] + "');");
                $('#client_2020').attr('onclick', "javascript:void(location.href='" + data['2020版本下载'] + "');");
                // $('#client_32').attr('onclick', "javascript:void(location.href='" + data['32位下载'] + "');");
                $('#client_ten').attr('onclick', "javascript:void(window.open('" + data['腾讯微云'] + "'));");
                // $('#client_over').attr('onclick', "javascript:void(window.open('" + data['海外网盘'] + "'));");
                // $('#client_baidu').attr('onclick', "javascript:void(window.open('" + data['百度网盘'] + "'));");
            }
        })
    }
}
// 创建项目
$(".creProduct .content .tab").on("click", "span", function () {
    $(".creProduct .content .tab span").not($(this)).removeClass("active");
    $(".creProduct .content .Productlist .ProductMain").not($(".creProduct .content .Productlist .ProductMain").eq($(this).index())).hide();
    $(this).addClass("active")
    $(".creProduct .content .Productlist .ProductMain").eq($(this).index()).css({
        "display": "flex"
    });
})
// 关闭项目面板
function pannelClose() {
    $(".creProduct,.pay-mb").hide();
}
// 显示项目面板
function pannelShow() {
    $(".creProduct,.pay-mb").show();
}
// 列表选择
function CreProductList(url, insertTo, type) {
    if (type) {
        $('.creProduct .title h6').html('快速搭建');
        $('.self_cre,.demoList,.officialList').hide();
        $('.thingcb').show();
    } else {
        $('.thingcb').hide();
        $('.creProduct .title h6').html('新建项目');
        $('.self_cre,.demoList,.officialList').show();
    }
    var uname = getUserName('name');
    if (url == '/api/scenefiles' && !uname) {
        createScene([], url, insertTo);
        return;
    }
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.fileAllMenu) data = data.fileAllMenu;
            createScene({
                list: data,
                type: type
            }, url, insertTo, type);
        },
        error: function () {
            createScene([], url, insertTo, type);
        }
    })
}
/*  上传场景开始 */
var myscenelist = [];
var xhrOnProgress = function (fun) {
    xhrOnProgress.onprogress = fun;
    return function () {
        var xhr = $.ajaxSettings.xhr();
        if (typeof xhrOnProgress.onprogress !== 'function') return xhr;
        if (xhrOnProgress.onprogress && xhr.upload) {
            xhr.upload.onprogress = xhrOnProgress.onprogress;
        }
        return xhr;
    }
}

function createScene(data, url, insertTo, type) {
    data.baseUrl = path;
    if (url == './demo.json' || url == '../../guide/demo.json') {
        var html = template('product-demo', data);
    } else if (url == '/api/scenefiles') {
        myscenelist = [];
        if (data.list) myscenelist = data.list;
        // console.log(data);
        var html = template('self_cre', data);
    } else if (url == './scenes.json' || url == '../../guide/scenes.json') {
        var html = template('product-offcial', data);
    } else {
        var html = template('thing_cb', data);
    }
    $(insertTo).html(html);
    if (type != 'cb') {
        if (myscenelist.length >= myscenePageSize) {
            $(".creProduct .content .Productlist .ProductMain").find(".officialList,.demoList").hide();
        } else {
            $(".creProduct .content .Productlist .ProductMain").find(".officialList,.demoList").show();
        }
    }
}

function newResourseFileList(filename, fileurl, dirEle, time) {
    var li = document.createElement('li');
    li.className = 'lifile';
    $(li).attr('data-name', filename);
    $(li).attr('data-url', fileurl);
    $(li).attr('style', 'text-indent: 11%');
    String.prototype.sub = function (n) {
        var r = /[^\x00-\xff]/g;
        if (this.replace(r, "mm").length <= n) return this;
        var m = Math.floor(n / 2);
        for (var i = m; i < this.length; i++) {
            if (this.substr(0, i).replace(r, "mm").length >= n) {
                return this.substr(0, i) + "...";
            }
        }
        return this;
    };
    var liText = $('<span class="_name" title=' + filename + '>' + filename.sub(12) + '</span>' + lifile_time(time));
    $(li).append(liText);
    dirEle.children('.pro_main').after(li);
    if (dirEle.parents('.lifile').length && !dirEle.parents('.lifile').find(".iconfont.icon-file").length) { //判断是否存在icon
        dirEle.parents('.lifile').addClass("lifileResoure");
        var iEle = '<i class="iconfont icon-file .active" title="展开项目资源"></i>'
        dirEle.parents('.lifile').prepend(iEle);
    }
    detailForBIMli($(li));
}
//新建资源文件
function newResourseFile(path, filename, dirEle, type) {
    var leaderid = getLeaderid();
    $.ajax({
        url: '/api/newResource',
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify({
            path: path,
            filename: filename,
            leaderid: leaderid
        }),
        cache: false,
        processData: false,
        contentType: false,
        success: function (result) {
            if (result.code == 200) {
                $(".add_file_li").remove();
                if (type) {
                    // newAlert('文件新建成功aa！', 'success', null, null, 'false');
                    $('.iconfont.icon-shuaxin').trigger('click');
                    openFile(path);
                    return;
                }
                newResourseFileList(filename, result.fileurl, dirEle, new Date());
                // newAlert('新建成功aa！', 'success', null, null, 'false')
            } else {
                newAlert(result.message + '!', 'error')
            }
        }
    })
}
// 上传场景和文件资源
function clickupload(para) {
    var fd = new FormData();
    if (!$('.sceneUpload #file')[0].files[0]) {
        newalert('请选择要上传的文件', 'warning');
        return;
    }

    var filename = $('.sceneUpload #file')[0].files[0].name;
    var resFileName = filename.split('.').slice(0, filename.split('.').length - 1).join('.');
    var postf = $('.sceneUpload #file')[0].files[0].type.split('/')[$('.sceneUpload #file')[0].files[0].type.split('/').length - 1].toLocaleLowerCase();
    var postn = $('.sceneUpload #file')[0].files[0].name.indexOf('.') > -1 ? $('.sceneUpload #file')[0].files[0].name.split('.')[$('.sceneUpload #file')[0].files[0].name.split('.').length - 1].toLocaleLowerCase() : '';
    var f = filename.substring(0, filename.lastIndexOf('.'));
    var ifOverRide = $('.bg-upload .bg-box .ifOverRide .input-radio .input-style-radio .input-r:first')[0].checked ? 1 : 0;
    var isURL = '/api/isfile';
    var filePath = '';
    var uploadURL = "/api/uploadfile";

    if (f.length > sceneNameLength) {
        alert("文件名不能超过" + sceneNameLength + "个字符", 'warning');
        return;
    }
    if (FILEUPLOADPATTEN.test(f)) {
        alert("文件名不能包含(" + FILEUPL_FAIL + "),请重新上传", 'warning')
        return;
    }

    //上传文件资源
    if ($('.sceneUpload .title-p').text() == '上传文件' || queryFileData.type == "上传文件") {
        var leaderid = getLeaderid();
        //在线开发处上传文件资源判断
        if (queryFileData) {
            //当前目录
            filePath = queryFileData.menuNow
        } else return;
        if (UPLOAD_TYPE.indexOf(postf) < 0 && UPLOAD_TYPE.indexOf(postn) < 0) {
            alert('格式错误，请重新上传', 'warning');
            return;
        }
        isURL = '/api/isResource'+(leaderid?'?leaderid='+leaderid:'');
        uploadURL = '/api/uploadResource?dir=' + filePath + "&leaderid=" + leaderid;
        //上传场景资源
    } else if ($('.sceneUpload .title-p').text() == '上传场景') {
        f = filename.substring(0, filename.lastIndexOf('.zip'));
        if (f == '') {
            f = filename.substring(0, filename.lastIndexOf('.tjs'));
            if (f == '') {
                alert("非zip或tjs格式文件不能上传", 'warning');
                return;
            }
        }
        var arr = [];
        if (para) {
            $.each(para.myscenelist, function (i, value) {
                if (value.name == f) {
                    arr.push(value)
                }
            })
        } else {
            $.each(myscenelist, function (i, value) {
                if (value.name == f) {
                    arr.push(value)
                }
            })
        }
        if (arr.length > 0 && !ifOverRide) {
            alert('该场景已存在，请重新选择文件上传', 'warning');
            return;
        }
    }

    $.ajax({
        url: isURL,
        type: 'POST',
        cache: false,
        processData: false,
        contentType: false,
        beforeSend: function (request) {
            if (typeof (queryFileData) !== 'undefined') {
                request.setRequestHeader('resfilename', encodeURI(queryFileData.menuNow + '/' + filename))
            } else {
                // if(!ifOverRide) {
                //     var maxNum=scene_nums||para.scene_nums;
                //     if (maxNum <= myscenelist.length) {
                //         alert("最多保存" + maxNum + "个场景文件", 'warning')
                //         bg_upload_close();
                //         return false;
                //     }
                // }
                request.setRequestHeader('resfilename', encodeURI(resFileName))
            }
            request.setRequestHeader('ifoverride', ifOverRide);
            request.setRequestHeader('filesize', $('.sceneUpload #file')[0].files[0].size)
        },
        success: function (data) {
            if (data.code == '200') {
                $(".son").css("width", "0%");
                $(".parent-dlg").show();
                fd.append('file', $('.sceneUpload #file')[0].files[0]);
                $.ajax({
                    url: uploadURL,
                    type: 'POST',
                    cache: false,
                    data: fd,
                    processData: false,
                    contentType: false,
                    xhr: xhrOnProgress(function (e) {
                        var per = Math.floor(100 * e.loaded / e.total);
                        $(".sceneUpload .son").css("width", per + "%");
                        if (per >= 100) {
                            $(".sceneUpload .parent-dlg").hide();
                        }
                    }),
                    success: function (data) {
                        if (data.code == '200' || data == 'ok') {
                            alert("上传成功", "success")
                            $('.sceneUpload').hide();
                            if (queryFileData.type == "上传文件") {
                                newResourseFileList(data.filename, data.fileurl, queryFileData.self);
                            } else if ($('.sceneUpload .title-p').text() == '上传文件' && $('.files-menu').length == 1) {
                                createFileMenu(filePath);
                                if ($('#list1 li[data-name="' + $('#bfilen').data('nameBefore') + '"]').length >= 1) {
                                    $('#list1 li[data-name="' + $('#bfilen').data('nameBefore') + '"]').remove();
                                }
                                myfilename.resourceDir.push($('#bfilen').data('nameBefore'));
                                addLiFile($('#bfilen').data('nameBefore'), $('#bfilen').data('url'), $('#bfilen').data('version'), $('#bfilen').data('isOpen'), $('#bfilen').data('isPro'), 1, $('#bfilen').data('time'))
                            }
                            if ($('.sceneUpload .title-p').text() == '上传场景') {
                                if ($('.btn-resource').hasClass('active')) {
                                    createMenuScene();
                                } else if (para) {
                                    para.mysceneinit();
                                    CreProductList('/api/scenefiles', '.self_cre');
                                } else {
                                    CreProductList('/api/scenefiles', '.self_cre');
                                }
                            }
                            return;
                        } else {
                            if (data.message) {
                                alert(data.message, 'warning');
                            } else alert(data);
                        }
                    }
                })
            } else {
                alert(data.message, 'warning');
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}

// 删除场景
function delScene(name, para, type) {
    var swal_con = function () {
        var swal_con_1 = function () {
            $.ajax({
                url: '/api/delscenefile',
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify({
                    file: name,
                    type: type
                }),
                cache: false,
                processData: false,
                contentType: false,
                success: function (result) {
                    if (result.code == 200) {
                        alert('删除成功！', 'success')
                        setTimeout(function () {
                            if (para) {
                                para.mysceneinit();
                            } else {
                                CreProductList('/api/scenefiles', '.self_cre');
                            }
                        }, 500);
                    } else {
                        alert('删除失败！', 'error')
                    }
                }
            })
        };
        newConfirm('确定删除该场景？', ['确定', '取消'], [swal_con_1, swal_can]);
    };
    var swal_can = function () {
        swal_close();
    };
    newConfirm('请确保该场景不在开发中？', ['确定', '取消'], [swal_con, swal_can]);
}
//设置面板
function setPanelModel(element, divName, title, bodyT, ifmove, diamin) {
    if (bodyT != 'keytip' && !isLogin('enter', 'openPanel')) return;
    var prePath = window.location.protocol + "//" + window.location.host;
    if (!element || element.hasClass('con_item')) {
        $('.setting0 .active,.setting1 .active').removeClass('active');
    } else if (element) {
        if (!element.hasClass('active')) {
            element.addClass('active');
            element.siblings().removeClass('active');
            element.siblings().children('span').removeClass('active');
            element.parent().siblings().removeClass('active');
            $('#moveclose-dialog_store').css({
                "right": "326px",
                "top": "0px",
                "left": ""
            });
        } else {
            element.removeClass('active');
            $(divName).html('');
            $('#moveclose-dialog_store').css({
                "right": "0px",
                "top": "0px",
                "left": ""
            });
            return;
        }
    }
    if (storeThumbState == false) {
        $(divName + "_store").html('');
    }

    if (!diamin) diamin = 29;
    var r = (Math.random().toLocaleString()) * 1000;
    var jpath = prePath + "/guide/dialog/" + bodyT + ".html" + '?n=' + r;
    if (bodyT == 'code' || bodyT == 'code1') jpath = prePath + "/guide/cn/code.html" + '?n=' + r;
    $.ajax({
        type: "GET",
        url: jpath,
        dataType: "html",
        async: false,
        success: function (bodyHtml) {
            $.ajax({
                type: "GET",
                url: prePath + "/guide/dialog/index.html",
                dataType: "html",
                async: false,
                success: function (data) {
                    $(divName).html(data);
                    $(divName + ' .panelTitle').text(title);
                    if (title == '园区' || title == '地图' || title == '粒子') $(divName + ' .panelIcon .icon-large').show();
                    $(divName + ' .panelIcon .icon-large').data('type', title);
                    if (bodyT == 'code1') {
                        bodyHtml = bodyHtml.replace('#content_section', '#content_section1');
                        bodyHtml = bodyHtml.replace('#web-context-menu-0', '#web-context-menu-1');
                    }
                    // 插入官方及个人分类
                    insertType();
                    $('#moveclose-dialog .panelModel .panelBody').html(bodyHtml);
                    if (element) {
                        $(divName + ' .panelHeader .close').on('click', function () {
                            element.removeClass('active');
                        })
                    }
                    if (ifmove) {
                        move($(divName), diamin);
                        if (bodyT == 'code' && getCookie("debugSwitch") == 0) {
                            $('#moveclose-dialog').css({
                                "right": "350px",
                                "top": "0px",
                                "left": ""
                            });
                        } else {
                            $('#moveclose-dialog').css({
                                "right": "0px",
                                "top": "0px",
                                "left": ""
                            });
                        }
                    }
                    $('#moveclose-dialog .panelModel').slideDown();
                }
            })
        }
    })
}
//设置面板
function setPanelModel_1(element, divName, title, bodyT, ifmove, diamin) {
    $(divName + " .thumb").removeClass("thumbHover");
    if (bodyT != 'keytip' && !isLogin('enter', 'openPanel')) return;
    var prePath = window.location.protocol + "//" + window.location.host;
    if (!element || element.hasClass('con_item')) {
        $('#moveclose-dialog_store .setting0 .active,#moveclose-dialog_store .setting1 .active').removeClass('active');
    } else if (element) {
        if (!element.hasClass('active')) {
            element.addClass('active');
        } else {
            element.removeClass('active');
            $(divName).html('');
            return;
        }
    }
    if (!diamin) diamin = 29;
    var r = (Math.random().toLocaleString()) * 1000;
    var jpath = prePath + "/guide/dialog/" + bodyT + ".html" + '?n=' + r;

    $.ajax({
        type: "GET",
        url: jpath,
        dataType: "html",
        async: false,
        success: function (bodyHtml) {
            $.ajax({
                type: "GET",
                url: prePath + "/guide/dialog/index.html",
                dataType: "html",
                async: false,
                success: function (data) {
                    $(divName).html(data);
                    $('#moveclose-dialog_store .panelTitle').text(title);

                    $('#moveclose-dialog_store .panelIcon .icon-large').data('type', title);
                    if (bodyT == 'code1') {
                        bodyHtml = bodyHtml.replace('#content_section', '#content_section1');
                        bodyHtml = bodyHtml.replace('#web-context-menu-0', '#web-context-menu-1');
                    }
                    $('#moveclose-dialog_store .panelBody').html(bodyHtml);
                    if (element) {
                        $('#moveclose-dialog_store .panelHeader .close').on('click', function () {
                            element.removeClass('active');
                        })
                    }
                    var movecloseDialog = $("#moveclose-dialog .panelModel").css("display");
                    var right = 0;
                    if (movecloseDialog == "block") {
                        right = $("#moveclose-dialog .panelModel").width() + 1;
                    }
                    if (ifmove) {
                        move($(divName), diamin);
                        if (bodyT == 'code' && getCookie("debugSwitch") == 0) {
                            $('#moveclose-dialog_store').css({
                                "right": right + "px",
                                "top": "0px",
                                "left": ""
                            });
                        } else {
                            $('#moveclose-dialog_store').css({
                                "right": right + "px",
                                "top": "0px",
                                "left": ""
                            });
                        }
                    }
                    $('#moveclose-dialog_store .panelModel').slideDown();
                }
            })
        }
    })
}

// 读取场景数和js应用数限制
function getMaxNum() {
    $.ajax({
        type: "GET",
        url: "/api/User_info",
        dataType: "json",
        async: false,
        success: function (data) {
            js_nums = data.js_nums;
            scene_nums = data.scene_nums;
        }
    })
}

// 生成代码块
function CreateCode(t, v, n) {
    if (isLoginOther) {
        loginOutTime();
    }
    if (!isLogin('enter', 'createCode')) return;
    if (window.location.pathname == '/admin/') {
        if (v == undefined) {
            var ref = 'i=0';
        } else if (v == 1) {
            var ref = 'c=' + n;
        } else if ($(t).parents(".self_cre").length) {
            var ref = 'i=' + v + '&sky=' + n;
        } else {
            var ref = 'i=' + v;
        }
        window.location.href = window.location.origin + "/guide/?m=sample&" + ref;
    } else {
        buildNew(t, v, n);
    }
}
// 新建项目
function buildNew(t, v, n, onOff) {
    if ($('.filen-active .filen-edit').is(":visible") && !onOff) {
        // ifLeaveThisPage($(t));
        newProject(t, v, n);
        return;
    }
    $('#bfilen').text('Untitled.js').attr('type', 'new');
    if (getQueryString('m') !== 'sample_old') setUrl(null, []);
    monacoModel.setValue('');
    monaco.editor.setModelLanguage(monacoModel, 'javascript');
    if (v == undefined) {
        monacoModel.setValue('');
    } else if (v && v == 1) {
        var url = '../../../demos/' + n + '/js/' + n + '.js';
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'text',
            async: false,
            success: function (data) {
                monacoModel.setValue(data);
            }
        })
        //monacoModel.setValue('');
    } else if (v && v == 2) {
        var latestVersion = getLatestUearthVersion();
        app_code = `var app = new THING.App();
// 设置app背景为黑色
app.background = [0, 0, 0];
// 引用地图组件脚本
THING.Utils.dynamicLoad(["https://www.thingjs.com/uearth/history/` + latestVersion + `"], function () {
    app.create({
        type: "Map",
        url: "https://www.thingjs.com/citybuilder_console/` + n + `",
        complete: function (event) {
            console.log(event.object.userLayers.length);
        }
    });
});`
        monacoModel.setValue(app_code);
    } else {
        app_code = '\/\/加载场景代码\nvar app = new THING.App({ \n    \/\/ 场景地址\n    "url": "' +
            encodeURI(v) + '",\n    \/\/背景设置\n    "skyBox" :"' + n + '"\n});';
        monacoModel.setValue(app_code);
    }
    $('.filen').show();
    if ($('#bfilen').attr('type') != 'new') $('.filen-active .filen-edit').show();
    $('#gf').hide();
    $('.lifile').removeClass('active');
    $('.lifile .pro_main.main_file').removeClass('main_file');
    $('.setting2 .filen-close').remove();
    $('.wrapper-sam .content .editor').css({
        'height': 'calc(100% - 96px)',
        'top': '60px'
    });
    $('.wrapper-sam .content .content-middle .editor-setting').css({
        'height': '60px'
    });
    $('.filen').addClass('filen-active');
    closeMyFile();
    namebefore = '';
    clearInterval(setId);
    autosave();
    pannelClose();
    tab_change(1);
    reloadIframe();
    moveLiFile();
    typeinit('new');
}
// 跳转至在线搭建
function jumpcb(type, param) {
    if ($.cookie("token") == '' || $.cookie("token") == undefined) {
        loginwindowon();
        return;
    } else {
        if (type) {
            var openurl=window.location.origin + '/cb/'+param;
        } else {
            var openurl=window.location.origin + '/cb';
        }
        var f1=function(){
            window.open(openurl);
            swal_close();
        };
        newConfirm('是否确认通过CampusBuilder Online编辑器创建场景？<br/><br/><div>注：通过CampusBuilder Online编辑器创建场景，不会改变手动上传和自动同步的场景</div>', ['确认', '取消'], [f1, swal_close]);
       
    }

}
// 日期比较
function datedaxiao(t1, t2) {
    var strs1 = new Array(); //定义一数组
    strs1 = t1.split("-"); //字符分割
    var strs2 = new Array(); //定义一数组
    strs2 = t2.split("-"); //字符分割
    if (strs1[0] > strs2[0]) {
        return false;
    } else if (strs1[0] < strs2[0]) {
        return true;
    }
    if (strs1[1] > strs2[1]) {
        return false;
    } else if (strs1[1] < strs2[1]) {
        return true;
    }
    if (strs1[2] > strs2[2]) {
        return false;
    } else if (strs1[2] < strs2[2]) {
        return true;
    }
    return true;
}

//埋点
function _hmt_maidian(a, b, c) {
    var addrIf = window.location.host;
    if (addrIf == '127.0.0.1') return;
    _hmt.push(['_trackEvent', a, b, c]);
}
var storage = window.localStorage;
var flag = storage.flag;

/* 获取用户名信息 */
function getUserInfo() {
    var data = {};
    var token = 'Bearer ' + getCookie('accessToken');
    var f = getCookie('accessToken');
    // console.log(f)
    if (f == null) {
        return;
    } else {
        $.ajax({
            url: 'https://www.thingjs.com/uinapi/user/loginUserInfo',
            type: 'get',
            dataType: 'json',
            async: false,
            headers: {
                'Authorization': token
            },
            success: function (res) {
                //console.log(res.data);
                if (res.status == '0') {
                    data = res.data;

                }
            }
        });
        return data;
    }


}

// 判断是否为登陆状态
function isLogin(type, openType) {
    var openArr = ['openPanel', 'newOneFile', 'updataPro', 'showreleaseProject', 'loadIframe'];
    // console.log(type,openType)
    if (getCookie('role') == 'admin' || getCookie('role') == 'operation') return;
    var login;
    var uname = getUserName('name');
    if (type) {
        sampleType = type;
    } else {
        sampleType = '';
    }
    if (!uname) {
        clearAllCookie();
        if (type) loginwindowon();
        return false;
    }
    if (!getCookie('token')) {
        clearAllCookie();
        if (type) loginwindowon();
        return false;
    }
    var time = new Date().Format('yyyy-MM-dd');
    if (loginTime && loginTime != time) {
        clearAllCookie();
        if (type) loginwindowon();
        return false;
    }
    if (type && type !== 'tab_change') {
        if (isLoginOther) {
            if (getQueryString('m') == 'sample') {
                if (!isALert || openArr.indexOf(openType) != -1 || type == 'save') {
                    loginOutTime();
                }
            } else {
                loginOutTime();
            }
        } else if (getQueryString('m') == 'sample') {
            if (!isLoginOther) {
                if (type == 'load' || type == 'change' || type == 'save' || openType && type) {
                    $.ajax({
                        url: SERVERPATH + "/api/User_info",
                        type: "GET",
                        processData: false,
                        contentType: false,
                        async: false,
                        success: function (result) {
                            if (result == '用户不存在') {
                                console.log(result);
                            } else {
                                if (new Date(result.lastlogin).Format('yyyy-MM-dd') == time && result.permission == getCookie('role')) {
                                    if (result.token != getCookie('token')) {
                                        if(getQueryString('m') == 'sample') {
                                            isLoginOther = false;
                                            loginOutTime(1);
                                            isALert = false;
                                        } else {
                                            loginOutTime();
                                            isLoginOther = true;
                                        }
                                    } else {
                                        isLoginOther = false;
                                        loginOutTime(1);
                                        isALert = false;
                                    }
                                }
                            }
                        },
                        error: function (result) {
                            console.log(result);
                        }
                    });
                }
            }
        }
        return true;
    }
    $.ajax({
        url: SERVERPATH + "/api/User_info",
        type: "GET",
        processData: false,
        contentType: false,
        async: false,
        success: function (result) {
            if (result == '用户不存在') {
                clearAllCookie();
                loginwindowon();
                login = false;
            } else {
                if (new Date(result.lastlogin).Format('yyyy-MM-dd') == time && result.permission == getCookie('role')) {
                    if (result.token != getCookie('token')) {
                        loginTime = time;
                        isLoginOther = true;
                        if (getQueryString('m') == 'sample' && !isALert) {
                            // loginOutTime();
                            // isALert=true;
                        } else if (getQueryString('m') != 'sample') {
                            loginOutTime();
                        }
                    } else {
                        isLoginOther = false;
                        isALert = false;
                    }
                    jsnums = result.js_nums;
                    login = true;
                    loginTime = time;

                } else {
                    clearAllCookie();
                    newAlert('登录已过期，请重新登录！', 'error');
                    login = false;
                }
            }
        },
        error: function (result) {
            console.log(result);
            clearAllCookie();
            loginwindowon();
            login = false;
        }
    });
    return login;
}
// 检查用户是否登陆-全景图
function returnPano() {
    if ($.cookie("token") == '' || $.cookie("token") == undefined) {
        loginwindowon();
        return;
    } else {
        window.open(window.location.origin + '/guide/?m=sample', '园区-全景图');
        //    window.location.href=window.location.origin+'/'+'admin/#/myScene?m=pano';
    }
}
// 获取3dMax上传的模型
function get3dMaxModel(keyword, stypeName, target, i, id, server, bigType) {
    var storage = window.localStorage;
    var loadSwitch = true;
    var mmdId = getCookie('mmdId');
    // var mmdId='13252';
    var keyword = ('' || keyword).trim();
    var MyModel = [];
    var arr = [];
    if (storage && storage[mmdId]) {
        personalModel = JSON.parse(storage[mmdId]);
        loadSwitch = false;
        loadModelList(stypeName, target, i, id, server, bigType, personalModel);
    }
    if (mmdId) {
        if ($.cookie('role') == 'developer') getSketchModelsForUser(mmdId);
        getPersonBuyModels(mmdId);
        getPersonOBJ(mmdId);
        $.ajax({
            url: MaxUrl + '/model/getMylibJSON3/' + mmdId,
            // url:' http://192.168.10.24:8080/api/model/getMylibJSON3/'+mmdId,
            type: 'get',
            dataType: "json",
            async: true,
            success: function (data) {
                var newarr = data.custom;
                var SELID;
                var item1 = newarr.find(({
                    id
                }) => -1 === id);
                var item2 = newarr.find(({
                    id,
                    title
                }) => {
                    if (title == '已上传的模型' && id != -1) {
                        SELID = id;
                    }
                });
                var item = [];
                if (item1) {
                    item = item1.children;
                }
                if (item2) {
                    item = item.concat(item2.children);
                }
                MyModel = newarr.filter(v => {
                    if (Modelfilter.indexOf(v.title) >= 0 && v.id != SELID) {
                        if (v.id == 0) v.children = BuyModel;
                        if (v.id == -1) v.children = item;
                        if (v.id == -5) v.children = ObjModel;
                        if (Array.isArray(v.children)) {
                            v.children.forEach(val => {
                                val.model_id = val.id;
                                val.userId = mmdId;
                                if (v.id == -5) {
                                    val.isOBJ = true;
                                    val.image = val.image ? val.image : path + '/guide/image/loadFailed.png';
                                    val.url = val.url;
                                } else {
                                    val.is3dMax = true;
                                }
                                val.parentId = v.id;
                                val.parentTitle = v.title;
                                val.createTime = new Date(val.createTime).getTime();
                                val.PER = true;
                            })
                        }
                    }
                    return Modelfilter.indexOf(v.title) >= 0 && v.id != SELID
                });

                MyModel.forEach(v => {
                    if (Array.isArray(v.children)) {
                        v.children = v.children.filter((index) => {
                            if (v.title != '已上传的模型' || (v.title == '已上传的模型' && index.source != 'third')) {
                                return index.editStatus !== 3;
                            }
                        });
                        arr = arr.concat(v.children);
                    }
                });
                if ($.cookie('role') == 'developer') {
                    sketchfabModel.forEach(v => {
                        v.isSketchfab = true;
                        v.PER = true;
                        v.title = v.modelName;
                        v.parentId = 'sketchfab';
                        v.parentTitle = 'Skfb';
                        v.createTime = new Date(v.createTime).getTime();
                        var imgUrl = v.image;
                        if (imgUrl == null || typeof (imgUrl) == 'string' && imgUrl.indexOf('media.sketchfab.com') > -1) {
                            v.image = 'https://store.thingjs.com/thumbnail/' + v.modelId + '.jpeg'
                        }
                        arr.push(v);
                    })
                    MyModel.push({
                        children: [],
                        id: 'sketchfab',
                        title: 'Skfb',
                        type: 'Skfb'
                    });
                }
                arr.sort(sortTime);
                personalModel = {
                    list: MyModel,
                    arr: arr,
                    skLen: sketchfabModel.length
                }
                if (loadSwitch) {
                    loadModelList(stypeName, target, i, id, server, bigType, personalModel);
                }
                storage.setItem(mmdId, JSON.stringify(personalModel));
            },
            error: function (data) {
                console.log(data);
            }
        })
    } else {
        loadModelList(stypeName, target, i, id, server, bigType, {
            list: MyModel,
            arr: arr
        })
    }

    return {
        list: MyModel,
        arr: arr
    };
}
// 获取所有个人模型记录（不生成列表）
function getAllPerson() {
    var storage = window.localStorage;
    var mmdId = getCookie('mmdId');
    // var mmdId='13252';
    var MyModel = [];
    var arr = [];
    if (storage && storage[mmdId]) {
        personalModel = JSON.parse(storage[mmdId]);
    }
    getPersonOBJ(mmdId);
    getPersonBuyModels(mmdId);
    if (mmdId) {
        if ($.cookie('role') == 'developer') getSketchModelsForUser(mmdId);
        $.ajax({
            url: MaxUrl + '/model/getMylibJSON3/' + mmdId,
            // url:'http://192.168.10.24:8080/getMylibJSON3/'+mmdId,
            type: 'get',
            dataType: "json",
            async: true,
            success: function (data) {
                var newarr = data.custom;
                var SELID;
                var item1 = newarr.find(({
                    id
                }) => -1 === id);
                var item2 = newarr.find(({
                    id,
                    title
                }) => {
                    if (title == '已上传的模型' && id != -1) {
                        SELID = id;
                    }
                });
                var item = [];
                if (item1) {
                    item = item1.children;
                }
                if (item2) {
                    item = item.concat(item2.children);
                }
                MyModel = newarr.filter(v => {
                    if (Modelfilter.indexOf(v.title) >= 0 && v.id != SELID) {
                        if (v.id == 0) v.children = BuyModel;
                        if (v.id == -1) v.children = item;
                        if (v.id == -5) v.children = ObjModel;
                        if (Array.isArray(v.children)) {
                            v.children.forEach(val => {
                                val.model_id = val.id;
                                val.userId = mmdId;
                                if (v.id == -5) {
                                    val.isOBJ = true;
                                    val.image = val.image ? val.image : path + '/guide/image/loadFailed.png';
                                } else {
                                    val.is3dMax = true;
                                }
                                val.parentId = v.id;
                                val.parentTitle = v.title;
                                val.PER = true;
                                val.createTime = new Date(val.createTime).getTime();
                            })
                        }
                    }
                    return Modelfilter.indexOf(v.title) >= 0 && v.id != SELID
                });
                MyModel.forEach(v => {
                    if (Array.isArray(v.children)) {
                        v.children = v.children.filter((index) => {
                            if (v.title != '已上传的模型' || (v.title == '已上传的模型' && index.source != 'third')) {
                                return index.editStatus !== 3;
                            }
                        });
                        arr = arr.concat(v.children);
                    }
                });
                if ($.cookie('role') == 'developer') {
                    sketchfabModel.forEach(v => {
                        v.isSketchfab = true;
                        v.PER = true;
                        v.title = v.modelName;
                        v.parentId = 'sketchfab';
                        v.parentTitle = 'Skfb';
                        v.createTime = new Date(v.createTime).getTime();
                        var imgUrl = v.image;
                        if (imgUrl == null || typeof (imgUrl) == 'string' && imgUrl.indexOf('media.sketchfab.com') > -1) {
                            v.image = 'https://store.thingjs.com/thumbnail/' + v.modelId + '.jpeg'
                        }
                        arr.push(v);
                    })
                    MyModel.push({
                        children: [],
                        id: 'sketchfab',
                        title: 'Skfb',
                        type: 'Skfb'
                    });
                }
                arr.sort(sortTime);
                personalModel = {
                    list: MyModel,
                    arr: arr,
                    skLen: sketchfabModel.length
                }
                storage.setItem(mmdId, JSON.stringify(personalModel));
            },
            error: function (data) {
                console.log(data);
            }
        })
    }

    return {
        list: MyModel,
        arr: arr,
    };
}
// 加载个人sketchfab
function getSketchModelsForUser(mmdId) {
    var url = ModelServer + '/model/querySketchModelsForUser';
    $.ajax({
        url: url,
        data: {
            uid: mmdId
        },
        type: 'get',
        dataType: 'json',
        success: function (data) {
            if (data.state) {
                sketchfabModel = data.content;
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}
//主要用于加载个人模型列表
function loadModelList(stypeName, target, i, id, server, bigType, personalModel) {
    modelMsg.smallType = '';
    queryData.smallType = '';
    queryData.bigType = 'personal';
    modelMsg.bigType = '个人';
    if ($.cookie('id') == null) {
        loginwindowon();
        $('.loadingModel').hide();
        $('.noModelTip').hide();
    } else {

        if ($(target).hasClass("checkbigtype")) {
            $('.big-variety-ul li.checkbigtype').not(target).removeClass("checkbigtype")
            // $(target).removeClass("checkbigtype");
            // $('.small-variety-ul').html("");
            // $('.variety').hide();
            // userId='';
            // format='';
            // queryData.smallType = '';
            // queryData.bigType = '';
            // modelMsg.bigType = '';
            $('.small-variety-ul').find('.checksmalltype').removeClass("checksmalltype");
        } else if (bigType != '') {
            $('.big-variety-ul li.checkbigtype').not(target).removeClass("checkbigtype")
            $(target).addClass("checkbigtype");
            [personalModel.list[0], personalModel.list[1], personalModel.list[2]] = [personalModel.list[1], personalModel.list[2], personalModel.list[0]];
            var small_variety = template('small-variety' + '_3dMax', {
                list: personalModel.list
            });
            $('.small-variety-ul').html(small_variety);
        }
        if (bigType == '') {
            queryData.bigType = '';
            modelMsg.bigType = '';
        }
        titleList(modelMsg, server);
    }
}
//加载个人OBJ模型列表
function getPersonOBJ(mmdId) {
    $.ajax({
        // url:'http://39.106.215.250:3000/diyModels/getUserModels',
        url: '/api/getOBJModels',
        data: {
            uid: mmdId
        },
        type: 'post',
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                ObjModel = data.content ? data.content : [];
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}
//加载个人已购买模型列表
function getPersonBuyModels(mmdId) {
    $.ajax({
        url: '/api/getBuyModels',
        data: {
            userid: mmdId
        },
        type: 'post',
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                BuyModel = data.content;
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function sortTime(x, y) {
    var prevTime = new Date(x.updateTime || x.createTime).getTime() ? new Date(x.updateTime || x.createTime).getTime() : 0;
    var nextTime = new Date(y.updateTime || y.createTime).getTime() ? new Date(y.updateTime || y.createTime).getTime() : 0;
    return -(prevTime - nextTime);
}
// 数组拆分
split_array = (arr, len) => {
    let arr_length = arr.length;
    let newArr = [];
    for (let i = 0; i < arr_length; i += len) {
        newArr.push(arr.slice(i, i + len));
    }
    return newArr;
}

function showUploadPanel(type, para) {
    $.ajax({
        type: "GET",
        url: path + "/guide/dialog/upload.html",
        dataType: "html",
        async: false,
        success: function (bodyHtml) {
            $(".bg-upload").html(bodyHtml);
            sceneupload(type, para)
        }
    })
}

function showShareProjectPanel(name, url, para, ifSample) {
    $.ajax({
        type: "GET",
        url: path + "/guide/dialog/shareProject.html",
        dataType: "html",
        async: false,
        success: function (bodyHtml) {
            $(".shareProject").html(bodyHtml);
            initShare(name, url, para, ifSample);
        }
    })
}

function showOrganizeProjectPanel(organizProPath) {
    $.ajax({
        type: "GET",
        url: path + "/guide/dialog/organizeProject.html",
        dataType: "html",
        async: false,
        success: function (bodyHtml) {
            $(".organizeProject").html(bodyHtml);
            initMemberList(organizProPath);
        }
    })
}
//弹窗提示
function closeAlert() {
    $(".alert_tip_box").remove();
}

function alertTip(content, type) {
    if (type == 'info') type = 'warning';
    var html = '<div class="alert_tip_box" style="z-index:1000000"> \
        <div class="alert_tip_container">\
            <div class="alert_tip_title" >\
                <span class="pc-head">温馨提示</span>\
                <span class="alert_close" onclick="closeAlert();"><i class="iconfont icon-close"></i></span>\
            </div>\
            <div class="alert_tip_content">\
                <img class="info_img" src="/guide/image/icons/' + type + '.png" alt="">\
                <span class="info_text">' + content + '</span>\
            </div>\
            <div class="footer_box">\
                <span class="active_btn" onclick="closeAlert()">确定</span>\
            </div>\
        </div> \
    </div>'
    $("body").append(html);
}

// 弹出窗新样式
function newAlert(msg, type, title, fn, time, timeout) { 
    try{
        if($(str).length) if($(msg).text().split('').pop() != '！') msg += '！';
    } catch (e) {
        if (msg.split('').pop() != '！') msg += '！'
    } 
    /* msg 提示信息   type 提示类型   title 提示头部信息   fn 回调函数   time 设置计时器自动关闭（'false')   timeout 刷新用户项目表 */
    if (type == undefined) {
        type = 'info'
    }
    if (timeout) {
        sampleTimeout = timeout;
    } else {
        sampleTimeout = '';
    }
    // if (msg.split('').pop() != '！') msg += '！';
    var content = setWH(msg, type);
    if (type == 'error' && msg == '登录已过期，请重新登录！') {
        swal({
            type: type,
            title: title || '温馨提示',
            html: content,
            confirmButtonText: '确定',
            showConfirmButton: true
        }).then(function (value) {
            if (value.value) {
                $('#login').show();
                $('#login').html('登录').attr('data-log', '-1');
                $('.vipLi .login-name').attr('data-log', '-1');
                $('#login').removeClass("login-active");
                $('#nav-reg').show();
                $('#msg').hide();
                $('#emailIcon').hide();
                $('#emailLetter').hide();
                $('#headimg').hide();
                $('.vipLi').hide();
                $(".vip").css({
                    "display": "none"
                });
                $('#developer').hide();
                $('#recharge').hide();
                $('#modelSer').hide();
                $('#develpoment').hide();
                clearAllCookie();
                loginwindowon();
            }
        })
    } else if (type == 'success' && (msg == '修改成功！' || msg == '新建成功！' || msg == '取消占用成功！' || time == 'false')) {
        swal({
            type: type,
            title: title || '温馨提示',
            html: content,
            showConfirmButton: false,
            timer: 1500
        }).then(function (value) {
            if (value) {
                if (fn) fn();
            }
        });
        $('.swal2-container .swal2-close').remove();
    } else {
        swal({
            type: type,
            title: title || '温馨提示',
            html: content,
            confirmButtonText: '确定',
            showConfirmButton: true,
        }).then(function (value) {
            if (value) {
                if (fn) fn();
            }
        })
    }
    $('.swal2-container').addClass('newalert');
}

function newConfirm(msg, btnArr, fnArr, closeBack, newWidth, type,title) {
    // console.log(getQueryString('m')=='sample'&&$('body .login-window').is(':visible')&&!type)
    // if(getQueryString('m')=='sample'&&$('body .login-window').is(':visible')&&!type) {
    //     return;
    // }
    var str = '';
    fnArr = fnArr || [];
    for (var i = 0; i < btnArr.length; i++) {
        str += "<button class='btn_item" + i + "'>" + btnArr[i] + "</button>";
    }
    var btn = `<div class='footer-btn'>` + str + `</div>`;
    swal({
        type: 'warning',
        title: title||'温馨提示',
        html: setWH(msg, 'confirm', newWidth),
        showConfirmButton: false,
        footer: btn
    }).then(function (value) {
        if (value.dismiss && closeBack) {
            if (fnArr.length) fnArr[fnArr.length - 1]();
        }
    });
    $('.swal2-container').addClass('newalert');
    $('.swal2-footer .footer-btn').on('click', 'button', function () {
        if (fnArr[$(this).index()]) {
            fnArr[$(this).index()]();
        } else {
            swal_close();
        }
    });
}

function swal_close() {
    swal.close();
}

function getStrLength(str) {
    if (str) {
        try{if($(str).length) str=$(str).text();}catch(e) {}
        var r = /[^\x00-\xff]/g;
        return (str.replace(r, "mm").length);
    }
    return 0;
};

function setWH(msg, type, newWidth) {
    var rNum = msg.split('<hr>').length - 1;
    var type = type || 'info';
    var strLength = getStrLength(msg) / 65;
    // msg=msg.replace(/[\r\n]/g,'<br>');
    var lineNum = Math.ceil(strLength);
    var width = 520 * (0.618 + 0.1 * (lineNum - 1));
    var newLineNum = Math.ceil(getStrLength(msg) * 14 * 12 / 24 / (width - 60)) + rNum;
    var msgHeight = newLineNum * 20;
    var height = (width + 28) * 0.618 - 134;
    var marginH = (height - msgHeight) / 2 + (newLineNum > 1 ? 1 : -4);
    var typeIcon = `<div class="` + type + `-icon"></div>`;
    var msgDiv = `<div class="msg" style='margin-top:` + (newLineNum > 1 && msg.length != 17 ? 0 : 3) + `px'>` + msg + `</div>`;
    if (newWidth) {
        width = newWidth;
    }
    var content = `<div class='main' style="width:` + width + `px;margin:` + marginH + `px auto">` + typeIcon + msgDiv + `</div>`;
    return content;
}
// 字符串截取
String.prototype.sub = function (n) {
    var r = /[^\x00-\xff]/g;
    if (this.replace(r, "mm").length <= n) return this;
    var m = Math.floor(n / 2);
    for (var i = m; i < this.length; i++) {
        if (this.substr(0, i).replace(r, "mm").length >= n) {
            return this.substr(0, i) + "...";
        }
    }
    return this;
};
// 序号转换
function parseStr(n) {
    if (n < 0) {
        return 0;
    } else if (n <= 9) {
        return n;
    } else if (n < 36) {
        return String.fromCharCode(n - 10 + 65);
    } else {
        return String.fromCharCode(n - 36 + 97);
    }
}
// 32进制
function str32ToBit(str) {
    let n = Number(str);
    let bit = '';
    for (let i = 0; i < 4 - n.toString(32).length; i++) {
        bit += '0';
    }
    return bit + n.toString(32);
}

// 场景转码
function parseSecneUrl(url) {
    if (url == '') return '';
    if (url.indexOf(path + '/') == 0) url = url.replace(path + '/', '');
    if (url.indexOf('.') == 0) url = url.replace('.', '');
    if (url.indexOf('/') !== 0) url = '/' + url;
    var sceneLink = '';
    $.ajax({
        url: '/api/getSceneUrl',
        type: 'post',
        async: false,
        data: {
            preSceneUrl: url,
            type: 'scene'
        },
        success: function (res) {
            if (res.code == 200 && res.sceneLink) {
                sceneLink = res.sceneLink;
            }
        },
        error: function (res) {
            console.log(res);
        }
    })
    if (sceneLink != '') return sceneLink;
    return encodeURI(url.substring(1));
}
// 场景解码
function decodeSceneUrl(url) {
    // var scenePath='';
    var authorID = "";
    $.ajax({
        url: '/api/queryCodeScene?sceneLink=' + url,
        type: 'get',
        async: false,
        success: function (res) {
            if (res.scenePath) {
                // scenePath=path+'/'+res.scenePath;
                authorID = res.mmdId;
            }
        },
        error: function (res) {
            console.log(res);
        }
    })
    return {
        scenePath: url,
        authorID: authorID
    };
}
// 模型转码
function parseModelUrl(url) {
    if (url == '') return '';
    //obj url 合法性判断
    var modelLink = '';
    $.ajax({
        url: '/api/getSceneUrl',
        type: 'post',
        async: false,
        data: {
            preSceneUrl: url,
            type: 'model'
        },
        success: function (res) {
            if (res.code == 200 && res.sceneLink) {
                modelLink = res.sceneLink;
            }
        },
        error: function (res) {
            console.log(res);
        }
    })
    if (modelLink != '') return modelLink;
    return encodeURI(url.substring(1));
}

function getLatestUearthVersion() {
    var latestVersion = 'uearth.min.v1.7.7.2.js';
    $.ajax({
        url: 'https://www.thingjs.com/uearth/history/index.json',
        type: 'get',
        async: false,
        success: function (data) {
            if (data && data.data && data.data[0]) {
                latestVersion = data.data[0];
            }
        }
    })
    return latestVersion;
}

function coverLogin(swal_con, res) {
    var swal_can = function () {
        swal_close();
    }
    newConfirm(res.message, ['确定', '取消'], [swal_con, swal_can], null, null, 1);
}
var timeOut;
// 30s计时
function loginOutTime(type) {
    // console.log(!isALert&&isLoginOther)
    // if(!isALert&&isLoginOther) {
    //     newAlert('本账号已在另一处登录！平台将对单账号同时登录进行限制！','warning');
    //     isALert=true;
    // }
    return;
    clearInterval(timeOut);
    if (type) {
        window.localStorage.removeItem('LOGINTIMEOUT');
        $('body span.setTimeSpan').remove();
        return;
    }
    if (!isALert) {
        newAlert('本账号已在另一处登录！当前登录会在 30秒后自动退出登录！', 'warning');
        window.localStorage.setItem('LOGINTIMEOUT', 30);
        isALert = true;
    }
    var timeSpan = `<span class='setTimeSpan'></span>`;
    $('body').append($(timeSpan));
    if (window.localStorage.getItem('LOGINTIMEOUT') == undefined || window.localStorage.getItem('LOGINTIMEOUT') == null) {
        window.localStorage.setItem('LOGINTIMEOUT', 10);
    }
    var timeS = Number(window.localStorage.getItem('LOGINTIMEOUT'));
    $('body span.setTimeSpan').html(timeS);
    timeOut = setInterval(function () {
        if (!isLoginOther) {
            return clearInterval(timeOut);
        }
        $('body span.setTimeSpan').html(timeS);
        window.localStorage.setItem('LOGINTIMEOUT', timeS);
        if (timeS > 0) {
            timeS--;
        } else {
            clearInterval(timeOut);
            clearAllCookie();
            indexlogininit('stopCurrentPage');
        }
    }, 1000);
}
// 点击返回顶部
function scrolltosTop(){
    $("#content").on('scroll',function(){
        if ($("#content").scrollTop() >= 100) {
            $("#scrollToTop").show().addClass("scrollToTop");
        } else {
            $("#scrollToTop").hide().removeClass("scrollToTop");
        }
    });
    $('#scrollToTop').click(function () {
        $("#content").stop().animate({scrollTop:0},1000);
    });
}

// 轮播滚动左右按钮
const arrowButton =  {
    initial: 0,
    left: function(itemWidth,$swper){
        // 获取li的宽度
        this.initial = this.initial <= 0 ? 0 : this.initial - itemWidth;
        console.log(this.initial)
        $swper.css('transform',"translateX(-"+this.initial+"px)")
    },
    right: function(numWidth,itemWidth,$swper){
        this.initial = this.initial >= numWidth ? numWidth : this.initial + itemWidth;
        console.log(this.initial)
        $swper.css('transform',"translateX(-"+this.initial+"px)")
    }
}

function newmessage(content,type){    
    $("body .message_bg").remove();
    var dom=`<div class='message_bg'><div class="alertMessage">
    <div class="alertMessage-notice">
        <div class="alertMessage-notice-content">
            <div class="alertMessage-notice-content-text">
                <div class="alertMessage-custom-content alertMessage-success">
                    <i class="iconfont icon-wancheng"></i>
                    <span>新增成功</span>
                </div>
            </div>
        </div>
    </div>
    </div></div>`;
    $("body").append($(dom));
    $(".message_bg .alertMessage-custom-content span").text(content);
    if(type=="success"){
        $('.message_bg .alertMessage-custom-content i').addClass("icon-wancheng");
        $('.message_bg .alertMessage-custom-content i').removeClass("icon-error");
        $('.message_bg .alertMessage-custom-content').addClass("alertMessage-success");
        $('.message_bg .alertMessage-custom-content').removeClass("alertMessage-error");
    }else{
        $('.message_bg .alertMessage-custom-content i').addClass("icon-error");
        $('.message_bg .alertMessage-custom-content i').removeClass("icon-wancheng");
        $('.message_bg .alertMessage-custom-content').addClass("alertMessage-error");
        $('.message_bg .alertMessage-custom-content').removeClass("alertMessage-success");
    }
    $(".message_bg .alertMessage").removeClass("alert-Message-hide");
    $(".message_bg .alertMessage").addClass("alert-Message-show");
    $(".message_bg .alertMessage").show();
    $(".message_bg .alertMessage .alertMessage-notice .alertMessage-notice-content").animate({'opacity':'1'},200)
    setTimeout(closemessage,1200);
}
function closemessage(){
    $(".message_bg .alertMessage .alertMessage-notice .alertMessage-notice-content").animate({'opacity':'0'},800)
    setTimeout(function(){
        $(".message_bg .alertMessage").removeClass("alert-Message-show");
        $(".message_bg.alertMessage").addClass("alert-Message-hide");
        $(".message_bg .alertMessage").hide();
        $(".message_bg").remove();
        $(".message_bg.alertMessage").addClass("alert-Message-hide");
    },800)
}
// 调用授权 文件判断
function regFilename(filename, jsname, regStr) {
    var mmdid = getCookie('mmdId'),
        uid = getCookie('openid');
        uid=decodeURIComponent(uid);
    try {
        // console.log(filename, regStr, mmdid, uid, jsname)
        if (filename.length && regStr.length && mmdid && uid && jsname) {
            uid = uid.replace(new RegExp('/', 'g'), '');
            var len = filename.length,
                strlen = regStr.length;
            if (filename.lastIndexOf(regStr) == (len - strlen)) {
                if (filename.indexOf(mmdid) == 0) {
                    var jsstr = filename.replace(mmdid + '_', '');
                } else if (filename.indexOf(uid) == 0) {
                    var jsstr = filename.replace(uid + '_', '');
                }
                if (jsstr && jsstr.lastIndexOf('_') != -1) {
                    var name = jsstr.substring(0, jsstr.lastIndexOf('_'));
                    if (name && name == jsname) {
                        var time = jsstr.substring(name.length + 1, jsstr.length - regStr.length - 1);
                        if (time && Number(time) && time.length == 14) {
                            try {
                                time = time.substring(0, 4) + '-' + time.substring(4, 6) + '-' + time.substring(6, 8) + ' ' + time.substring(8, 10) + ':' + time.substring(10, 12) + ':' + time.substring(12, 14);
                                if (new Date(time).getTime() <= new Date().getTime()) {
                                    return 'ok';
                                }
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        return '文件名时间格式错误';
                    } else {
                        return '项目名称不匹配';
                    }
                } else {
                    return '用户信息不匹配';
                }
            }
            return '文件类型不匹配';
        }
        return '参数缺失';
    } catch (error) {
        console.log(error);
        console.log(error.message)
        return '参数缺失';
    }
}
// 调用授权
function uploadCodeFile(type, para, _this, title) {
    if ($('body').children('.uploadCode_bg').length) $('body').children('.uploadCode_bg').remove();
    var url = path + '/guide/dialog/uploadMach.html';
    if (type) url = path + '/guide/dialog/uploadUpdate.html';
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'html',
        success: function (res) {
            var html = res;
            if(self!=top) {
                $(parent.document.body).append($(html));
                parent.initCodePara(para, _this, title);
            } else {
                $('body').append($(html));
                initCodePara(para, _this, title);
            }
        }
    })}