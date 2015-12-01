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

        vm.message = "";

        //Methods
        vm.addCoordinates = addCoordinates;

        activate();

        function activate() {
            vm.center.latitude = 44.435730;
            vm.center.longitude = 26.048109;

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
    }
})();