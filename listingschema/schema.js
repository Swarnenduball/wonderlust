const joi =require("joi");
module.exports.listingSchema= joi.object(
    {
        listing:joi.object({
        title:joi.string().trim().required(),
        description:joi.string().trim().max(250).required(),
       image:joi.object({
        url:joi.string().required(),
        filename:joi.string().trim().allow("",null),

       }),
        price:joi.number().required().min(0),
           location:joi.string().trim().required(),
          country:joi.string().trim().required(),
    }).required()
}
);
module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required(),
        comment:joi.string().required()
    }).required()
})

