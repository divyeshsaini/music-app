(function() {

	"use strict";

	angular.module('musicApp', ['apiService', 'ui.router'])
		.config(function($stateProvider, $urlRouterProvider) {

			$stateProvider
				.state('tracks', {
					url: '/tracks',
					templateUrl: 'components/track/track.tpl.html',
					controller: 'TrackCtrl as trackCtrl'	
				})
				.state('genre', {
					url: '/genre',
					templateUrl: 'components/genre/genre.tpl.html',
					controller: 'GenreCtrl as genreCtrl'
				});

			$urlRouterProvider
				.otherwise('/tracks');

		});	
}());