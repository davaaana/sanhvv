'use strict';

/**
 * Module dependencies.
 */
module.exports = function (app) {
    var productPolicy = require('../policy/product.server.policy'),
        product = require('../controller/product.server.controller');

    // Articles collection routes
    app.route('/api/product')
        .get(productPolicy.isAllowed,product.lists)
        .post(productPolicy.isAllowed,product.create);


    // Single article routes
    app.route('/api/product/:id')
        .all(productPolicy.isAllowed)
        .get(product.read)
        .put(product.update)
        .delete(product.delete);

    // Finish by binding the article middleware
    app.param('id', product.ProductFindById);
};
