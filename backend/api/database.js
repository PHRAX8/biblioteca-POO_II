const mongoose = require('mongoose');
require('dotenv').config();

function connectToDatabase() {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to Database!');
        })
        .catch(err => {
            console.error('Database connection failed:', err.message);
        });

    // Observer Pattern - Monitorar eventos de conexão
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Mongoose connection error: ' + err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected from DB');
    });
}

module.exports = connectToDatabase;
