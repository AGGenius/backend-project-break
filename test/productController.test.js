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
        
        testProduct = await Product.find().sort({_id: -1}).limit(1);
        expect(testProduct[0]._id).toBeDefined();
        expect(testProduct[0].Nombre).toBeDefined();
        expect(testProduct[0].Descripcion).toBeDefined();
        expect(testProduct[0].Imagen).toBeDefined();
        expect(testProduct[0].Categoria).toBeDefined();
        expect(testProduct[0].Talla).toBeDefined();
        expect(testProduct[0].Precio).toBeDefined();
    });

    afterAll(() => {
        return Product.deleteMany({
            "Nombre": "test name",
        });
      });
});