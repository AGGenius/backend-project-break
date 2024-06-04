const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    Nombre: String,
    Descripcion: String,
    Imagen: String,
    Categoria: String,
    Talla: String,
    Precio: String,
    }, {timestamps: true });

const Product = mongoose.model('Products', ProductSchema);

module.exports = Product;