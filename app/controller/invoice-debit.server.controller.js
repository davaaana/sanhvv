'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    InvoiceDebit = mongoose.model('InvoiceDebit'),
    Product = mongoose.model('Product'),
    Unit = mongoose.model('Unit'),
    TimeLine = mongoose.model('TimeLine'),
    Util = require('util'),
    errorHandler = require(path.resolve('./app/controller/errors.server.controller'));
var async = require('async');

/**
 * Create a article
 */
exports.create = function (req, res) {
    var invoiceDebit = new InvoiceDebit(req.body);
    invoiceDebit.user = req.user;
    async.waterfall([
        function (callback) {
            invoiceDebit.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    callback(null);
                }
            });
        }, function (callback) {
            Product.findById(invoiceDebit.product).exec(function (err, result) {
                Unit.findOne({_id: invoiceDebit.unit}).exec(function (error, rs) {
                    result.qty = result.qty - (rs.qty * invoiceDebit.qty);
                    result.save(function (err) {
                        callback(null);
                    });
                });
            })
        }, function (callback) {
            var time = {
                message:'Бэлэн бүтээгдэхүүний зарлага хэмсэн',
                user:req.user,
                ipAddress:req.connection.remoteAddress,
                date:Date.now()
            };
            var timeLine = new TimeLine(time);
            timeLine.save(function (err, data) {
                callback();
            });
        }
    ], function (err, result) {
        if (Util.isNullOrUndefined(err)) {
            res.json(invoiceDebit);
        } else {
            res.status(400).json({message: 'Хадгалахад алдаа гарлаа'});
        }
    })

};

/**
 * Show the current article
 */
exports.read = function (req, res) {
    res.json(req.invoiceDebit);
};

/**
 * Update a article
 */
exports.update = function (req, res) {
    var invoiceDebit = req.invoiceDebit;
    invoiceDebit.user = req.user;
    invoiceDebit.name = req.body.name;
    invoiceDebit.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(invoiceDebit);
        }
    });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
    var invoiceDebit = req.invoiceDebit;

    async.waterfall([
        function (callback) {
            invoiceDebit.remove(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    callback(null)
                }
            });
        }, function (callback) {
            Product.findById(invoiceDebit.product).exec(function (err, result) {
                Unit.findOne({_id: invoiceDebit.unit}).exec(function (error, rs) {
                    result.qty = result.qty + (rs.qty * invoiceDebit.qty);
                    result.save(function (err) {
                        callback(null);
                    });
                });
            });
        }, function (callback) {
            var time = {
                message:'Бэлэн бүтээгдэхүүний зарлага устгасан',
                user:req.user,
                ipAddress:req.connection.remoteAddress,
                date:Date.now()
            };
            var timeLine = new TimeLine(time);
            timeLine.save(function (err, data) {
                callback();
            });
        }
    ], function (err, result) {
        if (Util.isNullOrUndefined(err)) {
            res.json(invoiceDebit);
        } else {
            res.status(400).json({message: 'Хадгалахад алдаа гарлаа'});
        }
    })

};

/**
 * List of Articles
 */
exports.lists = function (req, res) {
    var filter;
    try{
        filter = JSON.parse(req.query.filter);
    }catch(e){
        filter = req.query.filter;
    }
    var skip = filter.limit * (filter.page-1);
    InvoiceDebit.find().limit(filter.limit).
    skip(skip).sort('-createdDate').
    populate('user', 'displayName').
    populate('product', 'name qty _id').
    populate('unit', 'name qty').exec(function (err, material) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            InvoiceDebit.count().exec(function (error, count) {
                res.json({
                    material:material,
                    pages:count,
                    page:filter.page
                });
            });
        }
    });
};

/**
 * Article middleware
 */
exports.InvoiceDebitFindById = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Материалын төрлийн дугаар алга байна'
        });
    }

    InvoiceDebit.findById(id).populate('user', 'displayName').exec(function (err, invoiceDebit) {
        if (err) {
            return next(err);
        } else if (!invoiceDebit) {
            return res.status(404).send({
                message: 'Материалын төрөл олдсонгүй'
            });
        }
        req.invoiceDebit = invoiceDebit;
        next();
    });
};
