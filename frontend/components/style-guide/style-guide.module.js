(function () {

  angular
    .module('app')
    .config([ '$stateProvider', config ]);

  function config($stateProvider) {
    $stateProvider
      .state('index.guide', {
        controller: 'StyleGuideCtrl',
        controllerAs: 'guide',
        data: {
          pageTitle: 'Style Guide'
        },
        templateUrl: "components/style-guide/style-guide.html",
        url: "/style-guide",
      })
  }

})();