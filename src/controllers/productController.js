const Product = require('../models/Products.js');

//Devuelve una vista u otra dependiendo de si se accede desde el dashboard o no.
const showProducts = async(req, res) => {
    try {
        let products = "";

        if(req.params.category) {
            const category = req.params.category;
            products = await Product.find({Categoria: category});
        } else {
            products = await Product.find();
        }

        res.send(baseHTML(navBar(req.url), 
            `
                <h1 class="main__tittle">${req.url.includes("products") 
                ? "Hola, estas en la pagina" 
                + (req.params.category ? " de " + req.params.category : " principal") 
                : "Hola, estas en el dashboard" 
                + (req.params.category ? " - " + req.params.category : "")}</h1>
                <section class="product__display">
                    ${showEachProduct(products, req.url)}
                </section>
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
        <div class="product__box__details__links">
            <a class="product__box__details__editLink" href="/dashboard/${product.id}/edit">Editar producto</a>
            <form class="product__box__details__delButton" action="/dashboard/${product.id}/delete" method="post">
                <button  type="hidden" name="_method" value="delete">Eliminar producto</button>
            </form> 
        </div>  
        `;

        res.status(200).send(baseHTML(navBar(req.url),`
            <h1 class="product__tittle">Detalle de producto ${product.Nombre}</h1>
            <article class="product__box__details">
                <div class="product__box__details__main">
                    <p class="product__description">
                        <span>Descripcion:</span> 
                        ${product.Descripcion}
                    </p>
                    <p class="product__category">
                        <span>Categoria:</span> 
                        ${product.Categoria}
                    </p>
                        <p class="product__size">
                        <span>Talla:</span> ${product.Talla}
                    </p>
                        <p class="product__price">
                        <span>Precio:</span> ${product.Precio}
                    </p>
                    ${ req.url.includes("products") ? "" : extraLinks   }
                </div>  
                <img src="/${product.Imagen}" alt="${product.Nombre} photo" class="product__box__details__image">
            </article>
            `)
        );

    } catch (error) {
        console.log(error);
        res.status(500).send({message: "There was a problem retrieving the product."});
    }
};

const showNewProduct = async(req, res) => {
    try {
        res.send(baseHTML(navBar(req.url),`
            <h1>Añade un producto</h1>
            <form class="form__newProduct" action="/dashboard" method="post">
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
                <button class="form__newProduct__button" type="submit">Añadir producto</button>
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
        res.send(baseHTML(navBar(req.url),`
            <h1>Modifica el producto</h1>
            <h2>Producto: ${product.Nombre}</h2>
            <form class="form__editProduct" action="/dashboard/${id}" method="post">
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
                <button class="form__editProduct__button" type="hidden" name="_method" value="put">Guardar cambios</button>
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

const baseHTML = (navbar, content) => {
    const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="/static/styles.css">
            <title>Document</title>
        </head>
        <body>
            <nav>
                ${navbar}
            </nav>
            <main>
            ${content}
            </main>
        </body>
        </html>   
    `;
    return html;
};

const navBar = (url) => {
    const site = url.includes("product") ? "/products" : "/dashboard";
    const nav = `
    <div class="mainNav__wrap">   
            <a class="mainNav__wrap__link" href='${site}'>Principal</a>
            <a class="mainNav__wrap__link" href="${site}/category/Camisetas">Camisetas</a>
            <a class="mainNav__wrap__link" href="${site}/category/Pantalones">Pantalones</a>
            <a class="mainNav__wrap__link" href="${site}/category/Zapatos">Zapatos</a>
            <a class="mainNav__wrap__link" href="${site}/category/Accesorios">Accesorios</a>  
            ${!site.includes("product") ? "<a class='mainNav__wrap__link' href='/dashboard/new'>Añadir nuevo producto</a>" : ""}
    </div>
    `;

    return nav;
}

const showEachProduct = (arr, url) => {
    let productHtml = "";

    arr.forEach(element => {
        productHtml += `
        <article class="product__box">
            <div class="product__box__main">
                <h3 class="product__box__main__tittle">${element.Nombre}</h3>    
                <a class="product__box__main__link" href="${url.includes("product") ? "/products/"+element.id : "/dashboard/"+element.id}">${url.includes("product") ? "Ver Producto" : "Revisar Producto"}</a>
            </div>  
            <img src="/${element.Imagen}" alt="${element.Nombre} photo" class="product__box__image">
        </article>     
    `});

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
