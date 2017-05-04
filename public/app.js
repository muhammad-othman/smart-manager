angular.module('SmartManager', ["ngRoute"]).config(function ($routeProvider) {
    'use strict';
    $routeProvider.when("/Products", {
        templateUrl: "/Views/Products.html",
        controller: "ProductsController"
    }).when("/AddProducts", {
        templateUrl: "/Views/AddProducts.html",
        controller: "AddProductsController"
    }).when("/UpdateProducts/:id", {
        templateUrl: "/Views/UpdateProducts.html",
        controller: "UpdateProductsController"
    }).when("/ProductsCategories", {
        templateUrl: "/Views/ProductsCategories.html",
        controller: "ProductsCategoriesController"
    }).when("/AddProductsCategories", {
        templateUrl: "/Views/AddProductsCategories.html",
        controller: "ProductsCategoriesController"
    }).when("/AddSellingBill", {
        templateUrl: "/Views/AddSellingBill.html",
        controller: "SellingBillController"
    }).when("/Employees", {
        templateUrl: "/Views/Employees.html",
        controller: "EmployeesController"
    }).when("/AddEmployees", {
        templateUrl: "/Views/AddEmployees.html",
        controller: "EmployeesController"
    }).when("/UpdateEmployee/:id", {
        templateUrl: "/Views/UpdateEmployee.html",
        controller: "UpdateEmployeesController"
    }).when("/UpdateCategory/:id", {
        templateUrl: "/Views/UpdateProductsCategories.html",
        controller: "UpdateCategoryController"
    }).when("/Users", {
        templateUrl: "/Views/Users.html",
        controller: "UsersController"
    }).when("/AddUsers", {
        templateUrl: "/Views/AddUsers.html",
        controller: "AddUsersController"
    }).when("/UpdateUser/:id", {
        templateUrl: "/Views/UpdateUsers.html",
        controller: "UpdateUsersController"
    }).when("/SellingBill", {
        templateUrl: "/Views/SellingBill.html",
        controller:"SellingBillController"
    }).when("/BuyingBill", {
        templateUrl: "/Views/BuyingBill.html",
        controller: "BuyingBillController"
    }).when("/AddBuyingBill", {
        templateUrl: "/Views/AddBuyingBill.html",
        controller: "BuyingBillController"
    }).when("/Welcome", {
        templateUrl: "/Views/Welcome.html"
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