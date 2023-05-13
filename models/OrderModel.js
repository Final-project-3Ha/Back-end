import mongoose from "mongoose";
import User from "./UserModel.js";
const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
    user: {
      
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User,
      
    },

    OrderTotal: {
      itemsCount: {
        type: Number,
        // required: true,
      },

      cartSubtotal: {
        type: Number,
        // required: true,
      },
    },

    cartItems: [
      {
        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        image: {
          path: {
            type: String,
            required: true,
          },
        },

        quantity: {
          // Number of products
          type: Number,
          required: true,
        },

        count: {
          // total amount of product
          type: Number,
          required: true,
        },
      },
    ],

    transactionResult: {
      status: {
        // Delivered or Not-delivered
        type: String,
      },

      createTime: {
        // Date of Order
        type: String,
      },

      amount: {
        // Total price of Order
        type: Number,
      },
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },
  },

  {
    collection: "Orders",
    timestamps: true,
  }
);

const Order = model("Order", OrderSchema);
export default Order;
