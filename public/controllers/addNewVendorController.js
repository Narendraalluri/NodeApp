myApp.controller('addNewVendorController', function ($scope, $http, $location,
                                                     $rootScope) {


    try {
        $rootScope.selectOption(4)
    }
    catch (ex) {

    }

    $http.get('/getAllStates').
        success(function (data, status, headers, config) {
            $scope.stateNames = data.resultData;
        }).
        error(function (data, status, headers, config) {
            console.log("Unable to get the states information");
        });

    $scope.addNewVendorInfo = function (newVendorDetails) {
        $http.post('/addNewVendor', {
            'vendorName'            : newVendorDetails.vendorName,
            'vendorAddr1'           : newVendorDetails.addr1,
            'vendorAddr2'           : newVendorDetails.addr2,
            'vendorCityName'        : newVendorDetails.cityName,
            'vendorState'           : newVendorDetails.vendorState.value,
            'vendorZipCode'         : newVendorDetails.zipCode,
            'vendorContactDetails'  : [newVendorDetails.contactDetails1, newVendorDetails.contactDetails2]
        }).success(function (data, status, headers, config) {
            // $location.path('/showAllVendors');
            // alert("Success Response from server : " + JSON.stringify(data));
            $scope.successValue = 1;
        }).error(function (data, status, headers, config) {
            // alert("Error Response from server : " + JSON.stringify(data));
            $scope.successValue = 2;
        });

    }


});