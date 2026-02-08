const express = require("express");
const router=express.Router()
const Listing = require("../model/listing");
const wrapAsync=require("../utility/wrapasync");
const ExpressError=require("../utility/expressError.js")
const {listingSchema,reviewSchema}=require("../listingschema/schema")
const {isLoggedIn, redirectURl, isOwner, validListing}=require("../middleware")
const listingController=require("../controller/listing");
if(process.env.NODE_ENV!="production"){
  require("dotenv").config()
}

const multer=require("multer");
const { eventNames } = require("../model/review.js");
const cloudinary=require("cloudinary").v2
const {storage}=require("../cloudConfig.js")
const upload=multer({storage});


//index rout 
router.get("/",wrapAsync(listingController.index ));
//new insert rout 
router.route("/new")
.get(isLoggedIn, wrapAsync( listingController.newListingForm))
.post(validListing,isLoggedIn,upload.single("listing[image][url]"), wrapAsync(listingController.newListing))

//Show rout 
router.get("/:id", wrapAsync(listingController.showListings));
//edit rout
router.route("/:id/edit")
.get(isLoggedIn,isOwner,wrapAsync( listingController.editForm ))
.put(isLoggedIn,validListing,upload.single("listing[image][url]"), isOwner,wrapAsync(listingController.editListing ));
   
//delete route

  router.delete("/:id/delete",isLoggedIn, isOwner, wrapAsync(listingController.deleteListing ));
   module.exports=router;