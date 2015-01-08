myApp.controller('editTimeSheetAdminController', function($scope, $http,
	$location, AuthService, $rootScope, $routeParams) {

	$scope.sheetCount = 0;
	timesheetFile.onchange = function() {
		if (this.value !== '')
			upload()
	};

	$scope.incrementCounter = function() {
		try {
			if ($scope.sheetCount < 4) {
				$scope.sheetCount = $scope.sheetCount + 1
				for (i = 0; i < $scope.sheetsVal.length; i++) {
					if ($scope.sheetsVal[i].status == undefined || $scope.sheetsVal[i].status ==
						false) {
						$scope.sheetsVal[i].status = true;
						break;
					}
				}
			}
		} catch (e) {
			alert(e.message)
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
	$scope.$watch("startDate", function(newValue, oldValue) {
		$scope.timesheet.startDate = $scope.startDate;

	});
	$scope.$watch("[sheetsVal]", function(newValue, oldValue) {
		totalCount = 0;
		for (i = 0; i < 5; i++) {
			$scope.sheetsVal[i].total = parseInt($scope.sheetsVal[i].sunday) +
				parseInt($scope.sheetsVal[i].monday) + parseInt($scope.sheetsVal[i].tuesday) +
				parseInt($scope.sheetsVal[i].wednesday) + parseInt($scope.sheetsVal[i]
					.thursday) +
				parseInt($scope.sheetsVal[i].friday) + parseInt($scope.sheetsVal[i].saturday)
			totalCount += parseInt($scope.sheetsVal[i].total);

		}
		$scope.timesheet.total = totalCount;

	});

	$scope.saveTimesheet = function() {

		$scope.timesheet.sheets = $scope.sheetsVal;
		$scope.timesheet.startDate = $scope.startDate;
		$scope.timesheet.endDate = $scope.endDate;
		$scope.timesheet.uploadedFiles = uploadedFilesArray;
		$http.post('/modifyTimeSheet?id=' + $routeParams.timesheetId, $scope.timesheet)
			.
		success(function(data, status, headers, config) {
			try {
				$location.path('/empTimeSheets')
				alert('success')
			} catch (e) {
				alert(e.message)
			}
		}).
		error(function(data, status, headers, config) {

		});

	}

	$http.get('/getTimesheet?id=' + $routeParams.timesheetId).
	success(function(data, status, headers, config) {
		$scope.timesheet.userId = data[0].userId;
		$scope.timesheet.userName = data[0].userName;
		$scope.sheetsVal = data[0].sheets;
		$scope.startDate = data[0].startDate;
		$scope.endDate = data[0].endDate;
		$scope.timesheet.clientApproved = Boolean(data[0].clientApproved);
		$scope.timesheet.uploadedFiles = data[0].uploadedFiles;
		$scope.timesheet.total = data[0].total;
		$scope.timesheet.comments = data[0].comments;
		$scope.sheetsVal[0].status = true;
		for (i = 0; i < data[0].uploadedFiles.length; i++)
			$("#UploadedFiles").append('<li id="file_' + data[0].uploadedFiles[i].id +
				'"><a href="showFile?originalName=' + data[0].uploadedFiles[i].name +
				'&id=' + data[0].uploadedFiles[i].id + '">' + data[0].uploadedFiles[i]
				.name +
				'</a><a href="javascript:removeFile(\'' + data[0].uploadedFiles[i].id +
				'\')"><span class="glyphicon glyphicon-remove"></span></a></li>');


	}).
	error(function(data, status, headers, config) {

	});


});
