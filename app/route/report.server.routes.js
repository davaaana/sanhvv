'use strict';

/**
 * Module dependencies.
 */
module.exports = function (app) {
    var reportPolicy = require('../policy/report.server.policy'),
        report = require('../controller/report.server.controller');

    app.route('/api/chart/invMonth').get(reportPolicy.isAllowed,report.InvCreditMonth);
};
