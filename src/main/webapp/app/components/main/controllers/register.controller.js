(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$scope'];
    function RegisterCtrl($scope) {

        var vm = this;

        // Fields
        vm.form = {};
        vm.form.email = "";
        vm.form.name = "";
        vm.form.userName = "";
        vm.form.password = "";
        vm.form.age = "";
        vm.form.sex = "";
        vm.form.status = 1;

        //Methods
        vm.register = register;

        function register() {
        }
    }

})();