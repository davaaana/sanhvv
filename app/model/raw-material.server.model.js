'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator');

var validateLocalStrategyNumber = function (qty) {
    return ((this.provider !== 'local' && !this.updated) || validator.isNumeric(qty));
};

var RawMaterialDebitSchema = new Schema(
    {
        createdDate:{
            type:Date,
            default:new Date()
        },
        date:{
            type:Date,
            required:'Өдөрөө сонгоно уу?'
        },
        materialType:{
            type:Schema.ObjectId,
            ref:'MaterialType',
            required:'Материалын төрөл согноно уу?'
        },
        qty:{
            type:Number,
            required:'Та тоо хэмжээгээ оруулана уу?'
        },
        description:{
            type:String
        },
        amount:{
            type:Number,
            required:'Та үнийн дүнг заавал оруулана уу?'
        },
        unit:{
            type:Schema.ObjectId,
            required:'Та хэмжих нэгж заавал оруулана уу?',
            ref:'Unit'
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    }
);

mongoose.model('RawMaterialDebit', RawMaterialDebitSchema);
