myApp.controller('programCtrl', ['$scope','$http' , '$location','$routeParams' , 'Upload', function($scope, $http,$location,$routeParams,Upload) {
  console.log("Hello World from Program");



$scope.addProgram = function()
  {
console.log($scope.manageProgramForm);

  if($scope.manageProgramForm.file)
    {
      fileName=$scope.manageProgramForm.file.name;
      ext1=fileName.split('.');
      ext = ext1[ext1.length - 1]
      $scope.manageProgramForm.ext = ext;
    }

  if(!$scope.manageProgramForm._id)
    { console.log('jjjjjjjj');
      $http.post('/admin/addPrograms/' , $scope.manageProgramForm).success(function(response) 
      {
      if($scope.manageProgramForm.file)
        {
        $scope.upload($scope.manageProgramForm.file,response._id,ext); //call upload function
        }
        $scope.getAllProgram();
      });
    }
  else
    {
    $http.put('/admin/editPrograms/'+$scope.manageProgramForm._id, $scope.manageProgramForm).success(function(response) 
      {
      if($scope.manageProgramForm.file)
        {
        $scope.upload($scope.manageProgramForm.file,response._id,ext); //call upload function
        }
        $scope.getAllProgram();
      });
    }

  }


  $scope.upload = function (file,id,ext) {
    Upload.upload({
            url: '/admin/programsImageUpload', //webAPI exposed to upload the file
            data:{file:file,id:id,ext:ext} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
          $scope.getAllProgram();
        });
      };



      $scope.deletePrograms = function (id,ext) {
        $http.delete('/admin/deletePrograms/' + id + '/' + ext).success(function(response) {
          $scope.getAllProgram();
        });
      };


      $scope.editPrograms = function (id) {
        $http.get('/admin/editPrograms/' + id).success(function(response) {
          $scope.manageProgramForm=response;
        });
      };



      $scope.programs={};
      $scope.getAllProgram = function()
      {
        $http.get('/admin/getAllProgram/').success(function(response) {
          $scope.programs=response;
console.log(response);

        });
      }




    }]);