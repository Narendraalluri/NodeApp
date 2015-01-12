angular.module('timeSheetModule', []).config(function(
  $routeProvider) {
  $routeProvider.when('/employeeWelcome', {
    controller: 'viewTimeSheetsController',
    templateUrl: 'components/viewTimeSheets/viewTimeSheets.html'
  }).when('/createTimeSheet', {
    controller: 'employeeController',
    templateUrl: 'components/createTimeSheet/createTimeSheet.html'
  }).when('/editTimeSheet/:timesheetId', {
    controller: 'editTimeSheetController',
    templateUrl: 'components/editTimeSheet/editTimeSheet.html'
  }).when('/viewTimeSheets', {
    controller: 'viewTimeSheetsController',
    templateUrl: 'components/viewTimeSheets/viewTimeSheets.html'
  })
});
