'use strict';

// Setting up route
angular.module('invMaterialCredit').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('invMaterialCredit', {
        abstract: true,
        url: '/imc',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('invMaterialCredit.list', {
        url: '',
        templateUrl: 'modules/inv-material-credit/views/list-material.client.view.html'
      })
      .state('invMaterialCredit.create', {
        url: '/imc',
        templateUrl: 'modules/inv-material-credit/views/create-material.client.view.html'
      })
      .state('invMaterialCredit.view', {
        url: '/:id',
        templateUrl: 'modules/inv-material-credit/views/view-material.client.view.html'
      })
      .state('invMaterialCredit.edit', {
        url: '/:id/edit',
        templateUrl: 'modules/inv-material-credit/views/edit-material.client.view.html'
      });
  }
]);
