
const Order     = require('../models/OrderModel');


exports.order = async (req, res, next) => {

    let orders = await Order.find({user_id:req.session.user._id});

    try{

        if(orders){
            res.render('pages/order', {orders, title: 'Tifin Service/My Order'});   
        } else {
            res.render('pages/order',{ title: 'Tifin Service/My Order',orders:[]}); 
        }

    } catch (err) {
        console.log(err);
        req.flash('error', 'Some Error Occured,Please Try Again.')
        res.redirect('back');
    }   


   
}


exports.order_place = async (req, res, next) => {

    //return res.send(req.session.cart.items);

    console.log(req.session.cart.items);

    /* const {address,flat_no,landmark,address_type} = req.body;
 
    console.log(req.session.session_id);

    if(!address || !landmark || !address_type){
        req.flash('error_msg', "Fileds are Required")
        return res.redirect('back');
    } */

    const order = new Order({
        user_id: req.session.user._id,
        //restaurant_id: '',
        itmes: req.session.cart.items, 
        amount: '', 
        billing_amount: '', 
        payment_mode: 'COD',
        invoice_no: ''
    });

    //return res.send(order);

    order.save().then((user)=>{

        req.flash('success', 'Address Added Successfully');
        res.redirect('/thanks');

    }).catch(err =>{
        console.log(err);
        req.flash('error', 'Something Went Wrong please try again');
        res.redirect('back');
    })
      
}


exports.thanks = async (req, res, next) => {

    res.render('pages/thanks', { title: 'Tifin Service/My Order'});
      
}

