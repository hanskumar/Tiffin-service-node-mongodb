const router = require("express").Router();

const ResturantController   = require("../controllers/ResturantController");


/**
* ===========================Resturant Routes===============================
*/
router.get('/partner_with_us',ResturantController.partner_with_us);

router.post('/register',ResturantController.register);


module.exports = router;