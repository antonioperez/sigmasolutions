angular
    .module('app')
    .service('mapservice', function ($http) {

        var self = this;
        
        var CONVERTER_URL = "http://sgma.ecoverse.io/mapper/convertJson";
        self.backgroundOverlayStyle = {};
        self.popupContent = null;
        self.searchKey = null;

        self.generateMap = function (mapId, zoom, zipPath, backgroundOptions, popupContent, searchKey, addDrawingOptions) {
            //after map is loaded with the data. We need style it. 

            $("#"+mapId).css('width', "100%");
            $("#"+mapId).css('height', "500px");

            self.map = L.map(mapId).setView([36.8, -120], zoom);
            L.esri.basemapLayer("Topographic").addTo(self.map);



            self.backgroundOverlayStyle = backgroundOptions;
            self.searchKey = searchKey;
            self.addDrawingOptions = addDrawingOptions;

            if (popupContent) {
                self.popupContent = popupContent;
            }
            self.loadShapefile(zipPath);
            return self.map;
        }

        self.loadShapefile = function (zipPath) {
            shp(zipPath).then(function (geojson) {

                console.log(geojson.features[0]);
                //function to display popup
                var featuresLayer = L.geoJSON(geojson.features, {
                    style: self.backgroundOverlayStyle,
                    onEachFeature: function (feature, layer) {
                        if (self.popupContent) {
                            self.onEachFeature(feature, layer);
                        }
                    }
                });
                self.map.addLayer(featuresLayer);
                //end data to map. 

                if (self.searchKey) {
                    self.addSearchControls(self.searchKey, featuresLayer);
                }

                //create mapping drawing functionality
                if (self.addDrawingOptions) {
                    
                    self.addDrawControls();
                }
                //end drawing functionality

            });
        }

        self.genGuid = function () {
            var date = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
                var rand = (date + Math.random() * 16) % 16 | 0;
                date = Math.floor(date / 16);
                return (char == 'x' ? rand : (rand & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };

        self.downloadFile = function (url, payload, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function () {
                if (this.status === 200) {
                    var filename = "";
                    if (payload.outputName) {
                        filename = payload.outputName;
                    } else {
                        //random guid name
                        filename = self.genGuid();
                    }

                    //filename needs the .zip in order to get a zip file. TODO: better check in case of multiple. 
                    filename += ".zip"

                    var type = xhr.getResponseHeader('Content-Type');
                    var blob = new Blob([this.response], {
                        type: type
                    });

                    //is IE?
                    if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        // IE workaround"
                        window.navigator.msSaveBlob(blob, filename);
                    } else {
                        var URL = window.URL || window.webkitURL;
                        var downloadUrl = URL.createObjectURL(blob);
                        if (filename) {

                            var atag = document.createElement("a");
                            // safari fix
                            if (typeof atag.download === 'undefined') {
                                window.location = downloadUrl;
                            } else {
                                atag.href = downloadUrl;
                                atag.download = filename;
                                document.body.appendChild(atag);
                                atag.click();
                            }
                        } else {
                            window.location = downloadUrl;
                        }

                        setTimeout(function () {
                            // let the browser know not to keep the reference to the file any longer
                            URL.revokeObjectURL(downloadUrl);
                        }, 100);

                        if (callback) {
                            callback();
                        }
                    }
                }
            };
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send($.param(payload));
        }

        self.onEachFeature = function (feature, layer) {
            //function to display popup
            var props = feature.properties;

            //dirty fix to not all certain keys to pass. will need to pass in obj with callback and template. 
            
            if (props.STATE != "CA") {
                return false;
            }

            console.log(props.STATE == "CA");
            //get values;
            var template = self.popupContent;
            var keys = template.match(/[^{]+(?=\}})/g);
            if (keys.length > 0) {
                for (var k in keys) {
                    var key = keys[k];
                    template = template.replace("{{" + key + "}}", props[key]);
                }
            }

            if (feature.properties && feature.properties.popupContent) {
                template += feature.properties.popupContent;
            }
            layer.bindPopup(template);
        };

        self.addDrawControls = function () {
            //create mapping drawing functionality
            var drawnItems = new L.FeatureGroup();
            self.map.addLayer(drawnItems);
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
            self.map.addControl(drawControl);
            //end drawing functionality

            self.map.on(L.Draw.Event.CREATED, function (e) {
                //custom feature is created on map. Add it or do more with it. 
                var type = e.layerType;
                var layer = e.layer;
                drawnItems.addLayer(layer);
            });

            self.map.on(L.Draw.Event.EDITED, function (e) {
                var layers = e.layers;
                var countOfEditedLayers = 0;
                layers.eachLayer(function (layer) {
                    countOfEditedLayers++;
                });

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
                doneProcessing = null;

                if (progressBar) {
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

                    doneProcessing = function () {
                        clearInterval(interval);
                        progressBar.css('width', "0%").attr('aria-valuenow', 0);
                        console.log("test callback");
                    }
                }
                self.downloadFile(CONVERTER_URL, payload, doneProcessing);
            });
        };

        self.addSearchControls = function (searchKey, featuresLayer) {

            var searchControl = new L.Control.Search({
                layer: featuresLayer,
                propertyName: searchKey,
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
                if (e.layer._popup) {
                    e.layer.openPopup();
                }
            }).on('search:collapsed', function (e) {
                featuresLayer.eachLayer(function (layer) {
                    //restore original background color
                    featuresLayer.resetStyle(layer);
                });
            });

            self.map.addControl(searchControl);
            //end search options
        }
    });