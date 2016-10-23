
var frontendApp = angular.module('frontendApp', ['ngRoute']);

frontendApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/',{
     templateUrl :'landingPage.html',
     controller:'frontendCtrl'
   })
    .when('/dashboard',{
     templateUrl :'dashboard.html',
     controller:'frontendCtrl'
   })
    .when('/test',{
     templateUrl :'test.html',
     controller:'frontendCtrl'
   })

  }]);


frontendApp.controller('frontendCtrl', ['$scope', '$http','$window', '$location' ,function($scope, $http,$window ,$location) {
  console.log("Hello World from frontend Controller");

  if($location.url()!= '/')
  {
    var myEl = angular.element( document.querySelector( '#mu-slider' ) );
    myEl.remove();
  }
}]);﻿
