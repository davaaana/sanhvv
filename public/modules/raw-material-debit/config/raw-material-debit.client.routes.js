'use strict';

// Setting up route
angular.module('rawMaterialDebit').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('rawMaterialDebit', {
        abstract: true,
        url: '/rmd',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('rawMaterialDebit.list', {
        url: '',
        templateUrl: 'modules/raw-material-debit/views/list-material.client.view.html'
      })
      .state('rawMaterialDebit.create', {
        url: '/rmd',
        templateUrl: 'modules/raw-material-debit/views/create-material.client.view.html'
      })
      .state('rawMaterialDebit.total', {
        url: '/rmdt',
        templateUrl: 'modules/raw-material-debit/views/total-material.client.view.html'
      })
      .state('rawMaterialDebit.view', {
        url: '/:id/view',
        templateUrl: 'modules/raw-material-debit/views/view-material.client.view.html'
      })
      .state('rawMaterialDebit.edit', {
        url: '/:id/edit',
        templateUrl: 'modules/raw-material-debit/views/edit-material.client.view.html'
      });
  }
]);
