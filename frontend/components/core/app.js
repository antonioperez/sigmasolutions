function MainCtrl() {
    var vm = this;

    vm.userName = 'Jon Snow';
};


angular
    .module('app')
    .controller('MainCtrl', MainCtrl)