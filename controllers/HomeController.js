
const Noty = require('noty');
 
/**
 * Index Page
 */
exports.index = (req, res,next) => {

    /* if(req.cookies.userLocation){
        res.redirect("/restaurants");
    } */

    res.render('pages/index', {
        title: 'Tifin Service',
        path: '/',
        //error:'',
        //success: '',
        //req: req
    });  
}