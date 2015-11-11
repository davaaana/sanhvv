'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator');

var MaterialTypeSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: 'Үүссэн материалын төрөл байна',
            required:'Та материалын нэр заавал оруулах ёстой'
        },
        createdDate:{
            type:Date,
            default:new Date()
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    }
);

mongoose.model('MaterialType', MaterialTypeSchema);
