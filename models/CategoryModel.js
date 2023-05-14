import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
      default: "category-3Ha"
    },

    image: { 
      type: String,

    },

    attrs: [
      {
        key: {
          type: String,
        },

        value: [
          {
            type: String,
          },
        ],
      },
    ],
  },

  {
    collection: "Categories",
    timestamps: true,
  }
);

CategorySchema.index({ description: 1 });

const Category = model("Category", CategorySchema);
export default Category;
