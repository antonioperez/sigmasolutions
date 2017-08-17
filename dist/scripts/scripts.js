$(document).ready(function(){function fix_height(){var heightWithoutNavbar=$("body > #wrapper").height()-61;$(".sidebar-panel").css("min-height",heightWithoutNavbar+"px");var navbarHeight=$("nav.navbar-default").height(),wrapperHeight=$("#page-wrapper").height();navbarHeight>wrapperHeight&&$("#page-wrapper").css("min-height",navbarHeight+"px"),wrapperHeight>navbarHeight&&$("#page-wrapper").css("min-height",$(window).height()+"px"),$("body").hasClass("fixed-nav")&&(navbarHeight>wrapperHeight?$("#page-wrapper").css("min-height",navbarHeight+"px"):$("#page-wrapper").css("min-height",$(window).height()-60+"px"))}$(window).bind("load resize scroll",function(){$("body").hasClass("body-small")||fix_height()}),$(window).scroll(function(){$(window).scrollTop()>0&&!$("body").hasClass("fixed-nav")?$("#right-sidebar").addClass("sidebar-top"):$("#right-sidebar").removeClass("sidebar-top")}),setTimeout(function(){fix_height()})}),$(window).bind("load resize",function(){$(document).width()<769?$("body").addClass("body-small"):$("body").removeClass("body-small")});var config={apiKey:"AIzaSyD2IoWGPJGvJFoN5xexwNBgHVdb5kbjYzg",authDomain:"sigmasolutions-176200.firebaseapp.com",databaseURL:"https://sigmasolutions-176200.firebaseio.com",projectId:"sigmasolutions-176200",storageBucket:"sigmasolutions-176200.appspot.com",messagingSenderId:"398743798805"};firebase.initializeApp(config),function(){angular.module("app",["localytics.directives","oc.lazyLoad","ui.router","ui.bootstrap","angularFileUpload","datePicker","ngSanitize","ngCookies"])}(),function(){function config($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/login"),$stateProvider.state("index",{"abstract":!0,url:"/index",templateUrl:"components/layout/content.html"})}function statesConfig($rootScope,$state,$cookies){$rootScope.$on("$stateChangeStart",function(evt,toState,toParams){var fUser=firebase.auth().currentUser,user=$cookies.get("user");null!=user&&(fUser=user),fUser||"login"!==toState.name&&(evt.preventDefault(),$state.go("login"))})}angular.module("app").config(["$stateProvider","$urlRouterProvider",config]).run(["$rootScope","$state",function($rootScope,$state){$rootScope.$state=$state}]).run(["$rootScope","$state","$cookies",statesConfig])}(),function(){function pageTitle($rootScope,$timeout){return{link:function(scope,element){var listener=function(event,toState,toParams,fromState,fromParams){var title="SGMA Solutions | Ecoverse";toState.data&&toState.data.pageTitle&&(title="SGMA | "+toState.data.pageTitle),$timeout(function(){element.text(title)})};$rootScope.$on("$stateChangeStart",listener)}}}function sideNavigation($timeout){return{restrict:"A",link:function(scope,element){$timeout(function(){element.metisMenu()});var menuElement=$('#side-menu a:not([href$="\\#"])');if(menuElement.click(function(){$(window).width()<769&&$("body").toggleClass("mini-navbar")}),$("body").hasClass("fixed-sidebar")){var sidebar=element.parent();sidebar.slimScroll({height:"100%",railOpacity:.9})}}}}function iboxTools($timeout){return{restrict:"A",scope:!0,templateUrl:"components/layout/ibox_tools.html",controller:["$scope","$element",function($scope,$element){$scope.showhide=function(){var ibox=$element.closest("div.ibox"),icon=$element.find("i:first"),content=ibox.children(".ibox-content");content.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),ibox.toggleClass("").toggleClass("border-bottom"),$timeout(function(){ibox.resize(),ibox.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var ibox=$element.closest("div.ibox");ibox.remove()}}]}}function minimalizaSidebar($timeout){return{restrict:"A",template:'<a class="navbar-minimalize minimalize-styl-2 btn" href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',controller:["$scope","$element",function($scope,$element){$scope.minimalize=function(){$("body").toggleClass("mini-navbar"),!$("body").hasClass("mini-navbar")||$("body").hasClass("body-small")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},200)):$("body").hasClass("fixed-sidebar")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},100)):$("#side-menu").removeAttr("style")}}]}}function iboxToolsFullScreen($timeout){return{restrict:"A",scope:!0,templateUrl:"components/layout/ibox_tools_full_screen.html",controller:["$scope","$element",function($scope,$element){$scope.showhide=function(){var ibox=$element.closest("div.ibox"),icon=$element.find("i:first"),content=ibox.children(".ibox-content");content.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),ibox.toggleClass("").toggleClass("border-bottom"),$timeout(function(){ibox.resize(),ibox.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var ibox=$element.closest("div.ibox");ibox.remove()},$scope.fullscreen=function(){var ibox=$element.closest("div.ibox"),button=$element.find("i.fa-expand");$("body").toggleClass("fullscreen-ibox-mode"),button.toggleClass("fa-expand").toggleClass("fa-compress"),ibox.toggleClass("fullscreen"),setTimeout(function(){$(window).trigger("resize")},100)}}]}}angular.module("app").directive("pageTitle",["$rootScope","$timeout",pageTitle]).directive("sideNavigation",["$timeout",sideNavigation]).directive("iboxTools",["$timeout",iboxTools]).directive("minimalizaSidebar",["$timeout",minimalizaSidebar]).directive("iboxToolsFullScreen",["$timeout",iboxToolsFullScreen])}(),function(){angular.module("app").service("gsaservice",function($http){var self=this,API_URL="https://gateway-tx-1.thriftly.io/dev/ep7e2f46/GSAService/",getRandomIntInclusive=function(min,max){return min=Math.ceil(min),max=Math.floor(max),Math.floor(Math.random()*(max-min+1))+min};self.getGSAs=function(name,pageSize,pageOffset,callback){var data={jsonrpc:"2.0",id:getRandomIntInclusive(0,100),method:"getGSAs",params:{search:{name:name,pageSize:pageSize,pageOffset:pageOffset}}};$http({method:"POST",data:data,url:API_URL}).then(function(response){callback&&callback(response.data.result)},function(response){console.log(API_URL+" "+response)})},self.getDemoGSA=function(){return[{id:"dcfd4070-789c-4a2b-983a-c57c76c8a160",name:"Alameda County Flood Control and Water Conservation District (Zone 7 Water Agency) - Non-Exclusive Portion",contact:"Carol Mahoney\n925-454-5064\ncmahoney@zone7water.com",contact_info:"100 North Canyons Parkway\nLivermore, CA 94551-9486",website:"",exclusive:"Exclusive",basin_number:"2-010",basin_name:"LIVERMORE VALLEY",region:"NCRO",county:"Contra Costa",posted:"2017-02-03T07:00:00Z",postedPlus90:"2017-05-04T07:00:00Z",received:"2017-01-20T07:00:00Z",receivedPlus15:"2017-02-04T07:00:00Z"},{id:"f994ee6b-878f-4117-af35-94c0a12a3c58",name:"Alameda County Water District",contact:"Michelle Myers\nGroundwater Resources Manager\n510-668-4454\nmichelle.myers@acwd.com",contact_info:"43885 South Grimmer Boulevard\nFremont, CA 94538",website:"",exclusive:"Exclusive",basin_number:"2-009.01",basin_name:"NILES CONE",region:"NCRO",county:"Alameda",posted:"2016-12-02T07:00:00Z",postedPlus90:"2017-03-02T07:00:00Z",received:"2016-11-18T07:00:00Z",receivedPlus15:"2016-12-03T07:00:00Z"},{id:"1fdc9fe4-201e-43bc-a774-b65c7737f480",name:"Aliso Water District",contact:"Roy Capania\nAliso GSO POC\n559-779-2616\nroy@oneilag.com",contact_info:"10302 Avenue 7-1/2\nFirebaugh, CA 93622",website:"",exclusive:"Exclusive",basin_number:"5-022.07",basin_name:"DELTA-MENDOTA",region:"SCRO",county:"Madera",posted:"2016-05-11T07:00:00Z",postedPlus90:"2016-08-09T07:00:00Z",received:"2016-05-03T07:00:00Z",receivedPlus15:"2016-05-18T07:00:00Z"},{id:"6c1ee354-67d4-4077-a589-2f430df2a60a",name:"Alpaugh Groundwater Sustainability Agency",contact:"David Kahn\nAttorney\n559-584-3337\ndkahn@kschanford.com",contact_info:"219 N. Douty Street\nHanford, CA 93230",website:"",exclusive:"Overlap",basin_number:"5-022.13",basin_name:"TULE",region:"SCRO",county:"Tulare",posted:"2016-06-17T07:00:00Z",postedPlus90:"2016-09-15T07:00:00Z",received:"2016-06-03T07:00:00Z",receivedPlus15:"2016-06-18T07:00:00Z"}]}})}(),function(){function MainCtrl(){var vm=this;vm.userName="Jon Snow"}angular.module("app").controller("MainCtrl",MainCtrl)}(),function(){angular.module("app").service("mapservice",function($http){var self=this,defaultCenter=[36.8,-120],CONVERTER_URL="http://sgma.ecoverse.io/mapper/convertJson";self.generateMap=function(mapId,zoom,zipPath,backgroundOptions,popupContent,searchKey,addDrawingOptions,customFeatureCallback){$("#"+mapId).css("width","100%"),$("#"+mapId).css("height","500px");var map=L.map(mapId,{zoomControl:!1}).setView(defaultCenter,zoom),zoomHome=(L.esri.basemapLayer("Topographic").addTo(map),L.Control.zoomHome());zoomHome.addTo(map);var options={searchKey:searchKey,addDrawingOptions:addDrawingOptions,backgroundOverlayStyle:backgroundOptions,popupContent:popupContent,customFeatureCallback:customFeatureCallback};return self.loadShapefile(map,zipPath,options),map},self.loadShapefile=function(map,zipPath,options){shp(zipPath).then(function(geojson){geoj=geojson.features;var stateCheck=geoj[0].properties.STATE;if(stateCheck)for(var i in geoj)stateCheck=geoj[i].properties.STATE,"CA"!=stateCheck&&(geoj[i]=void 0);var geoj=geoj.filter(function(val){return val}),featuresLayer=L.geoJSON(geoj,{style:options.backgroundOverlayStyle,onEachFeature:function(feature,layer){options.popupContent&&self.onEachFeature(feature,layer,options.popupContent,options.customFeatureCallback)}});return map.addLayer(featuresLayer),options.searchKey&&self.addSearchControls(map,options.searchKey,featuresLayer),options.addDrawingOptions&&self.addDrawControls(map,featuresLayer),map})},self.genGuid=function(){var date=(new Date).getTime(),uuid="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(char){var rand=(date+16*Math.random())%16|0;return date=Math.floor(date/16),("x"==char?rand:3&rand|8).toString(16)});return uuid},self.downloadFile=function(url,payload,callback){var xhr=new XMLHttpRequest;xhr.open("POST",url,!0),xhr.responseType="arraybuffer",xhr.onload=function(){if(200===this.status){var filename="";filename=payload.outputName?payload.outputName:self.genGuid(),filename.indexOf(!1)&&(filename+=".zip");var type=xhr.getResponseHeader("Content-Type"),blob=new Blob([this.response],{type:type});if("undefined"!=typeof window.navigator.msSaveBlob)window.navigator.msSaveBlob(blob,filename);else{var URL=window.URL||window.webkitURL,downloadUrl=URL.createObjectURL(blob);if(filename){var atag=document.createElement("a");"undefined"==typeof atag.download?window.location=downloadUrl:(atag.href=downloadUrl,atag.download=filename,document.body.appendChild(atag),atag.click())}else window.location=downloadUrl;setTimeout(function(){URL.revokeObjectURL(downloadUrl)},100),callback&&callback()}}},xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"),xhr.send($.param(payload))},self.onEachFeature=function(feature,layer,popupContent,customFeatureCallback){var props=feature.properties;customFeatureCallback&&customFeatureCallback(feature,layer);var template=popupContent,keys=template.match(/[^{]+(?=\}})/g);if(keys.length>0)for(var k in keys){var key=keys[k];template=template.replace("{{"+key+"}}",props[key])}feature.properties&&feature.properties.popupContent&&(template+=feature.properties.popupContent),layer.bindPopup(template)},self.addDrawControls=function(map,featuresLayer){var drawnItems=new L.FeatureGroup;map.addLayer(drawnItems);var drawControl=new L.Control.Draw({position:"topright",draw:{polyline:!0,polygon:!0,circle:!1,marker:!0},edit:{featureGroup:drawnItems,remove:!0}});map.addControl(drawControl),map.on(L.Draw.Event.CREATED,function(e){var layer=(e.layerType,e.layer);drawnItems.addLayer(layer)}),map.on(L.Draw.Event.EDITED,function(e){var layers=e.layers,countOfEditedLayers=0;layers.eachLayer(function(layer){countOfEditedLayers++});var data=featuresLayer.toGeoJSON();if(data=JSON.stringify(data),filename=$("#js-fileName").val(),payload={json:data,outputName:filename},progressBar=$("#js-map-progress-bar"),doneProcessing=null,progressBar){var percentVal=0,interval=setInterval(function(){100>=percentVal?(progressBar.css("width",percentVal+"%").attr("aria-valuenow",percentVal),percentVal+=.5,percentVal=Math.round(percentVal)):percentVal>100&&(percentVal=0)},50);doneProcessing=function(){clearInterval(interval),progressBar.css("width","0%").attr("aria-valuenow",0)}}self.downloadFile(CONVERTER_URL,payload,doneProcessing)})},self.addSearchControls=function(map,searchKey,featuresLayer){var searchControl=new L.Control.Search({layer:featuresLayer,propertyName:searchKey,marker:!1,moveToLocation:function(latlng,title,map){var zoom=map.getBoundsZoom(latlng.layer.getBounds());map.setView(latlng,zoom)}});searchControl.on("search:locationfound",function(e){e.layer.setStyle({fillColor:"#3f0",color:"#0f0"}),e.layer._popup&&e.layer.openPopup()}).on("search:collapsed",function(e){featuresLayer.eachLayer(function(layer){featuresLayer.resetStyle(layer)})}),map.addControl(searchControl)}})}(),function(){function config($stateProvider){$stateProvider.state("login",{url:"/login",controller:"AccountCtrl",controllerAs:"account",templateUrl:"components/account/login.html",data:{pageTitle:"Login"}}).state("forgot_password",{controller:"AccountCtrl",controllerAs:"account",url:"/forgot_password",templateUrl:"components/account/forgot.password.html",data:{pageTitle:"Forgot password",specialClass:"gray-bg"}}).state("register",{controller:"AccountCtrl",controllerAs:"account",url:"/register",templateUrl:"components/account/register.html",data:{pageTitle:"Register",specialClass:"gray-bg"}})}angular.module("app").config(["$stateProvider",config])}(),function(){function Ctrl($http,$scope,$location,$state,$cookies){function sendPasswordReset(email){firebase.auth().sendPasswordResetEmail(email).then(function(){$scope.message="Password Reset Email Sent!"})["catch"](function(error){var errorMessage=error.message;$scope.errorMessage=errorMessage})}var auth=firebase.auth();$scope.email="sigmasolutions@ecoverse.io",$scope.password="demo123";var sendEmailVerification=function(){auth.currentUser.sendEmailVerification().then(function(){console.log("Email Verification Sent!")})},signin=function(email,password){auth.signInWithEmailAndPassword(email,password).then(function(user){$cookies.put("user",user),$state.go("index.dashboard")})["catch"](function(error){var errorCode=error.code,errorMessage=error.message;"auth/wrong-password"===errorCode?console.log("Wrong password."):console.log(errorMessage),$scope.errorMessage=errorMessage})},signup=function(email,password){auth.createUserWithEmailAndPassword(email,password).then(function(user){sendEmailVerification(),$cookies.put("user",user),$state.go("index.dashboard")})["catch"](function(error){var errorMessage=error.message;$scope.errorMessage=errorMessage})};$scope.sendPasswordReset=function(){sendPasswordReset($scope.email)},$scope.signIn=function(){return auth.currentUser&&auth.signOut(),$scope.password=$scope.password.trim(),$scope.email=$scope.email.trim(),$scope.email.length<1?void alert("Please enter an email address."):$scope.password.length<4?void alert("Your Password is too short"):void signin($scope.email,$scope.password)},$scope.signUp=function(){return $scope.password=$scope.password.trim(),$scope.email=$scope.email.trim(),$scope.email.length<1?void alert("Please enter an email address."):$scope.password.length<1?void alert("Please enter a password."):void signup($scope.email,$scope.password)},$scope.signOut=function(){auth.currentUser&&(auth.signOut(),$cookies.remove("user"),$state.go("index.login"))}}angular.module("app").controller("AccountCtrl",["$http","$scope","$location","$state","$cookies",Ctrl])}(),function(){function config($stateProvider){$stateProvider.state("index.dashboard",{controller:"DashboardCtrl",controllerAs:"dashboard",data:{pageTitle:"Dashboard"},resolve:{loadPlugin:["$ocLazyLoad",function($ocLazyLoad){return $ocLazyLoad.load([{name:"angles",files:["js/plugins/chartJs/angles.js"]},{files:["js/plugins/chartJs/Chart.min.js"]},{serie:!0,name:"angular-flot",files:["js/plugins/flot/jquery.flot.js","js/plugins/flot/jquery.flot.time.js","js/plugins/flot/jquery.flot.tooltip.min.js","js/plugins/flot/jquery.flot.spline.js","js/plugins/flot/jquery.flot.resize.js","js/plugins/flot/jquery.flot.pie.js","js/plugins/flot/curvedLines.js","js/plugins/flot/angular-flot.js"]},{serie:!0,files:["js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js","js/plugins/jvectormap/jquery-jvectormap-2.0.2.css"]},{serie:!0,files:["js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"]},{name:"ui.checkbox",files:["js/bootstrap/angular-bootstrap-checkbox.js"]},{serie:!0,files:["css/plugins/c3/c3.min.css","js/plugins/d3/d3.min.js","js/plugins/c3/c3.min.js"]},{serie:!0,name:"gridshore.c3js.chart",files:["js/plugins/c3/c3-angular.min.js"]}])}]},templateUrl:"components/dashboard/dashboard.html",url:"/dashboard"})}angular.module("app").config(["$stateProvider",config])}(),function(){function Ctrl($http,gsaservice,mapservice){function gd(year,month,day){return new Date(year,month-1,day).getTime()}var vm=this;vm.progressData={max:100,current:60,color:"#56BD5B"},vm.generateMap=function(map){vm.countymap=mapservice.generateMap("js-leaflet-map",map.zoom,"data/"+map.file+".zip",map.background,map.popup,map.searchKey,map.drawable,map.featureCallback)},vm.updateMap=function(map){vm.countymap.remove(),vm.map=map,vm.generateMap(vm.map)},vm.maps=[{file:"CASGEM_Groundwater_Basin_Prioritization",title:"GroundWater Basin Prioritization",zoom:7,background:{weight:2,opacity:.65},popup:"<p>BAS_SBBSN:  {{BAS_SBBSN}} <br>DWR_Region: {{DWR_Region}} <br>Priority: {{Priority}} <br>Detailed Report: <a target='_blank' href='{{URL}}'>link <br></p>",featureCallback:function(feature,layer){var feat=feature.properties,options={};switch(feat.Priority){case"Low":options.color="green";break;case"Very Low":options.color="blue";break;case"Medium":options.color="yellow";break;case"High":options.color="orange";break;case"Very High":options.color="red"}layer.setStyle(options)},searchKey:"BAS_SBBSN",drawable:!1},{file:"County_Boundary",title:"County Boundaries",zoom:7,background:{color:"green",weight:2,opacity:.65},popup:"<p>ABBREV:  {{ABBREV}} <br>ABCODE: {{ABCODE}} <br>FM Name: {{FMNAME_PC}} <br>NAME_PCASE: {{NAME_PCASE}} <br></p>",featureCallback:null,searchKey:"NAME_PCASE",drawable:!1},{file:"ExclusiveGsaMasterSet",title:"Current GSAs",zoom:7,background:{color:"red",weight:2,opacity:.65},popup:"<p>Basin ID: {{Basin}} <br>GSA filing: <a href='http://sgma.water.ca.gov/portal/gsa/print/{{DWR GSA ID}}' target='_blank'>View</a> <br>GSA Name:  <a target='_blank' href ='{{GSA URL}} '>{{GSA Name}}  </a><br>POC Name: {{POC Name}} <br>POC Email: {{POC Email}} <br>POC Phone: {{POC Phone}} <br>Posted DT:  {{Posted DT}} <br>Local ID: {{Local ID}} <br></p>",featureCallback:null,searchKey:"Basin",drawable:!1},{file:"Groundwater_Management_Plan",title:"Current Groundwater Management Plans",zoom:7,background:{weight:2,opacity:.65},popup:"<p>Agency_Nam:  {{Agency_Nam}} <br>AQ NAME: {{AQ_NAME}} <br>Phone: {{Phone_numb}}  <br>GW Management Law: {{GW_Mgmt_Ty}}  <br>Address: {{Address_li}} {{Address__1}} <br>Plan_Year: {{Plan_Year}} <br>Plan: <a target='_blank' href='{{Plan}}'>Link</a>  <br>Site: <a target='_blank' href='{{Website}}'>{{Website}}</a>  <br>Adopt: <a target='_blank'>{{Adopt}}</a>  <br>Intent: <a target='_blank'>{{Intent}}</a> <br></p>",featureCallback:null,searchKey:"Agency_Nam",drawable:!1},{file:"B118CAGroundwaterBasins",title:"B118CA Groundwater Basins Boundaries",zoom:8,background:{weight:2,opacity:.65},popup:"<p>Basin ID: {{Basin_ID}} <br>Basin Name: {{Basin_Name}} <br>Basin_Su_1: {{Basin_Su_1}} <br>Region:  {{Region_Off}} <br>Report: {{Report}} <br></p>",featureCallback:null,searchKey:"Basin_Su_1",drawable:!1},{file:"rtn_wells",title:"Real Time Well Levels",zoom:7,background:{color:"#A9A9A9",weight:2,opacity:.65},popup:"<p>Site ID: <a target='_blank' href='https://groundwaterwatch.usgs.gov/AWLSites.asp?mt=g&S={{SITEID}}&ncd=awl'>{{SITEID}}</a> <br>County: {{COUNTY_NM}} {{STATE}} <br>Date: {{DATA_DATE}} <br>Percentile: {{PERCENTILE}} <br>Water level: {{DATA_VAL}}\" {{VERT_DATUM}} <br>Station:  {{SITEID}} <br>Station Number: {{STATION_NM}} <br></p>",featureCallback:null,searchKey:"SITEID",drawable:!1}],vm.flotData=[{label:"",grow:{stepMode:"linear"},data:[[gd(2012,1,1),7],[gd(2012,1,2),6],[gd(2012,1,3),4],[gd(2012,1,4),8],[gd(2012,1,5),9],[gd(2012,1,6),7],[gd(2012,1,7),5],[gd(2012,1,8),4],[gd(2012,1,9),7],[gd(2012,1,10),8],[gd(2012,1,11),9],[gd(2012,1,12),6],[gd(2012,1,13),4],[gd(2012,1,14),5],[gd(2012,1,15),11],[gd(2012,1,16),8],[gd(2012,1,17),8],[gd(2012,1,18),11],[gd(2012,1,19),11],[gd(2012,1,20),6],[gd(2012,1,21),6],[gd(2012,1,22),8],[gd(2012,1,23),11],[gd(2012,1,24),13],[gd(2012,1,25),7],[gd(2012,1,26),9],[gd(2012,1,27),9],[gd(2012,1,28),8],[gd(2012,1,29),5],[gd(2012,1,30),8],[gd(2012,1,31),25]],yaxis:2,color:"#0094FD",lines:{lineWidth:1,show:!0,fill:!0,fillColor:{colors:[{opacity:.2},{opacity:.2}]}}}],vm.flotOptions={grid:{hoverable:!0,clickable:!0,tickColor:"#d5d5d5",borderWidth:0,color:"#d5d5d5"},colors:["#1ab394","#464f88"],tooltip:!0,xaxis:{mode:"time",tickSize:[3,"day"],tickLength:0,axisLabel:"Date",axisLabelUseCanvas:!0,axisLabelFontSizePixels:12,axisLabelFontFamily:"Arial",axisLabelPadding:10,color:"#d5d5d5"},yaxes:[{position:"left",max:1070,color:"#d5d5d5",axisLabelUseCanvas:!0,axisLabelFontSizePixels:12,axisLabelFontFamily:"Arial",axisLabelPadding:3},{position:"right",color:"#d5d5d5",axisLabelUseCanvas:!0,axisLabelFontSizePixels:12,axisLabelFontFamily:"Arial",axisLabelPadding:67}],legend:{noColumns:1,labelBoxBorderColor:"#d5d5d5",position:"nw"}},vm.barOptions={scaleBeginAtZero:!0,scaleShowGridLines:!1,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1},vm.barData={labels:["01","02","03","04","05","06","07"],datasets:[{label:"My First dataset",fillColor:"rgba(220,220,220,0.5)",strokeColor:"rgba(220,220,220,0.8)",highlightFill:"rgba(220,220,220,0.75)",highlightStroke:"rgba(220,220,220,1)",data:[65,59,80,81,56,55,40]},{label:"My Second dataset",fillColor:"rgba(26,179,148,0.5)",strokeColor:"rgba(26,179,148,0.8)",highlightFill:"rgba(26,179,148,0.75)",highlightStroke:"rgba(26,179,148,1)",data:[28,48,40,19,86,27,90]}]},vm.doughnutData=[{value:250,color:"#0294FF",highlight:"#007BE6",label:"Enough"},{value:100,color:"#F7B422",highlight:"#DE9B09",label:"Insufficient"},{value:75,color:"#E34C4C",highlight:"#CA3333",label:"Dry"}],vm.doughnutOptions={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:45,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1},vm.notices=[{name:"District No. 3",basin:"Modesto",basinNumber:73430,manager:"Cecilia Herrera",email:"mante.kylie@yahoo.com",date:"11-06-2017",numbers:"63"}],vm.lineOptions={series:{lines:{show:!0,lineWidth:2,fill:!0,fillColor:{colors:[{opacity:0},{opacity:0}]}}},xaxis:{tickDecimals:0},colors:["#1ab394"],grid:{color:"#999999",hoverable:!0,clickable:!0,tickColor:"#D4D4D4",borderWidth:0},legend:{show:!1},tooltip:!0,tooltipOpts:{content:"x: %x, y: %y"}},vm.lineData={labels:["January","February","March","April","May","June","July"],datasets:[{label:"Example dataset",fillColor:"rgba(220,220,220,0.5)",strokeColor:"rgba(220,220,220,1)",pointColor:"rgba(220,220,220,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(220,220,220,1)",data:[65,59,80,81,56,55,40]},{label:"Example dataset",fillColor:"rgba(26,179,148,0.5)",strokeColor:"rgba(26,179,148,0.7)",pointColor:"rgba(26,179,148,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(26,179,148,1)",data:[28,48,40,19,86,27,90]}]},vm.notices=gsaservice.getDemoGSA(),vm.map=vm.maps[0],vm.generateMap(vm.map)}angular.module("app").controller("DashboardCtrl",["$http","gsaservice","mapservice",Ctrl])}(),function(){function config($stateProvider){$stateProvider.state("index.basinmapper",{controller:"MapCtrl",controllerAs:"map",url:"/basinmapper",templateUrl:"components/mapper/map.html",data:{pageTitle:"Maps"}})}angular.module("app").config(["$stateProvider",config])}(),function(){function Ctrl($http,$scope,mapservice){var background={weight:2,opacity:.65},popupContent="<p>Basin ID: {{Basin}} <br>GSA filing: <a href='http://sgma.water.ca.gov/portal/gsa/print/{{DWR GSA ID}}' target='_blank'>View</a> <br>GSA Name:  <a target='_blank' href ='{{GSA URL}} '>{{GSA Name}}  </a><br>POC Name: {{POC Name}} <br>POC Email: {{POC Email}} <br>POC Phone: {{POC Phone}} <br>Posted DT:  {{Posted DT}} <br>Local ID: {{Local ID}} <br></p>";this.basinsmap=mapservice.generateMap("map",8,"data/ExclusiveGsaMasterSet.zip",background,popupContent,"Basin",!0)}angular.module("app").controller("MapCtrl",["$http","$scope","mapservice",Ctrl])}(),function(){function config($stateProvider){$stateProvider.state("index.gsa",{data:{pageTitle:"GSA"},templateUrl:"components/gsa/gsa.getting-started.html",url:"/gsa-getting-started"}).state("index.gsa-forms",{controller:"GSACtrl",controllerAs:"gsa",data:{pageTitle:"GSA Forms"},templateUrl:"components/gsa/gsa.question.html",url:"/gsa-forms"})}angular.module("app").config(["$stateProvider",config])}(),function(){function Ctrl($http,FileUploader){function writeUserData(userId,filename,size,downloadUrl,lastModified){var encodedData=window.btoa(filename),newRef=database.ref("uploads/"+userId).child(encodedData);newRef.set({name:filename,size:size,downloadUrl:downloadUrl,lastModified:lastModified})}var vm=this,uploader=vm.uploader=new FileUploader,auth=firebase.auth(),storageRef=firebase.storage().ref(),database=firebase.database(),user=auth.currentUser;vm.options=["Alameda County Flood Control and Water Conservation District, Zone 7","Alameda County Water District","Desert Water Agency","Fox Canyon Groundwater Management Agency","Honey Lake Valley Groundwater Management District","Kings River East Groundwater Sustainability Agency","Long Valley Groundwater Management District","Mendocino City Community Services District","Mono County Tri-Valley Groundwater Management District","Monterey Peninsula Water Management District","North Fork Kings Groundwater Sustainability Agency","Ojai Groundwater Management Agency","Orange County Water District","Pajaro Valley Water Management Agency","Santa Clara Valley Water District","Sierra Valley Groundwater Management District","Willow Creek Groundwater Management Agency"],vm.answers={},vm.percent=0,vm.sectionIndex=0,vm.questionIndex=0,vm.questionTop=[],vm.activeTitle="",vm.activeQuestion={},uploader.uploadItem=function(value){var self=this,file=value._file;storageRef.child(user.uid+"/"+file.name).put(file).then(function(snapshot){var downloadURL=snapshot.downloadURL;item.isSuccess=!0,item.isCancel=!1,item.isError=!1,writeUserData(user.uid,file.name,file.size,downloadURL,file.lastModified),vm.activeQuestion.value=downloadURL,vm.fillAnswer(),self._render()},function(error){console.log(error)});var index=this.getIndexOfItem(value),item=this.queue[index],transport=this.isHTML5?"_xhrTransport":"_iframeTransport";item._prepareToUploading(),this.isUploading||(this._onBeforeUploadItem(item),item.isCancel||(item.isUploading=!0,this.isUploading=!0,this[transport](item),this._render()))},vm.questions=[{id:"1.1",info:"Are you a local agency eligible to form a groundwater sustainable agency as per water code 10721 and water code 10723?",questionKey:"Eligible Agency",template:function(){return"components/gsa/1.1.html"},faqs:[{question:"What is water code 10721?",answer:'"Local agency" means a local public agency that has water supply, water management, or land use responsibilities within a groundwater basin.'},{question:"What is water code 10723?",answer:"Any local agency or combination of local agencies overlying a groundwater basin may decide to become a GSA for that basin."}],moreAction:{id:"1.1.0",questionKey:"Alternative Plan",info:"Formation of a GSA is not necessary if a local agency plans to submit an Alternative Plan for an entire basin by January 1, 2017. Additional information about GSAs and the requirement to develop groundwater sustainability plans (GSPs) by 2020 or 2022, or Alternative Plans by 2017, is available on DWR’s Sustainable Groundwater Management website included here: http://water.ca.gov/groundwater/sgm/index.cfm",template:function(){return"components/gsa/1.1.0.html"},faqs:[]}},{id:"1.0.1",info:"Are you considered an exclusive agency?",questionKey:"Exclusive Agency",template:function(){return"components/gsa/1.0.1.html"},faqs:[],jumpTo:"1.2"},{id:"1.0",info:"",questionKey:"Select Exclusive Agency",template:function(){return"components/gsa/1.0.html"},faqs:[]},{id:"1.2",questionKey:"Multiple Agencies",info:"Are you going to form a GSA with multiple local agencies?",template:function(){return"components/gsa/1.2.html"},faqs:[],moreAction:{id:"1.3",questionKey:"Multiple Agencies Legal Agreement",info:"Upload Joint Powers Agreeement, Memorandum of Agreement or Coordination Agreement",template:function(){return"components/gsa/1.3.html"},faqs:[{question:"What are these forms?",answer:"SGMA allows multiple local agencies to act as a single GSA through a memorandum of agreement (MOA), a joint powers agreement (JPA), or any other legal agreement (California Water Code, Section [§] 10723.6"}]}}],vm.questions2=[{id:"2.0",info:"",questionKey:"Contact",template:function(){return"components/gsa/2.0.html"},faqs:[]},{id:"2.1",questionKey:"Creation Date",info:"Please enter or select the date when your agency declared its GSA status:",template:function(){return"components/gsa/2.1.html"},faqs:[{question:"When is the decision date determined?",answer:"A local agency must notify the Department of Water Resources (DWR) of their intent to undertake sustainable groundwater management within 30 days. Based on your decision date"}]},{questionKey:"GSA Descrip",id:"2.2",info:"Describe your GSA",template:function(){return"components/gsa/2.2.html"},faqs:[]},{questionKey:"GSA Basins",id:"2.3",info:"If you become a GSA in multiple basins, you may need to coordinate with other GSAs to develop/implement GSPs in multiple basins",template:function(){return"components/gsa/2.3.html"},faqs:[]},{questionKey:"Basin Boundary",id:"1.4",info:"GSA formation requires identification of the basin or the portion of a basin that your local agency (or agencies based on previous questions) intends to manage. The area your agency will manage should be constrained within a basin's boundaries. Exclusivity will only apply to the area within the service area (or collective service areas) of the local agency or agencies forming the GSA. Service area shape file reflects the boundaries of a single local agency (or collective service area boundaries",template:function(){return"components/gsa/1.4.html"},faqs:[{question:"Basin Boundary Guidelines",answer:"The area your agency will manage should be constrained within a basin's boundaries"},{question:"Service Area Guidelines",answer:'"A service area shapefile attribute table should contain one record in the attribute table per service area. Include at least one field in the attribute table that identifies the name of the local agency.'}]},{questionKey:"Interested Party",id:"1.6",info:"Interested parties means users that the GSA will allocate groundwater to and explain how the interested parties interests/needs will be considered when operating the GSAand how it will be implemented in the design/implementationof the GSP",template:function(){return"components/gsa/2.2.html"},faqs:[{question:"Who is considered an interested party?",answer:"<br> 1. Agricultural users. <br> 2. Domestic well owners. <br> 3. Municpal well operators. <br> 4. Public Water Systems <br> 5. Local land use planning agencies. <br> 6. Environmental users of groundwater. <br> 7. Surface water users. "}]},{questionKey:"Adopted Laws",id:"1.6",
info:"Copies of any new by laws, ordinances or new authorities adopted by your agency. ",template:function(){return"components/gsa/1.3.html"},faqs:[]}],vm.sections=[{title:"Becoming a GSA",questions:vm.questions},{title:"Select Contact Person",questions:vm.questions2}];var sectionsPercent=function(){var sectionsNum=vm.sections.length;return sectionsNum?100/sectionsNum:1},percentPadder=sectionsPercent();vm.setView=function(question){vm.questionTop.push(question),vm.activeQuestion=question},vm.fillAnswer=function(){if(vm.activeQuestion){var markupStr=$("#summernote").summernote("code"),answer="";answer="string"==typeof markupStr?markupStr:vm.activeQuestion.value;var questionKey=vm.activeQuestion.questionKey;vm.answers[questionKey]=answer}},vm.setMoreAction=function(val){vm.activeQuestion.more=val},vm.init=function(){vm.activeTitle=vm.sections[vm.sectionIndex].title;var question=vm.sections[vm.sectionIndex].questions[vm.questionIndex];vm.setView(question)},vm.init(),vm.nextQuestion=function(){vm.fillAnswer();var question=(vm.sections[vm.sectionIndex].questions.length,vm.activeQuestion),jump=question.jumpTo;if(null!=jump){var questions=vm.sections[vm.sectionIndex].questions,index=questions.map(function(quest){return quest.id}).indexOf(jump);console.log(index),vm.questionIndex=index,question=vm.sections[vm.sectionIndex].questions[index],vm.setView(question)}else if(vm.activeQuestion.more)vm.activeQuestion.more=!1,vm.setView(vm.activeQuestion.moreAction);else{var nextIndex=vm.questionIndex+1,question=vm.sections[vm.sectionIndex].questions[nextIndex],isNextSection=vm.sections[vm.sectionIndex+1];question?(vm.questionIndex+=1,vm.setView(question)):isNextSection?(vm.questionIndex+=1,vm.percent+=percentPadder,vm.sectionIndex+=1,vm.questionIndex=0,vm.init()):(vm.percent=100,vm.questionIndex+=1,vm.setView({id:"DONE",questionKey:"Review",info:"Please Review Your GSA Answers!",template:function(){return"components/gsa/gsa.review.html"}}),vm.showAnswers())}},vm.changeValue=function(val,isMoreAction){isMoreAction?vm.setMoreAction(isMoreAction):(vm.setMoreAction(isMoreAction),vm.activeQuestion.jumpTo=null),vm.activeQuestion.value=val},vm.goBack=function(){if(console.log(vm.sectionIndex),console.log(vm.questionIndex),vm.sectionIndex>=1&vm.questionIndex<1)vm.percent-=percentPadder,vm.sectionIndex-=1,vm.questionIndex=vm.sections[vm.sectionIndex].questions.length-1,vm.init();else{vm.questionTop.pop(),vm.questionIndex=vm.questionTop.length-1;var question=vm.sections[vm.sectionIndex].questions[vm.questionIndex];vm.activeQuestion=question}},vm.showAnswers=function(){console.log(vm.answers)}}angular.module("app").controller("GSACtrl",["$http","FileUploader",Ctrl])}(),function(){function config($stateProvider){$stateProvider.state("index.gsp",{data:{pageTitle:"gsp"},templateUrl:"components/gsp/gsp.getting-started.html",url:"/gsp-getting-started"})}angular.module("app").config(["$stateProvider",config])}(),function(){function Ctrl(){var vm=this;vm.faqIndex=0,vm.questionIndex=0,vm.questions=[{title:"Decision To Become A GSP",info:"What was your groundwater usage?",template:function(){return"components/gsp/start-gsa.html"}}],vm.faqs=[{question:"What is GSP?",answer:'"Local agency" means a local public agency that has water supply, water management, or land use responsibilities within a groundwater basin.'}]}angular.module("app").controller("GSPCtrl",Ctrl)}(),function(){function config($stateProvider){$stateProvider.state("index.helpcenter",{controller:"HelpCtrl",controllerAs:"helper",url:"/helpcenter",templateUrl:"components/helpcenter/base.html",data:{pageTitle:"Help Center"}})}angular.module("app").config(["$stateProvider",config])}(),function(){function Ctrl($http,$scope){$scope.section="base"}angular.module("app").controller("HelpCtrl",["$http","$scope",Ctrl])}(),function(){function config($stateProvider){$stateProvider.state("index.uploads",{controller:"UploadsCtrl",controllerAs:"uploads",url:"/gsa-uploads",templateUrl:"components/filemanager/filemanager.html",data:{pageTitle:"Uploads"}})}angular.module("app").config(["$stateProvider",config])}(),function(){function Ctrl($http,$scope,FileUploader){function writeUserData(userId,filename,size,downloadUrl,lastModified){var encodedData=window.btoa(filename),newRef=database.ref("uploads/"+userId).child(encodedData);newRef.set({name:filename,size:size,downloadUrl:downloadUrl,lastModified:lastModified})}var uploader=$scope.uploader=new FileUploader,auth=firebase.auth(),storageRef=firebase.storage().ref(),database=firebase.database(),user=auth.currentUser,recentFilesRef={};$scope.uploadedFiles=[],user&&(recentFilesRef=database.ref("uploads/"+user.uid).limitToLast(10),recentFilesRef.on("child_added",function(data){var childData=data.val();$scope.uploadedFiles.push(childData),$scope.$apply()})),uploader.uploadItem=function(value){var self=this,file=value._file;storageRef.child(user.uid+"/"+file.name).put(file).then(function(snapshot){var downloadURL=snapshot.downloadURL;item.isSuccess=!0,item.isCancel=!1,item.isError=!1,writeUserData(user.uid,file.name,file.size,downloadURL,file.lastModified),self._render()},function(error){console.log(error)});var index=this.getIndexOfItem(value),item=this.queue[index],transport=this.isHTML5?"_xhrTransport":"_iframeTransport";item._prepareToUploading(),this.isUploading||(this._onBeforeUploadItem(item),item.isCancel||(item.isUploading=!0,this.isUploading=!0,this[transport](item),this._render()))}}angular.module("app").controller("UploadsCtrl",["$http","$scope","FileUploader",Ctrl])}();