const { param, body } = require('express-validator');
const Product = require('../models/Products.js');

const validCatergory = (value) => {
    const categories = Product.schema.tree.Categoria.enum;

	if (!categories.includes(value)) {
		throw new Error(`Not a valid category, should one of these ${categories}`);
	}
	return true;
}

const validSize = (value) => {
    const sizes = Product.schema.tree.Talla.enum;

	if (!sizes.includes(value)) {
		throw new Error(`Not a valid size, should one of these ${sizes}`);
	}
	return true;
}

const idParamSchema = [
	param('id')
		.notEmpty()
		.withMessage(`Product ID is required`)
		.isLength({ min: 24 })
		.withMessage('Invalid product ID'),
]

const productidParamSchema = [
	param('productId')
		.notEmpty()
		.withMessage(`Product ID is required`)
		.isLength({ min: 24 })
		.withMessage('Invalid product ID'),
]

const categoryParamSchema = [
	param('category')
		.notEmpty()
		.withMessage(`Category is required`)
		.custom(validCatergory)
]

const productBodySchema = [
	body('Nombre')
        .escape()
		.trim()
		.notEmpty()
		.withMessage('Product name is required')
		.isLength({ min: 5, max: 25 })
		.withMessage('Product name must be at least 5 characters long, and not exceed 25 characters.'),
    body('Descripcion')
        .escape()
		.trim()
		.notEmpty()
		.withMessage('Description is required')
		.isLength({ min: 10, max: 50 })
		.withMessage('Product name must be at least 10 characters long, and not exceed 50 characters.'),
	body('Imagen')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Image is required'),
	body('Categoria')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Category is required')
        .custom(validCatergory),
	body('Talla')
        .escape()
		.trim()
		.notEmpty()
		.withMessage('Size is required')
        .custom(validSize),
    body('Precio')
        .escape()
        .isInt()
        .withMessage('Price must be a number')
        .notEmpty()
        .withMessage('Price is required')
]

module.exports = {
	idParamSchema,
    productidParamSchema,
    productBodySchema,
	categoryParamSchema,
}