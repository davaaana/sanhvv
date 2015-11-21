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

var InvMaterialCreditSchema = new Schema(
    {
        createdDate: {
            type: Date,
            default: new Date()
        },
        date: {
            type: Date,
            required: 'Өдөрөө сонгоно уу?'
        },
        product: {
            type: Schema.ObjectId,
            ref: 'Product',
            required:'Та бүтээгдэхүүний нэрээ сонгоно уу?'
        },
        unit: {
            type: Schema.ObjectId,
            ref: 'Unit',
            required: 'Та хэмжих нэгжээ сонгоно уу?'
        },
        qty: {
            type: Number,
            required: 'Та тоо хэмжээгээ оруулана уу?'
        },
        measure: [{
            materialType: {
                type: Schema.ObjectId,
                ref: 'MaterialType',
                required: 'Материалын төрөл согноно уу?'
            },
            qty: {
                type: Number,
                validate: [validateLocalStrategyNumber, 'Зөвхөн тоо оруулана уу?'],
                required: 'Та тоо хэмжээгээ оруулана уу?'
            },
            unit: {
                type: Schema.ObjectId,
                ref: 'Unit',
                required: 'Та хэмжих нэгжээ сонгоно уу?'
            }
        }
        ],
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    }
);

mongoose.model('InvMaterialCredit', InvMaterialCreditSchema);
