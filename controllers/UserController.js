const bcrypt        = require('bcrypt');

/**
 * Load Models
 */
const User = require('../models/UserModel');
const Wishlist = require('../models/WishlistModel');

/**
* Login User
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
 
    let favourites = await Wishlist.find({ user_id: req.session.user._id}).populate("users");

    try{

        if(favourites){
 
            console.log(favourites);
     
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