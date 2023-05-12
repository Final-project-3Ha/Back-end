import Product from "../models/ProductModel.js"

const getProduct = (req, res) => {
    res.send("Hello to our products")
}

export default getProduct