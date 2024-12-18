const dotenv = require('dotenv').config()
const cors = require('cors');
const express = require('express')
const app = express();
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes')
const todoRoutes = require('./routes/todo.routes')
const userAuth = require('./middlewares/userAuth')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use((req, res, next) => {
    if (req.method === "GET" && !req.url.startsWith("/api")) {
      res.sendFile(path.join(__dirname, "build", "index.html"));
    } else {
      next();
    }
  });
  
connectToDb();

app.use('/users',userRoutes);
app.use('/todo', todoRoutes);
app.get('/auth', userAuth.authUser)

module.exports = app;