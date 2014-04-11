'use strict';

var app = angular.module('spintroApp');

app.directive('spIntro', function ($window,$document,$anchorScroll,$location) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: 'scripts/directives/view/spintro.html',
        scope:{
            spData: '=',
            current: '='
        },
        link: function (scope, element, attrs) {
            scope.name='introjs-item-'+attrs.order;
            scope.show=false;
            scope.spDataPlasement=attrs['spDataPlasement'];
            scope.pop={
                left: 0,
                top: 0
            }
            if(!scope.spData){
                scope.spData=attrs['spData'];
            }
            function showIntro(){
                var elm = angular.element($document[0].querySelector("#intro-js-mover"));
                if(elm.length==0){
                    var elm=angular.element('<div id="intro-js-mover" class="introjs-helperLayer"></div>');
                    element.append(elm);
                }

                $location.hash(scope.name);
                $anchorScroll();
                scope.show=true;
                var pos={
                    top:element[0].getBoundingClientRect().top + $window.pageYOffset+'px',
                    left:element[0].getBoundingClientRect().left + $window.pageXOffset+'px',
                    right:element[0].getBoundingClientRect().left + $window.pageXOffset+element[0].getBoundingClientRect().width+'px',
                    bottom:element[0].getBoundingClientRect().top + $window.pageYOffset+element[0].getBoundingClientRect().height+'px',
                    width:element[0].getBoundingClientRect().width+'px',
                    height:element[0].getBoundingClientRect().height+'px'
                }
                var popover = angular.element(element[0].querySelector(".popover"));
                var rectPop = popover[0].getBoundingClientRect();
                if(scope.spDataPlasement=='top'){
                    scope.pop={
                        left: pos.left,
                        top: parseInt(pos.top)-rectPop.height+'px'
                    }
                }else if(scope.spDataPlasement=="left"){
                    scope.pop={
                        top: pos.top,
                        left: parseInt(pos.left)-rectPop.width+'px'
                    }
                }else if(scope.spDataPlasement=="right"){
                    scope.pop={
                        left: pos.right,
                        top: pos.top
                    }
                }else{
                    scope.pop={
                        top: pos.bottom,
                        left: pos.left
                    }
                }
                elm.css('top',pos.top);
                elm.css('left',pos.left);
                elm.css('width',pos.width);
                elm.css('height',pos.height);
            }

            function hideIntro(){
                var item = angular.element($document[0].querySelector("#"+'introjs-item-'+scope.current));
                if(scope.current==0 || item.length==0){
                    var elm = angular.element($document[0].querySelector("#intro-js-mover"));
                    elm.remove();
                    scope.show=false;
                }else{
                    scope.show=false;
                }
            }

            angular.element($window).bind('resize', function() {
                if(scope.current==attrs.order){
                    showIntro();
                    scope.$apply();
                }
            });
            scope.$watch('current',function(){
                if(scope.current==attrs.order){
                    showIntro();
                }
                if(scope.current!=attrs.order && scope.show){
                    hideIntro();
                }
            })
        }
    };
});
