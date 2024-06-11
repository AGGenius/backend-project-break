const request = require('supertest');
const app = require('../src/index.js');
const Product = require('../src/models/Products.js');

describe('addProduct', () => {
    const product = {
        "Nombre": "test name",
        "Descripcion": "test description",
        "Imagen": "placeholder img",
        "Categoria": "Camisetas",
        "Talla": "L",
        "Precio": 25
    }

    test("Create a product", async () => {
        const actualProducts = await Product.countDocuments({});

        resProduct = await request(app).post('/dashboard').send(product).expect(201);

        const postProducts = await Product.countDocuments({});

        expect(postProducts).toBe(actualProducts+1);
        
        createdProduct = await Product.find().sort({_id: -1}).limit(1);
        expect(createdProduct[0]._id).toBeDefined();
        expect(createdProduct[0].Nombre).toBeDefined();
        expect(createdProduct[0].Descripcion).toBeDefined();
        expect(createdProduct[0].Imagen).toBeDefined();
        expect(createdProduct[0].Categoria).toBeDefined();
        expect(createdProduct[0].Talla).toBeDefined();
        expect(createdProduct[0].Precio).toBeDefined();
    });

    afterAll(() => {
        return Product.deleteMany({
            "Nombre": "test name",
        });
    });
});

describe('updateProduct', () => {
    const updatedProductValues = {
        "Nombre": "test name updated",
        "Descripcion": "test description",
        "Imagen": "placeholder img",
        "Categoria": "Camisetas",
        "Talla": "L",
        "Precio": 25
    }

    test("Update a product", async () => {
        testProduct = await Product.find().sort({_id: -1}).limit(1);
        testName = testProduct[0].Nombre;
        testId = testProduct[0].id;

        resProduct = await request(app).put('/dashboard/' + testId).send(updatedProductValues).expect(200);
        
        updatedProduct = await Product.find({Nombre: "test name updated"}).sort({_id: -1}).limit(1);
        expect(updatedProduct[0]._id).toBeDefined();
        expect(updatedProduct[0].Nombre).toBeDefined();
        expect(updatedProduct[0].Descripcion).toBeDefined();
        expect(updatedProduct[0].Imagen).toBeDefined();
        expect(updatedProduct[0].Categoria).toBeDefined();
        expect(updatedProduct[0].Talla).toBeDefined();
        expect(updatedProduct[0].Precio).toBeDefined();
    });
});

describe('deleteProduct', () => {
    const product = {
        "Nombre": "test name",
        "Descripcion": "test description",
        "Imagen": "placeholder img",
        "Categoria": "Camisetas",
        "Talla": "L",
        "Precio": 25
    }

    test("Delete a product", async () => {
        newProduct = await request(app).post('/dashboard').send(product).expect(201);
        const actualProducts = await Product.countDocuments({});

        createdProduct = await Product.find().sort({_id: -1}).limit(1);

        await request(app).delete(`/dashboard/${createdProduct[0]._id}/delete`).expect(200)
        const postProducts = await Product.countDocuments({});

        expect(postProducts).toBe(actualProducts-1);
    });
});