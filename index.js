(function () {
//    'use strict';
   var app = angular.module('githubSearch', []);
//    .controller('MainController', MainController);
    
    var MainController = function ($scope, github, $location, $interval, $log, $anchorScroll) {
        var onUserComplete = function(data){
            $scope.user = data;
            github.getRepos($scope.user).then(onRepos, onError);
            
        };
        
        var onRepos = function(data) {
            $scope.repos = data;
            $location.hash('userDetails');
            $anchorScroll();
        };
        
        var onError = function(reason) {
            $scope.error = 'could not fetch the data';
        };
        
        var decrementCountdown = function(){
            $scope.countdown -= 1;
            if($scope.countdown < 1){
                $scope.search($scope.username);
            }
        };
        
        var countdownInterval = null;
        var startCountdown = function(){
            countdownInterval =$interval(decrementCountdown, 1000, $scope.countdown);
        };
        
     $scope.search = function(username) {
         $log.info("searching for " + username);
         github.getUser(username).then(onUserComplete, onError);
         if(countdownInterval) {
             $interval.cancel(countdownInterval);
             $scope.countdown = null;
         }
     };  
        $scope.username = "dattatrey93";
        $scope.countdown =5;
        startCountdown();
    }
})();