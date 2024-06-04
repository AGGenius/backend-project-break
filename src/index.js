const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

const router = require('./routes/productRoutes.js')

const dbConnection = require('./config/db.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', router);

app.use('/ping', (req, res) => {
    res.send({ message: "pong"});
});

dbConnection();

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));