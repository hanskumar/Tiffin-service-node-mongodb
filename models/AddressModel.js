const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new mongoose.Schema(
{
    user_id: { type: Schema.Types.ObjectId, ref: 'User',required: true },
    name: { type: String},
    phone: { type: String},
    pincode: { type: String},
    address: { type: String},
    landmark: { type: String},
    flat_door_no: { type: String},

    address_type: { type: String},
    status: {
        type: String,
        default:'active'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Address", AddressSchema);