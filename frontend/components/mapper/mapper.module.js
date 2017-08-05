angular
    .module('app')
    .config([ '$stateProvider', config ]);

function config($stateProvider) {
    $stateProvider

        .state('index.mapper', {
            controller: 'MapCtrl',
            controllerAs: 'map',
            url: "/maps",
            templateUrl: "components/mapper/map.html",
            data: { 
                pageTitle: 'Maps'
            }
        })
}