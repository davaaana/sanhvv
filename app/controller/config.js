'use strict';
var mongoose = require('mongoose');
var Unit = mongoose.model('Unit');
var async = require('async');

module.exports = {
    url: 'http://localhost:3000',
    jsonParse: function (data) {
        try {
            data = JSON.parse(data);
        } catch (e) {
            data = data;
        }
        return data;
    }
}

exports.convertQty = function (typeId, qty) {
    var sum;
    Unit.findById(typeId).exec(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            sum = Number(result.qty) * Number(qty);
            return sum;
        }
    });

    return sum;
}
