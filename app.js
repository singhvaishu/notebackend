
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes')
require('dotenv').config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/api', todoRoutes);
module.exports = app;
