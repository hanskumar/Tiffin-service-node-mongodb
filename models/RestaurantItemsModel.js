const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResturantItemSchema = new mongoose.Schema(
{
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'User',required: true },
    item_name: { type: String},
    item_desc: { type: String},
    //category: { type: String},
    price: { type: String},
    image: { type: String},
    cuisine_type:{
        type: String,
    },
    status: {
        type: String,
        default:'active'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("restaurant_item", ResturantItemSchema);