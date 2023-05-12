useUnifiedTopology: true; // allow the usage of MongoDB driver's new connection management engine (ex: how much time to try to connect before erroring out?)

import mongoose from "mongoose"; 
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected to: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

export default connectDB;
