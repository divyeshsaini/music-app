(function() {

	"use strict";

	angular.module('apiService', ['ngResource'])
		.factory('Tracks', function($resource) {
			return $resource(
				'http://104.197.128.152:8000/v1/:name/:id',
				{name: "@name", id: "@id", title: "@title"},
				{
					update: {method: "POST"}
				}
				);
		});
}());