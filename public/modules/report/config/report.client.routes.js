'use strict';

// Setting up route
angular.module('report').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('report', {
        abstract: true,
        url: '/report',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('report.list', {
        url: '',
        templateUrl: 'modules/report/views/list-material.client.view.html'
      })
      .state('report.create', {
        url: '/materialTypes',
        templateUrl: 'modules/report/views/create-material.client.view.html'
      })
      .state('report.invTotal', {
          url: '/invTotal',
          templateUrl: 'modules/report/views/product-total.client.view.html'
      });;
  }
]);
