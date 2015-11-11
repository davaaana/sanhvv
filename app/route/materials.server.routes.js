'use strict';

/**
 * Module dependencies.
 */
module.exports = function (app) {
  var materialTypePolicy = require('../policy/material-type.server.policy'),
      materialType = require('../controller/material-type.server.controller');

  // Articles collection routes
  app.route('/api/materials')
      .get(materialTypePolicy.isAllowed,materialType.lists)
      .post(materialTypePolicy.isAllowed,materialType.create);


  // Single article routes
  app.route('/api/materials/:materialTypeId')
    .all(materialTypePolicy.isAllowed)
    .get(materialType.read)
    .put(materialType.update)
    .delete(materialType.delete);

  // Finish by binding the article middleware
  app.param('materialTypeId', materialType.MaterialTypeFindById);
};
