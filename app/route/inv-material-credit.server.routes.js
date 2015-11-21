'use strict';

/**
 * Module dependencies.
 */
module.exports = function (app) {
    var invMaterialCreditPolicy = require('../policy/inv-material-credit.server.policy'),
        invMaterialCredit = require('../controller/inv-material-credit.server.controller');

    // Articles collection routes
    app.route('/api/invMaterialCredit')
        .get(invMaterialCreditPolicy.isAllowed,invMaterialCredit.lists)
        .post(invMaterialCreditPolicy.isAllowed,invMaterialCredit.create);


    // Single article routes
    app.route('/api/invMaterialCredit/:imcid')
        .all(invMaterialCreditPolicy.isAllowed)
        .get(invMaterialCredit.read)
        .put(invMaterialCredit.update)
        .delete(invMaterialCredit.delete);

    // Finish by binding the article middleware
    app.param('imcid', invMaterialCredit.RawMaterialDebitFindById);
};
