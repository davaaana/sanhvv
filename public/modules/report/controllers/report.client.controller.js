'use strict';

// Articles controller
angular.module('report').controller('ReportController', ['$scope', '$stateParams','$http', '$location', 'Authentication','ReportSrv',
  function ($scope, $stateParams,$http, $location, Authentication,ReportSrv) {
    $scope.authentication = Authentication;
    ReportSrv.getProductTotal().then(function (res) {
        $scope.productTotal = res;
    });

  }
]);
