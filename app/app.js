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
       var comment = prompt("Do you have a comment?");
       if(this.topic.comments){
         this.topic.comments[this.topic.votes] = sentiment + ": "+comment;
       } else{
        var obj = {};
        obj[this.topic.votes] = sentiment + ": " + comment;
        this.topic.comments = obj;
       }
      };

      $scope.showComments = function(){
        console.log(this.topic.showComments);

        if(this.topic.showComments){
          this.topic.showComments = false;
        }else{
          this.topic.showComments = true;
        }
      }

      $scope.sayHi = function(){
        alert('Hi!');
      };
    }
  ]);


// function TopicController($scope, $firebase) {
//   var ref = new Firebase("https://OpFed.firebaseio.com/");
//   $scope.topics = $firebase(ref);
//   $scope.addTopic = function(e) {
//     if (e.keyCode != 13) return;
//     $scope.topics.$add({
//       title: $scope.title,
//       love: 0,
//       like: 0,
//       dislike: 0,
//       hate: 0
//     });
//     $scope.topic = "";
//   };
//   $scope.vote = function(sentiment){
//     console.log(sentiment.$name());
//     this.love++;
//   }

//   $scope.sayHi = function(){
//     alert('Hi!');
//   }
// }