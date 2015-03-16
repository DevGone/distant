(function() {

  var app = angular.module('teacher', ['ngRoute']);

  app.config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/home',
      controller: 'HomeController'
    })
    .when('/schools/', {
      templateUrl: 'partials/schools',
      controller: 'SchoolListController'
    })
  });

  app.controller('HomeController', function($scope) {
    var self = $scope;

    self.title = 'Bonjour !'
  });

  app.controller('SchoolListController', ['$http', '$scope', function($http, $scope) {
    var self = this;
    $scope.self = self;

    self.title = 'Schools !'

    self.schools = [];

    $http.get('/schools/').success(function(data) {
      self.schools = data;
    });

  }]);

})();
