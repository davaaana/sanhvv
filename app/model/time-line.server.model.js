'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator');

var TimeLineSchema = new Schema(
    {
        message: {
            type: String
        },
        date:{
            type:Date
        },
        user:{
            type:Schema.ObjectId,
            ref:'User'
        },
        ipAddress:{
            type:String
        }
    }
);

mongoose.model('TimeLine', TimeLineSchema);
