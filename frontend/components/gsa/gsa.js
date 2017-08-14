(function () {

  angular
    .module('app')
    .controller('GSACtrl', Ctrl);
    
    function Ctrl () {
      var vm = this;

      vm.faqIndex = 0;
      vm.questionIndex = 0;


      vm.questions = [
        {
          title: 'Decision To Become A GSA',
          info: 'Please enter the date your local agency, or agencies, decided to become or form a GSA.',
          template: function () {
            return 'components/gsa/decision-to-become-gsa.html';
          }
        }
      ];

      vm.faqs = [
        {
          question: 'What is water code 10721?',
          answer: '"Local agency" means a local public agency that has water supply, water management, or land use responsibilities within a groundwater basin.'
        }
      ]
    }

})();