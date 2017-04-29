(function() {
    'use strict';
    angular.module('SmartManager').controller('UsersController', UsersController);
    angular.module('SmartManager').controller('AddUsersController', AddUsersController);
    angular.module('SmartManager').controller('UpdateUsersController', UpdateUsersController);


function UpdateUsersController($scope, $http, $routeParams) {
    $http.get("GetEmployees").then(function(response) {
            $scope.Employees = response.data;
            $http.get("/GetUser/"+$routeParams.id).then(function(response) {
             $scope.CurrentUser = response.data;
             var dd = document.getElementById('inputFullName');
for (var i = 0; i < dd.options.length; i++) {
    if (dd.options[i].text == response.data.empName) {
        dd.selectedIndex = i;
        break;
    }
}
         });
        });
        
    }

    function UsersController($http, $scope, $location,$filter) {
$scope.sortingDirection = "+";
        $scope.ordering = function (patrn) {
            if ($scope.sortingDirection == "+")
                $scope.sortingDirection = "-";
            else $scope.sortingDirection = "+";
            patrn = $scope.sortingDirection + patrn;
            $scope.Users = $filter("orderBy")($scope.Users, patrn);
        };


        $http.get("GetUsers").then(function(response) {
            $scope.Users = response.data;
            console.log(response.data);
        });
        $scope.updateUser = function(id) {
            console.log("aaaa");
            id = "/UpdateUser/" + id;
            console.log(id);
            $location.path(id);
        }
        $scope.deleteUser = function(id) {
            console.log("deleting");
            $http.post('deleteUser', { 'id': id }).success(
                $http.get("GetUsers").then(function(response) {
                    $scope.Users = response.data;
                    console.log(response.data);
                })
            );
        }
    }

    function AddUsersController($http, $scope) {
        $http.get("GetEmployees").then(function(response) {
            $scope.Employees = response.data;
        });
    }

})();
