const User = require('../models/UserModel');
const bcrypt        = require('bcrypt');

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
                latitude:latitude,
                longitude:longitude
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

    if(req.cookies.userLocation){
        console.log(req.cookies.userLocation.location);

        sequelize.query('SELECT *, (6371 * acos( cos( radians('+req.cookies.userLocation.lat+') ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians('+req.cookies.userLocation.long+') ) + sin( radians('+req.cookies.userLocation.lat+') ) * sin( radians( latitude ) ) ) ) AS distance FROM restaurant_info HAVING distance < 18', { type: sequelize.QueryTypes.SELECT})
        .then(result => {
            //console.log(result);

            res.render('pages/restaurants', {
                resturants: result,
                title: 'Tifin Service',
                path: '/',
                user: req.session,
                error:'',
                success: ''
            }); 
        }).catch(function(err){
            //console.log('Oops! something went wrong, : ', err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error); 
        });
        //res.send(req.cookies.userLocation.lat);
        
    } else {
        return res.redirect('/');
    }
}