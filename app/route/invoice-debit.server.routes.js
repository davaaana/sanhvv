'use strict';

/**
 * Module dependencies.
 */
module.exports = function (app) {
    var
        invoiceDebitPolicy = require('../policy/invoice-debit.server.policy'),
        invoiceDebit= require('../controller/invoice-debit.server.controller');

    // Articles collection routes
    app.route('/api/invoiceDebit')
        .get(invoiceDebitPolicy.isAllowed,invoiceDebit.lists)
        .post(invoiceDebitPolicy.isAllowed,invoiceDebit.create);


    // Single article routes
    app.route('/api/invoiceDebit/:invdid')
        .all(invoiceDebitPolicy.isAllowed)
        .get(invoiceDebit.read)
        .put(invoiceDebit.update)
        .delete(invoiceDebit.delete);

    // Finish by binding the article middleware
    app.param('invdid', invoiceDebit.InvoiceDebitFindById);
};
