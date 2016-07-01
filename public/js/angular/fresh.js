var app = angular.module('fresh', ['ngResource', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/entry/:id', {
      controller: 'Detail'
    });
});

app.controller('Detail', ['$scope', 'Entry', '$sce',
  function($scope, Entry, AppService) {

    // Get id from url
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    // Get entry
    $scope.entry = Entry.show( { id: id });

    // Redirects to a page
    $scope.go = function(path, index) {
      AppService.go(path, index);
    };
}]);

app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);

app.controller('Home', function($scope, Entry){

  // Retrieve all entries
  $scope.entries = Entry.index();

  // Redirects to a page
  $scope.go = function(path, index) {
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
