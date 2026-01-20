const express = require("express");
const router=express.Router()
const Listing = require("../model/listing");
const wrapAsync=require("../utility/wrapasync");
const ExpressError=require("../utility/expressError")
const {listingSchema,reviewSchema}=require("../listingschema/schema")
const {isLoggedIn, redirectURl, isOwner, validListing}=require("../middleware")

//index rout 
router.get("/",wrapAsync( async(req,res)=>{
    
         const allListings= await Listing.find();
         res.render("listings/index.ejs",{allListings})
   
    

  
}));
//insert rout 
router.get("/new",isLoggedIn, wrapAsync(  async(req,res)=>{
   
        res.render("listings/new.ejs")
    
  
}));
router.post("/new",validListing,isLoggedIn, wrapAsync( async(req,res)=>{
   
       
     
       const newListing=new Listing(req.body.listing);
       newListing.owner=req.user._id;
      await newListing.save()
       req.flash("success","a new listing is added");
       res.redirect('/listings');
   
}))

//Show rout 
router.get("/:id", wrapAsync( async(req,res)=>{
   
        let {id}=req.params;
        let listing= await  Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate('owner')
        if(!listing){
                req.flash("error",("the listing you are looking for is not exist"));
                return res.redirect("/listings");
        }
        res.render("listings/show",{listing})
  
    

  
}));
//edit rout
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(  async (req,res)=>{
   
        let {id}=req.params;
        let listing= await  Listing.findById(id);
             if(!listing){
                req.flash("error",("the listing you are looking for is not exist"));

                return res.redirect("/listings");
        }
        
        res.render("listings/edit",{listing})
   
   }));
router.put("/:id/edit",isLoggedIn,validListing, isOwner,wrapAsync(  async (req,res)=>{
    
       let {id}=req.params;
      await  Listing.findByIdAndUpdate(id,{...req.body.listing},{runValidators:true});
       req.flash("success","a existing  listing is Updated");
       res.redirect(`/listings/${id}`);
   
   }));
   
   //delete route

  router.delete("/:id/delete",isLoggedIn, isOwner, wrapAsync( async (req,res)=>{
    
       let {id}=req.params;
      let item =await  Listing.findByIdAndDelete(id);
       req.flash("success","a the Listing is deleted");
      console.log(item)
       res.redirect(`/listings`);
   
   }));
   module.exports=router;