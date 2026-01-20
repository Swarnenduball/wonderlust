const express = require("express");
const router=express.Router({mergeParams:true})
const Listing = require("../model/listing");
const Review = require("../model/review");
const wrapAsync=require("../utility/wrapasync");
const ExpressError=require("../utility/expressError");
const {listingSchema,reviewSchema}=require("../listingschema/schema");
const { validReview, isLoggedIn,isReviewAuthor } = require("../middleware");


// reviews show
router.post("/",validReview,isLoggedIn,async(req,res)=>{
    try {
         let listing = await Listing.findById(req.params.id);
    let review=  new Review(req.body.review);
    review.author=req.user;
   
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    console.log("the data is saved");
       req.flash("success","a  new review is added");
    res.redirect(`/listings/${listing.id}`);
    } catch (error) {
        console.log(error)
    }
   
})
//reviews delete
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(async (req,res)=>{
 console.log("PARAMS:", req.params);
    let {id,reviewId}=req.params;
    
    await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
    
   await Review.findByIdAndDelete(reviewId);
      req.flash("success","a the your review is deleted");
   res.redirect(`/listings/${id}`);
}));
module.exports=router;
