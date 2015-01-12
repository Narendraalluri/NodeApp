require(
	[
		'../modules/userModule',
		'../modules/timeSheetModule',
		'../modules/adminReportingModule',
		'../directives/datepicker',
		'../common/commonUtils',
		'../components/createUser/addUserController',
		'../components/editTimeSheetAdmin/editTimeSheetAdminController',
		'../components/editTimeSheet/editTimeSheetController',
		'../components/createTimeSheet/employeeController',
		'../components/empTimeSheets/empTimeSheetsController',
		'../components/login/mainController',
		'../components/updateUser/updateUserController',
		'../components/viewTimeSheets/viewTimeSheetsController',
		'../components/userWelcome/welcomeController'
	],
	function() {
		angular.bootstrap(document, ['myApp']);

	});

var myApp = angular.module('myApp', ['ngRoute', 'userModule',
	'timeSheetModule', 'adminReportingModule'
]).config(
	function(
		$routeProvider) {
		$routeProvider
			.otherwise({
				redirectTo: '/login'
			});
	});


adminOptions = [{
	name: "Add Employees",
	path: "createUser",
	id: "1"
}, {
	name: "View Employees",
	path: "userWelcome",
	id: "2"
}, {
	name: "View Timesheets",
	path: "empTimeSheets",
	id: "3"
}]
employeeOptions = [{
	name: "Create TimeSheet",
	path: "createTimeSheet",
	id: "1"
}, {
	name: "View TimeSheets",
	path: "viewTimeSheets",
	id: "2"
}]

myApp.run(function($rootScope, $http) {
	try {
		$http.get('/getLoggedInUser').
		success(function(data, status, headers, config) {
			$rootScope.loggedInUser = data.user;

			if (data.user.role == "admin") {
				$rootScope.isAdmin = true
				$rootScope.Options = adminOptions

			} else {
				$rootScope.isEmployee = true
				$rootScope.Options = employeeOptions
			}


		}).error(function(data, status, headers, config) {});

		$rootScope.selectOption = function(id) {
			for (i = 0; i < 10; i++) {
				try {
					document.getElementById('option_' + i).className =
						''
				} catch (e) {}
			}
			try {
				document.getElementById('option_' + id).className =
					'active'
			} catch (e) {}
		}

	} catch (e) {
		alert(e.message)
	}
});
