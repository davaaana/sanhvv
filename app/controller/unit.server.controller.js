'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Unit = mongoose.model('Unit'),
    MaterialType = mongoose.model('MaterialType'),
    config = require('../controller/config.js'),
    errorHandler = require(path.resolve('./app/controller/errors.server.controller'));

/**
 * Create a article
 */
exports.create = function (req, res) {
    var unit = new Unit(req.body);
    unit.user = req.user;

    unit.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            return res.json(unit);
        }
    });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
    return res.json(req.unit);
};

/**
 * Update a article
 */
exports.update = function (req, res) {
    var unit = req.unit;
    unit.user = req.user;
    unit.name = req.body.name;
    unit.qty = req.body.qty;
    unit.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            return res.json(unit);
        }
    });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
    var unit = req.unit;

    unit.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            return res.json(unit);
        }
    });
};

/**
 * List of Articles
 */
exports.lists = function (req, res) {
    Unit.find().sort('-createdDate').populate('user', 'displayName').exec(function (err, unit) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(unit);
        }
    });
};

exports.UnitFindById = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Хэмжих нэгжийн дугаар алга байна'
        });
    }

    Unit.findById(id).populate('user', 'displayName').exec(function (err, unit) {
        if (err) {
            return next(err);
        } else if (!unit) {
            return res.status(404).send({
                message: 'Хэмжих нэгж олдсонгүй'
            });
        }
        req.unit = unit;
        next();
    });
};

exports.divide = function (req, res) {
    Unit.findById(req.params.uid).exec(function (err, result) {
        var sum;
        if(err){
            console.log(err);
        } else{
            sum = Number(result.qty) / Number(req.params.qty);
            return res.json({result:sum});
        }
    });
}

exports.multiply = function (req, res) {
    var sum;
    Unit.findById(req.params.uid).exec(function (err, result) {
        if(err){
            console.log(err);
        } else{
            sum = Number(result.qty) * Number(req.params.qty);
            return res.json({result:sum});
        }
    });
}
