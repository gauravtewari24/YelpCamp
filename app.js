var express=require("express"),
     app=express(),
     bodyParser=require("body-parser"),
     mongoose=require("mongoose"),
     flash=require("connect-flash"),
     methodOverride=require("method-override"),
    Campground=require("./models/campgrounds"),
    Comment=require("./models/comment"),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    User=require("./models/user"),
    seedDB=require("./seeds"); 


    var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")

//seedDB();

    //mongoose.connect("mongodb+srv://gauravtewari:Gaurav@yelpcamp-moyu2.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true , useCreateIndex: true});
    mongoose.connect("mongodb+srv://gauravtewari:Gaurav@yelpcamp-moyu2.mongodb.net/test?retryWrites=true&w=majority", {
useUnifiedTopology: true,
useCreateIndex: true,
useNewUrlParser:true
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(Error, err.message);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error= req.flash("error");
    res.locals.success=req.flash("success");
    next();
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

 

app.listen(8080,function(){ 
    console.log("Yelpcamp server has started")
});