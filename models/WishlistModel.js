const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistSchema = new mongoose.Schema(
{
    user_id: { type: Schema.Types.ObjectId, ref: 'User',required: true },
    
    restaurant_id: {
        type: Schema.Types.ObjectId, ref: 'User',required: true },
    
    status: {
        type: String,
        default:'active'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);