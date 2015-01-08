try {
	uploadedFilesArray = []
	var client = new XMLHttpRequest();

	function upload() {
		var file = document.getElementById("timesheetFile");

		/* Create a FormData instance */
		var formData = new FormData();
		/* Add the file */
		formData.append("upload", file.files[0]);

		$.ajax({
			url: 'uploadFile',
			data: formData,
			cache: false,
			processData: false,
			contentType: false,
			type: 'POST',
			success: function(data, status, req) {
				uploadedFilesArray.push({
					"id": data.resultId,
					"name": data.fileName
				})
				$("#UploadedFiles").append('<li id="file_' + data.resultId +
					'"><a href="showFile?originalName=' + data.fileName + '&id=' + data.resultId +
					'">' + data.fileName + '</a><a href="javascript:removeFile(\'' + data
					.resultId +
					'\')"><span class="glyphicon glyphicon-remove"></span></a></li>');
			},
			error: function(req, status, error) {
				alert('Upload Failed');
			}
		});
	}

	function removeFile(id) {


		$.ajax({
			url: 'removeFile?id=' + id,
			cache: false,
			processData: false,
			contentType: false,
			type: 'GET',
			success: function(data, status, req) {

				for (i = 0; i < uploadedFilesArray.length; i++) {
					if (uploadedFilesArray[i].id == id) {
						uploadedFilesArray = uploadedFilesArray.splice(i, 1);
					}

				}
				$('#file_' + id).remove();

			},
			error: function(req, status, error) {
				alert('Upload Failed');
			}
		});
	}



	angular.module('userModule', []).config(function(
		$routeProvider) {
		$routeProvider
			.when('/login', {
				controller: 'mainController',
				templateUrl: 'views/login.html'
			})
			.when('/createUser', {
				controller: 'addUserController',
				templateUrl: 'views/createUser.html'
			})
			.when('/updateUser/:userId', {
				controller: 'updateUserController',
				templateUrl: 'views/editUser.html'
			})
			.when('/userWelcome', {
				controller: 'welcomeController',
				controllerAs: 'welcomeController',
				templateUrl: 'views/userWelcome.html'
			})
	});

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

	require(
		[
			'../controllers/addUserController',
			'../controllers/editTimeSheetAdminController',
			'../controllers/editTimeSheetController',
			'../controllers/employeeController',
			'../controllers/empTimeSheetsController',
			'../controllers/mainController',
			'../controllers/updateUserController',
			'../controllers/viewTimeSheetsController',
			'../controllers/welcomeController'
		],
		function() {
			angular.bootstrap(document, ['myApp']);
		});


	formatSingleDigit = function(str) {
		if (str < 10) return "0" + str
		else return str;
	}



	myApp.directive('jqdatepicker', function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModelCtrl) {

				element.datepicker({
					dateFormat: 'yy-mm-dd',
					beforeShowDay: function(date) {
						var day = date.getDay();
						return [day == 0, ""];
					},
					onSelect: function(date) {

						scope.startDate = date;
						temp = new Date(date);
						temp.setDate(temp.getDate() + 7)
						scope.endDate = (temp.getYear() + 1900) + "-" + formatSingleDigit(
							temp.getMonth() + 1) + "-" + formatSingleDigit(temp.getDate());
						try {
							scope.$apply();
						} catch (e) {}

					}
				});
			}
		};
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
	myApp.factory('AuthService', function($http) {
		var currentUser;


		return {
			setCurrentUser: function(user) {
				currentUser = user
			},
			getCurrentUser: function() {

				return currentUser;
			}
		};
	});



} catch (e) {
	alert(e.message)
}
