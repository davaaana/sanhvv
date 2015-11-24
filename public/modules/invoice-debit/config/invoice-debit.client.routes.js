'use strict';

// Setting up route
angular.module('invoiceDebit').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('invoiceDebit', {
        abstract: true,
        url: '/invd',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('invoiceDebit.list', {
        url: '',
        templateUrl: 'modules/invoice-debit/views/list-material.client.view.html'
      })
      .state('invoiceDebit.create', {
        url: '/invd',
        templateUrl: 'modules/invoice-debit/views/create-material.client.view.html'
      })
      .state('invoiceDebit.view', {
        url: '/:id/view',
        templateUrl: 'modules/invoice-debit/views/view-material.client.view.html'
      })
      .state('invoiceDebit.edit', {
        url: '/:id/edit',
        templateUrl: 'modules/invoice-debit/views/edit-material.client.view.html'
      });
  }
]);
