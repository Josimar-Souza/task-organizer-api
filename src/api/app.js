const express = require('express');
const root = require('../controllers/root');

const app = express();

app.use(express.json());

root(app);

module.exports = app;
