// app.js
// create angular app


uploadedFilesArray = []
var client = new XMLHttpRequest();

function upload() {
    var file = document.getElementById("timesheetFile");

    /* Create a FormData instance */
    var formData = new FormData();
    /* Add the file */
    formData.append("upload", file.files[0]);

    $.ajax({
        url: 'uploadFile',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data, status, req) {
            uploadedFilesArray.push({
                "id": data.resultId,
                "name": data.fileName
            })
            $("#UploadedFiles").append('<li id="file_' + data.resultId + '"><a href="showFile?originalName=' + data.fileName + '&id=' + data.resultId + '">' + data.fileName + '</a><a href="javascript:removeFile(\'' + data.resultId + '\')"><span class="glyphicon glyphicon-remove"></span></a></li>');
        },
        error: function(req, status, error) {
            alert('Upload Failed');
        }
    });
}

function removeFile(id) {


    $.ajax({
        url: 'removeFile?id=' + id,
        cache: false,
        processData: false,
        contentType: false,
        type: 'GET',
        success: function(data, status, req) {

            for (i = 0; i < uploadedFilesArray.length; i++) {
                if (uploadedFilesArray[i].id == id) {
                    uploadedFilesArray = uploadedFilesArray.splice(i, 1);
                }

            }
            $('#file_' + id).remove();

        },
        error: function(req, status, error) {
            alert('Upload Failed');
        }
    });
}



var myApp = angular.module("myApp", ['ngRoute']);

formatSingleDigit = function(str) {
    if (str < 10) return "0" + str
    else return str;
}
myApp.directive('jqdatepicker', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {

            element.datepicker({
                dateFormat: 'yy-mm-dd',
                beforeShowDay: function(date) {
                    var day = date.getDay();
                    return [day == 0, ""];
                },
                onSelect: function(date) {

                    scope.startDate = date;
                    temp = new Date(date);
                    temp.setDate(temp.getDate() + 7)
                    scope.endDate = (temp.getYear() + 1900) + "-" + formatSingleDigit(temp.getMonth() + 1) + "-" + formatSingleDigit(temp.getDate());
                    try {
                        scope.$apply();
                    } catch (e) {}

                }
            });
        }
    };
});

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            controller: 'mainController',
            templateUrl: 'views/login.html'
        })
        .when('/createUser', {
            controller: 'addUserController',
            templateUrl: 'views/createUser.html'
        })
        .when('/updateUser/:userId', {
            controller: 'updateUserController',
            templateUrl: 'views/editUser.html'
        })
        .when('/userWelcome', {
            controller: 'welcomeController',
            controllerAs: 'welcomeController',
            templateUrl: 'views/userWelcome.html'
        }).when('/employeeWelcome', {
            controller: 'viewTimeSheetsController',
            templateUrl: 'views/viewTimeSheets.html'
        }).when('/createTimeSheet', {
            controller: 'employeeController',
            templateUrl: 'views/createTimeSheet.html'
        }).when('/editTimeSheet/:timesheetId', {
            controller: 'editTimeSheetController',
            templateUrl: 'views/editTimeSheet.html'
        }).when('/viewTimeSheets', {
            controller: 'viewTimeSheetsController',
            templateUrl: 'views/viewTimeSheets.html'
        }).when('/empTimeSheets', {
            controller: 'empTimeSheetsController',
            templateUrl: 'views/viewEmpTimeSheets.html'
        }).when('/editTimeSheetAdmin/:timesheetId', {
            controller: 'editTimeSheetAdminController',
            templateUrl: 'views/editTimeSheetAdmin.html'
        })
        .otherwise({
            redirectTo: '/login'
        });
});
adminOptions = [{
    name: "Add Employees",
    path: "createUser",
    id: "1"
}, {
    name: "View Employees",
    path: "userWelcome",
    id: "2"
}
, {
    name: "View Timesheets",
    path: "empTimeSheets",
    id: "3"
}
]
employeeOptions = [{
    name: "Create TimeSheet",
    path: "createTimeSheet",
    id: "1"
}, {
    name: "View TimeSheets",
    path: "viewTimeSheets",
    id: "2"
}]
myApp.factory('AuthService', function($http) {
    var currentUser;


    return {
        setCurrentUser: function(user) {
            currentUser = user
        },
        getCurrentUser: function() {

            return currentUser;
        }
    };
});





