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
                var attributes = {};
                attributes.marker = {latitude: e.latLng.lat(), longitude: e.latLng.lng()};
                attributes.canDelete = true;
                vm.markersAttributes.push(attributes);
                $scope.$apply();
            }
        };

        vm.markers = [];
        vm.markersAttributes = [];

        vm.markerDetails = {};

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
                        vm.markerDetails = {};
                            vm.markerDetails = getMarkerDetails(model.coords);
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

            MainService
                .getAllCoordinates()
                .then(onLoadComplete, onLoadError);
        }

        function onLoadComplete (response) {
            if(response.length > 0) {
                var marker = {};
                var attributes = {};
                for (var i = 0; i < response.length; i++) {
                    marker = {};
                    attributes = {};
                    marker.latitude = response[i].latitude;
                    marker.longitude = response[i].longitude;
                    vm.markers.push(marker);

                    attributes.marker = response[i];
                    attributes.canDelete = false;
                    vm.markersAttributes.push(attributes);
                }
            } else {
                vm.markers = [
                    {
                        latitude: 44.435730,
                        longitude: 26.048109
                    }
                ];
                var attributes = {};
                attributes.marker = vm.markers[0];
                attributes.canDelete = true;
                vm.markersAttributes.push(attributes);
            }
        }

        function onLoadError(response) {

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

            if(index != -1 && vm.markersAttributes[index].canDelete) {
                vm.markers.splice(index, 1);
                vm.markersAttributes.splice(index, 1);
            }
        }

        function getMarkerDetails(coordinates) {
            var latitude = coordinates.latitude;
            var longitude = coordinates.longitude;
            for(var i = 0; i < vm.markersAttributes.length; i++) {
                if(vm.markersAttributes[i].marker.latitude === latitude && vm.markersAttributes[i].marker.longitude === longitude) {
                    return vm.markersAttributes[i];
                }
            }
            return null;
        }
    }
})();
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
(function() {
	'use strict';

	angular
		.module('app')
		.service('MainService', MainService);

	MainService.$inject = ['$http', '$q', '$location'];
	function MainService($http, $q, $location) {

		var service = {
			addCoordinates: addCoordinates,
			getAllCoordinates: getAllCoordinates
		};

		function addCoordinates(data) {
			return handleRequest('/insert', data);
		}

		function getAllCoordinates() {
			return handleRequest('/all');
		}

		function handleRequest(url, data) {
			var deferred = $q.defer();

			$http
//				.post(getBaseURL() + url, data)
				.post("http://localhost:8090/mApp" + url, data)
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

//	function getBaseURL() {
//		var baseURL = $location.absUrl();
//
//		if (baseURL.lastIndexOf('/') == baseURL.length - 1) {
//			return baseURL.substring(0, baseURL.length - 1);
//		}
//
//		return baseURL;
//	}
	
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
			when('/login', {
				templateUrl: 'pages/map/login.html',
				controller:	'LogInCtrl',
				controllerAs: 'login'
			}).
			when('/register', {
				templateUrl: 'pages/map/register.html',
				controller:	'RegisterCtrl',
				controllerAs: 'reg'
			}).
	         otherwise({
	           redirectTo: '/'
	         });
    }
    
})();