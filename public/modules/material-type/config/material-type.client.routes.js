'use strict';

// Setting up route
angular.module('materialType').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('materialType', {
        abstract: true,
        url: '/materialTypes',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('materialType.list', {
        url: '',
        templateUrl: 'modules/material-type/views/list-material.client.view.html'
      })
      .state('materialType.create', {
        url: '/materialTypes',
        templateUrl: 'modules/material-type/views/create-material.client.view.html'
      })
      .state('materialType.view', {
        url: '/:materialId',
        templateUrl: 'modules/material-type/views/view-material.client.view.html'
      })
      .state('materialType.edit', {
        url: '/:materialId/edit',
        templateUrl: 'modules/material-type/views/edit-material.client.view.html'
      });
  }
]);
