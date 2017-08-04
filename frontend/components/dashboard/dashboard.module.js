function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('index.dashboard', {
      controller: 'DashboardCtrl',
      controllerAs: 'dashboard',
      data: { pageTitle: 'Chart.js' },
      resolve: {
        loadPlugin: [ '$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            {
              files: ['js/plugins/chartJs/Chart.min.js']
            },
            {
              name: 'angles',
              files: ['js/plugins/chartJs/angles.js']
            },
            {
              serie: true,
              name: 'angular-flot',
              files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js' ]
            },
            {
              serie: true,
              files: ['js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js', 'js/plugins/jvectormap/jquery-jvectormap-2.0.2.css']
            },
            {
              serie: true,
              files: ['js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js']
            },
            {
              name: 'ui.checkbox',
              files: ['js/bootstrap/angular-bootstrap-checkbox.js']
            }
          ]);
        }]
      },
      templateUrl: "components/dashboard/dashboard.html",
      url: "/dashboard",
    })
}

angular
  .module('app')
  .config(config);