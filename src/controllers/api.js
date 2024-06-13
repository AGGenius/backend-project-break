const Product = require('../models/Products.js');

const showProductsApi = async(req, res) => {
    let products = "";

    if(req.params.category) {
        const category = req.params.category;
        products = await Product.find({Categoria: category});
    } else {
        products = await Product.find();
    }
    
    res.status(200).json(products);
};

const showProductByIdApi = async(req, res) => {
    const id = req.params.id ? req.params.id : req.params.productId;
    const product = await Product.findById(id);
    res.status(200).json(product);
};

module.exports = { showProductsApi, showProductByIdApi };