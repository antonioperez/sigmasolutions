/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.mapper', {
            url: "/mapper",
            templateUrl: "views/mapper/viewer.html",
            data: { pageTitle: 'Map Viewer' }
        })
        .state('login', {
            url: "/login",
            templateUrl: "components/account/login.html",
            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
        })
        .state('forgot_password', {
            url: "/forgot_password",
            templateUrl: "components/account/forgot.password.html",
            data: { pageTitle: 'Forgot password', specialClass: 'gray-bg' }
        })
        .state('register', {
            url: "/register",
            templateUrl: "components/account/register.html",
            data: { pageTitle: 'Register', specialClass: 'gray-bg' }
        })
}
angular
    .module('app')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });