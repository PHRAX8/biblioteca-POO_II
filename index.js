const express = require('express');
const mongoose = require('mongoose');
const User = require('./backend/models/user.model.js');
const userRoute = require('./backend/routes/user.route.js');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use("/api/users", userRoute);

// get index
app.get('/', (req, res) => {
    res.send("Hello From Node API")
});

// mongoose connection to mongodb
mongoose.connect('mongodb+srv://admin:admin123@bibliotecabackend.brnwws2.mongodb.net/BibliotecaBackend?retryWrites=true&w=majority&appName=BibliotecaBackend')
.then(() => {
    console.log('Connected to Database!')
    app.listen(3000, () => {
        console.log("Server is Running on Port 3000");
    })
})
.catch(() => console.log('Connection Failed!'));
