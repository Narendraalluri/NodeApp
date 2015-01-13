angular.module('vendorRouter', []).config(function ($routeProvider) {
    $routeProvider
        .when('/viewVendors', {
            controller: 'viewVendorsController',
            templateUrl: 'views/ViewVendors.html'
        }).when('/addVendors', {
            controller: 'addNewVendorController',
            templateUrl: 'views/AddNewVendor.html'
        })
});

