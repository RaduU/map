(function() {
    'use strict';

    angular
        .module('app')
        .controller('LogInCtrl', LogInCtrl);

    LogInCtrl.$inject = ['$scope'];
    function LogInCtrl($scope) {

        var vm = this;

        // Fields
        vm.userName = "";
        vm.password = "";

        //Methods
        vm.login = login;

        function login() {
        }
    }

})();