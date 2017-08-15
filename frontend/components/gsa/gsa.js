(function () {

  angular
    .module('app')
    .controller('GSACtrl', Ctrl);

  function Ctrl() {
    var vm = this;

    vm.options = ['first option', 'second option', 'third option'];
    vm.answers = {

    };
    vm.sectionIndex = 0;
    vm.questionIndex = 0;
    vm.activeSection = {};
    vm.activeQuestion = {};

    vm.questions = [{
        id: "1.0",
        info: 'You have determined that you are either an existing local agency eligible to become a GSA, or have formed a GSA through a legal agreement with other GSA-eligible local agencies.',
        questionKey: "Agency Name",
        template: function () {
          return 'components/gsa/1.0.html';
        },
        faqs: [{
            question: 'What is water code 10721?',
            answer: '"Local agency" means a local public agency that has water supply, water management, or land use responsibilities within a groundwater basin.'
          },
          {
            question: 'What is water code 10723?',
            answer: 'Any local agency or combination of local agencies overlying a groundwater basin may decide to become a GSA for that basin.'
          }
        ]
      },
      {
        id: "1.1",
        info: 'These local agencies will be considered "exclusive" within their statutory boundaries unless they opt out of this responsibility by sending a notice to DWR. No other local agency operating within the statutory boundaries of these exclusive local agencies may decide to become a GSA in these areas until DWR has received a notice stating otherwise.',
        questionKey: "Exclusive Agency",
        template: function () {
          return 'components/gsa/1.1.html';
        },
        faqs: [{
          question: 'What is an exclusive agency?',
          answer: 'Only exclusive GSAs can coordinate to develop a GSP for a basin and submit that GSP to DWR for review. If not, there are alternative plans.'
        }],
        moreAction: {
          id: "1.1.0",
          questionKey: "Alternative Plan",
          info: 'Formation of a GSA is not necessary if a local agency plans to submit an Alternative Plan for an entire basin by January 1, 2017. Additional information about GSAs and the requirement to develop groundwater sustainability plans (GSPs) by 2020 or 2022, or Alternative Plans by 2017, is available on DWR’s Sustainable Groundwater Management website included here: http://water.ca.gov/groundwater/sgm/index.cfm',
          template: function () {
            return 'components/gsa/1.1.0.html';
          },
          faqs: []
        }
      }, {
        questionKey: "Multiple Agencies",
        info: 'Are you going to form a GSA with multiple local agencies?',
        template: function () {
          return 'components/gsa/1.2.html';
        },
        faqs: [],
        moreAction: {
          questionKey: "Joint Powers",
          info: 'Upload joint Powers Agreeement, Memorandum of Agreement and Coordination Agreements',
          template: function () {
            return 'components/gsa/decision-to-become-gsa.html';
          },
          faqs: [{
            question: 'What are these forms?',
            answer: 'SGMA allows multiple local agencies to act as a single GSA through a memorandum of agreement (MOA), a joint powers agreement (JPA), or any other legal agreement (California Water Code, Section [§] 10723.6'
          }]
        }
      },
      {
        questionKey: "Boundary",
        info: 'Attach statutary area boundary shapefile',
        template: function () {
          return 'components/gsa/decision-to-become-gsa.html';
        },
        faqs: [{
          question: 'Shapefiles Guidelines',
          answer: '"A service area shapefile attribute table should contain one record in the attribute table per service area. Include at least one field in the attribute table that identifies the name of the local agency.'
        }]
      }
    ];

    vm.sections = [{
      title: "Becoming a GSA",
      questions: vm.questions
    }]

    vm.fillAnswer = function () {
      var answer = vm.activeSection.questions[vm.questionIndex].value;
      console.log(answer);
      var questionKey = vm.activeSection.questions[vm.questionIndex].questionKey;
      if (answer) {
        vm.answers[questionKey] = answer;
      }
      console.log(vm.answers);
    }

    vm.nextQuestion = function () {
      vm.fillAnswer();
      var moreAction = vm.activeSection.questions[vm.questionIndex].moreAction;
      if (moreAction) {
        vm.activeSection.questions[vm.questionIndex] = vm.activeSection.questions[vm.questionIndex].moreAction;
      } else {
        vm.questionIndex += 1;
      }
    }

    vm.changeValue = function(val) {
      vm.activeSection.questions[vm.questionIndex].value = val;
    }
  
    vm.goBack = function () {
      var moreAction = vm.sections[vm.sectionIndex].questions[vm.questionIndex].moreAction
      if (moreAction){
        console.log(moreAction);
        vm.activeSection.questions[vm.questionIndex] = vm.sections[vm.sectionIndex].questions[vm.questionIndex];
      } else if (vm.questionIndex > 0) {
         vm.questionIndex -= 1;
      }
    }

    vm.showAnswers = function () {
      console.log(vm.answers);
    }

    vm.init = function () {
      vm.activeSection = vm.sections[vm.sectionIndex];
    }
    vm.init();
  }

})();