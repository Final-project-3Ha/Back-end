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
    },

    attrs: [
      {
        key: {
          type: String,
        },

        value: [{
          type: String,
        }],
      },
    ],
  },

  {
    collection: "Categories",
    timestamps: true,
  }
);

const Category = model("Category", CategorySchema);
export default Category;
