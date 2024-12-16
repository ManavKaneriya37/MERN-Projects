const dotenv = require('dotenv').config()
const cors = require('cors');
const express = require('express')
const app = express();
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes')
const todoRoutes = require('./routes/todo.routes')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
connectToDb();

app.use('/users',userRoutes);
app.use('/todo', todoRoutes);

module.exports = app;