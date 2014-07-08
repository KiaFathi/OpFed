angular.module('OpFed', [
  'OpFed.controllers', "firebase"])
  .factory("database", ["$firebase", function($firebase) {
    var ref = new Firebase("https://OpFed.firebaseio.com/topics");
    return $firebase(ref);
  }]);
