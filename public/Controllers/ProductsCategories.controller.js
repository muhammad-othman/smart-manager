(function () {
    'use strict';

    angular
        .module('SmartManager')
        .controller('ProductsCategoriesController', ProductsCategoriesController)
        .controller('UpdateCategoryController', UpdateCategoryController);





 function UpdateCategoryController($scope, $http, $routeParams) {
         $http.get("/getCategories/"+$routeParams.id).then(function(response) {
             $scope.CurrentCategory = response.data;
         });
    }





    function ProductsCategoriesController($scope, $filter, $http,$location) {

        $scope.sortingDirection = "+";
        $scope.ordering = function (patrn) {
            if ($scope.sortingDirection == "+")
                $scope.sortingDirection = "-";
            else $scope.sortingDirection = "+";
            patrn = $scope.sortingDirection + patrn;
            $scope.MyCategories = $filter("orderBy")($scope.MyCategories, patrn);
        };


        $http.get("getCategories").then(function(response) {
            $scope.MyCategories = response.data;
        }); 


        $scope.deleteCategory = function(id) {

            $http.post('deleteCategory', { 'id': id }).success(

                $http.get("getCategories").then(function(response) {
                    $scope.MyCategories = response.data;
                })
            );
        }  
        $scope.updateCategory = function(id) {
            id = "/UpdateCategory/"+id;
            $location.path(id);
        }   
    }
})();
