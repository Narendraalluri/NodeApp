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
