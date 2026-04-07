// const mongoose = require("mongoose");

// const blogSchema = new mongoose.Schema(
// {
// title:{
// type:String,
// required:true
// },

// content:{
// type:String,
// required:true
// },

// image:{
// url:String,
// public_id:String
// },

// author:{
// type:String,
// default:"Fatou Gueye"
// },

// published:{
// type:Boolean,
// default:true
// }

// },
// {timestamps:true}
// );

// module.exports = mongoose.model("Blog", blogSchema);


const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);