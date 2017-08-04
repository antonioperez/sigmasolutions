angular
  .module('app')
  .config([ '$stateProvider', '$urlRouterProvider', config ])
  .run([ '$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$state = $state;
  }]);

function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/login");
  $stateProvider
    .state('index', {
      abstract: true,
      url: "/index",
      templateUrl: "components/layout/content.html",
    })
}