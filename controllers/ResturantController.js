const User                  = require('../models/UserModel');
const WishlistModel         = require('../models/WishlistModel');
const Review                = require('../models/ReviewModel');
const RestaurantItemsModel  = require('../models/RestaurantItemsModel');

const bcrypt                = require('bcrypt');



exports.partner_with_us = (req, res,next) => {

    res.render('pages/restaurant/registration', {
        title: 'Tifin Service',
    });  
}

exports.register = async (req, res, next) => {

    const {name,email,mobile_no,password,address,latitude,longitude,delivery_distance,tifiin_start_from,cuisine_type} = req.body;

    if(!mobile_no || !password || !name || !email){
        req.flash('error', 'All fields are Required');
        res.redirect('back');
    }

    /*------------Username is exist---------------*/
    User.exists({mobile_no},(err,result) =>{

        if(result){
            req.flash('error', 'Mobile Number already Exist');
            res.redirect('back')
        }
     });

     const hashPassword = await bcrypt.hashSync(password, 10);

     const user = new User({
        name,mobile_no,email,
        password:hashPassword,
        role:'restaurant',
        restaurant_detail:[{
            slug:'',
            gst_no:'',
            pan_no:'',
            aadhar_no:'',
            bank_name:'',
            ifsc_code:'',
            address: {
                city: '',
                state: '',
                zone: '',
                address:address,
                /* latitude:latitude,
                longitude:longitude */
            },

            location: {
                type: 'Point',
                coordinates: [latitude,longitude],
            },
            delivery_distance:delivery_distance,
            tifiin_start_from:tifiin_start_from,
            cuisine_type:cuisine_type
        }],
     });

     user.save().then((user)=>{

        req.flash('success', 'Registration suscussfully');
        res.redirect('back');

     }).catch(err =>{
        console.log(err);
        req.flash('error', 'Something Went Wrong please try again');
        res.redirect('back');
     })    
}


exports.restaurants = (req, res,next) => {

    if(!req.cookies.userLocation){
        
        /* const lat = req.cookies.userLocation.lat;
        const long = req.cookies.userLocation.long; */

        User.find({role:'restaurant'},(err,result) =>{

            console.log(result);

            res.render('pages/restaurants', {
                title: 'Tifin Service restaurants',
                resturants: result,
            });  
        });
        

    } else {
        return res.redirect('/');
    }
}


exports.retaurent_details = async (req, res,next) => {

    //console.log(req.params.slug);
    const slug = req.params.slug;
    //var rest_id = req.params.slug.split("-").pop();

    if(!slug) {
        res.render('pages/errors/404', { title: 'Page not found' });
    }

    var rest_details = await User.findOne({role:'restaurant','restaurant_detail': {
        $elemMatch : { slug: slug }}});  

    try { 

        if(!rest_details){
            res.render('pages/errors/404', { title: 'Page not found' });
        }

        if (req.session.isLoggedIn) {
                
            var wishlist = await WishlistModel.findOne({restaurant_id:rest_details._id,user_id:req.session.user._id }); 

        } else {
            wishlist='';
        }

        var reviews = await Review.aggregate([
            //{$match : { restaurant_id : mongoose.Types.ObjectId(rest_details._id) }},
            {$lookup : { from: 'users', localField: 'user_id', foreignField: '_id', as: 'usersdata' }}
        ]);

        let Resturant_items = await RestaurantItemsModel.find({restaurant_id:rest_details._id});

        //return res.send(Resturant_items); 
        
        res.render('pages/restaurant_details', {
            resturant: rest_details,
            wishlist_item: wishlist,
            reviews:reviews,
            products: Resturant_items,
            totalPrice:'', 
            title: req.params.slug
        });  

    } catch (err) {
        console.log(err);
        req.flash('error', 'Some Error Occured,Please Try Again.')
        res.redirect('back');
    }  
}