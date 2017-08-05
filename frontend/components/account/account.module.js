(function () {

angular
    .module('app')
    .config([ '$stateProvider', config]);
    
function config($stateProvider) {
    $stateProvider

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

})();