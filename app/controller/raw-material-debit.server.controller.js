'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Material = mongoose.model('RawMaterialDebit'),
    MaterialType = mongoose.model('MaterialType'),
    config = require('../controller/config.js'),
    errorHandler = require(path.resolve('./app/controller/errors.server.controller'));
var request = require('request');

/**
 * Create a article
 */
exports.create = function (req, res) {
    var rawMaterial = new Material(req.body);
    rawMaterial.user = req.user;
    var options = {
        url: config.url + '/api/unitmul/' + rawMaterial.unit + '/' + rawMaterial.qty,
        method: 'GET'
    };
    request(options, function (error1, response1, body1) {
        rawMaterial.qty = config.jsonParse(body1).result;
        rawMaterial.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                MaterialType.findById(rawMaterial.materialType).exec(function (err, result) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {

                        if (!error1) {
                            result.qty += config.jsonParse(body1).result;
                            result.save(function (err) {
                                if (err) {
                                    return res.status(400).json({
                                        message: errorHandler.getErrorMessage(err)
                                    });
                                } else {
                                    res.json(rawMaterial);
                                }
                            });
                        }
                    }
                });

            }
        });
    });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
    res.json(req.rawMaterialDebit);
};

/**
 * Update a article
 */
exports.update = function (req, res) {

    var options = {
        url: config.url + '/api/unitmul/' + req.body.unit._id + '/' + req.body.qty,
        method: 'GET'
    };
    request(options, function (error1, response1, body1) {
        var materialType = req.rawMaterialDebit;
        materialType.qty = Number(config.jsonParse(body1).result);
        var mqty = Number(config.jsonParse(body1).result)
        materialType.user = req.user;
        materialType.date = req.body.date;
        materialType.materialType = req.body.materialType._id;
        materialType.description = req.body.description;
        materialType.unit = req.body.unit._id;
        materialType.amount = req.body.amount;

        Material.findById(materialType._id).exec(function (err, results) {
            console.log('omnoh: ' + results.qty);
            console.log('daraah: ' + mqty);
            var qty = Number(results.qty - mqty);
            MaterialType.findById(materialType.materialType).exec(function (err, rs) {
                materialType.save(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        console.log(qty);
                        if (qty > 0) {
                            rs.qty += qty * (-1);
                        } else {
                            rs.qty -= qty;
                        }
                        console.log(rs.qty);
                        rs.save(function (err) {
                            if (err) {
                                return res.status(400).json({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            } else {
                                res.json(materialType);
                            }
                        });
                    }
                });
            })
        })
    });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
    var material = req.rawMaterialDebit;

    var options = {
        url: config.url + '/api/unitmul/' + material.unit._id + '/' + material.qty,
        method: 'GET'
    };
    request(options, function (error1, response1, body1) {
        material.remove(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                MaterialType.findById(material.materialType).exec(function (err, result) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        result.qty -= config.jsonParse(body1).result;
                        result.save(function (err) {
                            if (err) {
                                return res.status(400).json({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            } else {
                                res.json(material);
                            }
                        });
                    }
                });
            }
        });
    });
};

/**
 * List of Articles
 */
exports.lists = function (req, res) {
    Material.find().sort('-createdDate').populate('user', 'displayName').populate('unit', 'name qty').populate('materialType', 'name _id').exec(function (err, material) {
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
            message: 'Материалын төрлийн дугаар алга байна'
        });
    }

    Material.findById(id).populate('user', 'displayName').populate('materialType', 'name').populate('unit', '_id name qty').exec(function (err, material) {
        if (err) {
            return next(err);
        } else if (!material) {
            return res.status(404).send({
                message: 'Материалын төрөл олдсонгүй'
            });
        }
        material.qty = material.qty / material.unit.qty;
        req.rawMaterialDebit = material;
        next();
    });
};
