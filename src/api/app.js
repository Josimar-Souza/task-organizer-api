const express = require('express');
const root = require('../controllers/root');
const Error = require('../middlewares/Error');

const app = express();

app.use(express.json());

root(app);

app.use(Error);

module.exports = app;