myApp.controller('updateUserController', function($scope, $http, $location, AuthService, $rootScope, $routeParams) {


    try {
        $rootScope.selectOption(10)
    } catch (e) {}


    $http.get('/editUser?id=' + $routeParams.userId).
    success(function(data, status, headers, config) {
        $scope.firstName = data.firstName
        $scope.lastName = data.lastName
        $scope.email = data.email
        $scope.password = data.password
        $scope.role = data.role
        $scope.id = data._id
    }).
    error(function(data, status, headers, config) {

    });

    $scope.updateUserFunc = function(isValid, email, password, firstName, lastName, role) {
        if (isValid) {

            $http.post('/updateUser', {
                'id': $scope.id,
                'email': $scope.email,
                'password': $scope.password,
                'firstName': $scope.firstName,
                'lastName': $scope.lastName,
                'role': $scope.role


            }).
            success(function(data, status, headers, config) {
                if (data.status == "failed") {
                    $scope.updateFailed = true
                } else {
                    $location.path('/userWelcome')
                }
            }).
            error(function(data, status, headers, config) {

            });
        }
    }


    $scope.deleteUser = function() {
        $http.get('/deleteUser?id=' + $routeParams.userId).
        success(function(data, status, headers, config) {
            $location.path('/userWelcome')
        }).
        error(function(data, status, headers, config) {

        });
    }


});


myApp.controller('addUserController', function($scope, $http, $location, AuthService, $rootScope) {



    try {
        $rootScope.selectOption(1)

    } catch (e) {}




    $scope.addUser = function(isValid, email, password, firstName, lastName, role) {
        if (isValid) {
            $http.post('/addUser', {
                'email': $scope.email,
                'password': $scope.password,
                'firstName': $scope.firstName,
                'lastName': $scope.lastName,
                'role': $scope.role


            }).
            success(function(data, status, headers, config) {
                if (data.status == "failed") {
                    $scope.addFailed = true
                } else {
                    $location.path('/userWelcome')
                }
            }).
            error(function(data, status, headers, config) {

            });
        }
    }


});




