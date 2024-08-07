const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model.js');
const userRoute = require('./routes/user.route.js');
const app = express();

// middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use("/api/users", userRoute);

// get index
app.get('/getData', (req, res) => {
    res.send("Hello From Node API")
});

// mongoose connection to mongodb
mongoose.connect('mongodb+srv://admin:<password>@bibliotecabackend.brnwws2.mongodb.net/?retryWrites=true&w=majority&appName=BibliotecaBackend')
.then(() => {
    console.log('Connected to Database!')
    app.listen(5000, () => {
        console.log("Server is Running on Port 5000");
    })
})
.catch(() => console.log('Connection Failed!'));
