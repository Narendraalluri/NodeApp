require(
  [
    '../modules/userModule',
    '../modules/timeSheetModule',
    '../modules/adminReportingModule',
    '../directives/datepicker',
    '../common/commonUtils',
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
