const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Importing Routes
const authRoute =  require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true } , () => 
    console.log("Connected to DB!")
);
// Middleware
app.use(express.json());

// Middleware routes
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Server running on port 3000'));


