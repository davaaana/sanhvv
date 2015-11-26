'use strict';

// Articles controller
angular.module('invoiceDebit').controller('InvoiceDebitController', ['$scope', '$stateParams', '$location', 'Authentication', 'InvoiceDebitSrv', '$http',
    function ($scope, $stateParams, $location, Authentication, InvoiceDebitSrv, $http) {
        $scope.authentication = Authentication;
        $scope.date = new Date();

        $http.get('api/product').success(function (res) {
            $scope.products = res;
        });

        $scope.getInvTypeName = function (id) {
            switch (id) {
                case 1:
                    return 'Зэлээр';
                case 2:
                    return 'Бэлнээр';
                case 3:
                    return 'Бэлэн бусаар';
            }
        }

        $http.get('api/unit').success(function (res) {
            $scope.units = res;
        });

        $scope.getQty = function (unitId, qty) {
            for (var i in $scope.units) {
                if (unitId == $scope.units[i]._id) {
                    return $scope.units[i].qty * qty;
                }
            }
        }
        $scope.create = function () {
            // Create new Article object
            var invoiceDebit = new InvoiceDebitSrv({
                date: this.date,
                product: this.product,
                isPayment: this.isPayment,
                invType: this.invType,
                qty: this.qty,
                description: this.description,
                amount: this.amount,
                unit: this.unit
            });
            console.log($scope.getQty(this.unit, this.qty));
            var valid = true;
            for (var i in $scope.products) {
                if ($scope.products[i].qty < $scope.getQty(this.unit, this.qty)) {
                    alert('Үлдэгдэл хүрэлцэхгүй байна боломжит үлдэгдэл (' + $scope.products[i].qty + ')-Кг');
                    valid = false;
                }
            }
            // Redirect after save
            if (valid == true) {
                invoiceDebit.$save(function (response) {
                    BootstrapDialog.show({
                        size: BootstrapDialog.SIZE_SMALL,
                        title: 'Мессэж',
                        type:BootstrapDialog.TYPE_SUCCESS,
                        message: 'Амжилттай хадгаллаа'
                    });
                    GlobalFunction.formClear();
                    // Clear form fields
                    $scope.name = '';
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                    BootstrapDialog.show({
                        size: BootstrapDialog.SIZE_SMALL,
                        title: 'Мессэж',
                        type:BootstrapDialog.TYPE_DANGER,
                        message: 'Хадгалахад алдаа гарлаа'
                    });
                });
            }

        };

        // Remove existing Article
        $scope.remove = function (invoiceDebit) {
            if (invoiceDebit) {
                invoiceDebit.$remove();

                for (var i in $scope.invoiceDebits) {
                    if ($scope.invoiceDebits[i] === invoiceDebit) {
                        $scope.invoiceDebits.splice(i, 1);
                    }
                }
            } else {
                $scope.invoiceDebit.$remove(function () {
                    $location.path('rmd');
                });
            }
        };

        // Update existing Article
        $scope.update = function () {
            var invoiceDebit = $scope.invoiceDebit;

            invoiceDebit.$update(function () {
                $location.path('rmd/' + invoiceDebit._id + '/view');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Articles
        $scope.find = function () {
            $scope.invoiceDebits = InvoiceDebitSrv.query();
        };

        // Find existing Article
        $scope.findOne = function () {
            $scope.invoiceDebit = InvoiceDebitSrv.get({
                id: $stateParams.id
            });
            $scope.total = $scope.invoiceDebit.qty * $scope.invoiceDebit.amount;

        };
    }
]);
