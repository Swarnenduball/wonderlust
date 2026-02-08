const express = require("express");
const router = express.Router()
const Listing = require("../model/listing");
const wrapAsync = require("../utility/wrapasync");
const ExpressError = require("../utility/expressError")
const { listingSchema, reviewSchema } = require("../listingschema/schema")
const { isLoggedIn, redirectURl, isOwner, validListing } = require("../middleware");
const getCoordinates = require("../utility/mapcordinates")
module.exports.index = async (req, res) => {

        const allListings = await Listing.find();

        res.render("listings/index.ejs", { allListings })
};
module.exports.newListingForm = async (req, res) => {

        res.render("listings/new.ejs")

}
module.exports.newListing = async (req, res) => {

        let url = req.file.path;
        let filename = req.file.filename;
        console.log(url, filename)
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename }
        let geometry = await getCoordinates(newListing.location);
      
          if (!geometry) {
    req.flash("error", "Location not found. Please enter a valid address.");
    return res.redirect("/listings/new");
  }
        if (geometry) {
                newListing.geometry = {
                        type: "Point",
                        coordinates: [geometry[1], geometry[0]] // lng, lat
                };
        }
        await newListing.save()
        req.flash("success", "a new listing is added");
        res.redirect('/listings');

}
module.exports.showListings = async (req, res) => {

        let { id } = req.params;
        let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate('owner')
        if (!listing) {
                req.flash("error", ("the listing you are looking for is not exist"));
                return res.redirect("/listings");
        }


        res.render("listings/show", { listing })
}
module.exports.editForm = async (req, res) => {

        let { id } = req.params;
        let listing = await Listing.findById(id);
        if (!listing) {
                req.flash("error", ("the listing you are looking for is not exist"));

                return res.redirect("/listings");
        }
        let originame_img = listing.image.url;
        let n_img_url = originame_img.replace("/upload", "/upload/w_100")
        console.log(n_img_url)
        res.render("listings/edit", { listing, n_img_url })

}
module.exports.editListing = async (req, res) => {

        let { id } = req.params;
        let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
        if (typeof req.file != "undefine") {
                let url = req.file.path;
                let filename = req.file.filename;
                listing.image = { url, filename }
                listing.save()
        }
        req.flash("success", "a existing  listing is Updated");
        res.redirect(`/listings/${id}`);

}
module.exports.deleteListing = async (req, res) => {

        let { id } = req.params;
        let item = await Listing.findByIdAndDelete(id);
        req.flash("success", "a the Listing is deleted");
        console.log(item)
        res.redirect(`/listings`);

}