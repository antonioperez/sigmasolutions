(function () {

  angular
    .module('app')
    .controller('GSACtrl', Ctrl);
    
    function Ctrl () {
      var vm = this;

      vm.step = 1;
      vm.questions = [
        {
          title: 'Decision To Become A GSA',
          info: 'Please enter the date your local agency, or agencies, decided to become or form a GSA.'
        }
      ];
    }

})();