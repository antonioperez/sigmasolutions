function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('index.dashboard', {
      controller: 'DashboardCtrl',
      controllerAs: 'dashboard',
      data: { pageTitle: 'Chart.js' },
      resolve: {
        loadPlugin: function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            {
              files: ['js/plugins/chartJs/Chart.min.js']
            },
            {
              name: 'angles',
              files: ['js/plugins/chartJs/angles.js']
            }
          ]);
        }
      },
      templateUrl: "components/dashboard/dashboard.html",
      url: "/dashboard",
    })
}

angular
  .module('app')
  .config(config);