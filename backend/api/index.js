const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./database'); 
require('dotenv').config(); 

const userRoute = require('../routes/user.route.js');
const bookRoute = require('../routes/book.route.js');
const memberRoute = require('../routes/member.route.js');
const loanRoute = require('../routes/loan.route.js');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/members", memberRoute);
app.use("/api/loans", loanRoute);

// get index
app.get('/getData', (req, res) => {
    res.send("Hello From Node API");
});

// Conectar ao banco de dados
connectToDatabase();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
});
