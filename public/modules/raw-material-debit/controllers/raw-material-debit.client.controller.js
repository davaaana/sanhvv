'use strict';

// Articles controller
angular.module('rawMaterialDebit').controller('RawMaterialDebitController', ['$scope', '$stateParams', '$location', 'Authentication', 'RawMaterialDebitSrv','$http',
  function ($scope, $stateParams, $location, Authentication, RawMaterialDebitSrv,$http) {
    $scope.authentication = Authentication;
    $scope.date = new Date();

    $http.get('api/materials').success(function (res) {
        $scope.materialTypes = res;
    });

    $http.get('api/unit').success(function (res) {
      $scope.units = res;
    });

    $scope.create = function () {
      // Create new Article object
      var materialType = new RawMaterialDebitSrv({
        date: this.date,
        materialType: this.materialType,
        qty: this.qty,
        description: this.description,
        amount: this.amount,
        unit: this.unit

      });

      // Redirect after save
      materialType.$save(function (response) {
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
              message: 'Хадгалахал алдаа гарлаа'
          });
      });
    };

    // Remove existing Article
    $scope.remove = function (rawMaterialDebit) {
      if (rawMaterialDebit) {
        rawMaterialDebit.$remove();
          BootstrapDialog.show({
              size: BootstrapDialog.SIZE_SMALL,
              title: 'Мессэж',
              type:BootstrapDialog.TYPE_SUCCESS,
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
        $location.path('rmd/' + rawMaterialDebit._id+'/view');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.rawMaterialDebits = RawMaterialDebitSrv.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.rawMaterialDebit = RawMaterialDebitSrv.get({
        id: $stateParams.id
      });
      $scope.total = $scope.rawMaterialDebit.qty * $scope.rawMaterialDebit.amount;

    };
  }
]);
