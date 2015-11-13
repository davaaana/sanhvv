'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Material = mongoose.model('RawMaterialDebit'),
    errorHandler = require(path.resolve('./app/controller/errors.server.controller'));

/**
 * Create a article
 */
exports.create = function (req, res) {
    var rawMaterial = new Material(req.body);
    rawMaterial.user = req.user;

    rawMaterial.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(rawMaterial);
        }
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
    var materialType = req.rawMaterialDebit;
    //materialType = req.body;
    materialType.user = req.user;
    materialType.date = req.body.date;
    materialType.materialType = req.body.materialType;
    materialType.description = req.body.description;
    materialType.qty = req.body.qty;
    materialType.unit = req.body.unit;
    materialType.amount = req.body.amount;
    materialType.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(materialType);
        }
    });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
    var material = req.rawMaterialDebit;

    material.remove(function (err) {
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
 * List of Articles
 */
exports.lists = function (req, res) {
    Material.find().sort('-createdDate').populate('user', 'displayName').populate('materialType', 'name').exec(function (err, material) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(material);
        }
    });
};


exports.total = function (req, res) {
    Material.aggregate([{
        $group: {
            _id: "$materialType",
            total: {
                $sum: {
                    $cond: [
                        {
                            $eq: ["$unit", "Тн"]
                        },
                        {
                            $multiply: ["$qty", 1000]
                        },
                        {
                            $cond: [
                                {
                                    $eq: ["$unit", "Кг"]
                                },
                                "$qty", {
                                    $cond: [
                                        {
                                            $eq: ["$unit", "Ш"]
                                        },
                                        {
                                            $multiply: ["$qty", 50]
                                        },
                                        0
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
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
/**
 * Article middleware
 */
exports.RawMaterialDebitFindById = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Материалын төрлийн дугаар алга байна'
        });
    }

    Material.findById(id).populate('user', 'displayName').populate('materialType', 'name').exec(function (err, material) {
        if (err) {
            return next(err);
        } else if (!material) {
            return res.status(404).send({
                message: 'Материалын төрөл олдсонгүй'
            });
        }
        req.rawMaterialDebit = material;
        next();
    });
};
