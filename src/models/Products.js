const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    Nombre: {type: String, required: true},
    Descripcion: {type: String, required: true},
    Imagen: String,
    Categoria: { type: String, enum: ["Camisetas", "Pantalones", "Zapatos", "Accesorios"], required: true},
    Talla: { type: String, enum: ["XS", "S", "M", "L", "XL"], required: true},
    Precio: {type: Number, minimum: 0, required: true},
    }, 
    {timestamps: true }
);

const Product = mongoose.model('Products', ProductSchema);

module.exports = Product;