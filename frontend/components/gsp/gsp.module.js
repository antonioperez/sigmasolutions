(function () {

  angular
    .module('app')
    .config([ '$stateProvider', config ]);

  function config($stateProvider) {
    $stateProvider
      .state('index.gsp', {
        data: {
          pageTitle: 'gsp'
        },
        templateUrl: 'components/gsp/gsp.getting-started.html',
        url: '/gsp-getting-started'
      })
      .state('index.gsp-forms', {
        controller: 'GSPCtrl',
        controllerAs: 'gsp',
        data: {
          pageTitle: 'gsp Forms'
        },
        templateUrl: 'components/gsp/gsp.question.html',
        url: '/gsp-forms'
      })
  }

})();