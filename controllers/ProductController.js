import Product from "../models/ProductModel.js";
import recordsPerPage from "../config/pagination.js";
import imageValidate from "../utils/imageValidate.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

// Get All The Products

const getProducts = async (req, res, next) => {
  try {
    // Filtering By price

    let query = {};
    let queryCondition = false;

    let priceQueryCondition = {};
    if (req.query.price) {
      queryCondition = true;
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }

    // Filtering By Rating

    let ratingQueryCondition = {};
    if (req.query.rating) {
      queryCondition = true;
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
    }

    // Search for a specific Category

    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || "";

    // get specific category using search bar

    if (categoryName) {
      queryCondition = true;
      let a = categoryName.replaceAll(",", "/");
      var regEx = new RegExp("^" + a);
      categoryQueryCondition = { category: regEx };
    }

    // get specific category using filtering page

    if (req.query.category) {
      queryCondition = true;
      let a = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item);
      });
      categoryQueryCondition = {
        category: { $in: a },
      };
    }

    let attrsQueryCondition = [];
    if (req.query.attrs) {
      attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          let a = item.split("-");
          let values = [...a];
          values.shift(); // remove first item
          let a1 = {
            attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
          };
          acc.push(a1);
          // console.dir(acc, {depth: null})
          return acc;
        } else return acc;
      }, []);
      // console.dir(attrsQueryCondition, {depth: null})
      queryCondition = true;
    }

    // Pagination Methods

    const pageNum = Number(req.query.pageNum) || 1;

    // Sort Product By name, price etc...

    let sort = {};
    const sortOption = req.query.sort || "";
    if (sortOption) {
      let sortOpt = sortOption.split("_");
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }

    // sort products through search Box

    const searchQuery = req.params.searchQuery || "";
    let searchQueryCondition = {};
    let select = {};
    if (searchQuery) {
      queryCondition = true;
      searchQueryCondition = { $text: { $search: searchQuery } };
      select = {
        score: { $meta: "textScore" },
      };
      sort = { score: { $meta: "textScore" } };
    }

    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
          searchQueryCondition,
          ...attrsQueryCondition,
        ],
      };
    }

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .select(select)
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);
    res.json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (err) {
    next(err);
  }
};

// Get Product By ID

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("reviews")
      .orFail();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Get Bestsellers Product

// const getBestsellers = async (req, res, next) => {
//   try {
//     const products = await Product.aggregate([
//       { $sort: { category: 1, sales: -1 } },
//       { $group: { _id: "$category", doc_with_max_sales: {$first: "$$ROOT"} } },
//       { $replaceWith: "$doc_with_max_sales" },
//       { $match: {sales: {$gt: 0}}},
//       { $project: {_id: 1, name: 1, images: 1, category: 1, description: 1 }},
//       { $limit: 3 },
//     ]);
//     res.json(products);
//   } catch (err) {
//     next(err);
//   }
// };

const getBestsellers = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      { $sort: { category: 1, sales: -1 } },
      {
        $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } },
      },
      { $replaceWith: "$doc_with_max_sales" },
      { $match: { sales: { $gt: 0 } } },
      { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
      { $limit: 3 },
    ]);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Admin Get Products

const adminGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .sort({ category: 1 })
      .select("name price category");
    return res.json(products);
  } catch (err) {
    next(err);
  }
};

// Admin Delete Product

const adminDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    await product.deleteOne();
    res.json({ message: "Product Delete successfully" });
  } catch (err) {
    next(err);
  }
};

// Admin Add Product

const adminCreateProduct = async (req, res, next) => {
  try {
    const product = new Product();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name;
    product.description = description;
    product.count = count;
    product.price = price;
    product.category = category;

    if (attributesTable?.length > 0) {
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    }
    await product.save();
    res.json({
      message: "Product Created",
      productId: product._id,
    });
  } catch (err) {
    next(err);
  }
};

// Admin Update Product

const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.price = price || product.price;
    product.category = category || product.category;

    if (attributesTable?.length > 0) {
      product.attrs = [];
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    } else {
      product.attrs = [];
    }

    await product.save();
    res.json({ message: "Product Updated" });
  } catch (err) {
    next(err);
  }
};

// Upload File

const __filename = path.basename(new URL(import.meta.url).pathname);
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const adminUpload = async (req, res, next) => {
  try {
    if (!req.files || !req.files.images) {
      return res.status(400).send("No files were uploaded.");
    }

    const validateResult = imageValidate(req.files.images);
    if (validateResult.error) {
      return res.status(400).send(validateResult.error);
    }

    const uploadDirectory = path.resolve(
      path.join(__dirname, "../../deployment-2/public/images/products")
    );

    let product = await Product.findById(req.query.productId).orFail();

    let imagesTable = [];
    if (Array.isArray(req.files.images)) {
      imagesTable = req.files.images;
    } else {
      imagesTable.push(req.files.images);
    }

    for (let image of imagesTable) {
      var fileName = uuidv4() + path.extname(image.name);
     var uploadPath = path.join(uploadDirectory, fileName);
     product.images.push({ path: "/images/products/" + fileName });
      image.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
    await product.save();
    return res.send("Files uploaded!");
  } catch (err) {
    next(err);
  }
};

// Delete Image for Product

const adminDeleteProductImage = async (req, res, next) => {
  try {
    const imagePath = decodeURIComponent(req.params.imagePath);
     const finalPath = path.join(
       path.resolve(path.join(__dirname, "../../deployment-2/public")),
       imagePath
     );
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $pull: { images: { path: imagePath } } }
    ).orFail();
    return res.end();
  } catch (err) {
    next(err);
  }
};

export default {
  getProducts,
  getProductById,
  getBestsellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUpload,
  adminDeleteProductImage,
};
