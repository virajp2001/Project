const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review =require('../models/review.js');
const Listing =require('../models/listing.js');

const reviewController= require("../controllers/reviews.js");

//  validation

// const validateReview = (req,res,next)=>{
//     let {error} = reviewSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el)=> el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else{
//         next();
//     }
// };

//Review
//Post Review
// validateReview,

router.post("/",   wrapAsync( reviewController.createRevie))


//delete revie rout

router.delete("/:reviewId",
    wrapAsync(reviewController.deleteReview)
);

module.exports=router;