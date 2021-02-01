/* exports.retaurent_details = (req, res,next) => {

    console.log(req.params.slug);
    //return false;

    sequelize.query('SELECT * FROM wishlist WHERE user_id = ?',
        { replacements: [req.session.session_id], type: sequelize.QueryTypes.SELECT }
        ).then(wishlist => {
        console.log(wishlist)
        res.status(200).json({ data: wishlist });
    })
    

    User.findOne({
        where: {
            slug: req.params.slug,
        },
        include: [Restaurant_info,Restaurant_items]
    }).then(function(results){
        console.log(results);

        //res.status(200).json({ data: results });
        if(!results){
             const error = new Error("Page Not Found");
            error.httpStatusCode = 500;
            return next(error);  
            res.render('pages/errors/404', { title: 'Page not found' });
        }
          res.render('pages/restaurant_details', {
            resturant: results,
            //wishlist: wishlist,
            title: req.params.slug,
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
 } */