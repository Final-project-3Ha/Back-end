import Product from "../models/ProductModel.js";
import recordsPerPage from "../config/pagination.js";

// Get All The Products

const getProducts = async (req, res, next) => {
  try {
    const pageNum =Number(req.query.pageNum) || 1
    const totalProducts = await Product.countDocuments({})

// Sort Product By name, price etc...

let sort = {}
const sortOption = req.query.sort || ""
if (sortOption) {
    let sortOpt = sortOption.split("_")
    sort = { [sortOpt[0]]: Number(sortOpt[1]) }
    // console.log(sort);
}

    const products = await Product.find({})
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);
    res.json({ products, pageNum, paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage) 
    });
  } catch (err) {
    next(err);
  }
};

export default { getProducts };