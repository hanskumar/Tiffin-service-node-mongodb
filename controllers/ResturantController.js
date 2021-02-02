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

    if(req.cookies.userLocation){
        

        //return res.send(req.cookies.userLocation);

        const lat = req.cookies.userLocation.lat;
        const long = req.cookies.userLocation.long;

        console.log(lat);

        console.log(long);

        const query = {
            "location.geo": {
              $near: {
                $geometry: { type: "Point", coordinates: [-73.9667, 40.78] },
                $maxDistance: 10000,
              },
            },
        };

        User.aggregate([
            {
                $geoNear: {
                    near :{type: "Point", "$restaurant_detail.location.coordinates":[lat,long]},
                    distanceField: "distance",
                   // maxDistance: 2,
                    spherical: true
                }
            }
        ],(err,data)=>{
            if(err) {
                console.log(err);
              next(err);
              return;
            }
            res.send(data);
        })

    } else {
        return res.redirect('/');
    }
}