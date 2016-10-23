var myApp = angular.module('adminApp', ['ngRoute']);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl :'view/login.html',
            controller: 'adminCtrl'
        }).when('/dashboard',{
           templateUrl :'view/dashboard.html',
           controller:'adminCtrl'
        });
    }]);

myApp.controller('adminCtrl', ['$scope','$http' , '$location', function($scope, $http,$location) {
  console.log("Hello World from controller");

  var p1={
    name : "Name 1",
    email : "Email 1",
    number : "1111111111"
  };

  var p2={
    name : "Name 2",
    email : "Email 3",
    number : "222222222"
  };

  var p3={
    name : "Name 3",
    email : "Email 3",
    number : "333333333"
  };

      $scope.adminLoginFormsSubmit = function() {
            $http.post('loginCheck', $scope.adminLoginForm).success(function(response) {
              if(response!=null)
              {
                console.log('admin Login Success');
                //$location.path('dashboard');
                    window.location.href = "/admin/dashboard"


              }
              else{
                console.log('admin login fail');
              }
            });


      };








  var contactlist=[p1,p2,p3];
  $scope.contactlist111111= contactlist;

  var refresh = function() {
    response=testService.aaa().then(function(data){
      $scope.contactlist111111 = data;
    });

  };

    $scope.formSubmit = function(){ //function to call on form submit
      console.log('form sub mitt');
            $scope.upload($scope.contact.file); //call upload function
          }


          $scope.loginSubmit = function(){
            console.log($scope.xxx);
            console.log('dsjhdgfjshgdjfhsgjdfhgsjdhgfsjdhgf');
            $http.post('apii/login', $scope.xxx).success(function(response) {
            });

          }

          $scope.upload = function (file) {
            Upload.upload({
            url: 'apii/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
              $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
              $window.alert('an error occured');
            }
          });
      };



      $scope.addContact = function() {
        $http.post('apii/contactlist', $scope.contact).success(function(response) {
          refresh();
        });
      };

      $scope.remove = function(id) {
        $http.delete('apii/contactlist/' + id).success(function(response) {
          refresh();
        });
      };

      $scope.edit = function(id) {
        $http.get('apii/contactlist/' + id).success(function(response) {
          $scope.contact = response;
        });
      };  

      $scope.update = function() {
        $http.put('apii/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
          refresh();
        })
      };

      $scope.deselect = function() {
        $scope.contact = "";
      }

    }]);