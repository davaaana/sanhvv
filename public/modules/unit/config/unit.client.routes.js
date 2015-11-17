'use strict';

// Setting up route
angular.module('unit').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('unit', {
        abstract: true,
        url: '/unit',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('unit.list', {
        url: '',
        templateUrl: 'modules/unit/views/list-material.client.view.html'
      })
      .state('unit.create', {
        url: '/units',
        templateUrl: 'modules/unit/views/create-material.client.view.html'
      })
      .state('unit.view', {
        url: '/:unitId',
        templateUrl: 'modules/unit/views/view-material.client.view.html'
      })
      .state('unit.edit', {
        url: '/:unitId/edit',
        templateUrl: 'modules/unit/views/edit-material.client.view.html'
      });
  }
]);
