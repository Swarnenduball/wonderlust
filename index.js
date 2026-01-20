const express = require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const port =8080;
const Listing = require("./model/listing");
const Review=require("./model/review");
const ejsMate =require("ejs-mate");
const wrapAsync=require("./utility/wrapasync");
const ExpressError=require("./utility/expressError")
const {listingSchema,reviewSchema}=require("./listingschema/schema");
const listingsRout= require("./routes/listing");
const reviewRout= require("./routes/review");
const userRout= require("./routes/user");
const session=require("express-session");
const flash=require("connect-flash");
const User=require("./model/user");
const passport=require("passport");
const localStrategy=require("passport-local");

let sessionOptions={
    secret:"secretecode",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expire: Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*100,
        httpOnly:true
    }
}
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());  //for initilize the passort
app.use(passport.session()); //so that it can move one page to another page without relogin
passport.use(new localStrategy(User.authenticate())); // for authenticating user  / showing authentication mode
passport.serializeUser(User.serializeUser()); //Stores user ID in session.
passport.deserializeUser(User.deserializeUser()) //Retrieves user from session.

app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs");
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next()
})
main()
.then(res=> console.log("the connection is success"))
.catch(err=>console.log(err));


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
app.use("/listings/:id/reviews",reviewRout);
app.use("/listings",listingsRout);
app.use("/",userRout);





app.get("/",(req,res)=>{
    res.send("this is the root page")
});
app.get("/test",(req,res)=>{
    res.download('middleware.js')
 
    
})
// app.get("/demouser",async(req,res)=>{
//     const firstUser= new User({
//         username:"@eagleEyeds",
//         email:"1234@gmail.com"
//     });
//    let user1= await User.register(firstUser,"helloWorld");
//    res.send(user1)
// });

// error handeling middle ware
app.use((req,res,next)=>{
  next(  new ExpressError(404,"page not found"));
})


app.use((err,req,res,next)=>{
    let {statusCode=500,message=" Their is an error in your request"}=err;
    res.status(statusCode).render("listings/error.ejs",{message})
})
//demo user 


app.listen(port,(req,res)=>{
    console.log("the app is listening on port",port)
});