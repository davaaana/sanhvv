'use strict';

// Articles controller
angular.module('invMaterialCredit').controller('InvMaterialCreditController', ['$scope', '$stateParams', '$location', 'Authentication', 'InvMaterialCreditSrv', '$http',
    function ($scope, $stateParams, $location, Authentication, InvMaterialCreditSrv, $http) {
        $scope.authentication = Authentication;
        $scope.data = {};
        $scope.data.date = new Date();
        $scope.invMaterialsCreate = [];
        $scope.types = [];
        $scope.page = 1;
        $scope.pageLimit = 5;
        $scope.pageTotal = 0;

        $http.get('api/materials').success(function (res) {
            $scope.materialTypes = res;
            for (var i in $scope.materialTypes) {
                $scope.types.push($scope.materialTypes[i]);
            }
        });

        $scope.pageChanged = function (page) {
            InvMaterialCreditSrv.get({filter: {page: page, limit: $scope.pageLimit}, isArray: false}, function (res) {
                $scope.rawMaterialDebits = res.material;
                $scope.pageTotal = res.pages;
            });
        };

        $scope.createEdit = function (material) {
            $scope.types.push(material.materialType);
            $scope.type = material.materialType;
            $scope.unit = material.unit;
            $scope.qty = material.qty;
        };

        $scope.getMaterialName = function (id) {
            for (var i in $scope.materialTypes) {
                if ($scope.materialTypes[i]._id == id)
                    return $scope.materialTypes[i].name;
            }
        }

        $http.get('api/unit').success(function (res) {
            $scope.units = res;
        });

        $http.get('api/product').success(function (res) {
            $scope.products = res;
        });
        $scope.createRemove = function (index, material) {
            $scope.types.push(material.materialType);
            $scope.invMaterialsCreate.splice(index, 1);
        };

        $scope.create = function () {
            // Create new Article object
            var materialType = new InvMaterialCreditSrv({
                date: this.data.date,
                measure: this.invMaterialsCreate,
                qty: this.data.qty,
                unit: this.data.unit,
                product: this.data.product

            });
            var me = this;
            // Redirect after save
            materialType.$save(function (response) {
                me.data = {};
                $scope.data.date = new Date();
                BootstrapDialog.show({
                    size: BootstrapDialog.SIZE_SMALL,
                    title: 'Мессэж',
                    type: BootstrapDialog.TYPE_SUCCESS,
                    message: 'Амжилттай хадгаллаа'
                });
                $scope.name = '';
            }, function (errorResponse) {
                BootstrapDialog.show({
                    size: BootstrapDialog.SIZE_SMALL,
                    title: 'Мессэж',
                    type: BootstrapDialog.TYPE_DANGER,
                    message: 'Хадгалахад алдаа гарлаа'
                });
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.invMaterialAdd = function (type, unit, qty) {
            //try{
            //  type = JSON.parse(type)
            //}catch(e){};

            if (type && unit && qty && qty > 0) {
                var marge = false;
                var index = 0;
                var valid = true;
                console.log(type);
                for (var i in $scope.materialTypes) {
                    if ($scope.materialTypes[i]._id == type._id) {
                        if ($scope.materialTypes[i].qty < (qty * unit.qty)) {
                            valid = false;
                            if ($scope.materialTypes[i].qty == 0) {
                                alert('Үлдэгдэл ' + $scope.materialTypes[i].qty + ' байгаа тул та ' + $scope.materialTypes[i].name + ' материал дээр орлого хийнэ үү')
                            } else {
                                alert('Үлдэгдэл хүрэлцэхгүй байна боломжин хэмжээ (' + $scope.materialTypes[i].qty + ')-Кг')
                            }

                        }
                    }
                }
                if (valid == true) {
                    for (var i in $scope.invMaterialsCreate) {
                        if ($scope.invMaterialsCreate[i].materialType == type) {
                            marge = true;
                            index = i;
                        }
                    }
                    if (marge == false) {
                        $scope.invMaterialsCreate.push({materialType: type, unit: unit, qty: qty});
                    } else {
                        $scope.invMaterialsCreate[index] = angular.extend({}, $scope.invMaterialsCreate[index], {
                            materialType: type,
                            unit: unit,
                            qty: qty
                        })
                    }

                    for (var i in $scope.types) {
                        if ($scope.types[i]._id === type._id) {
                            $scope.types.splice(i, 1);
                        }
                    }
                }
            }
        }

        // Remove existing Article
        $scope.remove = function (rawMaterialDebit) {
            if (rawMaterialDebit) {
                rawMaterialDebit.$remove();
                BootstrapDialog.show({
                    size: BootstrapDialog.SIZE_SMALL,
                    title: 'Мессэж',
                    type: BootstrapDialog.TYPE_SUCCESS,
                    message: 'Амжилттай устгагдлаа'
                });
                for (var i in $scope.rawMaterialDebits) {
                    if ($scope.rawMaterialDebits[i] === rawMaterialDebit) {
                        $scope.rawMaterialDebits.splice(i, 1);
                    }
                }
            } else {
                $scope.rawMaterialDebit.$remove(function () {
                    $location.path('rmd');
                });
            }
        };

        // Update existing Article
        $scope.update = function () {
            var rawMaterialDebit = $scope.rawMaterialDebit;

            rawMaterialDebit.$update(function () {
                $location.path('rmd');
            }, function (errorResponse) {
                BootstrapDialog.show({
                    size: BootstrapDialog.SIZE_SMALL,
                    title: 'Мессэж',
                    type: BootstrapDialog.TYPE_DANGER,
                    message: 'Хадгалахад алдаа гарлаа'
                });
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Articles
        $scope.find = function () {
            InvMaterialCreditSrv.get({filter: {page: $scope.page, limit: $scope.pageLimit}, isArray: false}, function (res) {
                $scope.rawMaterialDebits = res.material;
                $scope.pageTotal = res.pages;
            });
        };

        // Find existing Article
        $scope.findOne = function () {
            $scope.rawMaterialDebit = InvMaterialCreditSrv.get({
                id: $stateParams.id
            });
        };
    }
]);
