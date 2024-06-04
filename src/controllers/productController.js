const Product = require('../models/Products.js');

const showProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem retrieving all products."});
    }
}

const showProductById = async(req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem retrieving the product."});
    }
}

const showDashboard = async(req, res) => {
    try {
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Hola</h1>
            <h2>Todos los productos aqui</h2>
        </body>
        </html>     
        `);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem retrieving the dashboard."})
    }
}

const showNewProduct = async(req, res) => {
    try {
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Añade un producto</h1>
            <form action="/dashboard" method="post">
                <label for="Nombre">Nombre:</label>
                <input type="text" id="Nombre" name="Nombre" required><br>
                <label for="Descripcion">Descripcion:</label>
                <input type="text" id="Descripcion" name="Descripcion" required><br>
                <label for="Imagen">Imagen:</label>
                <input type="text" id="Imagen" name="Imagen" required><br>
                <label for="Categoria">Categoria:</label>
                <input type="text" id="Categoria" name="Categoria" required><br>
                <label for="Talla">Talla:</label>
                <input type="text" id="Talla" name="Talla" required><br>
                <label for="Precio">Precio:</label>
                <input type="text" id="Precio" name="Precio" required><br>
                <button type="submit">Añadir producto</button>
            </form>
        </body>
        </html>     
        `);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem retrieving the dashboard to add a new product."})
    }
}

const showEditProduct = async(req, res) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id);
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Modifica el producto</h1>
            <h2>Producto a modificar</h2>
            <p>Nombre: ${product.Nombre}</p>
            <form action="/dashboard" method="post">
                <label for="Nombre">Nombre:</label>
                <input type="text" id="Nombre" name="Nombre" value="${product.Nombre}" required><br>
                <label for="Descripcion">Descripcion:</label>
                <input type="text" id="Descripcion" name="Descripcion" value="${product.Descripcion}" required><br>
                <label for="Imagen">Imagen:</label>
                <input type="text" id="Imagen" name="Imagen" value="${product.Imagen}" required><br>
                <label for="Categoria">Categoria:</label>
                <input type="text" id="Categoria" name="Categoria" value="${product.Categoria}" required><br>
                <label for="Talla">Talla:</label>
                <input type="text" id="Talla" name="Talla" value="${product.Talla}" required><br>
                <label for="Precio">Precio:</label>
                <input type="text" id="Precio" name="Precio" value="${product.Precio}" required><br>
                <button type="submit">Editar producto</button>
            </form>
        </body>
        </html>     
        `);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem creating the product."});
    }
}

const showDashboardProduct = async(req, res) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id);
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Detalle del producto</h1>
            <p>Nombre: ${product.Nombre}</p>
            <p>Descripcion: ${product.Descripcion}</p>
            <p>Imagen: ${product.Imagen}</p>
            <p>Categoria: ${product.Categoria}</p>
            <p>Talla: ${product.Talla}</p>
            <p>Precio: ${product.Precio}</p>
        </body>
        </html>     
        `);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem retrieving the product."});
    }
}

const addNewProduct = async(req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(200).send(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem creating the product."});
    }
}

const updateProduct = async(req, res) => {
    try {
        const id = req.params.productId;
        await Product.findByIdAndUpdate(id, req.body);
        const product = await Product.findById(id);
        res.status(200).send(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem creating the product."});
    }
}

const deleteProduct = async(req, res) => {
    try {
        const id = req.params.productId;
        await Product.findByIdAndDelete(id, req.body);
        res.status(200).redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem creating the product."});
    }
}

module.exports = {
    showProducts, 
    showProductById,
    showDashboard,
    showNewProduct,
    showDashboardProduct,
    showEditProduct,
    addNewProduct,
    updateProduct,
    deleteProduct
}

/*
    updateProductByID,
    removeProductByID
*/