const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.route.js');
const bookRoute = require('./routes/book.route.js');
const memberRoute = require('./routes/member.route.js');
const app = express();

// middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/members", memberRoute);

// get index
app.get('/getData', (req, res) => {
    res.send("Hello From Node API")
});

// mongoose connection to mongodb
mongoose.connect('mongodb+srv://admin:admin123@bibliotecabackend.brnwws2.mongodb.net/BibliotecaBackend?retryWrites=true&w=majority&appName=BibliotecaBackend')
.then(() => {
    console.log('Connected to Database!')
    app.listen(5000, () => {
        console.log("Server is Running on Port 5000");
    })
})
.catch(() => console.log('Connection Failed!'));
