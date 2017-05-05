angular.module('SmartManager', ["ngRoute"]).config(function ($routeProvider) {
    'use strict';
    $routeProvider.when("/Products", {
        templateUrl: "views/Products.html",
        controller: "ProductsController"
    }).when("/AddProducts", {
        templateUrl: "views/AddProducts.html",
        controller: "AddProductsController"
    }).when("/UpdateProducts/:id", {
        templateUrl: "views/UpdateProducts.html",
        controller: "UpdateProductsController"
    }).when("/ProductsCategories", {
        templateUrl: "views/ProductsCategories.html",
        controller: "ProductsCategoriesController"
    }).when("/AddProductsCategories", {
        templateUrl: "views/AddProductsCategories.html",
        controller: "ProductsCategoriesController"
    }).when("/AddSellingBill", {
        templateUrl: "views/AddSellingBill.html",
        controller: "SellingBillController"
    }).when("/Employees", {
        templateUrl: "views/Employees.html",
        controller: "EmployeesController"
    }).when("/AddEmployees", {
        templateUrl: "views/AddEmployees.html",
        controller: "EmployeesController"
    }).when("/UpdateEmployee/:id", {
        templateUrl: "views/UpdateEmployee.html",
        controller: "UpdateEmployeesController"
    }).when("/UpdateCategory/:id", {
        templateUrl: "views/UpdateProductsCategories.html",
        controller: "UpdateCategoryController"
    }).when("/Users", {
        templateUrl: "views/Users.html",
        controller: "UsersController"
    }).when("/AddUsers", {
        templateUrl: "views/AddUsers.html",
        controller: "AddUsersController"
    }).when("/UpdateUser/:id", {
        templateUrl: "views/UpdateUsers.html",
        controller: "UpdateUsersController"
    }).when("/SellingBill", {
        templateUrl: "views/SellingBill.html",
        controller:"SellingBillController"
    }).when("/BuyingBill", {
        templateUrl: "views/BuyingBill.html",
        controller: "BuyingBillController"
    }).when("/AddBuyingBill", {
        templateUrl: "views/AddBuyingBill.html",
        controller: "BuyingBillController"
    }).when("/Welcome", {
        templateUrl: "views/Welcome.html"
    });
    $routeProvider.otherwise({
        redirectTo: "Welcome"
    });
}).controller('UController', function($scope,$http) {

   $http.get("ussser").then(function(response) {
            $scope.ussser = response.data;
            console.log(response.data);
        });
});
