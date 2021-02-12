const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
{
    user_id: { type: Schema.Types.ObjectId, ref: 'User',required: true },
    //restaurant_id: { type: Schema.Types.ObjectId, ref: 'User',required: true },

    items: { type: Object, required: true },

    /* itmes: [{ 
      item_id: { type: String },
      restaurant_id: { type: String },
      item_name: { type: String },
      item_desc: { type: String },
      price: { type: String },
      quantity: { type: String },
      cuisine_type: { type: String },
    }], */

    tax: { type: String,default:'0'},
    discount: { type: String,default:'0'},
    amount: { type: String},
    billing_amount: { type: String},
    payment_mode: { type: String},
    invoice_no:{type: String},

    invoice_no:{type: String},
    payment_status:{type: String,default:'Placed'},
    date:{type: Date, default: Date.now},
    status: {
        type: String,
        default:'active'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", OrderSchema);