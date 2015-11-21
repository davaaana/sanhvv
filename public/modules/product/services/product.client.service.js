'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('product').factory('ProductSrv', ['$resource',
  function ($resource) {
    return $resource('api/product/:id', {
      materialId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
