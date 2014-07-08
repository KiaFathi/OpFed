angular.module('OpFed', [
  'OpFed.controllers',
   'firebase',
   'ngRoute'])
  .factory("database", ["$firebase", function($firebase) {
    var ref = new Firebase("https://OpFed.firebaseio.com/topics");
    return $firebase(ref);
  }])
  .factory('users', ["$firebaseSimpleLogin", function($firebaseSimpleLogin){
    var dataRef = new Firebase("https://opfed.firebaseio.com/users");

    var user =
        {
         loginObj : $firebaseSimpleLogin(dataRef)
        };

    return {
        loginObj : $firebaseSimpleLogin(dataRef),
        getUser: function () {
            return user.loginObj;
        },
        logout : function(){
          user.loginObj.$logout();
        }
    } 
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
        redirectTo: '/login'
      });
  }]);
