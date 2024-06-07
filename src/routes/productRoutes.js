const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validation.js');
const { idParamSchema, productidParamSchema, productBodySchema } = require('../validators/products');

const {
    showProducts, 
    showProductById, 
    showNewProduct, 
    addNewProduct, 
    showEditProduct, 
    updateProduct,
    deleteProduct, 
} = require('../controllers/productController.js')


//Vista usuario
router.get('/', (req, res) => {
    res.redirect('/products');
})
router.get('/products', showProducts);
//
router.get('/products/category/:category', showProducts);
//
router.get('/products/:id', idParamSchema,  validate, showProductById);

//Vista admin.
router.get('/dashboard', showProducts);
//
router.get('/dashboard/category/:category', showProducts);
//
router.get('/dashboard/new', showNewProduct);
router.post('/dashboard', productBodySchema, validate, addNewProduct);
router.get('/dashboard/:productId', productidParamSchema,  validate, showProductById);
router.get('/dashboard/:productId/edit', productidParamSchema,  validate, showEditProduct);
router.put('/dashboard/:productId', productidParamSchema, productBodySchema, validate, updateProduct);
router.delete('/dashboard/:productId/delete', productidParamSchema,  validate, deleteProduct);

module.exports = router;
