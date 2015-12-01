'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Material = mongoose.model('RawMaterialDebit'),
    MaterialType = mongoose.model('MaterialType'),
    TimeLine = mongoose.model('TimeLine'),
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
                                    var time = {
                                        message:'Түүхий эд нэмсэн',
                                        user:req.user,
                                        ipAddress:req.connection.remoteAddress,
                                        date:Date.now()
                                    };
                                    var timeLine = new TimeLine(time);
                                    timeLine.save(function (err, data) {
                                        res.json(rawMaterial);
                                    });
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
                                var time = {
                                    message:'Түүхий эд зассан',
                                    user:req.user,
                                    ipAddress:req.connection.remoteAddress,
                                    date:Date.now()
                                };
                                var timeLine = new TimeLine(time);
                                timeLine.save(function (err, data) {
                                    res.json(materialType);
                                });
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
                                var time = {
                                    message:'Түүхий эд устгасан',
                                    user:req.user,
                                    ipAddress:req.connection.remoteAddress,
                                    date:Date.now()
                                };
                                var timeLine = new TimeLine(time);
                                timeLine.save(function (err, data) {
                                    res.json(material);
                                });
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
    var filter;
    try{
        filter = JSON.parse(req.query.filter);
    }catch(e){
        filter = req.query.filter;
    }
    var skip = filter.limit * (filter.page-1);
    Material.find().limit(filter.limit).skip(skip).sort('-createdDate').populate('user', 'displayName').populate('unit', 'name qty').populate('materialType', 'name _id').exec(function (err, material) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            Material.count().exec(function (error, count) {
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
