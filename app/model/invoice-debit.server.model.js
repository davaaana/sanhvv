'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator');

var invoiceDebitSchema = new Schema(
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
        amount: {
            type: Number,
            required: 'Та тоо хэмжээгээ оруулана уу?'
        },
        invType:{
            type:Number,
            required:'Борлуулалтын төрлөө сонгоно уу?'
        },
        description:{
            type:String
        },
        isPayment:{
          type:Boolean
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    }
);

mongoose.model('InvoiceDebit', invoiceDebitSchema);
