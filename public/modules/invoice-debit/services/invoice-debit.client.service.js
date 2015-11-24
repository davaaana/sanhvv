'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('invoiceDebit').factory('InvoiceDebitSrv', ['$resource',
  function ($resource) {
    return $resource('api/invoiceDebit/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
