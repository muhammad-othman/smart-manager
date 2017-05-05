var app = angular.module('SmartManager', ["ngRoute"])


app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
   'self',
   "http://" + window.location.host+"/**"
  ]);
});
app.config(function ($routeProvider) {
    $routeProvider.when("/Products", {
        templateUrl: "http://" + window.location.host + "/Views/Products.html",
        controller: "ProductsController"
    }).when("/AddProducts", {
        templateUrl: "http://" + window.location.host + "/Views/AddProducts.html",
        controller: "AddProductsController"
    }).when("/UpdateProducts/:id", {
        templateUrl: "http://" + window.location.host + "/Views/UpdateProducts.html",
        controller: "UpdateProductsController"
    }).when("/ProductsCategories", {
        templateUrl: "http://" + window.location.host + "/Views/ProductsCategories.html",
        controller: "ProductsCategoriesController"
    }).when("/AddProductsCategories", {
        templateUrl: "http://" + window.location.host + "/Views/AddProductsCategories.html",
        controller: "ProductsCategoriesController"
    }).when("/AddSellingBill", {
        templateUrl: "http://" + window.location.host + "/Views/AddSellingBill.html",
        controller: "SellingBillController"
    }).when("/Employees", {
        templateUrl: "http://" + window.location.host + "/Views/Employees.html",
        controller: "EmployeesController"
    }).when("/AddEmployees", {
        templateUrl: "http://" + window.location.host + "/Views/AddEmployees.html",
        controller: "EmployeesController"
    }).when("/UpdateEmployee/:id", {
        templateUrl: "http://" + window.location.host + "/Views/UpdateEmployee.html",
        controller: "UpdateEmployeesController"
    }).when("/UpdateCategory/:id", {
        templateUrl: "http://" + window.location.host + "/Views/UpdateProductsCategories.html",
        controller: "UpdateCategoryController"
    }).when("/Users", {
        templateUrl: "http://" + window.location.host + "/Views/Users.html",
        controller: "UsersController"
    }).when("/AddUsers", {
        templateUrl: "http://" + window.location.host + "/Views/AddUsers.html",
        controller: "AddUsersController"
    }).when("/UpdateUser/:id", {
        templateUrl: "http://" + window.location.host + "/Views/UpdateUsers.html",
        controller: "UpdateUsersController"
    }).when("/SellingBill", {
        templateUrl: "http://" + window.location.host + "/Views/SellingBill.html",
        controller:"SellingBillController"
    }).when("/BuyingBill", {
        templateUrl: "http://" + window.location.host + "/Views/BuyingBill.html",
        controller: "BuyingBillController"
    }).when("/AddBuyingBill", {
        templateUrl: "http://" + window.location.host + "/Views/AddBuyingBill.html",
        controller: "BuyingBillController"
    }).when("/Welcome", {
        templateUrl: "http://" + window.location.host + "/Views/Welcome.html"
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