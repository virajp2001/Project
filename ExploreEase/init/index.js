const mongoose= require("mongoose");
const initData = require("./data");
const Listing =require("../models/listing.js");



const MONG_URL="mongodb://127.0.0.1:27017/stayease";

main().then(()=>{
    console.log("database connected");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONG_URL);
}
const initDB =async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialzed");
};

initDB();