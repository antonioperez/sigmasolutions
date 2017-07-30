function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/login");
  $stateProvider
    .state('index', {
      abstract: true,
      url: "/index",
      templateUrl: "components/layout/content.html",
    })
}
angular
  .module('app')
  .config(config)
  .run(function($rootScope, $state) {
    $rootScope.$state = $state;
  });