angular.module('OpFed.controllers', [])
.controller('topicsController', ['$scope', 'database', 'users', '$location',
 function($scope, database, users, $location) {
     
    console.log(database);
    $scope.topics = database;

      if(!users.loginObj.user){
        $location.path('/login');
      } else{
        $scope.user = users.loginObj.user.username;
        console.log($scope.user);
      }

      $scope.addTopic = function(e) {
        if (e.keyCode != 13) return;
        database.$add({
          title: $scope.title,
          love: 0,
          like: 0,
          dislike: 0,
          hate: 0,
          votes: 0,
          comments: {},
          showComments: false
        })
        $scope.title ='';
      };

      $scope.vote = function(sentiment){
        console.log(this.topic.$id);
        if(!this.topic.comments[this.user]){
          this.topic[sentiment]++;
          this.topic.votes++;
        } else{
          alert("You already voted!");
          return;
        }
        var comment = prompt("Write a comment");
        if(comment){
          if(this.topic.comments){
            this.topic.comments[this.user] = this.user + ": "+comment;
          } else {
            var obj = {};
            obj[this.user] = this.user + ": " + comment;
            this.topic.comments = obj;
          }
        }
        database.$save(this.topic.$id);
      };
    }
]).controller('loginController', ["$scope", "$firebaseSimpleLogin", 'users', '$location',
  function($scope, $firebaseSimpleLogin, users, $location) {

    $scope.login = function(){
      users.loginObj.$login('GitHub').then(function(){
        $location.path('/topics');
      });
    };

    $scope.logout = function(){
      users.logout();
    };

    $scope.logger = function(){
      if(users.loginObj.user){
        console.log(users.loginObj.user.username);
      } else{
        console.log("Not logged in");
      }
    };
  }
]);