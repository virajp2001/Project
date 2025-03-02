const express = require("express");
const router = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema } = require("../schema.js");
const Listing =require('../models/listing.js');
const {isLoggedIn} = require("../middleware.js");

const listingController= require("../controllers/listings.js");

const validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
        next();
    }
};

// optimise code last step --- same perform all routes

// route
//     .route("/")
//     .get( wrapAsync(listingController.index))
//     .post( isLoggedIn,
//         wrapAsync(listingController.createListing)
//     );

//new Route
// router.get("/new", isLoggedIn,listingController.renderNewForm);

// router.router("/:id")
//     .get(isLoggedIn, wrapAsync(listingController.showListing))
//     .put(validateListing, isLoggedIn, wrapAsync( listingController.updateListing))
//     .delete( isLoggedIn, wrapAsync(listingController.deleteListing))

// router.router("/new")
//     .get(isLoggedIn,listingController.renderNewForm);

// router.router("/:id/edit")
//     .get("/:id/edit", isLoggedIn, wrapAsync( listingController.editListing));

//index route
router.get("/", wrapAsync(listingController.index));

//new Route
router.get("/new", isLoggedIn,listingController.renderNewForm);

//show Route
router.get("/:id", isLoggedIn, wrapAsync(listingController.showListing));

// create route
// validateListing,

router.post("/",validateListing, isLoggedIn,
    wrapAsync(listingController.createListing)
);

// edite route
router.get("/:id/edit", isLoggedIn, wrapAsync( listingController.editListing));


//update router 
router.put("/:id",validateListing, isLoggedIn, wrapAsync( listingController.updateListing));

//Delete route
router.delete("/:id", isLoggedIn, wrapAsync(listingController.deleteListing));

module.exports = router;