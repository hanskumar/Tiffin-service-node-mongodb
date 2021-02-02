const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');

//Initialize
mongoose.plugin(slug);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim:true
    },
    
    mobile_no: {
        type: String,
        trim:true,
        required: [true, 'User phone number required']
    },
    email: {
        type: String,
        validate: {
          validator: async function(email) {
            const user = await this.constructor.findOne({ email });
            if(user) {
              if(this.id === user.id) {
                return true;
              }
              return false;
            }
            return true;
          },
          message: props => 'The specified email address is already in use.'
        },
        required: [true, 'User email required'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    role: { type: String, enum: ['admin', 'user','restaurant'], default: 'user' },
    profile_image: {
      type: String,
      default:'/assets/images/default.jpg'
    },
    reg_date: {
        type: Date, default: Date.now
    },
    status: {
        type: String,
        default:'active'
    },
    credit_amount: {
        type: String,
        default:'0.00'
    },
    restaurant_detail:[{

        //Define the slug parameters
        slug: { type: String, slug: "name" },

        gst_no:{
          type: String,
        },
        pan_no:{
          type: String,
        },
        aadhar_no:{
          type: String,
        },
        bank_name:{
          type: String,
        },
        ifsc_code:{
          type: String,
        },
        address: {
          city: String,
          state: String,
          zone: String,
          address:String,
        },

        location: {
          type: { type: String },
          coordinates: [Number],
        },

        alternate_number:{
          type: String,
        },

        delivery_distance:{
          type: String,
          default:0
        },

        delivery_boys:{
          type: Number,
          integer: true,
          default:0
        },

        cuisine_type:{
          type: String,
        },

        tiffin_start_from:{
          type: String,
        }
    }]
  },
  {
    timestamps: true,
  }
);

userSchema.index({ "location": "2dsphere" });

module.exports = mongoose.model("User", userSchema);