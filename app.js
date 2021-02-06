require("dotenv").config();
const express       = require('express')
const app           = express();
const path          = require('path');

const cookieParser  = require('cookie-parser');
const session       = require('express-session');
const ejs           = require('ejs');
const bodyParser    = require('body-parser');
const csrf          = require('csurf');
const dateFormat    = require("dateformat");
var flash         = require('connect-flash');
const toastr        = require('express-toastr');

const MongoDbStore = require('connect-mongo')(session);

/**
 * DB Connect
 */
const connection = require('./config/dbConnect')();


// view engine setup
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
//app.set('views', path.join(__dirname, 'views'));



// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid', 
    secret: "etewtekeyboard564564", 
    resave: true,  // save session if unmodified
    saveUninitialized: false,
    store: new MongoDbStore({
        url:process.env.MONGO_CONNECTION_URL,
        collection:'sessions',
        //ttl: 24 * 60 * 60 // Keeps session open for 1 day
    }),  
    cookie: { maxAge: 1000 * 60 * 60 *24 *5 } //24 hours* 12 days
}));

//csrfProtection  = csrf({ cookie: false });
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());



app.use(flash(app));
app.use(toastr());

/**
 * Define Current Date/Time Formate 
 */
today = dateFormat(new Date(), "dd-mm-yyyy");
CurrentTime= dateFormat(new Date(), "h:MM:ss");


/**
 * Middleware to set local Variables
 */

app.use((req, res, next) => {

    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.session    = req.session.user || '';

    /* var Cart = new Cart(req.session.cart);
    res.locals.session_cart_itmes    = typeof req.session.cart === "" || !req.session.cart ? '' : req.session.cart; */

    res.locals.session.cart    = req.session.cart || '';

    res.locals.success_msg = req.flash('success');
    res.locals.error_msg  = req.flash('error');

    res.locals.Is_location_set = typeof req.cookies.userLocation === "" || !req.cookies.userLocation ? '' : req.cookies.userLocation.location;
    
    //res.locals.redirect_url = req.flash('redirect_url');

    next();
});


/**
 * Define App Routes
 */
app.use('/',require("./routes/Routes"));

app.use('/restaurant',require("./routes/RestaurantRoutes"));

//The 404 Route (ALWAYS Keep this as the last route)
/* app.get('*', function(req, res){
    res.render('pages/errors/404', { title: 'Page not found' });
}); */

//app.get('/500', errorController.get500);

app.listen(process.env.PORT, () => console.log(`Server is stated on http://localhost:${process.env.PORT}`));


module.exports = app;