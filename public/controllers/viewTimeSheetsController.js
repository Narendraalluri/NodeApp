myApp.controller('viewTimeSheetsController', function($scope, $http, $location,
	AuthService, $rootScope) {
	try {
		$rootScope.selectOption(2)
	} catch (e) {}



	$scope.showTimesheet = function(id) {
		$location.path('/editTimeSheet/' + id)

	}


	$http.get('/viewUserTimesheets?userId=' + $rootScope.loggedInUser._id).
	success(function(data, status, headers, config) {
		$scope.timesheetList = data; //[{startDate:"sdf", endDate:"sdf", clientApproved:"sdf",total:"sdf"}]
	}).
	error(function(data, status, headers, config) {

	});


});
