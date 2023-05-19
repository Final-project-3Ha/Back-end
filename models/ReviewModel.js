import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ReviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    user: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },

      name: {
        type: String,
        required: true,
      },
    },
  },

  {
    collection: "Reviews",
    timestamps: true,
  }
);

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