myApp.controller('editTimeSheetAdminController', function($scope, $http, $location, AuthService, $rootScope,$routeParams) {

 $scope.sheetCount = 0;
 timesheetFile.onchange = function() {
        if (this.value !== '')
            upload()
    };

      $scope.incrementCounter = function() {
        try{
        if ($scope.sheetCount < 4) {
            $scope.sheetCount = $scope.sheetCount + 1
            for (i = 0; i < $scope.sheetsVal.length; i++){
                if ($scope.sheetsVal[i].status == undefined || $scope.sheetsVal[i].status == false) {
                    $scope.sheetsVal[i].status = true;
                    break;
                }
            }
        }
    }catch(e){alert(e.message)}



    }

    $scope.removeSheet = function(id) {
        $scope.sheetsVal[id] = {
            "status": false,
            "project": 1,
            "sunday": 0,
            "monday": 0,
            "tuesday": 0,
            "wednesday": 0,
            "thursday": 0,
            "friday": 0,
            "saturday": 0,
            "total": 0
        }

        $scope.sheetCount = $scope.sheetCount - 1;
    }
$scope.$watch("startDate", function(newValue, oldValue) {
        $scope.timesheet.startDate = $scope.startDate;

    });
    $scope.$watch("[sheetsVal]", function(newValue, oldValue) {
        totalCount = 0;
        for (i = 0; i < 5; i++) {
            $scope.sheetsVal[i].total = parseInt($scope.sheetsVal[i].sunday) + parseInt($scope.sheetsVal[i].monday) + parseInt($scope.sheetsVal[i].tuesday) + parseInt($scope.sheetsVal[i].wednesday) + parseInt($scope.sheetsVal[i].thursday) + parseInt($scope.sheetsVal[i].friday) + parseInt($scope.sheetsVal[i].saturday)
            totalCount += parseInt($scope.sheetsVal[i].total);

        }
        $scope.timesheet.total = totalCount;

    });

   $scope.saveTimesheet = function(){
        
        $scope.timesheet.sheets = $scope.sheetsVal;
        $scope.timesheet.startDate = $scope.startDate;
        $scope.timesheet.endDate = $scope.endDate;
        $scope.timesheet.uploadedFiles = uploadedFilesArray;
         $http.post('/modifyTimeSheet?id='+$routeParams.timesheetId, $scope.timesheet).
            success(function(data, status, headers, config) {
                try{
                $location.path('/empTimeSheets')
                alert('success')
            }catch(e){alert(e.message)}
            }).
            error(function(data, status, headers, config) {

            });

   }

    $http.get('/getTimesheet?id='+$routeParams.timesheetId).
            success(function(data, status, headers, config) {
                $scope.timesheet.userId = data[0].userId;
                $scope.timesheet.userName =data[0].userName;
                $scope.sheetsVal = data[0].sheets;
                $scope.startDate =data[0].startDate;
                $scope.endDate = data[0].endDate;
                $scope.timesheet.clientApproved = Boolean(data[0].clientApproved);
                $scope.timesheet.uploadedFiles = data[0].uploadedFiles;
                $scope.timesheet.total = data[0].total;
                $scope.timesheet.comments = data[0].comments;
                $scope.sheetsVal[0].status = true;
                for(i=0;i<data[0].uploadedFiles.length;i++)
                    $("#UploadedFiles").append('<li id="file_' + data[0].uploadedFiles[i].id + '"><a href="showFile?originalName=' + data[0].uploadedFiles[i].name + '&id=' + data[0].uploadedFiles[i].id + '">' + data[0].uploadedFiles[i].name + '</a><a href="javascript:removeFile(\'' + data[0].uploadedFiles[i].id + '\')"><span class="glyphicon glyphicon-remove"></span></a></li>');


            }).
            error(function(data, status, headers, config) {

            });

    
});


myApp.controller('editTimeSheetController', function($scope, $http, $location, AuthService, $rootScope,$routeParams) {

 $scope.sheetCount = 0;
 timesheetFile.onchange = function() {
        if (this.value !== '')
            upload()
    };

      $scope.incrementCounter = function() {
        try{
        if ($scope.sheetCount < 4) {
            $scope.sheetCount = $scope.sheetCount + 1
            for (i = 0; i < $scope.sheetsVal.length; i++){
                if ($scope.sheetsVal[i].status == undefined || $scope.sheetsVal[i].status == false) {
                    $scope.sheetsVal[i].status = true;
                    break;
                }
            }
        }
    }catch(e){alert(e.message)}



    }

    $scope.removeSheet = function(id) {
        $scope.sheetsVal[id] = {
            "status": false,
            "project": 1,
            "sunday": 0,
            "monday": 0,
            "tuesday": 0,
            "wednesday": 0,
            "thursday": 0,
            "friday": 0,
            "saturday": 0,
            "total": 0
        }

        $scope.sheetCount = $scope.sheetCount - 1;
    }
$scope.$watch("startDate", function(newValue, oldValue) {
        $scope.timesheet.startDate = $scope.startDate;

    });
    $scope.$watch("[sheetsVal]", function(newValue, oldValue) {
        totalCount = 0;
        for (i = 0; i < 5; i++) {
            $scope.sheetsVal[i].total = parseInt($scope.sheetsVal[i].sunday) + parseInt($scope.sheetsVal[i].monday) + parseInt($scope.sheetsVal[i].tuesday) + parseInt($scope.sheetsVal[i].wednesday) + parseInt($scope.sheetsVal[i].thursday) + parseInt($scope.sheetsVal[i].friday) + parseInt($scope.sheetsVal[i].saturday)
            totalCount += parseInt($scope.sheetsVal[i].total);

        }
        $scope.timesheet.total = totalCount;

    });

   $scope.saveTimesheet = function(){
        $scope.timesheet.userName = $rootScope.loggedInUser.firstName;
        $scope.timesheet.userId = $rootScope.loggedInUser._id;
        $scope.timesheet.sheets = $scope.sheetsVal;
        $scope.timesheet.startDate = $scope.startDate;
        $scope.timesheet.endDate = $scope.endDate;
        $scope.timesheet.uploadedFiles = uploadedFilesArray;
         $http.post('/modifyTimeSheet?id='+$routeParams.timesheetId, $scope.timesheet).
            success(function(data, status, headers, config) {
                $location.path('/viewTimeSheets')
            }).
            error(function(data, status, headers, config) {

            });

   }

    $http.get('/getTimesheet?id='+$routeParams.timesheetId).
            success(function(data, status, headers, config) {
                $scope.sheetsVal = data[0].sheets;
                $scope.startDate =data[0].startDate;
                $scope.endDate = data[0].endDate;
                $scope.timesheet.clientApproved = Boolean(data[0].clientApproved);
                $scope.timesheet.uploadedFiles = data[0].uploadedFiles;
                $scope.timesheet.total = data[0].total;
                $scope.timesheet.comments = data[0].comments;
                $scope.sheetsVal[0].status = true;
                for(i=0;i<data[0].uploadedFiles.length;i++)
                    $("#UploadedFiles").append('<li id="file_' + data[0].uploadedFiles[i].id + '"><a href="showFile?originalName=' + data[0].uploadedFiles[i].name + '&id=' + data[0].uploadedFiles[i].id + '">' + data[0].uploadedFiles[i].name + '</a><a href="javascript:removeFile(\'' + data[0].uploadedFiles[i].id + '\')"><span class="glyphicon glyphicon-remove"></span></a></li>');


            }).
            error(function(data, status, headers, config) {

            });

    
});


