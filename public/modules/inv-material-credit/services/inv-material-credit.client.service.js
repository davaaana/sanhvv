'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('invMaterialCredit').factory('InvMaterialCreditSrv', ['$resource',
  function ($resource) {
    return $resource('api/invMaterialCredit/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
