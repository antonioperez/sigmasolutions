function config($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/index/main"),$stateProvider.state("index",{"abstract":!0,url:"/index",templateUrl:"views/common/content.html"}).state("index.main",{url:"/main",templateUrl:"views/main.html",data:{pageTitle:"Example view"}}).state("index.minor",{url:"/minor",templateUrl:"views/minor.html",data:{pageTitle:"Example view"}})}function pageTitle($rootScope,$timeout){return{link:function(scope,element){var listener=function(event,toState,toParams,fromState,fromParams){var title="INSPINIA | Responsive Admin Theme";toState.data&&toState.data.pageTitle&&(title="INSPINIA | "+toState.data.pageTitle),$timeout(function(){element.text(title)})};$rootScope.$on("$stateChangeStart",listener)}}}function sideNavigation($timeout){return{restrict:"A",link:function(scope,element){$timeout(function(){element.metisMenu()});var menuElement=$('#side-menu a:not([href$="\\#"])');if(menuElement.click(function(){$(window).width()<769&&$("body").toggleClass("mini-navbar")}),$("body").hasClass("fixed-sidebar")){var sidebar=element.parent();sidebar.slimScroll({height:"100%",railOpacity:.9})}}}}function iboxTools($timeout){return{restrict:"A",scope:!0,templateUrl:"views/common/ibox_tools.html",controller:function($scope,$element){$scope.showhide=function(){var ibox=$element.closest("div.ibox"),icon=$element.find("i:first"),content=ibox.children(".ibox-content");content.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),ibox.toggleClass("").toggleClass("border-bottom"),$timeout(function(){ibox.resize(),ibox.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var ibox=$element.closest("div.ibox");ibox.remove()}}}}function minimalizaSidebar($timeout){return{restrict:"A",template:'<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',controller:function($scope,$element){$scope.minimalize=function(){$("body").toggleClass("mini-navbar"),!$("body").hasClass("mini-navbar")||$("body").hasClass("body-small")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},200)):$("body").hasClass("fixed-sidebar")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},100)):$("#side-menu").removeAttr("style")}}}}function iboxToolsFullScreen($timeout){return{restrict:"A",scope:!0,templateUrl:"views/common/ibox_tools_full_screen.html",controller:function($scope,$element){$scope.showhide=function(){var ibox=$element.closest("div.ibox"),icon=$element.find("i:first"),content=ibox.children(".ibox-content");content.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),ibox.toggleClass("").toggleClass("border-bottom"),$timeout(function(){ibox.resize(),ibox.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var ibox=$element.closest("div.ibox");ibox.remove()},$scope.fullscreen=function(){var ibox=$element.closest("div.ibox"),button=$element.find("i.fa-expand");$("body").toggleClass("fullscreen-ibox-mode"),button.toggleClass("fa-expand").toggleClass("fa-compress"),ibox.toggleClass("fullscreen"),setTimeout(function(){$(window).trigger("resize")},100)}}}}function MainCtrl(){var vm=this;vm.userName="Example user",vm.helloText="Welcome in SeedProject",vm.descriptionText="It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects."}$(document).ready(function(){function fix_height(){var heightWithoutNavbar=$("body > #wrapper").height()-61;$(".sidebar-panel").css("min-height",heightWithoutNavbar+"px");var navbarHeight=$("nav.navbar-default").height(),wrapperHeight=$("#page-wrapper").height();navbarHeight>wrapperHeight&&$("#page-wrapper").css("min-height",navbarHeight+"px"),wrapperHeight>navbarHeight&&$("#page-wrapper").css("min-height",$(window).height()+"px"),$("body").hasClass("fixed-nav")&&(navbarHeight>wrapperHeight?$("#page-wrapper").css("min-height",navbarHeight+"px"):$("#page-wrapper").css("min-height",$(window).height()-60+"px"))}$(window).bind("load resize scroll",function(){$("body").hasClass("body-small")||fix_height()}),$(window).scroll(function(){$(window).scrollTop()>0&&!$("body").hasClass("fixed-nav")?$("#right-sidebar").addClass("sidebar-top"):$("#right-sidebar").removeClass("sidebar-top")}),setTimeout(function(){fix_height()})}),$(window).bind("load resize",function(){$(document).width()<769?$("body").addClass("body-small"):$("body").removeClass("body-small")}),function(){angular.module("app",["ui.router","ui.bootstrap"])}(),angular.module("app").config(config).run(function($rootScope,$state){$rootScope.$state=$state}),angular.module("app").directive("pageTitle",pageTitle).directive("sideNavigation",sideNavigation).directive("iboxTools",iboxTools).directive("minimalizaSidebar",minimalizaSidebar).directive("iboxToolsFullScreen",iboxToolsFullScreen),angular.module("app").controller("MainCtrl",MainCtrl);