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


(function() {
	'use strict';

	angular
		.module('app')
		.directive('sampleDirective', 	sampleDirective);
	
	function sampleDirective() {
	  return function(scope, element, attrs) {
	    scope.$watch(attrs.inputDisabled, function(val) {
	    	if (val === undefined)
	    		element.prop('disabled', false);
	    	else
	    		element.prop('disabled', true);
	    });
	  };
	}
	
})();
(function() {
    'use strict';

    angular
        .module('app')
        .controller('InsertedCtrl', InsertedCtrl);

    InsertedCtrl.$inject = ['$scope'];
    function InsertedCtrl($scope) {

        var vm = this;

    }

})();
(function() {
	'use strict';

	angular
		.module('app')
		.controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ['$window', 'MainService'];
	function MainCtrl($window, MainService) {

		var vm = this;

		vm.viewLocation = 'webapp/templates/main/main.html';

		return vm;
	}

})();
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
        vm.message = "";

        //Methods
        vm.addCoordinates = addCoordinates;

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
(function() {
	'use strict';

	angular
		.module('app')
		.service('MainService', MainService);

	MainService.$inject = ['$http', '$q'];
	function MainService($http, $q) {

		var service = {
			addCoordinates: addCoordinates
		};

		function addCoordinates(data) {
			return handleRequest('http://localhost:8080/insert', data);
		}

		function handleRequest(url, data) {
			var deferred = $q.defer();

			$http
				.post(url, data)
				.success(function(data, status, headers, config) {
					deferred.resolve(data);
				})
				.error(function(data, status, headers, config) {
					deferred.reject(data);
				});

			return deferred.promise;
		}

		return service;
	}
	
})();
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