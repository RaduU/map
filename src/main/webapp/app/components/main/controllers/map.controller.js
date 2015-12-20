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
        vm.cssClass = "ok";

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
                name: '',
                description: '',
                city: '',

                key: 1,
                events: {
                    click: function (gMarker, eventName, model) {
                          console.debug('mouseover');
                          model.doShow = true;
//                          $scope.$apply();
                    },
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
            coordiates.latitude =  vm.marker.coords.latitude;
            coordiates.longitude = vm.marker.coords.longitude;
            coordiates.name = vm.marker.name;
            coordiates.description = vm.marker.description;
            coordiates.city = vm.marker.city;

            MainService
                .addCoordinates(coordiates)
                .then(onAddComplete, onAddError);
        }

        function onAddComplete(response) {
            vm.message = "Datele au fost salvate cu succes in baza de date!";
            vm.cssClass = "ok";
        }

        function onAddError() {
            vm.message = "A aparut o eroare la salvarea datelor in baza de date!";
            vm.cssClass = "error";
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