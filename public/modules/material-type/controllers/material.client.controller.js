'use strict';

// Articles controller
angular.module('materialType').controller('MaterialTypeController', ['$scope', '$stateParams', '$location', 'Authentication', 'MaterialType',
  function ($scope, $stateParams, $location, Authentication, MaterialType) {
    $scope.authentication = Authentication;


    // Create new Article
      $scope.qty = 0;
      $scope.amount = 0;
    $scope.create = function () {
      // Create new Article object
      var materialType = new MaterialType({
        name: this.name
      });

      // Redirect after save
      materialType.$save(function (response) {
          BootstrapDialog.show({
              size: BootstrapDialog.SIZE_SMALL,
              title: 'Мессэж',
              type:BootstrapDialog.TYPE_SUCCESS,
              message: 'Амжилттай хадгаллаа'
          });
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
    };

    // Remove existing Article
    $scope.remove = function (materialType) {
      if (materialType) {
        materialType.$remove();

        for (var i in $scope.materialTypes) {
          if ($scope.materialTypes[i] === materialType) {
            $scope.materialTypes.splice(i, 1);
          }
        }
      } else {
        $scope.materialType.$remove(function () {
            BootstrapDialog.show({
                size: BootstrapDialog.SIZE_SMALL,
                title: 'Мессэж',
                type:BootstrapDialog.TYPE_SUCCESS,
                message: 'Амжилттай устгагдалаа'
            });
        });
      }
    };

    // Update existing Article
    $scope.update = function () {
      var materialType = $scope.materialType;
        BootstrapDialog.show({
            size: BootstrapDialog.SIZE_SMALL,
            title: 'Мессэж',
            type:BootstrapDialog.TYPE_SUCCESS,
            message: 'Амжилттай хадгаллаа'
        });
      materialType.$update(function () {
        $location.path('materialTypes/' + materialType._id);
      }, function (errorResponse) {
          BootstrapDialog.show({
              size: BootstrapDialog.SIZE_SMALL,
              title: 'Мессэж',
              type:BootstrapDialog.TYPE_DANGER,
              message: 'Хадгалахад алдаа гарлаа'
          });
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.materialTypes = MaterialType.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.materialType = MaterialType.get({
        materialId: $stateParams.materialId
      });
    };
  }
]);
