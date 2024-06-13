const express = require('express');
const router = express.Router();
const { validate } = require('../middlewares/validation.js');
const { idParamSchema, categoryParamSchema } = require('../validators/products');
const { asyncErrorHandler } = require('../middlewares/errors.js');
const { showProductsApi, showProductByIdApi } = require('../controllers/api');

router.get('/', (req, res) => {    res.redirect('/api/products');   })
router.get('/products', asyncErrorHandler(showProductsApi));
router.get('/products/category/:category', categoryParamSchema, validate, asyncErrorHandler(showProductsApi));
router.get('/products/:id', idParamSchema,  validate, asyncErrorHandler(showProductByIdApi));

module.exports = router;