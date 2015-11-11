'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('materialType').factory('MaterialType', ['$resource',
  function ($resource) {
    return $resource('api/materials/:materialId', {
      materialId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
