const express = require('express');
const router = express.Router();

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
router.get('/products/:id', showProductById);

//Vista admin.
router.get('/dashboard', showProducts);
//
router.get('/dashboard/category/:category', showProducts);
//
router.get('/dashboard/new', showNewProduct);
router.post('/dashboard', addNewProduct);
router.get('/dashboard/:productId', showProductById);
router.get('/dashboard/:productId/edit', showEditProduct);
router.put('/dashboard/:productId', updateProduct);
router.delete('/dashboard/:productId/delete', deleteProduct);

module.exports = router;
