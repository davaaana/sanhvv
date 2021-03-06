'use strict';

/**
 * Module dependencies.
 */
var adminPolicy = require('../policy/admin.server.policy.js'),
  admin = require('../controller/admin.server.controller.js');

module.exports = function (app) {
  // User route registration first. Ref: #713
  require('../route/users.server.routes.js')(app);
  // Users collection routes
  app.route('/api/users')
    .get(adminPolicy.isAllowed, admin.list);

  // Single user routes
  app.route('/api/users/:userId')
    .get(adminPolicy.isAllowed, admin.read)
    .put(adminPolicy.isAllowed, admin.update)
    .delete(adminPolicy.isAllowed, admin.delete);
    app.route('/api/timeLine').get(adminPolicy.isAllowed,admin.getTimeLine)
  // Finish by binding the user middleware
  app.param('userId', admin.userByID);
};
