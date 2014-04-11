'use strict';

angular.module('spintroApp')
  .controller('MainCtrl',['$scope', '$interval', function ($scope,$interval) {
    $scope.t=0;
    $scope.info = "this is a help for one object asdf as;df asjd;fl asdf asdfa ksld;fk asd; asdf;";
    $scope.runIntro=function(){
        $interval(function(){
            $scope.t=$scope.t+1;
        },2000);
    };
  }]);
