'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    errorHandler = require(path.resolve('./app/controller/errors.server.controller'));

/**
 * Create a article
 */
exports.create = function (req, res) {
    var product = new Product(req.body);
    product.user = req.user;

    product.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            var time = {
                message:'Бэлэн бүтээгдэхүүн нэмсэн',
                user:req.user,
                ipAddress:req.connection.remoteAddress,
                date:Date.now()
            };
            var timeLine = new TimeLine(time);
            timeLine.save(function (err, data) {
                res.json(product);
            });
        }
    });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
    res.json(req.product);
};

/**
 * Update a article
 */
exports.update = function (req, res) {
    var product = req.product;
    product.user = req.user;
    product.name = req.body.name;
    product.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            var time = {
                message:'Бэлэн бүтээгдэхүүн зассан',
                user:req.user,
                ipAddress:req.connection.remoteAddress,
                date:Date.now()
            };
            var timeLine = new TimeLine(time);
            timeLine.save(function (err, data) {
                res.json(product);
            });
        }
    });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
    var product = req.product;

    product.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            var time = {
                message:'Бэлэн бүтээгдэхүүн устгасан',
                user:req.user,
                ipAddress:req.connection.remoteAddress,
                date:Date.now()
            };
            var timeLine = new TimeLine(time);
            timeLine.save(function (err, data) {
                res.json(product);
            });
        }
    });
};

/**
 * List of Articles
 */
exports.lists = function (req, res) {
    Product.find().sort('-createdDate').populate('user', 'displayName').exec(function (err, product) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(product);
        }
    });
};

/**
 * Article middleware
 */
exports.ProductFindById = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Материалын төрлийн дугаар алга байна'
        });
    }

    Product.findById(id).populate('user', 'displayName').exec(function (err, product) {
        if (err) {
            return next(err);
        } else if (!product) {
            return res.status(404).send({
                message: 'Материалын төрөл олдсонгүй'
            });
        }
        req.product = product;
        next();
    });
};
