const Product = require('../models/Products.js');

//Devuelve una vista u otra dependiendo de si se accede desde el dashboard o no.
const showProducts = async(req, res) => {
    try {
        const products = await Product.find();

        res.send(baseHTML(
            `
                <h1>${req.url.includes("products") ? "Hola, estas en la pagina principal": "Hola, estas en el dashboard"}</h1>
                <h2>Todos los productos aqui</h2>
                <div>
                    ${showEachProduct(products, req.url)}
                </div>
            `)
        );
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem retrieving all products."});
    }
}

//Devuelve una vista u otra dependiendo de si se accede desde el dashboard o no.
const showProductById = async(req, res) => {
    try {
        const id = req.params.id ? req.params.id : req.params.productId;
        const product = await Product.findById(id);

        const extraLinks = `
            <a href="/dashboard/${product.id}/edit">Editar producto</a>
            <form action="/dashboard/${product.id}/delete" method="post">
                <button type="hidden" name="_method" value="delete">Eliminar producto</button>
            </form> 
        `;

        res.status(200).send(baseHTML(`
                <h1>Detalle de producto ${product.Nombre}</h1>
                <p>Descripcion: ${product.Descripcion}</p>
                <p>Imagen: ${product.Imagen}</p>
                <p>Categoria: ${product.Categoria}</p>
                <p>Talla: ${product.Talla}</p>
                <p>Precio: ${product.Precio}</p>
                ${ req.url.includes("products") ? "" : extraLinks   }
            `)
        );

    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem retrieving the product."});
    }
};

const showNewProduct = async(req, res) => {
    try {
        res.send(baseHTML(`
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
        `));
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem retrieving the dashboard to add a new product."})
    }
}

const showEditProduct = async(req, res) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id);
        res.send(baseHTML(`
            <h1>Modifica el producto</h1>
            <h2>Producto: ${product.Nombre}</h2>
            <form action="/dashboard/${id}" method="post">
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
                <button type="hidden" name="_method" value="put">Guardar cambios</button>
            </form>
        `));
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem creating the product."});
    }
}

const addNewProduct = async(req, res) => {
    try {
        await Product.create(req.body);
        res.status(200).redirect("/dashboard");
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem creating the product."});
    }
}

const updateProduct = async(req, res) => {
    try {
        const id = req.params.productId;
        await Product.findByIdAndUpdate(id, req.body);
        res.status(200).redirect("/dashboard");
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

const baseHTML = (content) => {
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            ${content}
        </body>
        </html>   
    `;
    return html;
};

const showEachProduct = (arr, url) => {
    let productHtml = "";

    arr.forEach(element => {
        productHtml += `
        <div>
            <h3>Nombre: ${element.Nombre}</h3>
            <p>Imagen: ${element.Imagen}</p>
            <a href="${url.includes("product") ? "/products/"+element.id : "/dashboard/"+element.id}">
                ${url.includes("product") ? "Ver Producto" : "Revisar Producto"}
            </a>
        </div>
        `
    });

    return productHtml;
}

module.exports = {
    showProducts, 
    showProductById,
    showNewProduct,
    showEditProduct,
    addNewProduct,
    updateProduct,
    deleteProduct
}
