(function() {
    'use strict';
    angular
        .module('SmartManager')
        .controller('SellingBillController', SellingBillController);

    function SellingBillController($scope, $log, $filter, $window,$http) {
        $scope.sortingDirection = "+";
        $scope.ordering = function (patrn) {
            if ($scope.sortingDirection == "+")
                $scope.sortingDirection = "-";
            else $scope.sortingDirection = "+";
            patrn = $scope.sortingDirection + patrn;
            $scope.SellingBills = $filter("orderBy")($scope.SellingBills, patrn);
        };


        $scope.SellingBillsProducts = [];
        $scope.TotalPrice = 0;
        $scope.Deduction = 0;
        $scope.FinalPrice = 0;
        $http.get("getCategories").then(function(response) {
            $scope.MyCategories = response.data;
        });
        $http.get("getSellingBills").then(function(response){
            $scope.SellingBills = response.data
        })
        $scope.categoryChanged = function(c) {
            $http.get("getCategoryProducts/" + c).then(function(response) {
                $scope.MyProducts = response.data;
            });
        }
        $scope.productChanged = function() {
            $scope.Product = $scope.MyProducts.find(x => x.name === $scope.SelectedProduct);
            $scope.Product.SellPrice = parseInt($scope.Product.sellPrice);
        }

        $scope.updateFinalPrice = function() { $scope.FinalPrice = $scope.TotalPrice - $scope.Deduction }

        $scope.AddSellingBillsProduct = function() {

            $scope.Product.Quantity = parseInt(angular.element('#inputQuantity').val());
            $scope.Product.TotalPrice = $scope.Product.SellPrice * $scope.Product.Quantity;
            $scope.TotalPrice += $scope.Product.TotalPrice;
            $scope.SellingBillsProducts.push( $scope.Product);
            $scope.SelectedCategory = null;
            $scope.SelectedProduct = null;
            angular.element('#inputSellPrice').val(null);
            angular.element('#inputQuantity').val(null);
            $scope.updateFinalPrice();

        };

        $scope.SaveBill = function() {
            var bill = {
                BillDate: angular.element('#inputBillDate').val(),
                Total: $scope.TotalPrice,
                Deduction: $scope.Deduction,
                Final: $scope.FinalPrice,
                Notes: angular.element('#inputNotes').val(),
                Products: $scope.SellingBillsProducts
            }
            $http.post("insertSellingBill", bill);
            $window.location.href = "#/SellingBill";


        }
        $scope.RemoveSellingBillsProduct = function(Barcode) {
            var index = -1;
            var product = eval($scope.SellingBillsProducts);
            for (var i = 0; i < product.length; i++) {
                if (product[i].Barcode === Barcode) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                alert("Something gone wrong");
            }
            $scope.TotalPrice -= $scope.SellingBillsProducts[index].TotalPrice;
            $scope.SellingBillsProducts.splice(index, 1);
            $scope.updateFinalPrice();
        };
    }
})();
