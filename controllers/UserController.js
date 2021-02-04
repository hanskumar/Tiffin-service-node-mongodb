const bcrypt        = require('bcrypt');
const mongoose = require("mongoose");
/**
 * Load Models
 */
const User = require('../models/UserModel');
const Wishlist = require('../models/WishlistModel');
const Address = require('../models/AddressModel');

const Review = require('../models/ReviewModel');

/**
* Update User Profile
*/
exports.update_profile = async (req, res, next) => {

    const {name,email} = req.body;

    if(!name || !email){
        req.flash('error', "All Fields are Required..");
        return res.redirect('/');
    }

    let updated_user = await User.findByIdAndUpdate(req.session.user._id, { name: name,email:email}, { new: true });

    try{

        req.session.user = updated_user;
        req.flash('success', 'Profile Updated Successfully.')
        res.redirect('back');

    } catch (err) {
        console.log(err);
        req.flash('error', 'Some Error Occured,Please Try Again.')
        res.redirect('back');
    }    
}

/**
 * Upload profile image on server
 */
exports.upload_profile_image = async (req, res,next) => {

    if(!req.file){
        res.send({ status: false,image: '',messege:"Something Went wrong."})
    }
    
    var file_path = `/uploads/${req.file.filename}`;

    let updated = await User.findByIdAndUpdate(req.session.user._id, { profile_image: file_path}, { new: true });

    try{

        if(updated){
            req.session.user = updated;
        }
        res.send({ success: true,image: req.file.filename,messege:"Image Uploaded Successfully."});  //// Success but given no content

    } catch(err){
        res.send({ success: false,image: '',messege:"Something Went wrong."})
    }
} 


exports.favourites = async (req, res,next) => {
 
    //let favourites = await Wishlist.find({ user_id: req.session.user._id}).populate("users");

    console.log(req.session.user._id);

    let favourites = await Wishlist.aggregate([{
        $match: {user_id: mongoose.Types.ObjectId(req.session.user._id)}
        },
        {$lookup : { from: 'users', localField: 'restaurant_id', foreignField: '_id', as: 'rest_data' }}
    ]);


    try{

        if(favourites){
      
            res.render('pages/favourite', {
                favourites: favourites,
                title: 'My Wishlist'
            });
        } else {
             res.status(400).send('Something went wrong,Please try again');
        }


     } catch(err){
        req.flash('error', 'Some Error Occured,Please Try Again.')
        res.redirect('back');
     }
}


exports.address = async (req, res,next) => {
 
    let address = await Address.find({ user_id: req.session.user._id}).populate("users");

    try{

        if(address){
 
            console.log(address);
     
            res.render('pages/address', {
                delivery_add: address,
                title: 'Delivery Address'
            });
        } else {
             res.status(400).send('Something went wrong,Please try again');
        }


     } catch(err){
        req.flash('error', 'Some Error Occured,Please Try Again.')
        res.redirect('back');
     }
}


//-------Add address-----------//
exports.add_address = (req, res, next) => {

    const {address,flat_no,landmark,address_type} = req.body;
 
    console.log(req.session.session_id);

    if(!address || !landmark || !address_type){
        req.flash('error_msg', "Fileds are Required")
        return res.redirect('back');
    }

    const add_address = new Address({
        user_id: req.session.user._id,
        address: address,
        landmark: landmark, 
        flat_door_no: flat_no, 
        address_type: address_type, 
        status: 'Active',
        name: req.session.user.name,
        phone: req.session.user.mobile_no,
        pincode:''
    });

    add_address.save().then((user)=>{

        req.flash('success', 'Address Added Successfully');
        res.redirect('back');

    }).catch(err =>{
        console.log(err);
        req.flash('error', 'Something Went Wrong please try again');
        res.redirect('back');
    })
    
};

//--------Get Address Details-----------//
exports.get_address_data = async (req, res, next) => {
    //var address_id = req.params.address_id;

    if(!req.params.address_id){
        req.flash('error_msg', "Fileds are Required")
        return res.redirect('/back');
    }

    const addres = await Address.findOne({_id: req.params.address_id});

    try {

        if(addres){
            res.render('partials/edit_address', {
                address: addres,
                title: 'My Address'
            });
        } else {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error); 
        }

    } catch (err) {
        console.log(err);
        req.flash('error', 'Some Error Occured,Please Try Again.')
        res.redirect('/back');
    } 
};


/*------------Update Address---------------*/
exports.update_address = async (req, res, next) => {

    const {address,flat_no,landmark,address_type,addss_id} = req.body;

    if(!address || !landmark || !address_type || !addss_id){
        req.flash('error_msg', "Fileds are Required")
        return res.redirect('back');
    }

    let updated_address = await Address.findByIdAndUpdate(addss_id, 
        { 
            address: address,
            landmark: landmark,
            flat_door_no: flat_no,
            address_type: address_type
        }, { new: true 
    });

    try{

        req.flash('success_msg', 'Address Updated Successfully.')
        res.redirect('back');

    } catch (err) {
        req.flash('error_msg', 'Something Went wrong.')
        res.redirect('back');
    }       
};


//-------Add add_to_wishlist-----------//
exports.add_to_wishlist = (req, res, next) => {

    const {restaurant_id} = req.body;
 
    console.log(req.session.user._id);

    if(!restaurant_id){
        res.json({ success: false ,messege:'Fileds are Required'});
    }

    const add_wishlist = new Wishlist({
        user_id: req.session.user._id,
        restaurant_id: restaurant_id
    });

    add_wishlist.save().then((user)=>{

        res.json({ success: true });

    }).catch(err =>{
        console.log(err);
        res.json({ success: false });
    })
    
};


//-------Add to Wishlist-----------//
exports.remove_from_wishlist = (req, res, next) => {

    const restaurant_id = req.body.restaurant_id;

    Wishlist.remove({ user_id: req.session.user._id, restaurant_id: restaurant_id}).then(function(results) {
        console.log('Deleted Successfully!');
        req.flash('success_msg', 'Resturent Deleted from wishlist successfully .')
        res.json({ success: true });
            
    }).catch(function(err) {
        console.log(err);
        req.flash('error_msg', 'Some Error Occured,Please Try Again.')
        //res.redirect('/'); 
    })
         
};


//-------Add add_to_wishlist-----------//
exports.submit_review = (req, res, next) => {

    const { comment,resturant_id}   = req.body;
 
    console.log(req.session.user._id);

    if(!resturant_id || !comment){
        req.flash('error_msg', "Fileds are Required")
        res.redirect('back');
    }

    const add_review = new Review({
        user_id: req.session.user._id, 
        restaurant_id: resturant_id,
        rate: 5, 
        review_text: comment, 
        posted_on: today, 
        mod_status	: 'Active',
        mod_by: '',
        status: 'Active',
    });

    add_review.save().then((user)=>{

        req.flash('success_msg', 'Review Submited Successfully.')
        res.redirect('back');

    }).catch(err =>{
        req.flash('error_msg', 'Something Went wrongfsfsfasfa.')
        res.redirect('back');
    })
    
};