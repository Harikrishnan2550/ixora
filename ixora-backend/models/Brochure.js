import mongoose from "mongoose";

const brochureSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

fileUrl:{
type:String,
required:true
},

createdAt:{
type:Date,
default:Date.now
}

});

const Brochure = mongoose.model("Brochure",brochureSchema);

export default Brochure;