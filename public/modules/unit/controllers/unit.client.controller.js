'use strict';

// Articles controller
angular.module('unit').controller('UnitController', ['$scope', '$stateParams', '$location', 'Authentication', 'UnitSrv',
    function ($scope, $stateParams, $location, Authentication, UnitSrv) {
        $scope.authentication = Authentication;
        $scope.data = {};

        $scope.create = function () {
            // Create new Article object
            var unit = new UnitSrv({
                name: this.data.name,
                qty: this.data.qty
            });

            // Redirect after save
            unit.$save(function (response) {
                $location.path('unit/' + response._id);
                BootstrapDialog.show({
                    size: BootstrapDialog.SIZE_SMALL,
                    title: 'Мессэж',
                    type: BootstrapDialog.TYPE_SUCCESS,
                    message: 'Амжилттай хадгаллаа'
                });
                $scope.data = {};
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

        // Remove existing Article
        $scope.remove = function (unit) {
            if (unit) {
                unit.$remove();

                for (var i in $scope.units) {
                    if ($scope.units[i] === unit) {
                        $scope.units.splice(i, 1);
                    }
                }
            } else {
                $scope.unit.$remove(function () {
                    $location.path('unit');
                });
            }
        };

        // Update existing Article
        $scope.update = function () {
            var materialType = $scope.materialType;

            materialType.$update(function () {
                $location.path('unit/' + materialType._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Articles
        $scope.find = function () {
            $scope.units = UnitSrv.query();
        };

        // Find existing Article
        $scope.findOne = function () {
            $scope.unit = UnitSrv.get({
                unitId: $stateParams.unitId
            });
        };
    }
]);
