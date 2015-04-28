var app = angular.module('fresh', ['ngResource', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/entry/:id', {
      controller: 'Detail'
    });
});

app.controller('Detail', ['$scope', 'Entry', 
  function($scope, Entry) {

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    $scope.entry = Entry.show( { id: id });
}]);

app.controller('Home', function($scope, Entry){
	$scope.entries = Entry.index();

	// Function to make ng-click go to a page
	$scope.go = function(path, index) {
    console.log(typeof(index) == 'undefined')

    if(typeof(index) == 'undefined') {
      window.location = path;
    } else {
		  window.location = path + index;
    }
	};
});

app.factory("Entry", function($http, $resource) {

	return $resource("/api/entries/:id", { id: "@id" },
    {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    });
});