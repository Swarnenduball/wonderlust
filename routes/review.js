const express = require("express");
const router=express.Router({mergeParams:true})
const Listing = require("../model/listing");
const Review = require("../model/review");
const wrapAsync=require("../utility/wrapasync");
const ExpressError=require("../utility/expressError");
const {listingSchema,reviewSchema}=require("../listingschema/schema")
let validReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        let msg= error.details.map((elm)=>elm.message).join();
        throw new ExpressError(404,msg);
    }
    else{
        next();
    }
}

// reviews show
router.post("/",validReview,async(req,res)=>{
    try {
         let listing = await Listing.findById(req.params.id);
    let review=  new Review(req.body.review);
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
router.delete("/:reviewId",wrapAsync(async (req,res)=>{
 
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
    
   await Review.findByIdAndDelete(reviewId);
      req.flash("success","a the your review is deleted");
   res.redirect(`/listings/${id}`);
}));
module.exports=router;
