angular.module('OpFed', [
  'OpFed.controllers',
   'firebase',
   'ngRoute'])
  .factory("database", ["$firebase", function($firebase) {
    var ref = new Firebase("https://OpFed.firebaseio.com/topics");
    return $firebase(ref);
  }])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when("/login", {
        templateUrl: "./partials/login.html", 
        controller: "loginController"
      })
      .when("/topics", {
        templateUrl: "./partials/topics.html",
        controller: "topicsController"
      })
      .otherwise({
        redirectTo: '/topics'
      });
  }]);
