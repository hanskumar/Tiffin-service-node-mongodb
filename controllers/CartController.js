
const Cart   = require('../models/CartModel');
const RestaurantItemsModel  = require('../models/RestaurantItemsModel');
const AddressModel  = require('../models/AddressModel');


exports.add_to_cart =  (req, res, next) => {

    const ProductId = req.body.id;

    if(!ProductId){
        res.sendStatus(200).json({ success: false,message:"Id Not Found." });
    }

    /*------------Check if Item is exist---------------*/
    RestaurantItemsModel.findOne({_id:ProductId},(err,result) =>{

        if(err){
            console.log(err,"Errorr Log");
            res.sendStatus(200).json({ success: false,message:"No Item Found" });
        }

        if(result){
            
            let cart = new Cart(req.session.cart ? req.session.cart : {}) 
            
            cart.add(result,ProductId);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.json({ success: true,TotalQty:req.session.cart.totalQty });
        } else {

            res.sendStatus(200).json({ success: false,message:"No Item Found" });
        }
     });  
}


exports.checkout = async (req, res, next) => {

    if(!req.session.cart){
        return res.render('pages/empty_cart',{
            title: 'Checkout'
        });
    }

    var cart = new Cart(req.session.cart);

    let delivery = await AddressModel.find({user_id:req.session.user._id});

    try { 

        var delivery_status=0;
        var delivery_address='';
        if(req.session.cart.delivery_address){
            var delivery_status=1;
            var delivery_address=req.session.cart.delivery_address;
        } 

        res.render('pages/secure_checkout', {
            delivery_add: delivery,
            slected_delivery_address: delivery_address,
            delivery_status:delivery_status,
            title: 'Checkout'
        }); 

    } catch (err) {
        console.log(err);
        req.flash('error', 'Some Error Occured,Please Try Again.')
        res.redirect('back');
    }   
};



exports.test = async (req, res, next) => {

    res.send(req.session);
      
}