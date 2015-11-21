'use strict';

// Setting up route
angular.module('product').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('product', {
        abstract: true,
        url: '/product',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('product.list', {
        url: '',
        templateUrl: 'modules/product/views/list-material.client.view.html'
      })
      .state('product.create', {
        url: '/product',
        templateUrl: 'modules/product/views/create-material.client.view.html'
      })
      .state('product.view', {
        url: '/:id',
        templateUrl: 'modules/product/views/view-material.client.view.html'
      })
      .state('product.edit', {
        url: '/:id/edit',
        templateUrl: 'modules/product/views/edit-material.client.view.html'
      });
  }
]);
