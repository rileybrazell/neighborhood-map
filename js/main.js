var app = function(){
    var model = {
        locations: [
            {title: 'Kokyogaien National Park', pos: {lat: 35.6769716, lng: 139.7564905}},
            {title: 'Imperial Palace', pos: {lat: 35.685175, lng: 139.7506108}},
            {title: 'Meiji Jingu Gaien', pos: {lat: 35.6792501, lng: 139.7147095}},
            {title: 'Shinjuku Gyoen National Garden', pos: {lat: 35.6851763, lng: 139.707863}},
            {title: 'Meiji Jingū Inner Garden', pos: {lat: 35.6732786, lng: 139.6979008}},
            {title: 'Tokyo Toy Museum', pos: {lat: 35.689740, lng: 139.718043}}
        ]
    };

    var viewModel = {
        init: function() {
            self = this;
            mapView.init();

            this.locations = model.locations;
            this.infoWindow = new google.maps.InfoWindow();
            this.markers = this.createMarkers(this.locations);
            
            this.applyBindings(this.markers, this.infoWindow);

            mapView.loadMarkers(this.markers);
        },

        createMarkers: function(locations) {
            let markers = [];

            for (var i=0; i < this.locations.length; i++){
                let title = locations[i].title;
                let position = locations[i].pos;

                let marker = new google.maps.Marker({
                    title: title,
                    position: position,
                    animation: google.maps.Animation.DROP,
                    id: i,
                    icon: this.createMarkerIcon('990000')
                });

                markers.push(marker);
            };

            return markers;
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

        applyBindings: function(markers, infoWindow) {
            for (let i=0; i < markers.length; i++) {
                markers[i].addListener('click', function() {
                    self.openInfoWindow(markers[i], infoWindow)
                });
            }
        },

        openInfoWindow: function(marker) {
            infoWindow = this.infoWindow;

            if (infoWindow.marker != marker) {
                infoWindow.setContent('');
                infoWindow.marker = marker;

                infoWindow.addListener('closeclick', function() {
                    infoWindow.setMap(null);
                });

                infoWindow.setContent('<div>' + marker.title + '</div>');
            }

            infoWindow.open(mapView.map, marker);
        }
    };

    var mapView = {
        init: function() {
            this.map = this.loadMap();
        },

        loadMap: function() {
            let map = new google.maps.Map(document.getElementById('map'), {
                center: {lat:35.6739494, lng:139.7268508},
                zoom: 14,
                styles: styles,
                mapTypeControl: false
            });

            return map;
        },

        loadMarkers: function(markers) {
            let bounds = new google.maps.LatLngBounds();

            for (let i=0; i < markers.length; i++) {
                let LatLng = markers[i].position;
                markers[i].setMap(this.map);
                bounds.extend(LatLng);

                this.map.fitBounds(bounds);
            }
        }
    };

    // Functions related to list view of markers
    var listView = function() {
        var self = this;

        self.locations = ko.observableArray([]);
        self.listFilter = ko.observable('');
        self.markers = viewModel.markers;

        for (var i=0; i < self.markers.length; i++){
            self.locations().push(self.markers[i]);
        }

        // returns a filtered list of locations, if no filter returns the whole list
        self.listLocations = ko.computed(function() {
            // sort markers by name before filtering
            self.locations.sort(function(a, b) {
                var titleA = a.title.toLowerCase(); // ignore upper and lowercase
                var titleB = b.title.toLowerCase(); // ignore upper and lowercase
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                // titles must be equal
                return 0;
            });

            // this part adapted from here: http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
            let filter = self.listFilter().toLowerCase();
            // if no filter, return all default locations
            if (filter === '') {
                return self.locations();
            } else {
                // only return an item that evaluates true to the stringStartsWith function
                return ko.utils.arrayFilter(self.locations(), function(item){
                    // lower case to match the filter
                    return self.stringStartsWith(item.title.toLowerCase(), filter);
                });
            }
        }, self);

        self.openInfoWindow = function(listItem) {
            viewModel.openInfoWindow(listItem);
        }

        // Implementation of knockout util function stringStartsWith
        // found here: https://github.com/knockout/knockout/issues/401
        self.stringStartsWith = function (string, startsWith) {          
            string = string || "";
            if (startsWith.length > string.length)
                return false;
            // will return true if the first character of the string matches 
            // the supplied filter character
            return string.substring(0, startsWith.length) === startsWith;
        };
    };

    viewModel.init();

    ko.applyBindings(new listView);
};