'use strict';

angular.module('core.admin').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Хэрэглэгч',
      state: 'admin',
      type: 'dropdown',
      roles: ['admin']
    });
  }
]);
