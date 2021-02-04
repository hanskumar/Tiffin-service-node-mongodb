const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set('debug', true);

const reviewSchema = new mongoose.Schema(
{
    user_id: { type: Schema.Types.ObjectId, ref: 'User',required: true },
    
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'User',required: true },

    status: { type: String,default:'active'},
    rate: { type: String,default:'0'},
    review_text: { type: String},
    posted_on: { type : Date, default: Date.now},
    mod_status: { type: String,default:''},
    mod_by: { type: String,default:''}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("review", reviewSchema);