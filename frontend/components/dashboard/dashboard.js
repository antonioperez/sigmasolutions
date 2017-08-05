(function () {

angular
  .module('app')
  .controller('DashboardCtrl', [
    '$http', '$scope', 'mapservice', '$q',
    function ($http, $scope, mapservice, $q) {

      var vm = this;

      var mapBackground = {
        "color": "#A9A9A9",
        "weight": 2,
        "opacity": 0.65
      };

      this.getAquaiferMap = function () {

        var popupTemplate = "<p>" +
          "AQ CODE:  {{AQ_CODE}} <br>" +
          "AQ NAME: {{AQ_NAME}} <br>" +
          "ROCK NAME: {{ROCK_NAME}} <br>" +
          "ROCK TYPE: {{ROCK_TYPE}} <br>" +"</p>";
          
        this.aquifersmap = mapservice.generateMap("js-aquifers-map", 7, "aquifers.zip", mapBackground,
          popupTemplate, null, false
        );
      }
      this.getAquaiferMap();

      this.getWellMap = function () {
        var popupTemplate = "<p>" +
          "Site ID:  {{SITEID}} <br>" +
          "County: {{COUNTY_NM}} {{STATE}} <br>" +
          "Date: {{DATA_DATE}} <br>" +
          "Percentile: {{PERCENTILE}} <br>" +
          "Water level: {{DATA_VAL}}\" {{VERT_DATUM}} <br>" +
          "Station:  {{SITEID}} <br>" +
          "Station Number: {{STATION_NM}} <br>" + "</p>";
          
        this.wellmap = mapservice.generateMap("js-well-map", 7, "rtn_wells.zip", mapBackground,
          popupTemplate, null, false
        );
      }

      this.getWellMap();
     

      vm.flotData = [{
        label: '',
        grow: {
          stepMode: 'linear'
        },
        data: [
          [gd(2012, 1, 1), 7],
          [gd(2012, 1, 2), 6],
          [gd(2012, 1, 3), 4],
          [gd(2012, 1, 4), 8],
          [gd(2012, 1, 5), 9],
          [gd(2012, 1, 6), 7],
          [gd(2012, 1, 7), 5],
          [gd(2012, 1, 8), 4],
          [gd(2012, 1, 9), 7],
          [gd(2012, 1, 10), 8],
          [gd(2012, 1, 11), 9],
          [gd(2012, 1, 12), 6],
          [gd(2012, 1, 13), 4],
          [gd(2012, 1, 14), 5],
          [gd(2012, 1, 15), 11],
          [gd(2012, 1, 16), 8],
          [gd(2012, 1, 17), 8],
          [gd(2012, 1, 18), 11],
          [gd(2012, 1, 19), 11],
          [gd(2012, 1, 20), 6],
          [gd(2012, 1, 21), 6],
          [gd(2012, 1, 22), 8],
          [gd(2012, 1, 23), 11],
          [gd(2012, 1, 24), 13],
          [gd(2012, 1, 25), 7],
          [gd(2012, 1, 26), 9],
          [gd(2012, 1, 27), 9],
          [gd(2012, 1, 28), 8],
          [gd(2012, 1, 29), 5],
          [gd(2012, 1, 30), 8],
          [gd(2012, 1, 31), 25]
        ],
        yaxis: 2,
        color: '#0094FD',
        lines: {
          lineWidth: 1,
          show: true,
          fill: true,
          fillColor: {
            colors: [{
                opacity: 0.2
              },
              {
                opacity: 0.2
              }
            ]
          }
        }
      }];

      vm.flotOptions = {
        grid: {
          hoverable: true,
          clickable: true,
          tickColor: '#d5d5d5',
          borderWidth: 0,
          color: '#d5d5d5'
        },
        colors: ['#1ab394', '#464f88'],
        tooltip: true,
        xaxis: {
          mode: 'time',
          tickSize: [3, 'day'],
          tickLength: 0,
          axisLabel: 'Date',
          axisLabelUseCanvas: true,
          axisLabelFontSizePixels: 12,
          axisLabelFontFamily: 'Arial',
          axisLabelPadding: 10,
          color: '#d5d5d5'
        },
        yaxes: [{
            position: 'left',
            max: 1070,
            color: '#d5d5d5',
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Arial',
            axisLabelPadding: 3
          },
          {
            position: 'right',
            color: '#d5d5d5',
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Arial',
            axisLabelPadding: 67
          }
        ],
        legend: {
          noColumns: 1,
          labelBoxBorderColor: '#d5d5d5',
          position: 'nw'
        }
      };

      vm.barOptions = {
        scaleBeginAtZero: true,
        scaleShowGridLines: false,
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        scaleGridLineWidth: 1,
        barShowStroke: true,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1
      };

      vm.barData = {
        labels: ["01", "02", "03", "04", "05", "06", "07"],
        datasets: [{
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

      vm.doughnutData = [{
          value: 300,
          color: "#a3e1d4",
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
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 45, // This is 0 for Pie charts
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false
      };

      vm.notices = [{
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

      function gd(year, month, day) {
        return new Date(year, month - 1, day).getTime();
      }
    }
  ])

  })();