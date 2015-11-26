'use strict';

// Articles controller
angular.module('product').controller('ProductController', ['$scope', '$stateParams', '$location', 'Authentication', 'ProductSrv',
  function ($scope, $stateParams, $location, Authentication, ProductSrv) {
    $scope.authentication = Authentication;
    // Create new Article
    $scope.create = function () {
      // Create new Article object
      var product = new ProductSrv({
        name: this.name
      });

      // Redirect after save
      product.$save(function (response) {
        $location.path('product/' + response._id);
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
    };

    // Remove existing Article
    $scope.remove = function (product) {
      if (product) {
        product.$remove();

        for (var i in $scope.products) {
          if ($scope.products[i] === product) {
            $scope.products.splice(i, 1);
          }
        }
      } else {
        $scope.product.$remove(function () {
            BootstrapDialog.show({
                size: BootstrapDialog.SIZE_SMALL,
                title: 'Мессэж',
                type:BootstrapDialog.TYPE_SUCCESS,
                message: 'Амжилттай устгагдлаа'
            });
        });
      }
    };

    // Update existing Article
    $scope.update = function () {
      var product = $scope.product;

      product.$update(function () {
          BootstrapDialog.show({
              size: BootstrapDialog.SIZE_SMALL,
              title: 'Мессэж',
              type:BootstrapDialog.TYPE_SUCCESS,
              message: 'Амжилттай хадгаллаа'
          });

      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
          BootstrapDialog.show({
              size: BootstrapDialog.SIZE_SMALL,
              title: 'Мессэж',
              type:BootstrapDialog.TYPE_SUCCESS,
              message: 'Хадгалахад алдаа гарлаа'
          });
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.products = ProductSrv.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.product = ProductSrv.get({
        id: $stateParams.id
      });
    };
  }
]);
