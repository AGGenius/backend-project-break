const express = require('express');
const app = express();

const path =  require('path');

require('dotenv').config();
const PORT = process.env.PORT;

const router = require('./routes/index.js')
const methodOverride = require('method-override');
const dbConnection = require('./config/db.js');
const mongoSanitize = require('express-mongo-sanitize');

// Firebase

const {initializeFB} = require('./config/firebase.js');
initializeFB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(mongoSanitize());

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

app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    return (err.message ? res.status(err.statusCode || 500).send(err.message) : res.sendStatus(500));
  }
  next();
});

dbConnection();

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

module.exports = app;