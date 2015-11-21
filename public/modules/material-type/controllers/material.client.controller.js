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
        $location.path('materialTypes/' + response._id);

        // Clear form fields
        $scope.name = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
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
          $location.path('materialTypes');
        });
      }
    };

    // Update existing Article
    $scope.update = function () {
      var materialType = $scope.materialType;

      materialType.$update(function () {
        $location.path('materialTypes/' + materialType._id);
      }, function (errorResponse) {
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
