'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('rawMaterialDebit').factory('RawMaterialDebitSrv', ['$resource',
  function ($resource) {
    return $resource('api/rawMaterialDebit/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    },{
        query:{
            method:'get',
            isArray:false,
            cancellable:true
        }
    });
  }
]);
