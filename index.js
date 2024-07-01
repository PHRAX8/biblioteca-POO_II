const express = require('express')
const mongoose = require('mongoose');
const app = express()

app.listen(3000, () => {
    console.log("Server is Running on Port 3000");
});

app.get('/', (req, res) => {
    res.send("Hello From Node API")
})

mongoose.connect('mongodb+srv://admin:admin123@bibliotecabackend.brnwws2.mongodb.net/BibliotecaBackend?retryWrites=true&w=majority&appName=BibliotecaBackend')
.then(() => console.log('Connected to Database!'))
.catch(() => console.log('Connection Failed!'));
