myApp.controller('employeeController', function($scope, $http, $location,
	$rootScope) {
	uploadedFilesArray = [];
	timesheetFile.onchange = function() {
		if (this.value !== '')
			upload()
	};

	$scope.sheets = [true, false, false, false, false];

	$scope.sheetsVal = [];


	$scope.sheetCount = 0;

	for (i = 0; i < 5; i++)
		$scope.sheetsVal[i] = {
			"status": false,
			"project": 1,
			"sunday": 0,
			"monday": 0,
			"tuesday": 0,
			"wednesday": 0,
			"thursday": 0,
			"friday": 0,
			"saturday": 0,
			"total": 0
		}

	$scope.sheetsVal[0] = {
		"status": true,
		"project": 1,
		"sunday": 0,
		"monday": 0,
		"tuesday": 0,
		"wednesday": 0,
		"thursday": 0,
		"friday": 0,
		"saturday": 0,
		"total": 0
	}

	$scope.startDate = ""
	$scope.timesheet = {}
	$scope.timesheet.sheets = $scope.sheetsVal;
	$scope.timesheet.total = 0;
	$scope.timesheet.comments = "";
	$scope.timesheet.clientApproved = false;
	$scope.timesheet.startDate = $scope.startDate;

	$scope.$watch("startDate", function(newValue, oldValue) {
		$scope.timesheet.startDate = $scope.startDate;

	});
	$scope.$watch("[sheetsVal]", function(newValue, oldValue) {
		totalCount = 0;
		for (i = 0; i < 5; i++) {
			$scope.sheetsVal[i].total = parseInt($scope.sheetsVal[i].sunday) +
				parseInt($scope.sheetsVal[i].monday) + parseInt($scope.sheetsVal[
					i].tuesday) +
				parseInt($scope.sheetsVal[i].wednesday) + parseInt($scope.sheetsVal[
						i]
					.thursday) +
				parseInt($scope.sheetsVal[i].friday) + parseInt($scope.sheetsVal[
					i].saturday)
			totalCount += parseInt($scope.sheetsVal[i].total);

		}
		$scope.timesheet.total = totalCount;

	});


	$scope.addTimesheet = function() {

		$scope.timesheet.userName = $rootScope.loggedInUser.firstName;
		$scope.timesheet.userId = $rootScope.loggedInUser._id;
		$scope.timesheet.sheets = $scope.sheetsVal;
		$scope.timesheet.startDate = $scope.startDate;
		$scope.timesheet.endDate = $scope.endDate;
		$scope.timesheet.uploadedFiles = uploadedFilesArray;
		$http.post('/createTimeSheet', $scope.timesheet).
		success(function(data, status, headers, config) {
			$location.path('/viewTimeSheets')
		}).
		error(function(data, status, headers, config) {

		});
	}

	$scope.incrementCounter = function() {

		if ($scope.sheetCount < 4) {
			$scope.sheetCount = $scope.sheetCount + 1
			for (i = 0; i < $scope.sheets.length; i++)
				if ($scope.sheetsVal[i].status == false) {
					$scope.sheetsVal[i].status = true;
					break;
				}
		}



	}

	$scope.removeSheet = function(id) {
		$scope.sheetsVal[id] = {
			"status": false,
			"project": 1,
			"sunday": 0,
			"monday": 0,
			"tuesday": 0,
			"wednesday": 0,
			"thursday": 0,
			"friday": 0,
			"saturday": 0,
			"total": 0
		}

		$scope.sheetCount = $scope.sheetCount - 1;
	}


});
