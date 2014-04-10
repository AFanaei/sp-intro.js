'use strict';

angular.module('spintroApp')
  .controller('MainCtrl',['$scope', '$interval', function ($scope,$interval) {
    $scope.t=0;
    $scope.runIntro=function(){
        $interval(function(){
            $scope.t=$scope.t+1;
        },2000);
    };
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
