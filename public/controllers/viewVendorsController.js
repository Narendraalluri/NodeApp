myApp.controller('viewVendorsController', function ($scope, $http, $location,
                                                    $rootScope) {


    try {
        $rootScope.selectOption(5)
    }
    catch (ex) {

    }

    $http.get('/getAllVendors').
        success(function (data, status, headers, config) {
            //alert("Vendor DATA : " + JSON.stringify(data));
            $scope.vendors = data;
        }).
        error(function (data, status, headers, config) {
            alert("Unable to get the vendors list, Please try to login again.");
        });



});