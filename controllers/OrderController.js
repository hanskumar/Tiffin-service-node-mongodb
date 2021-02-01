
const User = require('../models/UserModel');
const bcrypt        = require('bcrypt');

/**
* Login User
*/
exports.order = async (req, res, next) => {

    res.render('pages/order', { title: 'Tifin Service/My Order'});   
}

