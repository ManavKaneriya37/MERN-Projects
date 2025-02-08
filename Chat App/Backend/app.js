const express = require('express')
const cors = require('cors')
const app = express();
require('dotenv').config();

const dbConnection = require('./Database/db')
dbConnection();
const userRouter = require('./routes/user.routes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/api/users',userRouter);

module.exports = app;
