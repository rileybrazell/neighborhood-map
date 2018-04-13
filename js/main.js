var app = function(){
    var model = {
        locations: [
            {title: 'Shinjuku Chuo Park', pos: {lat: 35.689022, lng: 139.689740}},
            {title: 'Akasaka Imperial Property', pos: {lat: 35.677619, lng: 139.728660}},
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

            self.locations = model.locations;
            self.infoWindow = new google.maps.InfoWindow();
            self.markers = self.createMarkers(self.locations);
            
            self.applyBindings(self.markers, self.infoWindow);

            mapView.loadMarkers(this.markers);
        },

        createMarkers: function(locations) {
            let markers = [];
            let self = this;

            locations.forEach(function(location, index) {
                let title = location.title;
                let position = location.pos;

                let marker = new google.maps.Marker({
                    title: title,
                    position: position,
                    animation: google.maps.Animation.DROP,
                    id: index,
                    icon: self.createMarkerIcon('990000')
                });

                markers.push(marker);
            });

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
            // Create click function for markers, bind to each marker
            // This one I'm not too sure about, it works fine but I don't
            // like that I have two forEach loops and making a bunch
            // of functions.
            markers.forEach(function(marker) {
                marker.addListener('click', function() {
                    self.markers.forEach(function(marker) {
                        marker.setAnimation(null);
                    });

                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }

                    self.openInfoWindow(marker, infoWindow);
                });
            });
        },

        openInfoWindow: function(marker) {
            let self = this;
            let infoWindow = self.infoWindow;

            // If the marker does not have an infoWindow open already: 
            if (infoWindow.marker != marker) {
                infoWindow.setContent('');
                // Assigns this infoWindow to the clicked marker
                infoWindow.marker = marker;

                infoWindow.addListener('closeclick', function() {
                    infoWindow.setMap(null);
                    marker.setAnimation(null);
                });

                infoWindow.setContent('<div>' + marker.title + '</div>');

                self.setWindowContent(marker.title);
            }

            infoWindow.open(mapView.map, marker);
        },

        // XMLHttpRequest doc: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
        setWindowContent: function(location) {
            var self = this;

            // Create request URL for flickr's search API, using location string
            var flickrURL = "https://api.flickr.com/services/rest/?" +
                "method=flickr.photos.search" +
                "&api_key=2ac46c267193aa7f20dc2902dde36b70" +
                "&text=" + location +
                "&format=json" +
                "&nojsoncallback=1";

            // XMLHttpRequest makes an ajax request expecting a returned json object 
            var request = new XMLHttpRequest();
            request.responseType = "json";
            request.open('GET', encodeURI(flickrURL), true);

            // monitors the state of our async ajax request, readyState == 4 means DONE
            // and the response is ready to operate on
            request.onreadystatechange = function() {
                if (request.readyState == 4) {
                    // Grabs the first response in the list of photos
                    // This could be improved by looking for most popular,
                    // or checking that these values are present and if not taking
                    // the next response
                    var response = request.response.photos.photo[0];

                    // creates the actual URL of a public photo on flickr
                    var photoURL = "https://farm" +
                        response.farm +
                        ".staticflickr.com/" +
                        response.server + "/" +
                        response.id + "_" +
                        response.secret + "_m.jpg";
                    
                    // When the request is DONE, and the URL is complete, set them in 
                    // the infoWindow
                    self.infoWindow.setContent('<div><img src=' + photoURL + '/>' +
                                                '</div><div>' + location + '</div>');
                }
            };

            // If flickr API returns an error, alert the user
            request.onerror = function() {
                alert('Unable to contact Flickr server, please try again later');
                self.infoWindow.setContent('<div>' + location + '</div>');
            };

            request.send();
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
            let self = this;
            let bounds = new google.maps.LatLngBounds();

            markers.forEach(function(marker) {
                marker.setMap(self.map);
                bounds.extend(marker.position);

                self.map.fitBounds(bounds);
            });
        },

        filterMarkers: function(filter, markers) {
            // Check title strings and remove markers from map if they
            // don't fit the filter
            markers.forEach(function(marker) {
                if (!stringStartsWith(marker.title.toLowerCase(), filter)) {
                    marker.setMap(null);
                }
            });
        }
    };

    // Functions related to list view of markers
    var listView = function() {
        var self = this;

        self.locations = ko.observableArray([]);
        self.listFilter = ko.observable('');
        self.markers = viewModel.markers;

        self.markers.forEach(function(marker) {
            self.locations().push(marker);
        });

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

            // Following section will filter visible markers and list items
            // based on filter text box input. Code adapted from here: 
            // http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
            let filter = self.listFilter().toLowerCase();
            // if no filter, return all default locations
            if (filter === '') {
                mapView.loadMarkers(self.markers);
                return self.locations();
            } else {
                mapView.filterMarkers(filter, self.markers);
                // only return an item that evaluates true to the stringStartsWith function
                return ko.utils.arrayFilter(self.locations(), function(item){
                    // lower case to match the filter
                    return stringStartsWith(item.title.toLowerCase(), filter);
                });
            }
        }, self);

        // Trigger a click event on the chosen marker (see viewModel.applyBindings)
        self.clickListItem = function(marker) {
            if (document.documentElement.clientWidth < 650) {
                self.isHidden(true);
            }

            new google.maps.event.trigger(marker, 'click');
        };

        self.isHidden = ko.observable();

        // If the window is resized while in mobile styling, hide/show the list, depending
        // on size of window
        window.onresize = function() {
            if (document.documentElement.clientWidth >= 650) {
                self.isHidden(false);
            } else {
                self.isHidden(true);
            }
        };

        // Returns an animate.css class depending on the value of isHidden()
        self.hiddenStatus = ko.pureComputed(function() {
            return self.isHidden() ? "slideOutUp" : "slideInDown";
        }, self);
    };

    // Implementation of knockout util function stringStartsWith
    // found here: https://github.com/knockout/knockout/issues/401
    stringStartsWith = function (string, startsWith) {
        string = string || "";
        if (startsWith.length > string.length)
            return false;
        // will return true if the first character of the string matches 
        // the supplied filter character
        return string.substring(0, startsWith.length) === startsWith;
    };

    viewModel.init();

    ko.applyBindings(new listView());
};

gMapsError = function() {
    alert('Unable to contact Google Maps service, please try again later');
};
