'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator');

var ProductSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: 'Үүссэн бүтээгдэхүүн байна',
            required:'Бүтээгдэхүүний нэрээ оруулана уу?'
        },
        createdDate:{
            type:Date,
            default:new Date()
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        qty:{
            type:Number,
            default:0
        }
    }
);

mongoose.model('Product', ProductSchema);
