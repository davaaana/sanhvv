'use strict';

/**
 * Module dependencies.
 */
module.exports = function (app) {
    var unitPolicy = require('../policy/unit.server.policy'),
        unit = require('../controller/unit.server.controller');

    app.route('/api/unit')
        .get(unitPolicy.isAllowed,unit.lists)
        .post(unitPolicy.isAllowed,unit.create);


    app.route('/api/unit/:uid')
        .all(unitPolicy.isAllowed)
        .get(unit.read)
        .put(unit.update)
        .delete(unit.delete);

    app.route('/api/unitdiv/:uid/:qty').get(unit.divide)
    app.route('/api/unitmul/:uid/:qty').get(unit.multiply)
    app.param('uid', unit.UnitFindById);
};
