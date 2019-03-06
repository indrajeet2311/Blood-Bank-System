var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user"),
    Record      = require("./models/record"),
    session     = require("express-session"),
    path        = require("path"),
    mongodb     = require("mongodb"),
    
    passportLocalMongoose = require("passport-local-mongoose");
     
     

mongoose.connect("mongodb://localhost:27017/blood_bank", { useNewUrlParser: true });

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// USING NPM PACKAGES

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.use(require("express-session")({
    secret: "ohho",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

// ROUTES
 app.get("/",function(req,res){
   res.render("preloader.ejs");
});

app.get("/",function(req, res) 
{
 console.log(req.body.query);  
});


app.get("/home",function(req,res){
    console.log(req.user);
   res.render("home.ejs");
});


app.get("/contact",function(req, res) {
    res.render("contact.ejs");
});
app.get("/contact.html",function(req,res){
   res.render("contact.ejs");
});

app.post("/contact",urlencodedParser,function(req, res) {
  console.log(req.body);
  res.render('thankyou.ejs');
});
app.post("/bloodcamp",urlencodedParser,function(req, res) {
  console.log(req.body);
  res.render('thankyou.ejs');
});


app.get("/bmi",function(req,res){
   res.render("name.ejs");
});
app.get("/fit",function(req,res){
   res.render("fit.ejs");
});
app.get("/fitnesss.html",function(req,res){
   res.render("fit.ejs");
});
app.get("/bloodSystems",function(req, res) {
    res.render("bloodSystems.ejs");
});
app.get("/bloodSystems.html",function(req, res) {
   res.render("bloodSystems.ejs");
});
app.get("/disease.html",function(req, res) {
   res.render("disease.ejs");
});
app.get("/disease",function(req, res) {
   res.render("disease.ejs");
});
app.get('/Profile', function(req, res) {
  res.render('profile.ejs');
});
app.get('/bloodcamp', function(req, res) {
  res.render('bloodcamp.ejs');
});
app.get('/searching', function(req, res) {
  res.render('searching.ejs');
});


app.get("/Privacy",function(req, res) {
    res.render("privacy.ejs");
});
app.get("/Terms&Conditions",function(req, res) {
   res.render("terms.ejs");
});
app.get("/about",function(req,res){
   res.render("about.ejs");
});
app.get("/Signing_up.html",function(req, res) {
   res.render("signin.ejs");
});

app.get("/Signin", function(req, res){
   res.render("signin.ejs"); 
});
//handling user sign up
app.post("/Signin", function(req, res){
User.register(new User({username: req.body.username,email: req.body.email}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("signin.ejs");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/home");
        });
    });
});

// HANDLING USER LOGIN AND LOG OUT

app.get("/log_in.html",function(req, res) {
   res.render("login.ejs");
});
app.get("/login",function(req, res) {
   res.render("login.ejs");
});
app.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/home');
      }
    });
  }
});

app.get('/forgot', function(req, res) {
  res.render('forget.ejs');
});

app.get("/loginn",function(req, res) {
   res.render('loginn.ejs');
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/loginn"
}) ,function(req, res){
});

app.post("/loginn", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/loginn"
}) ,function(req, res){
});

// CREATING SERVER ENVIRONMENT

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server has started");
});