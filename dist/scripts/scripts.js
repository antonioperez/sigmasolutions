$(document).ready(function(){function fix_height(){var heightWithoutNavbar=$("body > #wrapper").height()-61;$(".sidebar-panel").css("min-height",heightWithoutNavbar+"px");var navbarHeight=$("nav.navbar-default").height(),wrapperHeight=$("#page-wrapper").height();navbarHeight>wrapperHeight&&$("#page-wrapper").css("min-height",navbarHeight+"px"),wrapperHeight>navbarHeight&&$("#page-wrapper").css("min-height",$(window).height()+"px"),$("body").hasClass("fixed-nav")&&(navbarHeight>wrapperHeight?$("#page-wrapper").css("min-height",navbarHeight+"px"):$("#page-wrapper").css("min-height",$(window).height()-60+"px"))}$(window).bind("load resize scroll",function(){$("body").hasClass("body-small")||fix_height()}),$(window).scroll(function(){$(window).scrollTop()>0&&!$("body").hasClass("fixed-nav")?$("#right-sidebar").addClass("sidebar-top"):$("#right-sidebar").removeClass("sidebar-top")}),setTimeout(function(){fix_height()})}),$(window).bind("load resize",function(){$(document).width()<769?$("body").addClass("body-small"):$("body").removeClass("body-small")});var config={apiKey:"AIzaSyD2IoWGPJGvJFoN5xexwNBgHVdb5kbjYzg",authDomain:"sigmasolutions-176200.firebaseapp.com",databaseURL:"https://sigmasolutions-176200.firebaseio.com",projectId:"sigmasolutions-176200",storageBucket:"sigmasolutions-176200.appspot.com",messagingSenderId:"398743798805"};firebase.initializeApp(config),function(){angular.module("app",["oc.lazyLoad","ui.router","ui.bootstrap","angularFileUpload","datePicker","ngSanitize"])}(),function(){function config($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/login"),$stateProvider.state("index",{"abstract":!0,url:"/index",templateUrl:"components/layout/content.html"})}angular.module("app").config(["$stateProvider","$urlRouterProvider",config]).run(["$rootScope","$state",function($rootScope,$state){$rootScope.$state=$state}])}(),function(){function pageTitle($rootScope,$timeout){return{link:function(scope,element){var listener=function(event,toState,toParams,fromState,fromParams){var title="SGMA Solutions | Ecoverse";toState.data&&toState.data.pageTitle&&(title="SGMA | "+toState.data.pageTitle),$timeout(function(){element.text(title)})};$rootScope.$on("$stateChangeStart",listener)}}}function sideNavigation($timeout){return{restrict:"A",link:function(scope,element){$timeout(function(){element.metisMenu()});var menuElement=$('#side-menu a:not([href$="\\#"])');if(menuElement.click(function(){$(window).width()<769&&$("body").toggleClass("mini-navbar")}),$("body").hasClass("fixed-sidebar")){var sidebar=element.parent();sidebar.slimScroll({height:"100%",railOpacity:.9})}}}}function iboxTools($timeout){return{restrict:"A",scope:!0,templateUrl:"components/layout/ibox_tools.html",controller:["$scope","$element",function($scope,$element){$scope.showhide=function(){var ibox=$element.closest("div.ibox"),icon=$element.find("i:first"),content=ibox.children(".ibox-content");content.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),ibox.toggleClass("").toggleClass("border-bottom"),$timeout(function(){ibox.resize(),ibox.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var ibox=$element.closest("div.ibox");ibox.remove()}}]}}function minimalizaSidebar($timeout){return{restrict:"A",template:'<a class="navbar-minimalize minimalize-styl-2 btn" href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',controller:["$scope","$element",function($scope,$element){$scope.minimalize=function(){$("body").toggleClass("mini-navbar"),!$("body").hasClass("mini-navbar")||$("body").hasClass("body-small")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},200)):$("body").hasClass("fixed-sidebar")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},100)):$("#side-menu").removeAttr("style")}}]}}function iboxToolsFullScreen($timeout){return{restrict:"A",scope:!0,templateUrl:"components/layout/ibox_tools_full_screen.html",controller:["$scope","$element",function($scope,$element){$scope.showhide=function(){var ibox=$element.closest("div.ibox"),icon=$element.find("i:first"),content=ibox.children(".ibox-content");content.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),ibox.toggleClass("").toggleClass("border-bottom"),$timeout(function(){ibox.resize(),ibox.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var ibox=$element.closest("div.ibox");ibox.remove()},$scope.fullscreen=function(){var ibox=$element.closest("div.ibox"),button=$element.find("i.fa-expand");$("body").toggleClass("fullscreen-ibox-mode"),button.toggleClass("fa-expand").toggleClass("fa-compress"),ibox.toggleClass("fullscreen"),setTimeout(function(){$(window).trigger("resize")},100)}}]}}angular.module("app").directive("pageTitle",["$rootScope","$timeout",pageTitle]).directive("sideNavigation",["$timeout",sideNavigation]).directive("iboxTools",["$timeout",iboxTools]).directive("minimalizaSidebar",["$timeout",minimalizaSidebar]).directive("iboxToolsFullScreen",["$timeout",iboxToolsFullScreen])}(),function(){angular.module("app").service("gsaservice",function($http){var self=this,API_URL="https://gateway-tx-1.thriftly.io/dev/ep7e2f46/GSAService/",getRandomIntInclusive=function(min,max){return min=Math.ceil(min),max=Math.floor(max),Math.floor(Math.random()*(max-min+1))+min};self.getGSAs=function(name,pageSize,pageOffset,callback){var data={jsonrpc:"2.0",id:getRandomIntInclusive(0,100),method:"getGSAs",params:{search:{name:name,pageSize:pageSize,pageOffset:pageOffset}}};$http({method:"POST",data:data,url:API_URL}).then(function(response){callback&&callback(response.data.result)},function(response){console.log(API_URL+" "+response)})},self.getDemoGSA=function(){return[{id:"dcfd4070-789c-4a2b-983a-c57c76c8a160",name:"Alameda County Flood Control and Water Conservation District (Zone 7 Water Agency) - Non-Exclusive Portion",contact:"Carol Mahoney\n925-454-5064\ncmahoney@zone7water.com",contact_info:"100 North Canyons Parkway\nLivermore, CA 94551-9486",website:"",exclusive:"Exclusive",basin_number:"2-010",basin_name:"LIVERMORE VALLEY",region:"NCRO",county:"Contra Costa",posted:"2017-02-03T07:00:00Z",postedPlus90:"2017-05-04T07:00:00Z",received:"2017-01-20T07:00:00Z",receivedPlus15:"2017-02-04T07:00:00Z"},{id:"f994ee6b-878f-4117-af35-94c0a12a3c58",name:"Alameda County Water District",contact:"Michelle Myers\nGroundwater Resources Manager\n510-668-4454\nmichelle.myers@acwd.com",contact_info:"43885 South Grimmer Boulevard\nFremont, CA 94538",website:"",exclusive:"Exclusive",basin_number:"2-009.01",basin_name:"NILES CONE",region:"NCRO",county:"Alameda",posted:"2016-12-02T07:00:00Z",postedPlus90:"2017-03-02T07:00:00Z",received:"2016-11-18T07:00:00Z",receivedPlus15:"2016-12-03T07:00:00Z"},{id:"1fdc9fe4-201e-43bc-a774-b65c7737f480",name:"Aliso Water District",contact:"Roy Capania\nAliso GSO POC\n559-779-2616\nroy@oneilag.com",contact_info:"10302 Avenue 7-1/2\nFirebaugh, CA 93622",website:"",exclusive:"Exclusive",basin_number:"5-022.07",basin_name:"DELTA-MENDOTA",region:"SCRO",county:"Madera",posted:"2016-05-11T07:00:00Z",postedPlus90:"2016-08-09T07:00:00Z",received:"2016-05-03T07:00:00Z",receivedPlus15:"2016-05-18T07:00:00Z"},{id:"6c1ee354-67d4-4077-a589-2f430df2a60a",name:"Alpaugh Groundwater Sustainability Agency",contact:"David Kahn\nAttorney\n559-584-3337\ndkahn@kschanford.com",contact_info:"219 N. Douty Street\nHanford, CA 93230",website:"",exclusive:"Overlap",basin_number:"5-022.13",basin_name:"TULE",region:"SCRO",county:"Tulare",posted:"2016-06-17T07:00:00Z",postedPlus90:"2016-09-15T07:00:00Z",received:"2016-06-03T07:00:00Z",receivedPlus15:"2016-06-18T07:00:00Z"}]}})}(),function(){function MainCtrl(){var vm=this;vm.userName="Jon Snow"}angular.module("app").controller("MainCtrl",MainCtrl)}(),function(){angular.module("app").service("mapservice",function($http){var self=this,CONVERTER_URL="http://sgma.ecoverse.io/mapper/convertJson";self.generateMap=function(mapId,zoom,zipPath,backgroundOptions,popupContent,searchKey,addDrawingOptions,customFeatureCallback){$("#"+mapId).css("width","100%"),$("#"+mapId).css("height","500px");var map=L.map(mapId).setView([36.8,-120],zoom),options=(L.esri.basemapLayer("Topographic").addTo(map),{searchKey:searchKey,addDrawingOptions:addDrawingOptions,backgroundOverlayStyle:backgroundOptions,popupContent:popupContent,customFeatureCallback:customFeatureCallback});return self.loadShapefile(map,zipPath,options),map},self.loadShapefile=function(map,zipPath,options){shp(zipPath).then(function(geojson){geoj=geojson.features;var stateCheck=geoj[0].properties.STATE;if(stateCheck)for(var i in geoj)stateCheck=geoj[i].properties.STATE,"CA"!=stateCheck&&(geoj[i]=void 0);var geoj=geoj.filter(function(val){return val}),featuresLayer=L.geoJSON(geoj,{style:options.backgroundOverlayStyle,onEachFeature:function(feature,layer){options.popupContent&&self.onEachFeature(feature,layer,options.popupContent,options.customFeatureCallback)}});return map.addLayer(featuresLayer),options.searchKey&&self.addSearchControls(map,options.searchKey,featuresLayer),options.addDrawingOptions&&self.addDrawControls(map,featuresLayer),map})},self.genGuid=function(){var date=(new Date).getTime(),uuid="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(char){var rand=(date+16*Math.random())%16|0;return date=Math.floor(date/16),("x"==char?rand:3&rand|8).toString(16)});return uuid},self.downloadFile=function(url,payload,callback){var xhr=new XMLHttpRequest;xhr.open("POST",url,!0),xhr.responseType="arraybuffer",xhr.onload=function(){if(200===this.status){var filename="";filename=payload.outputName?payload.outputName:self.genGuid(),filename.indexOf(!1)&&(filename+=".zip");var type=xhr.getResponseHeader("Content-Type"),blob=new Blob([this.response],{type:type});if("undefined"!=typeof window.navigator.msSaveBlob)window.navigator.msSaveBlob(blob,filename);else{var URL=window.URL||window.webkitURL,downloadUrl=URL.createObjectURL(blob);if(filename){var atag=document.createElement("a");"undefined"==typeof atag.download?window.location=downloadUrl:(atag.href=downloadUrl,atag.download=filename,document.body.appendChild(atag),atag.click())}else window.location=downloadUrl;setTimeout(function(){URL.revokeObjectURL(downloadUrl)},100),callback&&callback()}}},xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"),xhr.send($.param(payload))},self.onEachFeature=function(feature,layer,popupContent,customFeatureCallback){var props=feature.properties;customFeatureCallback&&customFeatureCallback(feature,layer);var template=popupContent,keys=template.match(/[^{]+(?=\}})/g);if(keys.length>0)for(var k in keys){var key=keys[k];template=template.replace("{{"+key+"}}",props[key])}feature.properties&&feature.properties.popupContent&&(template+=feature.properties.popupContent),layer.bindPopup(template)},self.addDrawControls=function(map,featuresLayer){var drawnItems=new L.FeatureGroup;map.addLayer(drawnItems);var drawControl=new L.Control.Draw({position:"topright",draw:{polyline:!0,polygon:!0,circle:!1,marker:!0},edit:{featureGroup:drawnItems,remove:!0}});map.addControl(drawControl),map.on(L.Draw.Event.CREATED,function(e){var layer=(e.layerType,e.layer);drawnItems.addLayer(layer)}),map.on(L.Draw.Event.EDITED,function(e){var layers=e.layers,countOfEditedLayers=0;layers.eachLayer(function(layer){countOfEditedLayers++});var data=featuresLayer.toGeoJSON();if(data=JSON.stringify(data),filename=$("#js-fileName").val(),payload={json:data,outputName:filename},progressBar=$("#js-map-progress-bar"),doneProcessing=null,progressBar){var percentVal=0,interval=setInterval(function(){100>=percentVal?(progressBar.css("width",percentVal+"%").attr("aria-valuenow",percentVal),percentVal+=.5,percentVal=Math.round(percentVal)):percentVal>100&&(percentVal=0)},50);doneProcessing=function(){clearInterval(interval),progressBar.css("width","0%").attr("aria-valuenow",0)}}self.downloadFile(CONVERTER_URL,payload,doneProcessing)})},self.addSearchControls=function(map,searchKey,featuresLayer){var searchControl=new L.Control.Search({layer:featuresLayer,propertyName:searchKey,marker:!1,moveToLocation:function(latlng,title,map){var zoom=map.getBoundsZoom(latlng.layer.getBounds());map.setView(latlng,zoom)}});searchControl.on("search:locationfound",function(e){e.layer.setStyle({fillColor:"#3f0",color:"#0f0"}),e.layer._popup&&e.layer.openPopup()}).on("search:collapsed",function(e){featuresLayer.eachLayer(function(layer){featuresLayer.resetStyle(layer)})}),map.addControl(searchControl)}})}(),function(){function config($stateProvider){$stateProvider.state("login",{url:"/login",controller:"AccountCtrl",controllerAs:"account",templateUrl:"components/account/login.html",data:{pageTitle:"Login",specialClass:"gray-bg"}}).state("forgot_password",{controller:"AccountCtrl",controllerAs:"account",url:"/forgot_password",templateUrl:"components/account/forgot.password.html",data:{pageTitle:"Forgot password",specialClass:"gray-bg"}}).state("register",{controller:"AccountCtrl",controllerAs:"account",url:"/register",templateUrl:"components/account/register.html",data:{pageTitle:"Register",specialClass:"gray-bg"}})}angular.module("app").config(["$stateProvider",config])}(),function(){function Ctrl($http,$scope,$location,$state){function sendPasswordReset(email){firebase.auth().sendPasswordResetEmail(email).then(function(){$scope.message="Password Reset Email Sent!"})["catch"](function(error){var errorMessage=error.message;$scope.errorMessage=errorMessage})}var auth=firebase.auth();$scope.email="sigmasolutions@ecoverse.io",$scope.password="demo123";var sendEmailVerification=function(){auth.currentUser.sendEmailVerification().then(function(){console.log("Email Verification Sent!")})},signin=function(email,password){auth.signInWithEmailAndPassword(email,password).then(function(user){console.log(user),$state.go("index.dashboard")})["catch"](function(error){var errorCode=error.code,errorMessage=error.message;"auth/wrong-password"===errorCode?console.log("Wrong password."):console.log(errorMessage),$scope.errorMessage=errorMessage})},signup=function(email,password){auth.createUserWithEmailAndPassword(email,password).then(function(user){console.log(user),sendEmailVerification(),$state.go("index.dashboard")})["catch"](function(error){var errorMessage=error.message;$scope.errorMessage=errorMessage})};$scope.sendPasswordReset=function(){sendPasswordReset($scope.email)},$scope.signIn=function(){return auth.currentUser&&(console.log("Sign out"),auth.signOut()),$scope.password=$scope.password.trim(),$scope.email=$scope.email.trim(),$scope.email.length<1?void alert("Please enter an email address."):$scope.password.length<4?void alert("Your Password is too short"):void signin($scope.email,$scope.password)},$scope.signUp=function(){return $scope.password=$scope.password.trim(),$scope.email=$scope.email.trim(),$scope.email.length<1?void alert("Please enter an email address."):$scope.password.length<1?void alert("Please enter a password."):void signup($scope.email,$scope.password)},$scope.signOut=function(){auth.currentUser&&(auth.signOut(),$state.go("index.login"))}}angular.module("app").controller("AccountCtrl",["$http","$scope","$location","$state",Ctrl])}(),function(){function config($stateProvider){$stateProvider.state("index.dashboard",{controller:"DashboardCtrl",controllerAs:"dashboard",data:{pageTitle:"Dashboard"},resolve:{loadPlugin:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load([{files:["js/plugins/chartJs/Chart.min.js"]},{name:"angles",files:["js/plugins/chartJs/angles.js"]},{serie:!0,name:"angular-flot",files:["js/plugins/flot/jquery.flot.js","js/plugins/flot/jquery.flot.time.js","js/plugins/flot/jquery.flot.tooltip.min.js","js/plugins/flot/jquery.flot.spline.js","js/plugins/flot/jquery.flot.resize.js","js/plugins/flot/jquery.flot.pie.js","js/plugins/flot/curvedLines.js","js/plugins/flot/angular-flot.js"]},{serie:!0,files:["js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js","js/plugins/jvectormap/jquery-jvectormap-2.0.2.css"]},{serie:!0,files:["js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"]},{name:"ui.checkbox",files:["js/bootstrap/angular-bootstrap-checkbox.js"]}])}]},templateUrl:"components/dashboard/dashboard.html",url:"/dashboard"})}angular.module("app").config(["$stateProvider",config])}(),function(){function Ctrl($http,mapservice,$q){function gd(year,month,day){return new Date(year,month-1,day).getTime()}var vm=this;vm.generateMap=function(map){vm.countymap=mapservice.generateMap("js-leaflet-map",map.zoom,"data/"+map.file+".zip",map.background,map.popup,map.searchKey,map.drawable,map.featureCallback)},vm.updateMap=function(map){vm.countymap.remove(),vm.map=map,vm.generateMap(vm.map)},vm.maps=[{file:"CASGEM_Groundwater_Basin_Prioritization",title:"GroundWater Basin Prioritization",zoom:7,background:{weight:2,opacity:.65},popup:"<p>BAS_SBBSN:  {{BAS_SBBSN}} <br>DWR_Region: {{DWR_Region}} <br>Priority: {{Priority}} <br>Detailed Report: <a target='_blank' href='{{URL}}'>link <br></p>",featureCallback:function(feature,layer){var feat=feature.properties,options={};switch(feat.Priority){case"Low":options.color="green";break;case"Very Low":options.color="blue";break;case"Medium":options.color="yellow";break;case"High":options.color="orange";break;case"Very High":options.color="red"}layer.setStyle(options)},searchKey:"BAS_SBBSN",drawable:!1},{file:"County_Boundary",title:"County Boundaries",zoom:7,background:{color:"green",weight:2,opacity:.65},popup:"<p>ABBREV:  {{ABBREV}} <br>ABCODE: {{ABCODE}} <br>FM Name: {{FMNAME_PC}} <br>NAME_PCASE: {{NAME_PCASE}} <br></p>",featureCallback:null,searchKey:"NAME_PCASE",drawable:!1},{file:"ExclusiveGsaMasterSet",title:"Current GSAs",zoom:7,background:{color:"red",weight:2,opacity:.65},popup:"<p>Basin ID: {{Basin}} <br>GSA filing: <a href='http://sgma.water.ca.gov/portal/gsa/print/{{DWR GSA ID}}' target='_blank'>View</a> <br>GSA Name:  <a target='_blank' href ='{{GSA URL}} '>{{GSA Name}}  </a><br>POC Name: {{POC Name}} <br>POC Email: {{POC Email}} <br>POC Phone: {{POC Phone}} <br>Posted DT:  {{Posted DT}} <br>Local ID: {{Local ID}} <br></p>",featureCallback:null,searchKey:"Basin",drawable:!1},{file:"Groundwater_Management_Plan",title:"Current Groundwater Management Plans",zoom:7,background:{weight:2,opacity:.65},popup:"<p>Agency_Nam:  {{Agency_Nam}} <br>AQ NAME: {{AQ_NAME}} <br>Phone: {{Phone_numb}}  <br>GW Management Law: {{GW_Mgmt_Ty}}  <br>Address: {{Address_li}} {{Address__1}} <br>Plan_Year: {{Plan_Year}} <br>Plan: <a target='_blank' href='{{Plan}}'>Link</a>  <br>Site: <a target='_blank' href='{{Website}}'>{{Website}}</a>  <br>Adopt: <a target='_blank'>{{Adopt}}</a>  <br>Intent: <a target='_blank'>{{Intent}}</a> <br></p>",featureCallback:null,searchKey:"Agency_Nam",drawable:!1},{file:"B118CAGroundwaterBasins",title:"B118CA Groundwater Basins Boundaries",zoom:8,background:{weight:2,opacity:.65},popup:"<p>Basin ID: {{Basin_ID}} <br>Basin Name: {{Basin_Name}} <br>Basin_Su_1: {{Basin_Su_1}} <br>Region:  {{Region_Off}} <br>Report: {{Report}} <br></p>",featureCallback:null,searchKey:"Basin_Su_1",drawable:!1},{file:"rtn_wells",title:"Real Time Well Levels",zoom:7,background:{color:"#A9A9A9",weight:2,opacity:.65},popup:"<p>Site ID: <a target='_blank' href='https://groundwaterwatch.usgs.gov/AWLSites.asp?mt=g&S={{SITEID}}&ncd=awl'>{{SITEID}}</a> <br>County: {{COUNTY_NM}} {{STATE}} <br>Date: {{DATA_DATE}} <br>Percentile: {{PERCENTILE}} <br>Water level: {{DATA_VAL}}\" {{VERT_DATUM}} <br>Station:  {{SITEID}} <br>Station Number: {{STATION_NM}} <br></p>",featureCallback:null,searchKey:"SITEID",drawable:!1}],vm.flotData=[{label:"",grow:{stepMode:"linear"},data:[[gd(2012,1,1),7],[gd(2012,1,2),6],[gd(2012,1,3),4],[gd(2012,1,4),8],[gd(2012,1,5),9],[gd(2012,1,6),7],[gd(2012,1,7),5],[gd(2012,1,8),4],[gd(2012,1,9),7],[gd(2012,1,10),8],[gd(2012,1,11),9],[gd(2012,1,12),6],[gd(2012,1,13),4],[gd(2012,1,14),5],[gd(2012,1,15),11],[gd(2012,1,16),8],[gd(2012,1,17),8],[gd(2012,1,18),11],[gd(2012,1,19),11],[gd(2012,1,20),6],[gd(2012,1,21),6],[gd(2012,1,22),8],[gd(2012,1,23),11],[gd(2012,1,24),13],[gd(2012,1,25),7],[gd(2012,1,26),9],[gd(2012,1,27),9],[gd(2012,1,28),8],[gd(2012,1,29),5],[gd(2012,1,30),8],[gd(2012,1,31),25]],yaxis:2,color:"#0094FD",lines:{lineWidth:1,show:!0,fill:!0,fillColor:{colors:[{opacity:.2},{opacity:.2}]}}}],vm.flotOptions={grid:{hoverable:!0,clickable:!0,tickColor:"#d5d5d5",borderWidth:0,color:"#d5d5d5"},colors:["#1ab394","#464f88"],tooltip:!0,xaxis:{mode:"time",tickSize:[3,"day"],tickLength:0,axisLabel:"Date",axisLabelUseCanvas:!0,axisLabelFontSizePixels:12,axisLabelFontFamily:"Arial",axisLabelPadding:10,color:"#d5d5d5"},yaxes:[{position:"left",max:1070,color:"#d5d5d5",axisLabelUseCanvas:!0,axisLabelFontSizePixels:12,axisLabelFontFamily:"Arial",axisLabelPadding:3},{position:"right",color:"#d5d5d5",axisLabelUseCanvas:!0,axisLabelFontSizePixels:12,axisLabelFontFamily:"Arial",axisLabelPadding:67}],legend:{noColumns:1,labelBoxBorderColor:"#d5d5d5",position:"nw"}},vm.barOptions={scaleBeginAtZero:!0,scaleShowGridLines:!1,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1},vm.barData={labels:["01","02","03","04","05","06","07"],datasets:[{label:"My First dataset",fillColor:"rgba(220,220,220,0.5)",strokeColor:"rgba(220,220,220,0.8)",highlightFill:"rgba(220,220,220,0.75)",highlightStroke:"rgba(220,220,220,1)",data:[65,59,80,81,56,55,40]},{label:"My Second dataset",fillColor:"rgba(26,179,148,0.5)",strokeColor:"rgba(26,179,148,0.8)",highlightFill:"rgba(26,179,148,0.75)",highlightStroke:"rgba(26,179,148,1)",data:[28,48,40,19,86,27,90]}]},vm.doughnutData=[{value:300,color:"#a3e1d4",highlight:"#1ab394",label:"App"},{value:50,color:"#dedede",highlight:"#1ab394",label:"Software"},{value:100,color:"#A4CEE8",highlight:"#1ab394",label:"Laptop"}],vm.doughnutOptions={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:45,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1},vm.notices=[{name:"District No. 3",basin:"Modesto",basinNumber:73430,manager:"Cecilia Herrera",email:"mante.kylie@yahoo.com",date:"11-06-2017",numbers:"63"},{name:"District No. 32",basin:"Modesto",basinNumber:37675,manager:"Bobby Park",email:"estevan.beatty@gmail.com",date:"03-20-2017",numbers:"40"},{name:"District No. 78",basin:"Turlock",basinNumber:35950,manager:"Isaac Colon",email:"lefler_janice@stark.tv",date:"06-06-2017",numbers:"9"},{name:"District No. 56",basin:"Merced",basinNumber:7817,manager:"Charlier Miller",email:"cronin_karl@yahoo.com",date:"05-20-2017",numbers:"55"}],vm.map=vm.maps[0],vm.generateMap(vm.map)}angular.module("app").controller("DashboardCtrl",["$http","mapservice","$q",Ctrl])}(),function(){function config($stateProvider){$stateProvider.state("index.basinmapper",{controller:"MapCtrl",controllerAs:"map",url:"/basinmapper",templateUrl:"components/mapper/map.html",data:{pageTitle:"Maps"}})}angular.module("app").config(["$stateProvider",config])}(),function(){function Ctrl($http,$scope,mapservice){var background={weight:2,opacity:.65},popupContent="<p>Basin ID: {{Basin}} <br>GSA filing: <a href='http://sgma.water.ca.gov/portal/gsa/print/{{DWR GSA ID}}' target='_blank'>View</a> <br>GSA Name:  <a target='_blank' href ='{{GSA URL}} '>{{GSA Name}}  </a><br>POC Name: {{POC Name}} <br>POC Email: {{POC Email}} <br>POC Phone: {{POC Phone}} <br>Posted DT:  {{Posted DT}} <br>Local ID: {{Local ID}} <br></p>";this.basinsmap=mapservice.generateMap("map",8,"data/ExclusiveGsaMasterSet.zip",background,popupContent,"Basin",!0)}angular.module("app").controller("MapCtrl",["$http","$scope","mapservice",Ctrl])}(),function(){function config($stateProvider){$stateProvider.state("index.gsa",{data:{pageTitle:"GSA"},templateUrl:"components/gsa/gsa.getting-started.html",url:"/gsa-getting-started"}).state("index.gsa-forms",{controller:"GSACtrl",controllerAs:"gsa",data:{pageTitle:"GSA Forms"},templateUrl:"components/gsa/gsa.question.html",url:"/gsa-forms"})}angular.module("app").config(["$stateProvider",config])}(),function(){function Ctrl(){var vm=this;vm.faqIndex=0,vm.questionIndex=0,vm.questions=[{title:"Decision To Become A GSA",info:"Please enter the date your local agency, or agencies, decided to become or form a GSA.",template:function(){return"components/gsa/decision-to-become-gsa.html"}}],vm.faqs=[{question:"What is water code 10721?",answer:'"Local agency" means a local public agency that has water supply, water management, or land use responsibilities within a groundwater basin.'}]}angular.module("app").controller("GSACtrl",Ctrl)}(),function(){function config($stateProvider){$stateProvider.state("index.gsp",{data:{pageTitle:"gsp"},templateUrl:"components/gsp/gsp.getting-started.html",url:"/gsp-getting-started"}).state("index.gsp-forms",{controller:"GSPCtrl",controllerAs:"gsp",data:{pageTitle:"gsp Forms"},templateUrl:"components/gsp/gsp.question.html",url:"/gsp-forms"})}angular.module("app").config(["$stateProvider",config])}(),function(){function Ctrl(){var vm=this;vm.faqIndex=0,vm.questionIndex=0,vm.questions=[{title:"Decision To Become A GSP",info:"What was your groundwater usage?",template:function(){return"components/gsp/templates/start-gsa.html"}}],vm.faqs=[{question:"What is GSP?",answer:'"Local agency" means a local public agency that has water supply, water management, or land use responsibilities within a groundwater basin.'}]}angular.module("app").controller("GSPCtrl",Ctrl)}(),function(){function config($stateProvider){$stateProvider.state("index.helpcenter",{controller:"HelpCtrl",controllerAs:"helper",url:"/helpcenter",templateUrl:"components/helpcenter/base.html",data:{pageTitle:"Help Center"}})}angular.module("app").config(["$stateProvider",config])}(),function(){function Ctrl($http,$scope){$scope.section="base"}angular.module("app").controller("HelpCtrl",["$http","$scope",Ctrl])}(),function(){function config($stateProvider){$stateProvider.state("index.uploads",{controller:"UploadsCtrl",controllerAs:"uploads",url:"/gsa-uploads",templateUrl:"components/filemanager/filemanager.html",data:{pageTitle:"Uploads"}})}angular.module("app").config(["$stateProvider",config])}(),function(){function Ctrl($http,$scope,FileUploader){function writeUserData(userId,filename,size,downloadUrl,lastModified){var encodedData=window.btoa(filename),newRef=firebase.database().ref("uploads/"+userId).child(encodedData);newRef.set({name:filename,size:size,downloadUrl:downloadUrl,lastModified:lastModified})}var uploader=$scope.uploader=new FileUploader,storageRef=(firebase.auth(),firebase.storage().ref()),database=firebase.database(),recentFilesRef=database.ref("uploads/userid").limitToLast(10);$scope.uploadedFiles=[],recentFilesRef.on("child_added",function(data){var childData=data.val();$scope.uploadedFiles.push(childData),$scope.$apply()}),uploader.uploadItem=function(value){var file=value._file;storageRef.child("userid/"+file.name).put(file).then(function(snapshot){var downloadURL=snapshot.downloadURL;item.isSuccess=!0,item.isCancel=!1,item.isError=!1,writeUserData("userid",file.name,file.size,downloadURL,file.lastModified)},function(error){console.log(error)});var index=this.getIndexOfItem(value),item=this.queue[index],transport=this.isHTML5?"_xhrTransport":"_iframeTransport";item._prepareToUploading(),this.isUploading||(this._onBeforeUploadItem(item),item.isCancel||(item.isUploading=!0,this.isUploading=!0,this[transport](item),this._render()))}}angular.module("app").controller("UploadsCtrl",["$http","$scope","FileUploader",Ctrl])}();