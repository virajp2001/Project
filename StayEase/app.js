const express =require("express");
const app = express();
const mongoose =require("mongoose");
const Listing =require('./models/listing.js');
const path=require("path");
const methodOverride=require("method-override");
const ejsMat=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const flash = require("connect-flash");

const passport =require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");



// routes
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRouter =require("./routes/user.js")

const session = require("express-session");



const MONG_URL="mongodb://127.0.0.1:27017/stayease";

main()
  .then(() => {
    console.log("database connected");
})
  .catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONG_URL);
}

app.set('view engine', 'ejs');
app.set("viwes", path.join(__dirname, "viwes")); 
app.use(express.urlencoded({extended:true})); 
app.use(methodOverride("_method"));
app.engine('ejs', ejsMat);
app.use(express.static(path.join(__dirname,"public"))); 


const sessionOption ={
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires : Date.now() + 7 * 24 * 60 * 60 *1000,
        maxAge : 7 * 24 * 60 * 60 *1000,
        httpOnly: true,
    },
};




app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    // req.locals.error=req.flash("error");
    // req.locals.currUser = req.user;
    // console.log(currUser);
    next();
})
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});




app.use("/listings", listings);
app.use("/listings/:id/reviews" , reviews);
app.use("/",userRouter);



// app.all("*",(req, res, next) => {
//     next(new ExpressError(404,"Page Not Found!"));
// })


// app.use((err,req,res,next)=>{
//     let {statusCode =500,message="Something went to wrong!"} = err;
//     res.status(statusCode).render("error.ejs",{message});
//     // res.status(statusCode).send(message);
// }); 

app.listen(8080,  () => {
    console.log("Server is listening on port 8080");
});
//'192.168.20.83',