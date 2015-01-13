myApp.controller('welcomeController', function($scope, $http, $location,
  $rootScope) {


  $scope.employeeList = [];

  try {
    $rootScope.selectOption(2)

  } catch (e) {}
  $http.get('/showUsers').
  success(function(data, status, headers, config) {
    
    $scope.employeeList = data;
  }).
  error(function(data, status, headers, config) {

  });


  $scope.showUser = function(id) {
    $location.path('/updateUser/' + id)

  }



});
