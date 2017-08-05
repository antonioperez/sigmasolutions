//for the shapefiles in the folder called 'files' with the name pandr.shp
CONVERTER_URL = "http://sgma.ecoverse.io/mapper/convertJson";

var loadShapefile = function (zipPath, backgroundOptions) {

    shp(zipPath).then(function (geojson) {

        var map = L.map('map').setView([36.8, -120], 10);
        L.esri.basemapLayer("Topographic").addTo(map);

        //after map is loaded with the data. We need style it. 
        var backgroundOverlayStyle = backgroundOptions;

        //function to display popup
        function onEachFeature(feature, layer) {
            var props = feature.properties;
            var popupContent = "<p>" +
                "Basin ID: " + props.Basin_ID + "<br>" +
                "Basin Name: " + props.Basin_Name + "<br>" +
                "Basin_Su_1: " + props.Basin_Su_1 + "<br>" +
                "Region: " + props.Region_Off + "<br>" +
                "Report: " + props.Report + "<br>" + "</p>";

            if (feature.properties && feature.properties.popupContent) {
                popupContent += feature.properties.popupContent;
            }
            layer.bindPopup(popupContent);
        }

        var featuresLayer = L.geoJSON(geojson.features, {
            style: backgroundOverlayStyle,
            onEachFeature: onEachFeature
        });

        map.addLayer(featuresLayer);
        //end data to map. 

        //create search functions
        var searchControl = new L.Control.Search({
            layer: featuresLayer,
            propertyName: 'Basin_Su_1',
            marker: false,
            moveToLocation: function (latlng, title, map) {
                var zoom = map.getBoundsZoom(latlng.layer.getBounds());
                map.setView(latlng, zoom);
            }
        });

        searchControl.on('search:locationfound', function (e) {
            ////if a search is found. Highlight the area
            e.layer.setStyle({
                fillColor: '#3f0',
                color: '#0f0'
            });
            if (e.layer._popup)
                e.layer.openPopup();
        }).on('search:collapsed', function (e) {
            featuresLayer.eachLayer(function (layer) {
                //restore original background color
                featuresLayer.resetStyle(layer);
            });
        });
        map.addControl(searchControl);
        //end search options


        //create mapping drawing functionality
        var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);
        var drawControl = new L.Control.Draw({
            position: 'topright',
            draw: {
                polyline: true,
                polygon: true,
                circle: false,
                marker: true
            },
            edit: {
                featureGroup: drawnItems,
                remove: true
            }
        });
        map.addControl(drawControl);
        //end drawing functionality

        map.on(L.Draw.Event.CREATED, function (e) {
            //custom feature is created on map. Add it or do more with it. 
            var type = e.layerType;
            var layer = e.layer;
            drawnItems.addLayer(layer);
        });

        map.on(L.Draw.Event.EDITED, function (e) {
            var layers = e.layers;
            var countOfEditedLayers = 0;
            layers.eachLayer(function (layer) {
                countOfEditedLayers++;
            });
            console.log(e);
            //TO DO: Need to add edited features to current geojson
            var data = featuresLayer.toGeoJSON();
            data = JSON.stringify(data);
            filename = $("#js-fileName").val();
            console.log(filename);

            payload = {
                json: data,
                outputName: filename
            }

            //animate progress bar
            progressBar = $("#js-map-progress-bar");
            var percentVal = 0;
            var interval = setInterval(function () {
                if (percentVal <= 100) {
                    progressBar.css('width', percentVal + "%").attr('aria-valuenow', percentVal);
                    percentVal += .5;
                    percentVal = Math.round(percentVal);
                } else if (percentVal > 100) {
                    percentVal = 0;
                }
            }, 50);

            var doneProcessing = function () {
                clearInterval(interval);
                progressBar.css('width', "0%").attr('aria-valuenow', 0);
                console.log("test callback");
            }

            downloadFile(CONVERTER_URL, payload, doneProcessing);
        });

    });
}