(function() {

	"use strict";

	angular.module('musicApp')
		.controller('GenreCtrl', function($scope, $state, $stateParams, Tracks, PagerService) {
			var genreCtrl = this;
			genreCtrl.genres = [];
			var response = Tracks.query({'name': 'genres'});
			response.$promise.then(function(data) {
				for(var i=0;i<data.length;i++) {
				 	genreCtrl.genres.push(data[i]);
				}
				init();
			});

			function init() {
				genreCtrl.pager = {};
				genreCtrl.setPage = setPage;
				//initialize to page 1
				genreCtrl.setPage(1);
			};

			function setPage(page) {
				if(page<1 || page > genreCtrl.pager.totalPages) {
					return;
				} 
				var pageSize = 15;
				//get pager object from service
				genreCtrl.pager = PagerService.GetPager(genreCtrl.genres.length, page, pageSize);

				genreCtrl.items = genreCtrl.genres.slice(genreCtrl.pager.startIndex, genreCtrl.pager.endIndex);
				
			};

			genreCtrl.addGenre = function(value) {
				Tracks.update({name: 'genres'}, {name: value}).$promise.then(function(data) {
					console.log(data);
				});
			};

			genreCtrl.getTracks = function() {
				$state.go('tracks');
			};

			genreCtrl.addGenre = function(name) {

				Tracks.save({name: 'genres'},{"name": name}).$promise.then(function(data) {
					Materialize.toast('Genre Successfully Added', 3000);
				});
				
			};

			genreCtrl.openEditModal = function(genre) {
				genreCtrl.genre = genre;
				$('#edit-modal').openModal();
			}
			genreCtrl.openAddModal = function(genre) {
				genreCtrl.genre = genre;
				$('#genre-modal').openModal();
			}
			genreCtrl.editTrack = function(genre) {
				var name = genre.name;
				var id = genre.id;

				Tracks.save({name: 'genres', id: id},{"name": name}).$promise.then(function(data) {
				 	Materialize.toast('Genre Successfully Edited', 3000);
				 });
			}	
		});
}());