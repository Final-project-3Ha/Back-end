import Product from "../models/ProductModel.js";
import recordsPerPage from "../config/pagination.js";

// Get All The Products

const getProducts = async (req, res, next) => {
  try {
    const pageNum =Number(req.query.pageNum) || 1
    const totalProducts = await Product.countDocuments({})
    const products = await Product.find({})
      .skip(recordsPerPage * (pageNum - 1))
      .sort({ name: 1 })
      .limit(recordsPerPage);
    res.json({ products, pageNum, paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage) 
    });
  } catch (err) {
    next(err);
  }
};

export default { getProducts };