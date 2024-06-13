module.exports = {
    paths: {
        "/api/products": {
            get: {
                tags: {
                    Tasks: "Get all products",
                },
                description: "Get all products",
                operationId: "getAllProducts",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Product"},
                        },
                    },
                },
                responses: {
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/api/products/category/:category": {
            get: {
                tags: {
                    Tasks: "Get product by category",
                },
                description: "Get all products that has that category",
                operationId: "getProductsByCategory",
                parameters: [
                    {
                        name: "Categoria",
                        in: "path",
                        schema: {
                            $ref: "#/components/schemas/Categoria",
                        },
                        description: "Category of a products to be retrieved.",
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Categoria"},
                        },
                    },
                },
                responses: {
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/api/products/:id": {
            get: {
                tags: {
                    Tasks: "Get a product by ID",
                },
                description: "Get a product from an ID.",
                operationId: "getProductByID",
                parameters: [
                    {
                        name: "_id",
                        in: "path",
                        schema: {
                            $ref: "#/components/schemas/_id",
                        },
                        description: "Id of a product to be retrieved.",
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/_id"},
                        },
                    },
                },
                responses: {
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
    },
};