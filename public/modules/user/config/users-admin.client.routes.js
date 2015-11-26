'use strict';

// Setting up route
angular.module('users.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.users', {
        url: '/users',
        templateUrl: 'modules/user/views/admin/user-list.client.view.html',
        controller: 'UserListController'
      })
        .state('admin.timeLine', {
            url: '/timeLine',
            templateUrl: 'modules/user/views/admin/time-line.client.view.html',
            controller:'UserController',
            resolve: {
                userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
                    return Admin.get({
                        userId: $stateParams.userId
                    });
                }]
            }
        })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: 'modules/user/views/admin/user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: 'modules/user/views/admin/user-edit.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      });
  }
]);
