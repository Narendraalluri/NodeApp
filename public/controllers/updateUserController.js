myApp.controller('updateUserController', function($scope, $http, $location,
	AuthService, $rootScope, $routeParams) {


	try {
		$rootScope.selectOption(10)
	} catch (e) {}


	$http.get('/editUser?id=' + $routeParams.userId).
	success(function(data, status, headers, config) {
		$scope.firstName = data.firstName
		$scope.lastName = data.lastName
		$scope.email = data.email
		$scope.password = data.password
		$scope.role = data.role
		$scope.id = data._id
	}).
	error(function(data, status, headers, config) {

	});

	$scope.updateUserFunc = function(isValid, email, password, firstName,
		lastName, role) {
		if (isValid) {

			$http.post('/updateUser', {
				'id': $scope.id,
				'email': $scope.email,
				'password': $scope.password,
				'firstName': $scope.firstName,
				'lastName': $scope.lastName,
				'role': $scope.role


			}).
			success(function(data, status, headers, config) {
				if (data.status == "failed") {
					$scope.updateFailed = true
				} else {
					$location.path('/userWelcome')
				}
			}).
			error(function(data, status, headers, config) {

			});
		}
	}


	$scope.deleteUser = function() {
		$http.get('/deleteUser?id=' + $routeParams.userId).
		success(function(data, status, headers, config) {
			$location.path('/userWelcome')
		}).
		error(function(data, status, headers, config) {

		});
	}


});
