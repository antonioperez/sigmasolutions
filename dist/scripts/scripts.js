function config($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/login"),$stateProvider.state("index",{"abstract":!0,url:"/index",templateUrl:"components/layout/content.html"})}function pageTitle($rootScope,$timeout){return{link:function(scope,element){var listener=function(event,toState,toParams,fromState,fromParams){var title="INSPINIA | Responsive Admin Theme";toState.data&&toState.data.pageTitle&&(title="INSPINIA | "+toState.data.pageTitle),$timeout(function(){element.text(title)})};$rootScope.$on("$stateChangeStart",listener)}}}function sideNavigation($timeout){return{restrict:"A",link:function(scope,element){$timeout(function(){element.metisMenu()});var menuElement=$('#side-menu a:not([href$="\\#"])');if(menuElement.click(function(){$(window).width()<769&&$("body").toggleClass("mini-navbar")}),$("body").hasClass("fixed-sidebar")){var sidebar=element.parent();sidebar.slimScroll({height:"100%",railOpacity:.9})}}}}function iboxTools($timeout){return{restrict:"A",scope:!0,templateUrl:"components/layout/ibox_tools.html",controller:function($scope,$element){$scope.showhide=function(){var ibox=$element.closest("div.ibox"),icon=$element.find("i:first"),content=ibox.children(".ibox-content");content.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),ibox.toggleClass("").toggleClass("border-bottom"),$timeout(function(){ibox.resize(),ibox.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var ibox=$element.closest("div.ibox");ibox.remove()}}}}function minimalizaSidebar($timeout){return{restrict:"A",template:'<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',controller:function($scope,$element){$scope.minimalize=function(){$("body").toggleClass("mini-navbar"),!$("body").hasClass("mini-navbar")||$("body").hasClass("body-small")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},200)):$("body").hasClass("fixed-sidebar")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},100)):$("#side-menu").removeAttr("style")}}}}function iboxToolsFullScreen($timeout){return{restrict:"A",scope:!0,templateUrl:"components/layout/ibox_tools_full_screen.html",controller:function($scope,$element){$scope.showhide=function(){var ibox=$element.closest("div.ibox"),icon=$element.find("i:first"),content=ibox.children(".ibox-content");content.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),ibox.toggleClass("").toggleClass("border-bottom"),$timeout(function(){ibox.resize(),ibox.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var ibox=$element.closest("div.ibox");ibox.remove()},$scope.fullscreen=function(){var ibox=$element.closest("div.ibox"),button=$element.find("i.fa-expand");$("body").toggleClass("fullscreen-ibox-mode"),button.toggleClass("fa-expand").toggleClass("fa-compress"),ibox.toggleClass("fullscreen"),setTimeout(function(){$(window).trigger("resize")},100)}}}}function MainCtrl(){var vm=this;vm.userName="Jon Snow"}function config($stateProvider){$stateProvider.state("login",{url:"/login",templateUrl:"components/account/login.html",data:{pageTitle:"Login",specialClass:"gray-bg"}}).state("forgot_password",{url:"/forgot_password",templateUrl:"components/account/forgot.password.html",data:{pageTitle:"Forgot password",specialClass:"gray-bg"}}).state("register",{url:"/register",templateUrl:"components/account/register.html",data:{pageTitle:"Register",specialClass:"gray-bg"}})}function config($stateProvider,$urlRouterProvider){$stateProvider.state("index.dashboard",{controller:"DashboardCtrl",controllerAs:"dashboard",data:{pageTitle:"Chart.js"},resolve:{loadPlugin:function($ocLazyLoad){return $ocLazyLoad.load([{files:["js/plugins/chartJs/Chart.min.js"]},{name:"angles",files:["js/plugins/chartJs/angles.js"]}])}},templateUrl:"components/dashboard/dashboard.html",url:"/dashboard"})}function Ctrl(){var vm=this;vm.barOptions={scaleBeginAtZero:!0,scaleShowGridLines:!1,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1},vm.barData={labels:["01","02","03","04","05","06","07"],datasets:[{label:"My First dataset",fillColor:"rgba(220,220,220,0.5)",strokeColor:"rgba(220,220,220,0.8)",highlightFill:"rgba(220,220,220,0.75)",highlightStroke:"rgba(220,220,220,1)",data:[65,59,80,81,56,55,40]},{label:"My Second dataset",fillColor:"rgba(26,179,148,0.5)",strokeColor:"rgba(26,179,148,0.8)",highlightFill:"rgba(26,179,148,0.75)",highlightStroke:"rgba(26,179,148,1)",data:[28,48,40,19,86,27,90]}]},vm.doughnutData=[{value:300,color:"#a3e1d4",highlight:"#1ab394",label:"App"},{value:50,color:"#dedede",highlight:"#1ab394",label:"Software"},{value:100,color:"#A4CEE8",highlight:"#1ab394",label:"Laptop"}],vm.doughnutOptions={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:45,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1},vm.lineData={labels:["January","February","March","April","May","June","July"],datasets:[{label:"Example dataset",fillColor:"rgba(220,220,220,0.5)",strokeColor:"rgba(220,220,220,1)",pointColor:"rgba(220,220,220,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(220,220,220,1)",data:[65,59,80,81,56,55,40]},{label:"Example dataset",fillColor:"rgba(26,179,148,0.5)",strokeColor:"rgba(26,179,148,0.7)",pointColor:"rgba(26,179,148,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(26,179,148,1)",data:[28,48,40,19,86,27,90]}]},vm.lineOptions={scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,bezierCurve:!0,bezierCurveTension:.4,pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0}}function config($stateProvider){$stateProvider.state("index.mapper",{url:"/mapper",templateUrl:"components/mapper/viewer.html",data:{pageTitle:"Map Viewer"}})}$(document).ready(function(){function fix_height(){var heightWithoutNavbar=$("body > #wrapper").height()-61;$(".sidebar-panel").css("min-height",heightWithoutNavbar+"px");var navbarHeight=$("nav.navbar-default").height(),wrapperHeight=$("#page-wrapper").height();navbarHeight>wrapperHeight&&$("#page-wrapper").css("min-height",navbarHeight+"px"),wrapperHeight>navbarHeight&&$("#page-wrapper").css("min-height",$(window).height()+"px"),$("body").hasClass("fixed-nav")&&(navbarHeight>wrapperHeight?$("#page-wrapper").css("min-height",navbarHeight+"px"):$("#page-wrapper").css("min-height",$(window).height()-60+"px"))}$(window).bind("load resize scroll",function(){$("body").hasClass("body-small")||fix_height()}),$(window).scroll(function(){$(window).scrollTop()>0&&!$("body").hasClass("fixed-nav")?$("#right-sidebar").addClass("sidebar-top"):$("#right-sidebar").removeClass("sidebar-top")}),setTimeout(function(){fix_height()})}),$(window).bind("load resize",function(){$(document).width()<769?$("body").addClass("body-small"):$("body").removeClass("body-small")}),function(){angular.module("app",["ui.router","ui.bootstrap","oc.lazyLoad"])}(),angular.module("app").config(config).run(function($rootScope,$state){$rootScope.$state=$state}),angular.module("app").directive("pageTitle",pageTitle).directive("sideNavigation",sideNavigation).directive("iboxTools",iboxTools).directive("minimalizaSidebar",minimalizaSidebar).directive("iboxToolsFullScreen",iboxToolsFullScreen),angular.module("app").controller("MainCtrl",MainCtrl),angular.module("app").config(config),angular.module("app").config(config),angular.module("app").controller("DashboardCtrl",Ctrl),angular.module("app").config(config);