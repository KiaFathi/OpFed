angular.module('OpFed.controllers', [])
.controller('topicsController', ['$scope', 'database', 'users', '$location',
 function($scope, database, users, $location) {
     
    $scope.topics = database;

      if(!users.loginObj.user){
        $location.path('/login');
      } else{
        $scope.user = users.loginObj.user.username;
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
        }).then(function(id){
          database.$save(id.name());
        })
        $scope.title ='';
      };

      $scope.vote = function(sentiment){
        if(!this.topic[this.user]){
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
            this.topic[this.user] = true;
          } else {
            var obj = {};
            obj[this.user] = this.user + ": " + comment;
            this.topic.comments = obj;
            this.topic[this.user] = true;
          }
        }
        database.$save(this.topic.$id);
      };
      $scope.pdfData = function(){
         var doc = new jsPDF();

         // We'll make our own renderer to skip this editor
         var specialElementHandlers = {
          '#editor': function(element, renderer){
            return true;
          }
         };

         // All units are in the set measurement for the document
         // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
         doc.fromHTML($('body').get(0), 15, 15, {
          'width': 170, 
          'elementHandlers': specialElementHandlers
         });
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
  }
]);