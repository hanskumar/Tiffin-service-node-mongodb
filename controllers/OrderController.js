
const Order     = require('../models/OrderModel');
const stripe    = require('stripe')(process.env.STRIPE_PRIVATE_KEY);



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

    //return res.send(req.body);

    //return res.send(req.session.cart.totalPrice);

    const {stripeToken,Paymentmode } = req.body;

    console.log(req.body.stripeToken);


    if(!stripeToken || !Paymentmode){
        return res.status(422).json({success:false, message : 'Fields are Required,Please try Again' });
    }

    
    const order = new Order({
        user_id: req.session.user._id,
        //restaurant_id: '',
        itmes: req.session.cart.items, 
        amount: req.session.cart.totalPrice, 
        billing_amount: req.session.cart.totalPrice, 
        payment_mode: 'COD',
        invoice_no: '',
    });

    order.save().then((placedOrder)=>{

        //============Stripe Payment===============
        if(Paymentmode == 'Card'){

            const charge =  stripe.charges.create({
                amount: req.session.cart.totalPrice * 100,  // convert in paise
                currency: 'inr',
                description: `Order from ${req.session.user.name} with Order ID:  ${placedOrder._id}`,
                source: stripeToken,
            }).then((res)=>{

                placedOrder.payment_status = true;
                placedOrder.payment_mode = Paymentmode

                placedOrder.save().then((reslt)=>{
                    delete req.session.cart;
                    return res.json({success:true, message : 'Payment successful, Order placed successfully' });

                }).catch((err1) =>{

                    delete req.session.cart;
                    return res.json({success:false, message : 'Error in update order' });
                })

            }).catch((err2) =>{
                delete req.session.cart;
                return res.json({success:false, message : 'Payment Failed,Please try Again' });
            })
        }

        //delete req.session.cart;
        //return res.json({success:true, message : 'Payment successful, Order placed successfully' });

    }).catch(err =>{
        console.log(err);
        
        return res.json({success:false, message : 'Order save Failed,Please try Again' });
    })
      
}


exports.thanks = async (req, res, next) => {

    res.render('pages/thanks', { title: 'Tifin Service/My Order'});
      
}

