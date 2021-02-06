
const { body, validationResult } = require('express-validator');
const User = require('../models/UserModel');
const bcrypt        = require('bcrypt');

/**
 * Login User
 */
exports.login = async (req, res, next) => {

    const {mobile_no,password} = req.body;

    if (!mobile_no || !password) {

        req.flash('error', "All fields are Required");
        return res.redirect('/');
    } 

    const user = await User.findOne({mobile_no});

    try{
        
        if(user){
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                req.flash('error', "Wrong Mobile or Password");
                return res.redirect('/');
            }

            if(user.status !='active'){
                req.flash('error', "Your Account is Inactive,Please contact with support..");
                return res.redirect('/');
            }

            req.session.isLoggedIn = true;    
            req.session.user  = user;

            console.log(req.session.user);

            req.flash('success', 'Login Successfully.')
            res.redirect('back');

        } else {
            req.flash('error', 'Wrong Mobile or Password.');
            res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        req.flash('error', 'Some Error Occured,Please Try Again.')
        res.redirect('/');
    }    
}

/**
* User Signup
*/
exports.signup = async (req, res, next) => {

    const {mobile_no,password,name,email} = req.body;

    if(!mobile_no || !password || !name || !email){
        req.flash('error', 'All fields are Required');
        res.redirect('/');
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
        restaurant_detail:[],
     });

     user.save().then((user)=>{

        req.flash('success', 'Registration suscussfully');
        res.redirect('back');

     }).catch(err =>{
        console.log(err);
        req.flash('error', 'Something Went Wrong please try again');
        res.redirect('/');
     })    
}

exports.logout = (req, res) => {

    req.session.destroy(function(err){
        if(err){
           console.log(err);
           req.flash('error', 'Somthing Went Wrong..')
        } else{
            //res.clearCookie("userLocation");
            res.redirect('/');
        }
     });
}