(function () {

  angular
    .module('app')
    .controller('GSACtrl', ['$http', "FileUploader", Ctrl]);

  function Ctrl($http, FileUploader) {
    var vm = this;

    var uploader = vm.uploader = new FileUploader();
    var auth = firebase.auth();
    var storageRef = firebase.storage().ref();
    var database = firebase.database();

    vm.options = ['first option', 'second option', 'third option'];
    vm.answers = {};
    vm.percent = 0;


    vm.sectionIndex = 0;
    vm.questionIndex = 0;
    vm.questionTop = []
    vm.activeTitle = "";
    vm.activeQuestion = {};

    function writeUserData(userId, filename, size, downloadUrl, lastModified) {
      //fancy hashing algorithm goes here
      var encodedData = window.btoa(filename);
      var newRef = database.ref('uploads/' + userId).child(encodedData);
      newRef.set({
        name: filename,
        size: size,
        downloadUrl: downloadUrl,
        lastModified: lastModified
      });

      
    }

    uploader.uploadItem = function (value) {

      //HAD TO OVERWRITE EXISTING UPLOAD ITEM FUNCTION. 
      //BECAUSE IT IS SENDING TO A LOCAL PORT/URL. NEED TO SEND TO FIREBASE INSTEAD
      var self = this;
      var file = value._file;
      storageRef.child('userid/' + file.name).put(file).then(function (snapshot) {
        var downloadURL = snapshot.downloadURL;
        item.isSuccess = true;
        item.isCancel = false;
        item.isError = false;
        writeUserData("userid", file.name, file.size, downloadURL, file.lastModified);
        
        vm.activeQuestion.value = downloadURL;
        vm.fillAnswer();
        self._render();
      }, function (error) {

        console.log(error);
      });


      var index = this.getIndexOfItem(value);
      var item = this.queue[index];
      var transport = this.isHTML5 ? '_xhrTransport' : '_iframeTransport';

      item._prepareToUploading();
      if (this.isUploading) return;

      this._onBeforeUploadItem(item);
      if (item.isCancel) return;

      item.isUploading = true;
      this.isUploading = true;
      this[transport](item);
      this._render();
    };

    vm.questions = [{
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
      },
      {
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
      }, {
        id: "1.2",
        questionKey: "Multiple Agencies",
        info: 'Are you going to form a GSA with multiple local agencies?',
        template: function () {
          return 'components/gsa/1.2.html';
        },
        faqs: [],
        moreAction: {
          id: "1.3",
          questionKey: "Joint Powers",
          info: 'Upload joint Powers Agreeement, Memorandum of Agreement and Coordination Agreements',
          template: function () {
            return 'components/gsa/1.3.html';
          },
          faqs: [{
            question: 'What are these forms?',
            answer: 'SGMA allows multiple local agencies to act as a single GSA through a memorandum of agreement (MOA), a joint powers agreement (JPA), or any other legal agreement (California Water Code, Section [§] 10723.6'
          }]
        },
      }
    ];

    vm.questions2 = [
      {
        id: "2.0",
        info: 'What is your contact information?',
        questionKey: "Contact",
        template: function () {
          return 'components/gsa/2.0.html';
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
      }, {
        id: "2.1",
        questionKey: "Creation Date",
        info: 'A local agency must notify the Department of Water Resources (DWR) of their intent to undertake sustainable groundwater management within 30 days. Based on your "decision date", please enter or select the date when your agency declared its GSA status',
        template: function () {
          return 'components/gsa/2.1.html';
        },
        faqs: []
      },
      {
        questionKey: "GSA Descrip",
        id: "2.2",
        info: 'Describe your GSA',
        template: function () {
          return 'components/gsa/2.2.html';
        },
        faqs: []
      },
      {
        questionKey: "GSA Basins",
        id: "2.3",
        info: 'If you become a GSA in multiple basins, you may need to coordinate with other GSAs to develop/implement GSPs in multiple basins',
        template: function () {
          return 'components/gsa/2.3.html';
        },
        faqs: []
      },
      {
        questionKey: "Basin Boundary",
        id: "1.4",
        info: 'GSA formation requires identification of the basin or the portion of a basin that your local agency (or agencies based on previous questions) intends to manage. The area your agency will manage should be constrained within a basin\'s boundaries. Exclusivity will only apply to the area within the service area (or collective service areas) of the local agency or agencies forming the GSA. Service area shape file reflects the boundaries of a single local agency (or collective service area boundaries',
        template: function () {
          return 'components/gsa/1.4.html';
        },
        faqs: [{
          question: 'Basin Boundary Guidelines',
          answer: 'The area your agency will manage should be constrained within a basin\'s boundaries'
        }, {
          question: 'Service Area Guidelines',
          answer: '"A service area shapefile attribute table should contain one record in the attribute table per service area. Include at least one field in the attribute table that identifies the name of the local agency.'
        }]
      },
      {
        questionKey: "Interested Party",
        id: "1.6",
        info: 'Interested parties means users that the GSA will allocate groundwater to and explain how the interested parties interests/needs will be considered when operating the GSAand how it will be implemented in the design/implementationof the GSP',
        template: function () {
          return 'components/gsa/2.2.html';
        },
        faqs: [{
          question: 'Who is considered an interested party?',
          answer: '<br> 1. Agricultural users. <br> 2. Domestic well owners. <br> 3. Municpal well operators. <br> 4. Public Water Systems <br> 5. Local land use planning agencies. <br> 6. Environmental users of groundwater. <br> 7. Surface water users. '
        }]
      },
      {
        questionKey: "Adopted Laws",
        id: "1.6",
        info: 'Copies of any new by laws, ordinances or new authorities adopted by your agency. ',
        template: function () {
          return 'components/gsa/1.3.html';
        },
        faqs: []
      }
    ];

    vm.sections = [{
        title: "Becoming a GSA",
        questions: vm.questions
      },
      {
        title: "GSA Notice Requirements",
        questions: vm.questions2
      }
    ]

    var sectionsPercent = function () {
      var sectionsNum = vm.sections.length;
      if (sectionsNum) {
        return (100.0 / sectionsNum)
      } else {
        return 1;
      }

    }

    var percentPadder = sectionsPercent();

    vm.setQuestion = function (question) {
      vm.questionTop.push(question);
      vm.activeQuestion = question;
    }

    vm.fillAnswer = function () {
      if (vm.activeQuestion) {
        var answer = vm.activeQuestion.value;
        var questionKey = vm.activeQuestion.questionKey;
        vm.answers[questionKey] = answer;
      }
    }

    vm.setMoreAction = function (val) {
      vm.activeQuestion.more = val;
    }

    vm.init = function () {
      vm.activeTitle = vm.sections[vm.sectionIndex].title;
      var question = vm.sections[vm.sectionIndex].questions[vm.questionIndex];
      vm.setQuestion(question);
    }
    vm.init();

    vm.nextQuestion = function () {
      vm.fillAnswer();
      var questionsLen = vm.sections[vm.sectionIndex].questions.length;
      if (vm.activeQuestion.more) {
        vm.activeQuestion.more = false;
        vm.setQuestion(vm.activeQuestion.moreAction);
      } else {
        var nextIndex = vm.questionIndex + 1;
        var question = vm.sections[vm.sectionIndex].questions[vm.questionIndex];
        var isNextSection = vm.sections[vm.sectionIndex + 1];
        if (question) {
          vm.setQuestion(question);
          vm.questionIndex += 1;
        } else if (isNextSection) {
          vm.percent += percentPadder;
          vm.sectionIndex += 1;
          vm.questionIndex = 0;
          vm.init();
        } else {
          vm.percent = 100;
          console.log("Done");
          vm.showAnswers();
          //done section
        }
      }
    }

    vm.changeValue = function (val, isMoreAction) {
      if (isMoreAction) {
        vm.setMoreAction(isMoreAction);
      }
      vm.activeQuestion.value = val;
    }

    vm.goBack = function () {
      console.log(vm.sectionIndex);
      console.log(vm.questionIndex);
      if (vm.sectionIndex >= 1 & vm.questionIndex < 1) {

        vm.percent -= percentPadder;
        vm.sectionIndex -= 1;
        vm.questionIndex = vm.sections[vm.sectionIndex].questions.length - 1;
        vm.init();
      } else {
        vm.questionTop.pop();
        vm.questionIndex = vm.questionTop.length - 1;
        var question = vm.sections[vm.sectionIndex].questions[vm.questionIndex];
        vm.activeQuestion = question;
      }
    }

    vm.showAnswers = function () {
      console.log(vm.answers);
    }
  }

})();