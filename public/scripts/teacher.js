var socket = io('http://localhost:3000');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });


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
    $scope.self = self;

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

  app.factory('socket', function ($rootScope) {
    var socket = io.connect();
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  });

})();
