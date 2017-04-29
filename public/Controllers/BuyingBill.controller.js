(function () {
    'use strict';
    angular
        .module('SmartManager')
        .controller('BuyingBillController', BuyingBillController);
    function BuyingBillController($scope, $filter, $http, $window) {
        $scope.BuyingBillsProducts = [];
        $scope.TotalPrice = 0;
        $scope.Deduction = 0;
        $scope.FinalPrice = 0;
        $http.get("getCategories").then(function(response) {
                $scope.MyCategories = response.data;
            });
        $http.get("getBuyingBills").then(function(response){
            $scope.BuyingBills = response.data
        })
        $scope.categoryChanged=function(c){
             $http.get("getCategoryProducts/"+c).then(function(response) {
                $scope.MyProducts = response.data;
            });
        }

        
        $scope.updateFinalPrice  = function(){$scope.FinalPrice = $scope.TotalPrice-$scope.Deduction}

        $scope.AddBuyingBillsProduct = function () {
            var tempProduct = $scope.MyProducts.find(x => x.name ===  $scope.SelectedProduct );
            tempProduct.Quantity = angular.element('#inputQuantity').val()
            tempProduct.BuyPrice = angular.element('#inputBuyPrice').val()
            tempProduct.SellPrice = angular.element('#inputSellPrice').val()
            tempProduct.TotalPrice = angular.element('#inputBuyPrice').val()*angular.element('#inputQuantity').val();
             $scope.TotalPrice +=tempProduct.TotalPrice ;
            $scope.BuyingBillsProducts.push(tempProduct);
            $scope.SelectedCategory = null;
            $scope.SelectedProduct = null;
            angular.element('#inputSellPrice').val(null);
            angular.element('#inputBuyPrice').val(null);
            angular.element('#inputQuantity').val(null);
           $scope.updateFinalPrice();

        };

        $scope.SaveBill= function(){
            var bill = {
                BillDate:angular.element('#inputBillDate').val(),
                Total: $scope.TotalPrice,
                Deduction:$scope.Deduction,
                Final:$scope.FinalPrice,
                Notes:angular.element('#inputNotes').val(),
                Products:$scope.BuyingBillsProducts
            }
            $http.post("insertBuyingBill",bill);
             $window.location.href = "#/BuyingBill";


        }
        $scope.RemoveBuyingBillsProduct = function(Barcode){				
            var index = -1;		
            var product = eval( $scope.BuyingBillsProducts );
            for( var i = 0; i < product.length; i++ ) {
                if( product[i].Barcode === Barcode ) {
                    index = i;
                    break;
                }
            }
            if( index === -1 ) {
                alert( "Something gone wrong" );
            }
              $scope.TotalPrice -= $scope.BuyingBillsProducts[index].TotalPrice;
            $scope.BuyingBillsProducts.splice( index, 1 );	
           $scope.updateFinalPrice();	
        };


        $scope.sortingDirection = "+";
        $scope.ordering = function (patrn) {
            if ($scope.sortingDirection == "+")
                $scope.sortingDirection = "-";
            else $scope.sortingDirection = "+";
            patrn = $scope.sortingDirection + patrn;
            $scope.BuyingBills = $filter("orderBy")($scope.BuyingBills, patrn);
        };
    }
})();
