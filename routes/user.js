const express = require("express");
const user = require("../model/user");
const wrapAsync = require("../utility/wrapasync");
const passport = require("passport");
const { redirectUrl } = require("../middleware");
const { reviewSchema } = require("../listingschema/schema");
const router=express.Router()


router.get("/signup",(req,res)=>{
    res.render("user/signup.ejs");
});
router.post("/signup",wrapAsync(async (req,res,next)=>{
    try {
          let {username,email,password}=req.body;
    let nUser=new user({
        username:username,
        email:email,
    });
   let a= await user.register(nUser,password);
   console.log(a)
   await req.login(a,(e)=>{ if(e){next(e) }
    req.flash("success","welcome to wonderlust");
   res.redirect("/listings")
   } )
   
    } catch (error) {
         req.flash("error",error)
         res.redirect("/signup")
    }
   
  

}));

router.get("/login",(req,res)=>{
    res.render("user/login.ejs")
});
router.post("/login",redirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),async(req,res)=>{
   req.flash("success","Welcome back to wonder lust");
  
   console.log( res.locals.redirectUrl)
   let renderPage= res.locals.redirectURl|| "/listings"
   console.log('1234',renderPage)
   
   res.redirect(renderPage)
});
//loggout user
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err)
        };
        req.flash("success","you are logout");
        res.redirect("/listings")
    })
})
module.exports=router;