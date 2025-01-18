// Configuration of environment variables
import dotenv from 'dotenv';
dotenv.config();

// Express setup
import express from 'express';
const app = express();

// Database connection
import connectToDb from './Database/connect.js'
connectToDb();


//Routes
import userRoutes from './routes/user.routes.js'
import projectRoutes from './routes/project.routes.js'
import expenseRoutes from './routes/expense.routes.js'
import incomeRoutes from './routes/income.routes.js'


import cookieParser from 'cookie-parser';


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());


app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/expenses', expenseRoutes);
app.use('/incomes', incomeRoutes);


export default app;