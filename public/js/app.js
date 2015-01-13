require(
  [
    /*Modules*/
    '../modules/userModule',
    '../modules/timeSheetModule',
    '../modules/adminReportingModule',
    '../modules/vendorRouter.js',
    '../modules/clientRouter.js',

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
    '../controllers/welcomeController',
    '../controllers/addNewClientController.js',
    '../controllers/viewClientsController.js',
    '../controllers/addNewVendorController.js',
    '../controllers/viewVendorsController.js'

  ],
  function() {
    angular.bootstrap(document, ['myApp']);
  });


var myApp = angular.module('myApp', ['ngRoute', 'userModule',
  'timeSheetModule', 'adminReportingModule', 'clientRouter','vendorRouter'
]).config(
  function(
    $routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/login'
      });
  });
