function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "components/layout/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "components/layout/main.html",
            data: { pageTitle: 'Example view' }
        })
}
angular
    .module('app')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });