(function(){
    var mapView = {
        init: function() {
            this.loadMap();
        },

        loadMap: function() {
            let styles = [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ebe3cd"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#523735"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#f5f1e6"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#c9b2a6"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#dcd2be"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#ae9e90"
                        }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dfd2ae"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dfd2ae"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#93817c"
                        }
                    ]
                },
                {
                    "featureType": "poi.business",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.government",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.medical",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#a5b076"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#447530"
                        }
                    ]
                },
                {
                    "featureType": "poi.school",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.sports_complex",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f1e6"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#fdfcf8"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f8c967"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#e9bc62"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e98d58"
                        }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#db8555"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#806b63"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dfd2ae"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#8f7d77"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#ebe3cd"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dfd2ae"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#b9d3c2"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#92998d"
                        }
                    ]
                }
            ];

            let map = new google.maps.Map(document.getElementById('map'), {
                center: {lat:35.6739494, lng:139.7268508},
                zoom: 14,
                styles: styles,
                mapTypeControl: false
            });
        },

        loadMarkers: function(markers) {
            let bounds = new google.maps.LatLngBounds();

            for (let i=0; i < markers.length; i++) {
                let LatLng = markers[i].position;
                markers[i].setMap(self.map);
                bounds.extend(LatLng);

                map.fitBounds(bounds);
            }
        }
    };

    var listView = {
        init: function() {
            ko.applyBindings(model);
        }
    };

    var model = {
        locations: ko.observableArray([
            {title: 'Kokyogaien National Park', pos: {lat: 35.6769716, lng: 139.7564905}},
            {title: 'Imperial Palace', pos: {lat: 35.685175, lng: 139.7506108}},
            {title: 'Meiji Jingu Gaien', pos: {lat: 35.6792501, lng: 139.7147095}},
            {title: 'Shinjuku Gyoen National Garden', pos: {lat: 35.6851763, lng: 139.707863}},
            {title: 'Meiji Jingū Inner Garden', pos: {lat: 35.6732786, lng: 139.6979008}}
        ])
    };

    var viewModel = {
        init: function() {
            mapView.init();
            listView.init();

            this.locations = model.locations();
            this.createMarkers(this.locations);
        },

        createMarkerIcon: function(iconColor) {
            var markerIcon = new google.maps.MarkerImage(
                'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' +
                iconColor + '|40|_|%E2%80%A2',
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34),
                new google.maps.Size(21, 34)
            );
            return markerIcon;
        },

        createMarkers: function(locations) {
            let markers = [];

            for (var i=0; i < locations.length; i++){
                let title = locations.title;
                let position = locations.pos;

                let marker = new google.maps.Marker({
                    title: title,
                    position: position,
                    animation: google.maps.Animation.DROP,
                    id: i,
                    icon: this.createMarkerIcon(990000)
                });

                markers.push(marker);
            };

            return markers;
        },
    };

    viewModel.init();
})()


// function initApp() {
//     var map;
//     let markers = [];

//     let infoWindow = new google.maps.InfoWindow();

//     var view = {
//         init: function() {
//             var styles = [
//                 {
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                             "color": "#ebe3cd"
//                         }
//                     ]
//                 },
//                 {
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                             "color": "#523735"
//                         }
//                     ]
//                 },
//                 {
//                     "elementType": "labels.text.stroke",
//                     "stylers": [
//                         {
//                             "color": "#f5f1e6"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "administrative",
//                     "elementType": "geometry.stroke",
//                     "stylers": [
//                         {
//                             "color": "#c9b2a6"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "administrative.land_parcel",
//                     "stylers": [
//                         {
//                             "visibility": "off"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "administrative.land_parcel",
//                     "elementType": "geometry.stroke",
//                     "stylers": [
//                         {
//                             "color": "#dcd2be"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "administrative.land_parcel",
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                             "color": "#ae9e90"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "administrative.neighborhood",
//                     "stylers": [
//                         {
//                             "visibility": "off"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "landscape.natural",
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                             "color": "#dfd2ae"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "poi",
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                             "color": "#dfd2ae"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "poi",
//                     "elementType": "labels.text",
//                     "stylers": [
//                         {
//                             "visibility": "on"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "poi",
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                             "color": "#93817c"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "poi.business",
//                     "stylers": [
//                         {
//                             "visibility": "off"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "poi.government",
//                     "stylers": [
//                         {
//                             "visibility": "off"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "poi.medical",
//                     "stylers": [
//                         {
//                             "visibility": "off"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "poi.park",
//                     "elementType": "geometry.fill",
//                     "stylers": [
//                         {
//                             "color": "#a5b076"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "poi.park",
//                     "elementType": "labels.text",
//                     "stylers": [
//                         {
//                             "visibility": "off"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "poi.park",
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                             "color": "#447530"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "poi.school",
//                     "stylers": [
//                         {
//                             "visibility": "off"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "poi.sports_complex",
//                     "stylers": [
//                         {
//                             "visibility": "off"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "road",
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                             "color": "#f5f1e6"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "road",
//                     "elementType": "labels",
//                     "stylers": [
//                         {
//                             "visibility": "off"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "road.arterial",
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                             "color": "#fdfcf8"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "road.arterial",
//                     "elementType": "labels",
//                     "stylers": [
//                         {
//                             "visibility": "off"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "road.highway",
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                             "color": "#f8c967"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "road.highway",
//                     "elementType": "geometry.stroke",
//                     "stylers": [
//                         {
//                             "color": "#e9bc62"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "road.highway",
//                     "elementType": "labels",
//                     "stylers": [
//                         {
//                             "visibility": "off"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "road.highway.controlled_access",
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                             "color": "#e98d58"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "road.highway.controlled_access",
//                     "elementType": "geometry.stroke",
//                     "stylers": [
//                         {
//                             "color": "#db8555"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "road.local",
//                     "stylers": [
//                         {
//                             "visibility": "off"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "road.local",
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                             "color": "#806b63"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "transit",
//                     "stylers": [
//                         {
//                             "visibility": "off"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "transit.line",
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                             "color": "#dfd2ae"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "transit.line",
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                             "color": "#8f7d77"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "transit.line",
//                     "elementType": "labels.text.stroke",
//                     "stylers": [
//                         {
//                             "color": "#ebe3cd"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "transit.station",
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                             "color": "#dfd2ae"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "water",
//                     "elementType": "geometry.fill",
//                     "stylers": [
//                         {
//                             "color": "#b9d3c2"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "water",
//                     "elementType": "labels.text",
//                     "stylers": [
//                         {
//                             "visibility": "off"
//                         }
//                     ]
//                 },
//                 {
//                     "featureType": "water",
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                             "color": "#92998d"
//                         }
//                     ]
//                 }
//             ];

//             map = new google.maps.Map(document.getElementById('map'), {
//                 center: {lat:35.6739494, lng:139.7268508},
//                 zoom: 14,
//                 styles: styles,
//                 mapTypeControl: false
//             });
//         },

//         makeMarkerIcon: function(iconColor) {
//             var markerIcon = new google.maps.MarkerImage(
//                 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' +
//                 iconColor + '|40|_|%E2%80%A2',
//                 new google.maps.Size(21, 34),
//                 new google.maps.Point(0, 0),
//                 new google.maps.Point(10, 34),
//                 new google.maps.Size(21, 34)
//             );

//             return markerIcon;
//         }, 

//         openInfoWindow: function(marker, infoWindow) {
//             if (infoWindow.marker != marker) {
//                 infoWindow.setContent('');
//                 infoWindow.marker = marker;

//                 infoWindow.addListener('closeclick'), function() {
//                     infoWindow.setMap(null);
//                 }

//                 infoWindow.setContent('<div>' + marker.title + '</div>')
//             }
//             infoWindow.open(map, marker);
//         }
//     };

//     var model = {
//         locations: [
//             {title: 'Kokyogaien National Park', coord: {lat: 35.6769716, lng: 139.7564905}},
//             {title: 'Imperial Palace', coord: {lat: 35.685175, lng: 139.7506108}},
//             {title: 'Meiji Jingu Gaien', coord: {lat: 35.6792501, lng: 139.7147095}},
//             {title: 'Shinjuku Gyoen National Garden', coord: {lat: 35.6851763, lng: 139.707863}},
//             {title: 'Meiji Jingū Inner Garden', coord: {lat: 35.6732786, lng: 139.6979008}},
//         ]
//     };

//     var viewModel = {
//         initMap: function() {
//             view.init();

//             this.createMarkers(model.locations);

//             this.showMarkers(markers);
//         },

//         createMarkers: function(locations) {
//             var defaultIcon = view.makeMarkerIcon('990000');

//             for (var i = 0; i < locations.length; i++) {
//                 let title = locations[i].title;
//                 let position = locations[i].coord;

//                 let marker = new google.maps.Marker({
//                     title: title,
//                     position: position, 
//                     animation: google.maps.Animation.DROP,
//                     id: i,
//                     icon: defaultIcon
//                 });
//                 markers.push(marker);

//                 marker.addListener('click', function() {
//                     view.openInfoWindow(this, infoWindow);
//                 });
//             }
//         },

//         showMarkers: function(markers) {
//             var bounds = new google.maps.LatLngBounds();
//             // Assign all markers to current map and zoom out map to fit all markers
//             for(var i=0; i < markers.length; i++) {
//                 markers[i].setMap(map);
//                 bounds.extend(markers[i].position);
//             }
//             map.fitBounds(bounds);
//         }
//     }
//     ko.applyBindings(new viewModel.initMap);
//     viewModel.initMap();
// }