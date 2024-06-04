const express = require('express');
const router = express.Router();
const {
    showProducts, 
    showProductById, 
    showDashboard, 
    showNewProduct, 
    addNewProduct, 
    showDashboardProduct, 
    showEditProduct, 
    updateProduct,
    deleteProduct, 
} = require('../controllers/productController.js')

//Vista usuario
router.get('/products', showProducts);
router.get('/products/:id', showProductById);

//Vista admin.
router.get('/dashboard', showDashboard);
router.get('/dashboard/new', showNewProduct);
router.post('/dashboard', addNewProduct);
router.get('/dashboard/:productId', showDashboardProduct);
router.get('/dashboard/:productId/edit', showEditProduct);
router.put('/dashboard/:productId', updateProduct);
router.delete('/dashboard/:productId/delete', deleteProduct);

module.exports = router;
