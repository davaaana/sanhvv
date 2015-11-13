'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controller/core.server.controller.js');
  require('../../app/route/materials.server.routes.js')(app);
  require('../../app/route/raw-material-debit.server.routes.js')(app);
  require('../../app/route/inv-material-credit.server.routes.js')(app);

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);
};
