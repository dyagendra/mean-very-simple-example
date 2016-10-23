app.service('testService', function($http){

console.log('ggggggggg44444444444444ggggg');

    
      this.aaa = function() { 
 return  $http.get('apii/contactlist').then(function(response) {

return response.data;
  });



    }

});
