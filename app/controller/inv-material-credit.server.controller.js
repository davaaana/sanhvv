'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Material = mongoose.model('InvMaterialCredit'),
    Product = mongoose.model('Product'),
    MaterialType = mongoose.model('MaterialType'),
    Unit = mongoose.model('Unit'),
    Util = require('util'),
    errorHandler = require(path.resolve('./app/controller/errors.server.controller'));
var async = require('async');

/**
 * Create a article
 */
exports.create = function (req, res) {
    var invMaterial = new Material(req.body);
    invMaterial.user = req.user;
    async.waterfall([
            function (callback) {
                invMaterial.save(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        callback(null, invMaterial.measure);
                    }
                });
            }, function (measures, callback) {
                async.each(measures, function (data, mcallback) {
                    MaterialType.findById(data.materialType).exec(function (err, result) {
                        Unit.findOne({_id: data.unit}).exec(function (error, rs) {
                            console.log(rs);
                            result.qty = result.qty - (rs.qty * data.qty);
                            result.save(function (err) {
                                mcallback(null);
                            });
                        });
                    });
                }, function (err) {
                    if (Util.isNullOrUndefined(err)) {
                    } else {
                        res.status(400).json({message: 'Хадгалахад алдаа гарлаа'});
                    }
                });
                callback(null, 'success');
            }, function (arg,callback) {
                Product.findById(invMaterial.product).exec(function (err, data) {
                    Unit.findOne({_id: invMaterial.unit}).exec(function (error, rs) {
                        data.qty = data.qty + (invMaterial.qty * rs.qty);
                        data.save(function (err) {
                            callback(null);
                        });
                    });
                });
            }
        ], function (err, result) {
            if (Util.isNullOrUndefined(err)) {
                res.json(invMaterial);
            } else {
                res.status(400).json({message: 'Хадгалахад алдаа гарлаа'});
            }
        }
    )

};

/**
 * Show the current article
 */
exports.read = function (req, res) {
    res.json(req.invMaterialCredit);
};

/**
 * Update a article
 */
exports.update = function (req, res) {
    var invMaterial = req.invMaterialCredit;
    //materialType = req.body;
    invMaterial.user = req.user;
    invMaterial.date = req.body.date;
    invMaterial.materialType = req.body.materialType;
    invMaterial.description = req.body.description;
    invMaterial.qty = req.body.qty;
    invMaterial.unit = req.body.unit;
    invMaterial.amount = req.body.amount;
    invMaterial.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(invMaterial);
        }
    });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
    var invMaterial = req.invMaterialCredit;

    async.waterfall([
            function (callback) {
                invMaterial.remove(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        callback(null, invMaterial.measure)
                    }
                });
            }, function (measures, callback) {
                console.log(measures);
                async.each(measures, function (data, mcallback) {
                    MaterialType.findById(data.materialType).exec(function (err, result) {
                        Unit.findOne({_id: data.unit}).exec(function (error, rs) {
                            console.log(rs);
                            result.qty = result.qty + (rs.qty * data.qty);
                            result.save(function (err) {
                                mcallback(null);
                            });
                        });
                    });
                }, function (err) {
                    if (Util.isNullOrUndefined(err)) {
                    } else {
                        res.status(400).json({message: 'Хадгалахад алдаа гарлаа'});
                    }
                });
                callback(null, 'success');
            }, function (arg,callback) {
            Product.findById(invMaterial.product).exec(function (err, data) {
                Unit.findOne({_id: invMaterial.unit}).exec(function (error, rs) {
                    data.qty = data.qty - (invMaterial.qty * rs.qty);
                    data.save(function (err) {
                        callback(null);
                    });
                });
            });
        }
        ], function (err, result) {
            if (Util.isNullOrUndefined(err)) {
                res.json(invMaterial);
            } else {
                res.status(400).json({message: 'Хадгалахад алдаа гарлаа'});
            }
        }
    )

};

/**
 * List of Articles
 */
exports.lists = function (req, res) {
    Material.find().sort('-createdDate').populate('user', 'displayName').populate('measure.materialType', 'name _id').populate('measure.unit', 'name _id').populate('unit', 'name _id').populate('product', 'name _id').exec(function (err, material) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(material);
        }
    });
};

/**
 * Article middleware
 */
exports.RawMaterialDebitFindById = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Барааны дугаар алга байна'
        });
    }
    console.log('id: ' + id);
    Material.findById(id).populate('user', 'displayName').populate('measure.materialType', 'name _id').populate('measure.unit', 'name _id').populate('unit', 'name _id').populate('product', 'name _id').exec(function (err, material) {
        console.log(material._id);
        if (err) {
            return next(err);
        } else if (Util.isNullOrUndefined(material)) {
            console.log('not found');
            return res.status(404).send({
                message: 'Тухайн бараа устсан эсвэл бааз дээр алга байна'
            });
        }
        req.invMaterialCredit = material;
        next();
    });
};
