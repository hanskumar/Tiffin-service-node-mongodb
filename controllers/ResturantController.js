

exports.partner_with_us = (req, res,next) => {

    res.render('pages/restaurant/registration', {
        title: 'Tifin Service',
    });  
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