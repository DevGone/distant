var socket = io('http://devgone.herokuapp.com');

socket.emit('identification', { device: 'teacher'});

socket.on('info', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

socket.on('broadcast', function(data) {
  console.log('Received broadcast :\n' + data);
});

socket.on('event', function(event) {
  console.log(event);
});

socket.emit('message', {data: 'love french fries'});

var setSpheroRed = function() {
  var color = {
    red: 255,
    green: 0,
    blue: 0
  };
  socket.emit('setColor', color);
  console.log(color);
};

var setSpheroGreen = function() {
  var color = {
    red: 0,
    green: 255,
    blue: 0
  };
  socket.emit('setColor', color);
  console.log(color);
};

var setSpheroBlue = function() {
  var color = {
    red: 0,
    green: 0,
    blue: 255
  };
  socket.emit('setColor', color);
  console.log(color);
};


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
