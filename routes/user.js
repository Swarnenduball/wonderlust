const express = require("express");
const user = require("../model/user");
const wrapAsync = require("../utility/wrapasync");
const passport = require("passport");
const { redirectUrl } = require("../middleware");
const { reviewSchema } = require("../listingschema/schema");
const router=express.Router()
const userController=require("../controller/user")
const ExpressError=require("../utility/expressError.js")
//signup rout
router.route("/signup")
.get(userController.signupForm)
.post(wrapAsync(userController.signup));

//login rout
router.route("/login")
.get(userController.loginForm)
.post(redirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userController.loginUser
);
//loggout user
router.get("/logout",userController.logoutUser)
module.exports=router;