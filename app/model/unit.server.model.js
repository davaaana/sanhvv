'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator');

var UnitSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: 'Үүссэн хэмжигдэхүүн байна',
            required:'Та хэмжигдэхүүн заавал оруулах ёстой'
        },
        createdDate:{
            type:Date,
            default:new Date()
        },
        qty:{
            type: Number,
            default:0
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    }
);

mongoose.model('Unit', UnitSchema);
