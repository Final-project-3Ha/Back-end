import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
    },

    address: {
      type: String,
    },

    country: {
      type: String,
    },

    zipCode: {
      type: String,
    },

    city: {
      type: String,
    },

    state: {
      type: String,
    },

    password: {
      type: Number,
      required: true,
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
  },

  {
    collection: "Users",
    timestamps: true,
  }
);

const User = model("User", UserSchema);
export default User;
