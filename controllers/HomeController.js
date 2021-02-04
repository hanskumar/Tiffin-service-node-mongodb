
const Noty = require('noty');
 
/**
 * Index Page
 */
exports.index = (req, res,next) => {

    res.render('pages/index', {
        title: 'Tifin Service',
    });  

    
}