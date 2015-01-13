myApp.controller('addNewClientController', function ($scope, $http, $location,
                                                     $rootScope) {

    try {
        $rootScope.selectOption(6)
    }
    catch (ex) {

    }


    $scope.addNewClientInfo = function (newClientInfo) {
        $http.post('/addNewClient', {
            'clientName': newClientInfo.clientName,
            'clientAddress1': newClientInfo.addr1,
            'clientAddress2': newClientInfo.addr2,
            'clientCityName': newClientInfo.cityName,
            'clientStateIndex': newClientInfo.clientState.value,
            'clientZipCode': newClientInfo.zipCode,
            'vendorID': newClientInfo.selectedVendor._id

        }).
            success(function (data, status, headers, config) {
                $scope.retValue = 2;
            }).
            error(function (data, status, headers, config) {
                $scope.retValue = 1;
            });
    };

    $http.get('/getAllStates').
        success(function (data, status, headers, config) {
            $scope.stateNames = data.resultData;
        }).
        error(function (data, status, headers, config) {

        }
    );

    $http.get('/getAllVendors').
        success(function (data, status, headers, config) {
            $scope.vendors = data;
        }).
        error(function (data, status, headers, config) {
        }
    );

});