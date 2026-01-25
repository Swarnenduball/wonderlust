const express = require("express");

const Listing = require("../model/listing");
const Review = require("../model/review");
const ExpressError=require("../utility/expressError")

module.exports.createReview=async(req,res)=>{

         let listing = await Listing.findById(req.params.id);
    let review=  new Review(req.body.review);
    review.author=req.user._id;
   
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    
       req.flash("success","a  new review is added");
    res.redirect(`/listings/${listing.id}`);
   
   
};
module.exports.deleteReview=async (req,res)=>{
//  console.log("PARAMS:", req.params);
    let {id,reviewId}=req.params;
    
    await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
    
   await Review.findByIdAndDelete(reviewId);
      req.flash("success","a the your review is deleted");
   res.redirect(`/listings/${id}`);
};