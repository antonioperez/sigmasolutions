function config($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('index.dashboard', {
          url: "/dashboard",
          templateUrl: "components/dashboard/dashboard.html",
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
          }
      })
}
angular
    .module('app')
    .config(config);