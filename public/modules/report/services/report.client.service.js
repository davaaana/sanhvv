'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('report').factory('ReportSrv', ['$http',
  function ($http) {
    return {
        getProductTotal : function () {
            var promise = $http.get('/api/product').then(function (response) {
                return response.data;
            });
            return promise;
        }
    }
  }
]);
