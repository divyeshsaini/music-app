(function() {

	"use strict";

	angular.module('musicApp')
		.controller('TrackCtrl', function($scope, $q, PagerService, $state, $stateParams, Tracks) {

			var trackCtrl = this;

			trackCtrl.data = [];
			
			$('.modal-trigger').leanModal();

			var response = Tracks.query({'name': 'tracks'});
			response.$promise.then(function(data) {
				for(var i=0;i<data.length;i++) {
				 	trackCtrl.data.push(data[i]);
				 }
				init();
			});			

			function init() {
				trackCtrl.pager = {};
				trackCtrl.setPage = setPage;
				//initialize to page 1
				trackCtrl.setPage(1);
			};

			function setPage(page) {
				if(page<1 || page > trackCtrl.pager.totalPages) {
					return;
				} 

				//get pager object from service
				trackCtrl.pager = PagerService.GetPager(trackCtrl.data.length, page);

				trackCtrl.items = trackCtrl.data.slice(trackCtrl.pager.startIndex, trackCtrl.pager.endIndex);
				
			};

			trackCtrl.getGenre = function() {
				$state.go('genre');
			};
			trackCtrl.saveTrack = function (title,rating,genreId){
				Tracks.save({name: 'tracks'},{"title": title, "rating":rating,"genres":genreId}).$promise.then(function(data) {
						Materialize.toast('Track Successfully Added', 3000);
				 	});
			}
			
			trackCtrl.addTrack = function(track) {
				var genreId = [];
				var temp = [];		
				var title = track.title;
				var genres = track.genre.split(',');
				var rating = track.rating;
				var response = Tracks.query({'name': 'genres'});
				response.$promise.then(function(data) {
					for(var i=0;i<data.length;i++) {
					 	temp.push(data[i]);
					}
					for(var i=0;i<genres.length;i++) {
						for(var j=0;j<temp.length;j++) {
							if(genres[i] == temp[j].name) {
								genreId.push(temp[j].id);
							 	genres.splice(i,1);
							 	i--;
							 	continue;
							}							
						}
					}
					for(var i=0;i<genres.length;i++) {
						Tracks.update({name: 'genres'}, {name: genres[i]}).$promise.then(function(data) {
							genreId.push(data.id);
							if(i==genreId.length) {	
								trackCtrl.saveTrack(title,rating,genreId);
							}
						});
						
					}
		
				});
			};

			trackCtrl.openEditModal = function(track) {
				track.genre = [];
				trackCtrl.track = track;
				$('#edit-modal').openModal();
			}
			trackCtrl.editTrack = function(track) {
				var title = track.title;
				var genre = [];
				for(var i=0;i<track.genres.length;i++) {
					Tracks.save({name: 'genres', id: track.genres[i].id},{"name": track.genres[i].name}).$promise.then(function(data) {
				 	
				 	});
				}
				
				var rating = track.rating;

				Tracks.save({name: 'tracks', id: track.id},{"title": title, "rating":rating,"genres":genre}).$promise.then(function(data) {
				 	Materialize.toast('Track Successfully Edited', 3000);
		
				 });
			}	

			trackCtrl.searchTrack = function(track) {
				Tracks.query({'name': 'tracks', 'title': track}).$promise.then(function(data) {
					trackCtrl.item = data[0];
					if(trackCtrl.item != undefined) {
						trackCtrl.data = [];
						trackCtrl.data.push(trackCtrl.item);
						init();
					}
				});
			}
		})
		.directive('ngEnter', function () {
		    return function (scope, element, attrs) {
		        element.bind("keydown keypress", function (event) {
		            if(event.which === 13) {
		                scope.$apply(function (){
		                    scope.$eval(attrs.ngEnter);
		                });

		                event.preventDefault();
		            }
		        });
		    };
		});
})();