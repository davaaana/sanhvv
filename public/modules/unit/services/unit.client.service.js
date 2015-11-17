'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('unit').factory('UnitSrv', ['$resource',
  function ($resource) {
    return $resource('api/unit/:unitId', {
      materialId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
