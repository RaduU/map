(function() {
	'use strict';

	angular
		.module('app')
		.service('MainService', MainService);

	MainService.$inject = ['$http', '$q', '$location'];
	function MainService($http, $q, $location) {

		var service = {
			addCoordinates: addCoordinates
		};

		function addCoordinates(data) {
			return handleRequest('/insert', data);
		}

		function handleRequest(url, data) {
			var deferred = $q.defer();

			$http
				.post(getBaseURL() + url, data)
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

	function getBaseURL() {
		var baseURL = $location.absUrl();

		if (baseURL.lastIndexOf('/') == baseURL.length - 1) {
			return baseURL.substring(0, baseURL.length - 1);
		}

		return baseURL;
	}
	
})();