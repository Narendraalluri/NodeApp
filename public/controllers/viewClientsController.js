myApp.controller('viewClientController', function ($scope, $http, $location,
                                                     $rootScope) {

    try {
        $rootScope.selectOption(7)
    }
    catch (ex) {

    }

    $http.get('/getAllClients').
        success(function (data, status, headers, config) {
            $scope.clientInfo = data.responseData;
        }).
        error(function (data, status, headers, config) {

        }
    );


});