(function() {
	'use strict';

	/* Init application */
	angular
		.module('app', [
			'ngAnimate',
			'ngRoute',
			'ngSanitize',
			'mgcrea.ngStrap',
			'uiGmapgoogle-maps'
		]);

	/* Common application conroller */
	angular
		.module('app')
		.controller('ApplicationCtrl', ApplicationCtrl);

	ApplicationCtrl.$inject = ['$window'];
	function ApplicationCtrl($window) {

		var vm = this;

	}
})();

