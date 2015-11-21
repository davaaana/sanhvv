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

        // Clear form fields
        $scope.name = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
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
          $location.path('product');
        });
      }
    };

    // Update existing Article
    $scope.update = function () {
      var product = $scope.product;

      product.$update(function () {
        $location.path('product/' + product._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
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
