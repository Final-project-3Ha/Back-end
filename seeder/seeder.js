import connectDB from '../config/db.js';
import categoryData from './categories.js';
import Category from '../models/CategoryModel.js';
import productData from "./products.js";
import Product from '../models/ProductModel.js';
import Review from '../models/ReviewModel.js';
import reviewsData from './reviews.js'
import usersData from './users.js';
import User from '../models/UserModel.js';
import Order from '../models/OrderModel.js';
import orderData from './order.js';
connectDB();


const importData = async () => {
  try {
    await Category.collection.dropIndexes();
    await Product.collection.dropIndexes();


    await Category.collection.deleteMany({});
    await Review.collection.deleteMany({});
    await Product.collection.deleteMany({});
    await User.collection.deleteMany({});
    await Order.collection.deleteMany({});

    await Category.insertMany(categoryData);

    const reviews = await Review.insertMany(reviewsData);
    const sampleProducts = productData.map((product) => {
      reviews.map((review) => {
        product.reviews.push(review._id);
        
      })
      return {...product}
    })
    
    await Product.insertMany(sampleProducts);
    await User.insertMany(usersData);
    await Order.insertMany(orderData);

    console.log("Seeder data proceeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error while proccessing seeder data", error);
    process.exit(1);
  }
};
importData();
