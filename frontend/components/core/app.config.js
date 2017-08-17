(function () {

  angular
    .module('app')
    .config([ '$stateProvider', '$urlRouterProvider', config ])
    .run([ '$rootScope', '$state', function($rootScope, $state) {
      $rootScope.$state = $state;
    }])
    .run(['$rootScope', '$state', statesConfig]);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider
      .state('index', {
        abstract: true,
        url: "/index",
        templateUrl: "components/layout/content.html",
      })
  }

  function statesConfig ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (evt, toState, toParams) {
      if (!firebase.auth().currentUser) {
        if (toState.name !== 'login') {
          evt.preventDefault();
          $state.go('login');
        }
      } 
    });
  }

})();