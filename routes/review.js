const express = require("express");
const router=express.Router({mergeParams:true})
const Listing = require("../model/listing");
const Review = require("../model/review");
const wrapAsync=require("../utility/wrapasync");
const ExpressError=require("../utility/expressError.js");
const {listingSchema,reviewSchema}=require("../listingschema/schema");
const { validReview, isLoggedIn,isReviewAuthor } = require("../middleware");
const reviewController=require("../controller/review")

// reviews show
router.post("/",validReview,isLoggedIn,wrapAsync(reviewController.createReview))
//reviews delete
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));
module.exports=router;
