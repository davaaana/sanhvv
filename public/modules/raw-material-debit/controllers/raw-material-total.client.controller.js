'use strict';

// Articles controller
angular.module('rawMaterialDebit').controller('RawMaterialTotalController', ['$scope', 'Authentication', 'RawMaterialDebitSrv','$http',
    function ($scope, Authentication, RawMaterialDebitSrv,$http) {
        $scope.authentication = Authentication;

        $scope.typeGetName = function (id) {
            for(var i in $scope.materialTypes){
                if($scope.materialTypes[i]._id == id){
                    return $scope.materialTypes[i].name;
                }
            }
        }

        $scope.findTotal = function () {
            $http.get('api/materials').success(function (res) {
                $scope.totalMaterials = res;
            });
        };
    }
]);
