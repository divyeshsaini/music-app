(function() {
	"use strict";

	angular.module('musicApp')
		.factory('PagerService', function() {
			//service definition
			var service = {};

			service.GetPager = GetPager;

			return service;

			//service implementation
			function GetPager(totalItems, currentPage, pageSize) {
				//default to first page
				currentPage = currentPage || 1;

				//default page size is 7
				pageSize = pageSize || 7;

				//calculate total pages
				var totalPages = Math.ceil(totalItems / pageSize);

				var startPage, endPage;

				if (totalPages <= 8) {
					//less than 5 pages show all
					startPage = 1;
					endPage = totalPages;
				} else {
					//more than 6 pages so calculate start and end pages
					if (currentPage <= 5) {
						startPage = 1;
						endPage = 8;
					} else if (currentPage + 3 >= totalPages) {
						startPage = totalPages - 7;
						endPage = totalPages;
					} else {
						startPage = currentPage - 4;
						endPage = currentPage + 3;
					}
				}

				//calculate start and end item indexes
				var startIndex = (currentPage - 1) * pageSize;
				var endIndex = startIndex + pageSize;

				//create array of pages to ng-repeat in the pager control
				var pages = _.range(startPage, endPage + 1);

				//return object with all pager properties
				return {
					totalItems: totalItems,
					currentPage: currentPage,
					pageSize: pageSize,
					totalPages: totalPages,
					startPage: startPage,
					endPage: endPage,
					startIndex: startIndex,
					endIndex: endIndex,
					pages: pages
				};
			}
		});
}());