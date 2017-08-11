(function () {

  angular
    .module('app')
    .config([ '$stateProvider', config ]);

  function config($stateProvider) {
    $stateProvider
      .state('index.gsa', {
        controller: 'GSACtrl',
        controllerAs: 'gsa',
        data: {
          pageTitle: 'GSA'
        },
        templateUrl: "components/gsa/gsa.getting-started.html",
        url: "/gsa",
      })
  }

})();