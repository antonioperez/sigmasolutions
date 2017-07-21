function config($stateProvider) {
    $stateProvider

        .state('index.mapper', {
            url: "/mapper",
            templateUrl: "components/mapper/viewer.html",
            data: { pageTitle: 'Map Viewer' }
        })
}
angular
    .module('app')
    .config(config);