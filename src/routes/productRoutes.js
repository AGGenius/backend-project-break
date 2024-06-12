const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validation.js');
const { idParamSchema, productidParamSchema, productBodySchema, categoryParamSchema } = require('../validators/products');
const { asyncErrorHandler } = require('../middlewares/errors.js');
const { monitorAuthState } = require('../config/firebase.js');

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
router.get('/products/category/:category', categoryParamSchema, validate, asyncErrorHandler(showProducts));
router.get('/products/:id', idParamSchema,  validate, asyncErrorHandler(showProductById));

//Vista admin.
router.get('/dashboard', monitorAuthState, asyncErrorHandler(showProducts));
router.get('/dashboard/category/:category',  monitorAuthState, categoryParamSchema, validate, asyncErrorHandler(showProducts));
router.get('/dashboard/new',  monitorAuthState, asyncErrorHandler(showNewProduct));
router.post('/dashboard', monitorAuthState,  productBodySchema, validate, asyncErrorHandler(addNewProduct));
router.get('/dashboard/:productId', monitorAuthState,  productidParamSchema,  validate, asyncErrorHandler(showProductById));
router.get('/dashboard/:productId/edit', monitorAuthState,  productidParamSchema,  validate, asyncErrorHandler(showEditProduct));
router.put('/dashboard/:productId', monitorAuthState,  productidParamSchema, productBodySchema, validate, asyncErrorHandler(updateProduct));
router.delete('/dashboard/:productId/delete', monitorAuthState,  productidParamSchema,  validate, asyncErrorHandler(deleteProduct));

module.exports = router;
