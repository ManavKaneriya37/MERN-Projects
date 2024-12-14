const dotenv = require('dotenv').config()
const cors = require('cors');
const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

module.exports = app;