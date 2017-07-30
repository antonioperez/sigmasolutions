function Ctrl () {
    var vm = this;

    vm.barOptions = {
      scaleBeginAtZero : true,
      scaleShowGridLines : false,
      scaleGridLineColor : "rgba(0,0,0,.05)",
      scaleGridLineWidth : 1,
      barShowStroke : true,
      barStrokeWidth : 2,
      barValueSpacing : 5,
      barDatasetSpacing : 1
    };

    vm.barData = {
      labels: ["01", "02", "03", "04", "05", "06", "07"],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(26,179,148,0.5)",
          strokeColor: "rgba(26,179,148,0.8)",
          highlightFill: "rgba(26,179,148,0.75)",
          highlightStroke: "rgba(26,179,148,1)",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    vm.doughnutData = [
      {
        value: 300,
        color:"#a3e1d4",
        highlight: "#1ab394",
        label: "App"
      },
      {
        value: 50,
        color: "#dedede",
        highlight: "#1ab394",
        label: "Software"
      },
      {
        value: 100,
        color: "#A4CEE8",
        highlight: "#1ab394",
        label: "Laptop"
      }
    ];

    vm.doughnutOptions = {
      segmentShowStroke : true,
      segmentStrokeColor : "#fff",
      segmentStrokeWidth : 2,
      percentageInnerCutout : 45, // This is 0 for Pie charts
      animationSteps : 100,
      animationEasing : "easeOutBounce",
      animateRotate : true,
      animateScale : false
    };

    vm.lineData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Example dataset",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "Example dataset",
          fillColor: "rgba(26,179,148,0.5)",
          strokeColor: "rgba(26,179,148,0.7)",
          pointColor: "rgba(26,179,148,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(26,179,148,1)",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    vm.lineOptions = {
      scaleShowGridLines : true,
      scaleGridLineColor : "rgba(0,0,0,.05)",
      scaleGridLineWidth : 1,
      bezierCurve : true,
      bezierCurveTension : 0.4,
      pointDot : true,
      pointDotRadius : 4,
      pointDotStrokeWidth : 1,
      pointHitDetectionRadius : 20,
      datasetStroke : true,
      datasetStrokeWidth : 2,
      datasetFill : true
    };

    vm.notices = [
      {
        name: 'District No. 3',
        basin: 'Modesto',
        basinNumber: 73430,
        manager: 'Cecilia Herrera',
        email: 'mante.kylie@yahoo.com',
        date: '11-06-2017',
        numbers: '63'
      },
      {
        name: 'District No. 32',
        basin: 'Modesto',
        basinNumber: 37675,
        manager: 'Bobby Park',
        email: 'estevan.beatty@gmail.com',
        date: '03-20-2017',
        numbers: '40'
      },
      {
        name: 'District No. 78',
        basin: 'Turlock',
        basinNumber: 35950,
        manager: 'Isaac Colon',
        email: 'lefler_janice@stark.tv',
        date: '06-06-2017',
        numbers: '9'
      },
      {
        name: 'District No. 56',
        basin: 'Merced',
        basinNumber: 7817,
        manager: 'Charlier Miller',
        email: 'cronin_karl@yahoo.com',
        date: '05-20-2017',
        numbers: '55'
      }
    ];
};

angular
  .module('app')
  .controller('DashboardCtrl', Ctrl)