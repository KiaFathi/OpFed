var username;
var dbref = new Firebase('https://opfed.firebaseio.com');
var auth = new FirebaseSimpleLogin(dbref, function(error, user) {
  if (error) {
    // an error occurred while attempting login
    console.log(error);
  } else if (user) {
    // user authenticated with Firebase
    username = user.displayName;
    console.log(username);
  } else {
    // user is logged out
    auth.login('github');
    console.log(user);
  }
});

var app = angular.module("myapp", ["firebase"])
  .factory("database", ["$firebase", function($firebase) {
    var ref = new Firebase("https://OpFed.firebaseio.com/topics");
    var auth = new FirebaseSimpleLogin(ref, function(error, user) {
    });
    return $firebase(ref);
  }])
  .controller("TopicController", ["$scope", "database",
    function($scope, service) {
      service.$bind($scope, "topics");

      $scope.username = username;
      
      $scope.addTopic = function(e) {
        if (e.keyCode != 13) return;
        service.$add({
          title: $scope.title,
          love: 0,
          like: 0,
          dislike: 0,
          hate: 0,
          votes: 0,
          comments: {},
        })
        $scope.title ='';
      };

      $scope.vote = function(sentiment){
        if(!this.topic.comments[username]){
          this.topic[sentiment]++;
          this.topic.votes++;
          var comment = prompt("Write a comment");
          if(comment){
            if(this.topic.comments){
              this.topic.comments[username] = username + ": "+comment;
            } else {
              var obj = {};
              obj[username] = username + ": " + comment;
              this.topic.comments = obj;
            }
          }
        } else{
          alert('You already voted on this');
        }
      };
    }
  ]);