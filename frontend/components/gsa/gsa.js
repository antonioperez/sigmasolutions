(function () {

  angular
    .module('app')
    .controller('GSACtrl', Ctrl);

  function Ctrl() {
    var vm = this;

    vm.sectionIndex = 0;
    vm.questionIndex = 0;
    vm.questions = [{
        info: 'What is your GSA\'s name?',
        template: function () {
          return 'components/gsa/rename-this-template-1.html';
        },
        faqs: [
        {
          question: 'What is water code 10721?',
          answer: '"Local agency" means a local public agency that has water supply, water management, or land use responsibilities within a groundwater basin.'
        },  
        {
          question: 'What is water code 10723?',
          answer: 'Any local agency or combination of local agencies overlying a groundwater basin may decide to become a GSA for that basin.'
        }]
      },
      {
        info: 'Are you an exclusive agency?',
        template: function () {
          return 'components/gsa/decision-to-become-gsa.html';
        },
        faqs: [],
        moreAction: {
          info: 'As discussed in this document, formation of a GSA is not necessary if a local agency plans to submit an Alternative Plan for an entire basin by January 1, 2017. Additional information about GSAs and the requirement to develop groundwater sustainability plans (GSPs) by 2020 or 2022, or Alternative Plans by 2017, is available on DWR’s Sustainable Groundwater Management website included here: http://water.ca.gov/groundwater/sgm/index.cfm',
          template: function () {
            return 'components/gsa/decision-to-become-gsa.html';
          },
          faqs: []
        }
      },{
        info: 'Are you going to form a GSA with multiple local agencies?',
        template: function () {
          return 'components/gsa/decision-to-become-gsa.html';
        },
        faqs: [],
        moreAction: {
          info: 'Upload joint Powers Agreeement, Memorandum of Agreement and Coordination Agreements',
          template: function () {
            return 'components/gsa/decision-to-become-gsa.html';
          },
          faqs: [
            {
              question: 'What are these forms?',
              answer: 'SGMA allows multiple local agencies to act as a single GSA through a memorandum of agreement (MOA), a joint powers agreement (JPA), or any other legal agreement (California Water Code, Section [§] 10723.6'
            }
          ]
        }
      },
      {
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


    vm.sections = [
      {
        title : "Becoming a GSA",
        questions : vm.questions
      }
    ]
  }

})();