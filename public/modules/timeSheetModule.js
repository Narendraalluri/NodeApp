angular.module('timeSheetModule', []).config(function(
	$routeProvider) {
	$routeProvider.when('/employeeWelcome', {
		controller: 'viewTimeSheetsController',
		templateUrl: 'views/viewTimeSheets.html'
	}).when('/createTimeSheet', {
		controller: 'employeeController',
		templateUrl: 'views/createTimeSheet.html'
	}).when('/editTimeSheet/:timesheetId', {
		controller: 'editTimeSheetController',
		templateUrl: 'views/editTimeSheet.html'
	}).when('/viewTimeSheets', {
		controller: 'viewTimeSheetsController',
		templateUrl: 'views/viewTimeSheets.html'
	})
});
