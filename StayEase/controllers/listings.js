const Listing = require("../models/listing")

module.exports.index = async(req,res)=>{
    const allListing =await Listing.find({});
    res.render("listings/index.ejs",{allListing});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");   
}

module.exports.showListing =  async (req , res)=>{
    let {id}=req.params; 
    const listing=await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async(req, res, next) => {
        
    // let result = listingSchema.validate(req.body);
    // console.log(result);
    // if(result.error){
    //     throw new ExpressError(404, error);
    // }
    const newlisting=new Listing(req.body.listing);
    await newlisting.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.editListing = async (req,res)=>{
    let {id}=req.params; 
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});  
}

module.exports.updateListing = async(req,res)=>{
     
    let {id }=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
};


module.exports.deleteListing = async(req ,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
}