myApp.controller('empTimeSheetsController', function($scope, $http, $location, AuthService, $rootScope) {
 try {
        $rootScope.selectOption(3)
    } catch (e) {}

   

   $scope.showTimesheet = function (id){
        $location.path('/editTimeSheetAdmin/'+id)

   }


    $http.get('/viewAllTimesheets').
            success(function(data, status, headers, config) {
                 $scope.timesheetList = data;//[{startDate:"sdf", endDate:"sdf", clientApproved:"sdf",total:"sdf"}]
            }).
            error(function(data, status, headers, config) {

            });

    
});

myApp.controller('viewTimeSheetsController', function($scope, $http, $location, AuthService, $rootScope) {
 try {
        $rootScope.selectOption(2)
    } catch (e) {}

   

   $scope.showTimesheet = function (id){
        $location.path('/editTimeSheet/'+id)

   }


    $http.get('/viewUserTimesheets?userId='+$rootScope.loggedInUser._id).
            success(function(data, status, headers, config) {
                 $scope.timesheetList = data;//[{startDate:"sdf", endDate:"sdf", clientApproved:"sdf",total:"sdf"}]
            }).
            error(function(data, status, headers, config) {

            });

    
});


myApp.controller('employeeController', function($scope, $http, $location, AuthService, $rootScope) {

    timesheetFile.onchange = function() {
        if (this.value !== '')
            upload()
    };

    $scope.sheets = [true, false, false, false, false];

    $scope.sheetsVal = [];


    $scope.sheetCount = 0;

    for(i=0;i<5;i++)
        $scope.sheetsVal[i] = {
            "status": false,
            "project": 1,
            "sunday": 0,
            "monday": 0,
            "tuesday": 0,
            "wednesday": 0,
            "thursday": 0,
            "friday": 0,
            "saturday": 0,
            "total": 0
        }

    $scope.sheetsVal[0] = {
            "status": true,
            "project": 1,
            "sunday": 0,
            "monday": 0,
            "tuesday": 0,
            "wednesday": 0,
            "thursday": 0,
            "friday": 0,
            "saturday": 0,
            "total": 0
        }
    
    $scope.startDate = ""
    $scope.timesheet = {}
    $scope.timesheet.sheets = $scope.sheetsVal;
    $scope.timesheet.total = 0;
    $scope.timesheet.comments = "";
    $scope.timesheet.clientApproved = false;
    $scope.timesheet.startDate = $scope.startDate;

    $scope.$watch("startDate", function(newValue, oldValue) {
        $scope.timesheet.startDate = $scope.startDate;

    });
    $scope.$watch("[sheetsVal]", function(newValue, oldValue) {
        totalCount = 0;
        for (i = 0; i < 5; i++) {
            $scope.sheetsVal[i].total = parseInt($scope.sheetsVal[i].sunday) + parseInt($scope.sheetsVal[i].monday) + parseInt($scope.sheetsVal[i].tuesday) + parseInt($scope.sheetsVal[i].wednesday) + parseInt($scope.sheetsVal[i].thursday) + parseInt($scope.sheetsVal[i].friday) + parseInt($scope.sheetsVal[i].saturday)
            totalCount += parseInt($scope.sheetsVal[i].total);

        }
        $scope.timesheet.total = totalCount;

    });


    $scope.addTimesheet = function() {

        $scope.timesheet.userName = $rootScope.loggedInUser.firstName;
        $scope.timesheet.userId = $rootScope.loggedInUser._id;
        $scope.timesheet.sheets = $scope.sheetsVal;
        $scope.timesheet.startDate = $scope.startDate;
        $scope.timesheet.endDate = $scope.endDate;
        $scope.timesheet.uploadedFiles = uploadedFilesArray;
         $http.post('/createTimeSheet', $scope.timesheet).
            success(function(data, status, headers, config) {
                $location.path('/viewTimeSheets')
            }).
            error(function(data, status, headers, config) {

            });
    }

    $scope.incrementCounter = function() {

        if ($scope.sheetCount < 4) {
            $scope.sheetCount = $scope.sheetCount + 1
            for (i = 0; i < $scope.sheets.length; i++)
                if ($scope.sheetsVal[i].status == false) {
                    $scope.sheetsVal[i].status = true;
                    break;
                }
        }



    }

    $scope.removeSheet = function(id) {
        $scope.sheetsVal[id] = {
            "status": false,
            "project": 1,
            "sunday": 0,
            "monday": 0,
            "tuesday": 0,
            "wednesday": 0,
            "thursday": 0,
            "friday": 0,
            "saturday": 0,
            "total": 0
        }

        $scope.sheetCount = $scope.sheetCount - 1;
    }


});
myApp.controller('welcomeController', function($scope, $http, $location, AuthService, $rootScope) {


    $scope.employeeList = ['sdfdf'];

    try {
        $rootScope.selectOption(2)

    } catch (e) {}
    $http.get('/showUsers').
    success(function(data, status, headers, config) {
        $scope.employeeList = data;
    }).
    error(function(data, status, headers, config) {

    });


    $scope.showUser = function(id) {
        $location.path('/updateUser/' + id)

    }



});

