const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const connectToDB = require('./Database/dbConnection');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

connectToDB();

app.use('/users', require('./routes/user.routes'));
app.use('/projects',require('./routes/project.routes'));

module.exports = app;