const mongoose = require("mongoose");

// const productSchema=new mongoose.Schema({
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter Product Price"],
    maxLength: [8, "price cannot exceed 8 charchter"],
  },
  ratings: {
    type:Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter Product Category"],
  },
  stock: {
    type: Number,
    required: [true, "please enter Product Stock"],
    default: 0,
  },
  numofReviews:{
      type:Number,
      default:0,
  }
  ,
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        default: 0,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
