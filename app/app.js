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
       this.topic[sentiment]++;
       this.topic.votes++;
       var comment = prompt("Leave a comment?");
       if(comment){
         if(this.topic.comments){
           this.topic.comments[this.topic.votes] = sentiment + ": "+comment;
         } else {
          var obj = {};
          obj[this.topic.votes] = sentiment + ": " + comment;
          this.topic.comments = obj;
         }        
       }
      };

    }
  ]);