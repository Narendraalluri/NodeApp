myApp.controller('mainController', function($scope, $http, $location,
	$rootScope) {
	$scope.loginFailed = false;
	$rootScope.Options = []
		// function to submit the form after all validation has occurred
	$scope.submitForm = function(isValid, userName, password) {

		// check to make sure the form is completely valid
		if (isValid) {
			// Simple POST request example (passing data) :
			try {
				$http.post('/loginUser', {
					'email': $scope.user.email,
					'password': $scope.user.password
				}).
				success(function(data, status, headers, config) {
					if (data.status == "failed") {
						$scope.loginFailed = true;
					} else {
						$rootScope.loggedInUser = data.user
						$scope.loginFailed = false;
						if (data.user.role == "admin") {
							$rootScope.isAdmin = true
							$rootScope.Options = adminOptions
							$location.path('/userWelcome')

						} else {
							$rootScope.isEmployee = true
							$rootScope.Options = employeeOptions
							$location.path('/employeeWelcome')
						}

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

					}
				}).
				error(function(data, status, headers, config) {
					$scope.userForm.loginFailed = false;

				});
			} catch (e) {
				alert(e.message)
			}

		}

	};

});
