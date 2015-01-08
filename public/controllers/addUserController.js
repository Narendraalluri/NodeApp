myApp.controller('addUserController', function($scope, $http, $location,
  $rootScope) {



  try {
    $rootScope.selectOption(1)

  } catch (e) {}



  $scope.addUser = function(isValid, email, password, firstName, lastName,
    role) {
    if (isValid) {
      $http.post('/addUser', {
        'email': $scope.email,
        'password': $scope.password,
        'firstName': $scope.firstName,
        'lastName': $scope.lastName,
        'role': $scope.role


      }).
      success(function(data, status, headers, config) {
        if (data.status == "failed") {
          $scope.addFailed = true
        } else {
          $location.path('/userWelcome')
        }
      }).
      error(function(data, status, headers, config) {

      });
    }
  }


});
