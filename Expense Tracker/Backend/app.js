import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();

import connectToDb from './Database/connect.js'
connectToDb();
import cookieParser from 'cookie-parser';
//Routes
import userRoutes from './routes/user.routes.js'


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use('/users', userRoutes);


export default app;