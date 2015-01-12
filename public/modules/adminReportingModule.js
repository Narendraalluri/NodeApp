angular.module('adminReportingModule', []).config(
  function(
    $routeProvider) {
    $routeProvider.when('/empTimeSheets', {
      controller: 'empTimeSheetsController',
      templateUrl: 'components/empTimeSheets/viewEmpTimeSheets.html'
    }).when('/editTimeSheetAdmin/:timesheetId', {
      controller: 'editTimeSheetAdminController',
      templateUrl: 'components/editTimeSheetAdmin/editTimeSheetAdmin.html'
    })
  });
