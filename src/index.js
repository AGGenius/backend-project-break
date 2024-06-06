const express = require('express');
const app = express();

const path =  require('path');

require('dotenv').config();
const PORT = process.env.PORT;

const router = require('./routes/productRoutes.js')

// Los form en HTML no soportan los metodos PUT y DELETE por defecto, para poder usarlos, una de las maneras, es usar
// method-override: https://mohammdowais.medium.com/sending-put-and-delete-requests-through-html-f9ffe9e1b6cb
const methodOverride = require('method-override');

const dbConnection = require('./config/db.js');

app.use(express.json());

app.use(express.urlencoded({extended: true}));

// Middleware para encontrar y verificar mediante el request que contiene un body, que es un objeto, y que incluye un
// "_method". Si se cumplen las condiciones, realiza la tarea con el metodo deseado, "sustituyendo" el original por el oculto.
// En el form que queramos usar el delete debemos especificar que el metodo sea "post", type="hidden", name="_method" y value="delete" o value="put"
app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    };
  }
));

app.use('/static', express.static(path.join(__dirname, '..', 'public')));

app.use('/', router);


dbConnection();

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));