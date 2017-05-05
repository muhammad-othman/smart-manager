var app = angular.module('SmartManager', ["ngRoute"])


app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
   'self',
   "http://" + window.location.host+"/**"
  ]);
});
app.config(function ($routeProvider) {
    $routeProvider.when("/Products", {
        templateUrl: "http://" + window.location.host + "/views/Products.html",
        controller: "ProductsController"
    }).when("/AddProducts", {
        templateUrl: "http://" + window.location.host + "/views/AddProducts.html",
        controller: "AddProductsController"
    }).when("/UpdateProducts/:id", {
        templateUrl: "http://" + window.location.host + "/views/UpdateProducts.html",
        controller: "UpdateProductsController"
    }).when("/ProductsCategories", {
        templateUrl: "http://" + window.location.host + "/views/ProductsCategories.html",
        controller: "ProductsCategoriesController"
    }).when("/AddProductsCategories", {
        templateUrl: "http://" + window.location.host + "/views/AddProductsCategories.html",
        controller: "ProductsCategoriesController"
    }).when("/AddSellingBill", {
        templateUrl: "http://" + window.location.host + "/views/AddSellingBill.html",
        controller: "SellingBillController"
    }).when("/Employees", {
        templateUrl: "http://" + window.location.host + "/views/Employees.html",
        controller: "EmployeesController"
    }).when("/AddEmployees", {
        templateUrl: "http://" + window.location.host + "/views/AddEmployees.html",
        controller: "EmployeesController"
    }).when("/UpdateEmployee/:id", {
        templateUrl: "http://" + window.location.host + "/views/UpdateEmployee.html",
        controller: "UpdateEmployeesController"
    }).when("/UpdateCategory/:id", {
        templateUrl: "http://" + window.location.host + "/views/UpdateProductsCategories.html",
        controller: "UpdateCategoryController"
    }).when("/Users", {
        templateUrl: "http://" + window.location.host + "/views/Users.html",
        controller: "UsersController"
    }).when("/AddUsers", {
        templateUrl: "http://" + window.location.host + "/views/AddUsers.html",
        controller: "AddUsersController"
    }).when("/UpdateUser/:id", {
        templateUrl: "http://" + window.location.host + "/views/UpdateUsers.html",
        controller: "UpdateUsersController"
    }).when("/SellingBill", {
        templateUrl: "http://" + window.location.host + "/views/SellingBill.html",
        controller:"SellingBillController"
    }).when("/BuyingBill", {
        templateUrl: "http://" + window.location.host + "/views/BuyingBill.html",
        controller: "BuyingBillController"
    }).when("/AddBuyingBill", {
        templateUrl: "http://" + window.location.host + "/views/AddBuyingBill.html",
        controller: "BuyingBillController"
    }).when("/Welcome", {
        templateUrl: "http://" + window.location.host + "/views/Welcome.html"
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
