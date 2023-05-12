import mongoose from "mongoose";
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

    images: [
      {
        type: String,
        required: true,
      },
    ],

    reviews: [],
  },

  {
    collection: "Products",
    timestamps: true,
  }
);

ProductSchema.index();
const Product = model("Product", ProductSchema);
export default Product;
