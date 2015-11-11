'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
    MaterialType = mongoose.model('MaterialType'),
  errorHandler = require(path.resolve('./app/controller/errors.server.controller'));

/**
 * Create a article
 */
exports.create = function (req, res) {
  var materialType = new MaterialType(req.body);
  materialType.user = req.user;

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
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.materialType);
};

/**
 * Update a article
 */
exports.update = function (req, res) {
  var materialType = req.materialType;
  materialType.user = req.user;
  materialType.name = req.body.name;
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
  var materialType = req.materialType;

  materialType.remove(function (err) {
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
 * List of Articles
 */
exports.lists = function (req, res) {
  MaterialType.find().sort('-createdDate').populate('user', 'displayName').exec(function (err, materialTypes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(materialTypes);
    }
  });
};

/**
 * Article middleware
 */
exports.MaterialTypeFindById = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Материалын төрлийн дугаар алга байна'
    });
  }

  MaterialType.findById(id).populate('user', 'displayName').exec(function (err, materialType) {
    if (err) {
      return next(err);
    } else if (!materialType) {
      return res.status(404).send({
        message: 'Материалын төрөл олдсонгүй'
      });
    }
    req.materialType = materialType;
    next();
  });
};