// create angular controller
myApp.controller('mainController', function($scope, $http, $location, AuthService, $rootScope) {
    $scope.loginFailed = false;
$rootScope.Options = []
    // function to submit the form after all validation has occurred            
    $scope.submitForm = function(isValid, userName, password) {

        // check to make sure the form is completely valid
        if (isValid) {
            // Simple POST request example (passing data) :
            try {
                $http.post('/loginUser', {
                    'email': $scope.user.email,
                    'password': $scope.user.password
                }).
                success(function(data, status, headers, config) {
                    if (data.status == "failed") {
                        $scope.loginFailed = true;
                    } else {
                        $rootScope.loggedInUser = data.user
                        $scope.loginFailed = false;
                        if (data.user.role == "admin") {
                            $rootScope.isAdmin = true
                            $rootScope.Options = adminOptions
                            $location.path('/userWelcome')

                        } else {
                            $rootScope.isEmployee = true
                            $rootScope.Options = employeeOptions
                            $location.path('/employeeWelcome')
                        }

                        $rootScope.selectOption = function(id) {
                            for (i = 0; i < 10; i++) {
                                try {
                                    document.getElementById('option_' + i).className = ''
                                } catch (e) {}
                            }
                            try {
                                document.getElementById('option_' + id).className = 'active'
                            } catch (e) {}
                        }

                    }
                }).
                error(function(data, status, headers, config) {
                    $scope.userForm.loginFailed = false;

                });
            } catch (e) {
                alert(e.message)
            }

        }

    };

});