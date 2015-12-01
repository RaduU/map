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
			return handleRequest('http://localhost:8090/mApp/insert', data);
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