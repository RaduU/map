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