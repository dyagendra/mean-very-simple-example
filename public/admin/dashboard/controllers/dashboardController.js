var myApp = angular.module('adminApp', ['ngRoute','ngFileUpload']);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl :'../view/dashboard.html',
      controller: 'adminCtrl'
    }).when('/photo-gallery',{
     templateUrl :'../view/photo-gallery.html',
     controller:'adminCtrl'
   }).when('/editFolderName/:id',{
     templateUrl :'../view/editFolderName.html',
     controller:'adminCtrl'
   }).when('/addPhoto/:id',{
     templateUrl :'../view/add-photo.html',
     controller:'adminCtrl'
   }).when('/viewPhoto/:id',{
     templateUrl :'../view/view-photo.html',
     controller:'adminCtrl'
   }).when('/manage-program',{
     templateUrl :'../view/manage-program.html',
     controller:'adminCtrl'
   });
 }]);

myApp.controller('adminCtrl', ['$scope','$http','$location','$routeParams' , 'Upload', function($scope, $http,$location,$routeParams,Upload) {
  console.log("Hello World from controlle3333333333333333333333333");

  $scope.adminLoginFormsSubmit = function() {
    $http.post('loginCheck', $scope.adminLoginForm).success(function(response) {
      if(response!=null)
      {
        window.location.href = "/admin/dashboard"
      }
      else{
        console.log('admin login fail');
      }
    });
  };


  $scope.allFolders={};
  $scope.getPhotoGallerFolder = function()
  {
    $http.get('/admin/getPhotoGalleryFolder/').success(function(response) {
      $scope.allFolders = response;
    });
  }



  $scope.photoGalleryEditFolderForm={};
  $scope.getPhotoGallerOneFolder= function()
  {
    var id=$routeParams.id;
    $http.get('/admin/getPhotoGalleryFolder/' + id).success(function(response) {
      $scope.photoGalleryEditFolderForm = response;
    });
  }



  $scope.addPhotoForm={};
  $scope.addImageOnload= function()
  {
    $scope.addPhotoForm.folderID=$routeParams.id;
  }


  $scope.getAllImageOnload= function()
  {
    id = $routeParams.id;
$scope.allImages= {};
    $http.get('/admin/getAllPhoto/'+id).success(function(response) {
      $scope.allImages =response;
    });
  }



  $scope.photoGalleryEditFolder= function()
  {
    $http.put('/admin/editPhotoGalleryFolder/'+$scope.photoGalleryEditFolderForm._id, $scope.photoGalleryEditFolderForm).success(function(response) {
      $location.path('/photo-gallery');
    });
  }





  $scope.addPhoto= function()
  {
    fileName=$scope.addPhotoForm.file.name;
    ext1=fileName.split('.');
    ext = ext1[ext1.length - 1]
    $scope.addPhotoForm.ext = ext;

    $http.post('/admin/addPhoto/', $scope.addPhotoForm).success(function(response) {
      console.log(response);
      $scope.upload($scope.addPhotoForm.file,response._id,ext); //call upload function
    });

  }






  $scope.upload = function (file,id,ext) {
    Upload.upload({
            url: '/admin/upload', //webAPI exposed to upload the file
            data:{file:file,id:id,ext:ext} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
              $location.path('/photo-gallery');
             } else {
              $location.path('/photo-gallery');
              }
            });
      };

      $scope.photoGalleryAddFolder = function() {
        console.log($scope.photoGalleryAddFolderForm);
        $http.post('/admin/createPhotoGalleryFolder', $scope.photoGalleryAddFolderForm).success(function(response) {
          $scope.getPhotoGallerFolder();
          console.log(response);
        });
      };

      $scope.photoGalleryFolderDelete = function(id) {
        $http.delete('/admin/photoGalleryFolderDelete/' + id).success(function(response) {
          $scope.getPhotoGallerFolder();
        });
      };



      $scope.deleteImage = function(id,ext) {
        $http.delete('/admin/deleteImage/' + id + '/' + ext).success(function(response) {
          $scope.getAllImageOnload();
        });
      };



    }]);