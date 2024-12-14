const dotenv = require('dotenv').config()
const cors = require('cors');
const express = require('express')
const app = express();
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
connectToDb();

app.use('/users',userRoutes);

module.exports = app;