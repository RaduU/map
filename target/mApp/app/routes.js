(function() {
    'use strict';
    
	angular
		.module('app')
		.config(Routes);
	
	Routes.$inject = ['$routeProvider'];
    function Routes($routeProvider) {

    	$routeProvider.
	    	 when('/', {
	    	   templateUrl: 'pages/main/main.html',
	    	   controller:	'MainCtrl',
	           controllerAs: 'main'
	       	 }).
			when('/map', {
				templateUrl: 'pages/map/map.html',
				controller:	'MapCtrl',
				controllerAs: 'map'
			}).
			when('/inserted', {
				templateUrl: 'pages/map/inserted.html',
				controller:	'InsertedCtrl',
				controllerAs: 'added'
			}).
	         otherwise({
	           redirectTo: '/'
	         });
    }
    
})();