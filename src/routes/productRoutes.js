const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validation.js');
const { idParamSchema, productidParamSchema, productBodySchema } = require('../validators/products');
const { asyncErrorHandler } = require('../middlewares/errors.js');

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
router.get('/', (req, res) => {    res.redirect('/products');   })
router.get('/products', asyncErrorHandler(showProducts));
router.get('/products/category/:category', asyncErrorHandler(showProducts));
router.get('/products/:id', idParamSchema,  validate, asyncErrorHandler(showProductById));

//Vista admin.
router.get('/dashboard', asyncErrorHandler(showProducts));
router.get('/dashboard/category/:category', asyncErrorHandler(showProducts));
router.get('/dashboard/new', asyncErrorHandler(showNewProduct));
router.post('/dashboard', productBodySchema, validate, asyncErrorHandler(addNewProduct));
router.get('/dashboard/:productId', productidParamSchema,  validate, asyncErrorHandler(showProductById));
router.get('/dashboard/:productId/edit', productidParamSchema,  validate, asyncErrorHandler(showEditProduct));
router.put('/dashboard/:productId', productidParamSchema, productBodySchema, validate, asyncErrorHandler(updateProduct));
router.delete('/dashboard/:productId/delete', productidParamSchema,  validate, asyncErrorHandler(deleteProduct));

module.exports = router;
