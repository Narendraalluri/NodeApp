angular.module('clientRouter', []).config(function ($routeProvider) {
    $routeProvider
        .when('/viewClients', {
            controller: 'viewClientController',
            templateUrl: 'views/ViewClients.html'
        }).when('/addClients', {
            controller: 'addNewClientController',
            templateUrl: 'views/AddNewClient.html'
        })
});

