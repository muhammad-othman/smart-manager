(function() {
    'use strict';
    angular
        .module('SmartManager')
        .controller('EmployeesController', EmployeesController);
 angular
        .module('SmartManager')
        .controller('UpdateEmployeesController', UpdateEmployeesController);




        function UpdateEmployeesController($scope, $http, $routeParams) {
         $http.get("/GetEmp/"+$routeParams.id).then(function(response) {
             $scope.CurrentEmp = response.data;
             console.log(response.data);
         });
        $scope.updatee = function() {
            console.log($routeParams);
            console.log("updateeee");
        }
        $scope.updateEmployee = function(id) {
            console.log("Updating");
            console.log(id);
            $scope.CurrentEmp = id;
            for (var i = 0; i < $scope.MyEmployees.length; i++) {
                if ($scope.MyEmployees[i].id == id) {
                   $scope.CurrentEmp = $scope.MyEmployees[i];
                   console.log($scope.MyEmployees[i]);
                }
            }
            console.log($scope.MyEmployees);
            $location.path("/UpdateEmployee");
        }
        
    }
    function EmployeesController($scope, $filter, $http, $location) {


        $scope.sortingDirection = "+";
        $scope.ordering = function (patrn) {
            if ($scope.sortingDirection == "+")
                $scope.sortingDirection = "-";
            else $scope.sortingDirection = "+";
            patrn = $scope.sortingDirection + patrn;
            $scope.MyEmployees = $filter("orderBy")($scope.MyEmployees, patrn);
        };

        $http.get("GetEmployees").then(function(response) {
            $scope.MyEmployees = response.data;
            console.log(response.data);
        });
        $scope.updateEmployee = function(id) {
            console.log("Updating");
            id = "/UpdateEmployee/"+id;
            console.log(id);

            $location.path(id);
        }
        $scope.deleteEmployee = function(id) {

            $http.post('deleteEmp', { 'id': id }).success(

                $http.get("GetEmployees").then(function(response) {
                    $scope.MyEmployees = response.data;
                    console.log(response.data);
                })
            );
        }
    }
})();
