'use strict';

// Configuring the Articles module
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Хэрэглэгчийн удирдлага',
      state: 'admin.users'
    });

      Menus.addSubMenuItem('topbar', 'admin', {
          title: 'Цагийн шугам',
          state: 'admin.timeLine'
      });
  }
]);
