(function() {
    'use strict';

    angular
        .module('app')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', 'MainService'];
    function MapCtrl($scope, MainService) {

        var vm = this;

        //Constants

        //Fields
        vm.center = {};
        vm.zoom = 15;
        vm.marker = {};
        vm.events = {
            click: function (map, eventName, originalEventArgs) {
                var e = originalEventArgs[0];
                vm.marker.coords = {latitude: e.latLng.lat(), longitude: e.latLng.lng()};
                vm.markers.push({latitude: e.latLng.lat(), longitude: e.latLng.lng()});
                $scope.$apply();
            }
        };

        vm.markers = [
             {
                 latitude: 44.435730,
                 longitude: 26.048109
             }
         ];

        vm.message = "";

        //Methods
        vm.addCoordinates = addCoordinates;

        activate();

        function activate() {
            vm.center = {
                latitude: 44.435730,
                longitude: 26.048109
            };

            vm.marker = {
                coords: {
                    latitude: 44.435730,
                    longitude: 26.048109
                },
                key: 1,
                events: {
                    rightclick : function (gMarker, eventName, model) {
                        //window.alert("Marker: lat: " + model.coords.latitude + ", lon: " + model.coords.longitude + " clicked!!")
                        removeMarker(model.coords.latitude, model.coords.longitude);
                        $scope.$apply();
                    }
                }
            };

            vm.zoom = 15;
        }

        function addCoordinates() {
            var coordiates = {};
            coordiates.latitude = "44";
            coordiates.longitude = "26";

            MainService
                .addCoordinates(coordiates)
                .then(onAddComplete, onAddError);
        }

        function onAddComplete(response) {
            vm.message = response;
        }

        function onAddError() {
            vm.message = "error";
        }

        function removeMarker(latitude, longitude) {
            var index = -1;
            for(var i = 0; i < vm.markers.length; i++) {
                if(vm.markers[i].latitude === latitude && vm.markers[i].longitude === longitude) {
                    index = i;
                }
            }

            if(index != -1) {
                vm.markers.splice(index, 1);
            }
        }
    }
})();