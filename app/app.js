  var app = angular.module("myapp", ["firebase"])
  .factory("database", ["$firebase", function($firebase) {
    var ref = new Firebase("https://OpFed.firebaseio.com/topics");
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
          showComments: false
        })
        $scope.title ='';
      };

      $scope.vote = function(sentiment){
        this.topic[sentiment]++;
        this.topic.votes++;
        var comment = prompt("Write a comment");
        var currentVotes = this.topic.votes;
        console.log(currentVotes);
        if(comment){
          if(this.topic.comments){
            this.topic.comments[currentVotes] = sentiment + ": "+comment;
          } else {
            var obj = {};
            obj[currentVotes] = sentiment + ": " + comment;
            this.topic.comments = obj;
          }
        }
      };
    }
  ]);