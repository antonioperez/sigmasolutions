(function () {

angular
    .module('app')
    .controller('MapCtrl', [
        '$http', '$scope', 'mapservice',
        function ($http, $scope, mapservice) {

            var background = {
                "color": "#A9A9A9",
                "weight": 2,
                "opacity": 0.65
            };

            var popupContent = "<p>" +
                "Basin ID: {{Basin_ID}} <br>" +
                "Basin Name: {{Basin_Name}} <br>" +
                "Basin_Su_1: {{Basin_Su_1}} <br>" +
                "Region:  {{Region_Off}} <br>" +
                "Report: {{Report}} <br>" + "</p>";
            
            this.basinsmap = mapservice.generateMap("map", 12, "B118CAGroundwaterBasins.zip", background, 
                popupContent, "Basin_Su_1", true
            );
        }
    ])

})();