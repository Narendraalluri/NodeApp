myApp.controller('empTimeSheetsController', function($scope, $http, $location,
  $rootScope) {
  try {
    $rootScope.selectOption(3)
  } catch (e) {}



  $scope.showTimesheet = function(id) {
    $location.path('/editTimeSheetAdmin/' + id)

  }


  $http.get('/viewAllTimesheets').
  success(function(data, status, headers, config) {
    $scope.timesheetList = data; //[{startDate:"sdf", endDate:"sdf", clientApproved:"sdf",total:"sdf"}]
  }).
  error(function(data, status, headers, config) {

  });


});
