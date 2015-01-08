angular.module('adminReportingModule', []).config(
	function(
		$routeProvider) {
		$routeProvider.when('/empTimeSheets', {
			controller: 'empTimeSheetsController',
			templateUrl: 'views/viewEmpTimeSheets.html'
		}).when('/editTimeSheetAdmin/:timesheetId', {
			controller: 'editTimeSheetAdminController',
			templateUrl: 'views/editTimeSheetAdmin.html'
		})
	});
