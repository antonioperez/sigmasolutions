angular
    .module('app')
    .config([ '$stateProvider', config ]);

function config($stateProvider) {
    $stateProvider

        .state('index.mapper', {
            url: "/mapper",
            templateUrl: "components/mapper/viewer.html",
            data: { pageTitle: 'Map Viewer' }
        })
}