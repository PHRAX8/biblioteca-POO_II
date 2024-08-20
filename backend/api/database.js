const mongoose = require('mongoose');
require('dotenv').config();
const mongoUri = process.env.MONGO_URI+"";

function connectToDatabase() {
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
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
