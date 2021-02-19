const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
{
    user_id: { type: Schema.Types.ObjectId, ref: 'User',required: true },
    //restaurant_id: { type: Schema.Types.ObjectId, ref: 'User',required: true },

    items: { type: Object, required: false },
    tax: { type: String,default:'0'},
    discount: { type: String,default:'0'},
    amount: { type: String},
    billing_amount: { type: String},
    payment_mode: { type: String,default:'COD'},
    invoice_no:{type: String},
    payment_status:{type: Boolean,default:false},
    date:{type: Date, default: Date.now},
    order_status: {type: String,default:'order_placed'}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", OrderSchema);