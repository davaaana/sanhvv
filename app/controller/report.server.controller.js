'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    InvMaterialCredit = mongoose.model('InvMaterialCredit'),
    InvoiceDebit = mongoose.model('InvoiceDebit'),
    MaterialType = mongoose.model('MaterialType'),
    Unit = mongoose.model('Unit'),
    async = require('async'),
    config = require('../controller/config.js'),
    errorHandler = require(path.resolve('./app/controller/errors.server.controller'));

exports.InvCreditMonth = function (req, res) {
    InvoiceDebit.aggregate([
        {
            $project: {
                year: {$year: '$date'},
                amount: '$amount',
                qty: '$qty',
                month: {$month: '$date'}
            }
        },
        {
            $match: {
                year: {$eq: Number(req.query.year)}
            }
        },
        {
            $group: {
                _id: {
                    "month": "$month"
                },
                total: {
                    $sum: {"$multiply": ["$amount", "$qty"]}
                }
            }
        },
        {
            $sort: {
                "_id": 1
            }
        }], function (err, result) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(result);
        }
    });
};
