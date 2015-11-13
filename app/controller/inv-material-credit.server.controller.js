'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Material = mongoose.model('InvMaterialCredit'),
    errorHandler = require(path.resolve('./app/controller/errors.server.controller'));

/**
 * Create a article
 */
exports.create = function (req, res) {
    var invMaterial = new Material(req.body);
    invMaterial.user = req.user;

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
    var material = req.invMaterialCredit;

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
    Material.find().sort('-createdDate').populate('user', 'displayName').populate('materialType','name').exec(function (err, material) {
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

    Material.findById(id).populate('user', 'displayName').populate('materialType', 'name').exec(function (err, material) {
        if (err) {
            return next(err);
        } else if (!material) {
            return res.status(404).send({
                message: 'Материалын төрөл олдсонгүй'
            });
        }
        req.invMaterialCredit = material;
        next();
    });
};
