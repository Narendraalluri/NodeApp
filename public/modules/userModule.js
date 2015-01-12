angular.module('userModule', []).config(function(
  $routeProvider) {
  $routeProvider
    .when('/login', {
      controller: 'mainController',
      templateUrl: 'components/login/login.html'
    })
    .when('/createUser', {
      controller: 'addUserController',
      templateUrl: 'components/createUser/createUser.html'
    })
    .when('/updateUser/:userId', {
      controller: 'updateUserController',
      templateUrl: 'components/updateUser/editUser.html'
    })
    .when('/userWelcome', {
      controller: 'welcomeController',
      templateUrl: 'components/userWelcome/userWelcome.html'
    })
});
