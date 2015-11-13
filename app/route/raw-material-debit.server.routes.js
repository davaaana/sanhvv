'use strict';

/**
 * Module dependencies.
 */
module.exports = function (app) {
    var rawMaterialDebitPolicy = require('../policy/raw-material-debit.server.policy'),
        rawMaterialDebit = require('../controller/raw-material-debit.server.controller');

    // Articles collection routes
    app.route('/api/rawMaterialDebit')
        .get(rawMaterialDebitPolicy.isAllowed,rawMaterialDebit.lists)
        .post(rawMaterialDebitPolicy.isAllowed,rawMaterialDebit.create);


    // Single article routes
    app.route('/api/rawMaterialDebit/:rid')
        .all(rawMaterialDebitPolicy.isAllowed)
        .get(rawMaterialDebit.read)
        .put(rawMaterialDebit.update)
        .delete(rawMaterialDebit.delete);

    app.route('/api/rawMaterialDebitTotal').get(rawMaterialDebit.total)
    // Finish by binding the article middleware
    app.param('rid', rawMaterialDebit.RawMaterialDebitFindById);
};
