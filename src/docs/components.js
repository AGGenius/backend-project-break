module.exports = {
    components: {
        schemas: {
            Product: {
                type: "object",
                properties: {
                    _id: {
                        type: "objectId",
                        description: "Product identification number",
                        example: "6201064b0028de7866e2b2c4"
                    },
                    Nombre: {
                        type: "string",
                        description: "Name of the product.",
                        example: "Navy Jeans"
                    },
                    Descripcion: {
                        type: "string",
                        description: "A description of the product.",
                        example: "New gen textile jeans with a deep navy colour.",
                    },
                    Imagen: {
                        type: "string",
                        description: "Image of the product.",
                        example: "An photo of the product for show.",
                    },
                    Categoria: {
                        type: "string",
                        description: "Category that corresponds with a given product.",
                        example: "Camisetas, Pantalones, Zapatos, Accesorios.",
                    },
                    Talla: {
                        type: "string",
                        description: "Size of the product.",
                        example: "XS, S, M, L, XL.",
                    },
                    Precio: {
                        type: "number",
                        description: "Value purchase of the product.",
                        example: "56",
                    }
                },
            },
            _id: {
                type: "objectId",
                description: "Product identification number",
                example: "6201064b0028de7866e2b2c4",
            },
            Categoria: {
                type: "string",
                description: "Category that corresponds with a given product.",
                example: "Camisetas, Pantalones, Zapatos, Accesorios.",
            }
        },
    },
};