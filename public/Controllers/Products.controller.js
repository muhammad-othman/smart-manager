(function() {
        'use strict';
        angular
            .module('SmartManager')
            .controller('ProductsController', ProductsController)
            .controller('UpdateProductsController', UpdateProductsController)
            .controller('AddProductsController', AddProductsController);

        function AddProductsController($scope, $http, $routeParams) {
            $http.get("getCategories").then(function(response) {
                $scope.MyCategories = response.data;
            });
        }


            function UpdateProductsController($scope, $http, $routeParams) {
                $http.get("getCategories").then(function(response) {
                    $scope.MyCategories = response.data;


                    $http.get("/getProducts/" + $routeParams.id).then(function(response) {
                        $scope.CurrentProduct = response.data;
                        var dd = document.getElementById('inputCategory');
                    for (var i = 0; i < dd.options.length; i++) {
                        if (dd.options[i].text == response.data.category) {
                            dd.selectedIndex = i;
                            break;
                        }
                    }
                    });
                });
            }


            function ProductsController($scope, $filter, $http,$location) {

                $scope.sortingDirection = "+";
        $scope.ordering = function (patrn) {
            if ($scope.sortingDirection == "+")
                $scope.sortingDirection = "-";
            else $scope.sortingDirection = "+";
            patrn = $scope.sortingDirection + patrn;
            $scope.MyProducts = $filter("orderBy")($scope.MyProducts, patrn);
        };

                $http.get("getProducts").then(function(response) {
                    $scope.MyProducts = response.data;
                });


                $scope.deleteProduct = function(id) {

                    $http.post('deleteProduct', { 'id': id }).success(

                        $http.get("getProducts").then(function(response) {
                            $scope.MyProducts = response.data;
                        })
                    );
                }
                $scope.updateProduct = function(id) {
                    id = "/UpdateProducts/" + id;
                    $location.path(id);
                }
            }
        })();
