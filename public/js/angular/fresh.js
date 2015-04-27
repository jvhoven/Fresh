'use strict';

var app = angular.module('fresh', ['ngResource']);

app.controller('entryController', function($scope, Entry){

	$scope.entries = Entry.index();

	// Function to make ng-click go to a page
	$scope.go = function(path, index) {
		window.location = path + index;
	};
});

app.factory("Entry", function($http, $resource) {
	return $resource("/api/entries/:id", { id: "@_id" },
    {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    });
});