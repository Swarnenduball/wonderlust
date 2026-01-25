const express = require("express");
const router=express.Router()
const Listing = require("../model/listing");
const wrapAsync=require("../utility/wrapasync");
const ExpressError=require("../utility/expressError.js")
const {listingSchema,reviewSchema}=require("../listingschema/schema")
const {isLoggedIn, redirectURl, isOwner, validListing}=require("../middleware")
const listingController=require("../controller/listing")
//index rout 
router.get("/",wrapAsync(listingController.index ));
//new insert rout 
router.route("/new")
.get(isLoggedIn, wrapAsync( listingController.newListingForm))
.post(validListing,isLoggedIn, wrapAsync(listingController.newListing))

//Show rout 
router.get("/:id", wrapAsync(listingController.showListings));
//edit rout
router.route("/:id/edit")
.get(isLoggedIn,isOwner,wrapAsync( listingController.editForm ))
.put(isLoggedIn,validListing, isOwner,wrapAsync(listingController.editListing ));
   
//delete route

  router.delete("/:id/delete",isLoggedIn, isOwner, wrapAsync(listingController.deleteListing ));
   module.exports=router;