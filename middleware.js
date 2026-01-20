const { listingSchema,reviewSchema } = require("./listingschema/schema");
const Listing = require("./model/listing");
const Review = require("./model/review");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.user){
        
        req.session.currUrl=req.originalUrl
      
        req.flash("error","You need to login first");
        return res.redirect("/login")
    }
    next()
}
module.exports.redirectUrl=(req,res,next)=>{
    
       if(req.session.currUrl){
        res.locals.redirectURl=req.session.currUrl
        
       }
       next()
};
module.exports.isOwner= async(req,res,next)=>{
     let {id}=req.params;
     let listing= await Listing.findById(id);
     
     if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you are not authorized");
     }
     next()
}
module.exports.isReviewAuthor= async(req,res,next)=>{
   

     let {id,reviewId}=req.params;
     console.log(reviewId)
     let review= await Review.findById(reviewId);
      
     if(!review.author._id.equals(res.locals.currUser._id)){
       req.flash("error","you are not the author of the reviwe");
       return res.redirect(`/listings/${id}`)
     }
     next()
}
module.exports.validReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        let msg= error.details.map((elm)=>elm.message).join();
        throw new ExpressError(404,msg);
    }
    else{
        next();
    }
}
module.exports.validListing=(req,res,next)=>{
    const  {error} = listingSchema.validate(req.body);
 
       if(error){
            let msg=error.details.map((elm)=>elm.message).join(",")
        throw new ExpressError(400,msg);
       }
       else{
        next()
       }
};