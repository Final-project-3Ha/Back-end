import mongoose from "mongoose";
import Review from "./ReviewModel.js";

const imageSchema = mongoose.Schema({
    path: {
        type: String,
        required: true,
    },
})


const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
      unique: true,
    },

    description: {
      type: String,
      required: [true, "Please enter a description"],
    },

    category: {
      type: String,
      required: [true, "Please enter a category name"],
    },

    count: {
      type: Number,
      required: [true, "Please enter a count number of products"],
    },

    price: {
      type: Number,
      required: [true, "Please enter a product price"],
    },

    rating: {
      type: Number,
    },

    reviewsNumber: {
      type: Number,
    },

    sales: {
      type: Number,
      default: 0,
    },

    attrs: [
      {
        key: {
          type: String,
        },

        value: {
          type: String,
        },
      },
    ],

    images: [imageSchema],

    reviews: [{
      
      type: mongoose.Schema.Types.ObjectId,
      ref: Review,
    }

    ],
  },

  {
    collection: "Products",
    timestamps: true,
  }
);


const Product = model("Product", ProductSchema);

// Compound index

ProductSchema.index({name:"text", description: "text"}, {name:"TextIndex"});
ProductSchema.index({"attrs.key":1, "attrs.value":1})

export default Product;
