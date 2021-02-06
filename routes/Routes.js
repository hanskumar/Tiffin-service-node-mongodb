const router = require("express").Router();

const multerupload = require("../config/upload_profile_image");

const HomeController        = require("../controllers/HomeController");
const LocationController    = require("../controllers/LocationController");
const ResturantController   = require("../controllers/ResturantController");
const AuthController        = require("../controllers/AuthController");
const OrderController       = require("../controllers/OrderController");
const UserController        = require("../controllers/UserController");
const CartController        = require("../controllers/CartController");

/**
 * Define all Routes here
*/
router.get("/", HomeController.index);


router.post('/login',AuthController.login);

/**
 * User Registration route
 */
router.post('/signup',AuthController.signup);

router.get('/logout',AuthController.logout);

/*--------Get User Current Address using Lat Long (Reverse GeoCoding)-------------*/
router.get('/reverse-geocode',LocationController.reverse_geocode);

/*--------Get User Current Address using Lat Long (Reverse GeoCoding)-------------*/
router.get('/restaurants',ResturantController.restaurants);


router.get('/orders',OrderController.order);


router.post('/update-profile',UserController.update_profile);

router.post('/upload_profile_image',multerupload.upload,UserController.upload_profile_image);

router.get('/favourites',UserController.favourites);

router.get('/addresses',UserController.address);

router.post('/add_address',UserController.add_address);

router.get('/get_address_data/:address_id',UserController.get_address_data);

router.post('/update_address',UserController.update_address);

router.post('/add_to_wishlist',UserController.add_to_wishlist);

router.post('/remove_from_wishlist',UserController.remove_from_wishlist);


router.post('/submit_review',UserController.submit_review);


//----------Add to Cart routes----------*/
router.post('/add-to-cart',CartController.add_to_cart);


/*-------Checkout------------*/
router.get('/checkout',CartController.checkout); 


/*-------Checkout------------*/
router.post('/place-order',OrderController.order_place); 


/*-------Checkout------------*/
router.get('/thanks',OrderController.thanks); 


/*-------Make address as default delivery address on checkout page------------*/
router.post('/maket-it-default',UserController.make_address_default); 


/*--------Single Resturent Details Page-------------*/
router.get('/restaurant/:slug',ResturantController.retaurent_details);




/*--------Single Resturent Details Page-------------*/
router.get('/test',CartController.test);

module.exports = router;