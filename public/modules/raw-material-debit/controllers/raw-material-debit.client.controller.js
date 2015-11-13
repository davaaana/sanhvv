'use strict';

// Articles controller
angular.module('rawMaterialDebit').controller('RawMaterialDebitController', ['$scope', '$stateParams', '$location', 'Authentication', 'RawMaterialDebitSrv','$http',
  function ($scope, $stateParams, $location, Authentication, RawMaterialDebitSrv,$http) {
    $scope.authentication = Authentication;

    $http.get('api/materials').success(function (res) {
        $scope.materialTypes = res;
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
        $location.path('rmd/' + response._id+'/view');

        // Clear form fields
        $scope.name = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Article
    $scope.remove = function (rawMaterialDebit) {
      if (rawMaterialDebit) {
        rawMaterialDebit.$remove();

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
        $location.path('rmd/' + rawMaterialDebit._id);
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
    };
  }
]);
