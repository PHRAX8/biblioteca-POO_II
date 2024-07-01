// db.js
const mysql = require('mysql');
let connection;

const connectDB = () => {
    if (!connection) {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'library'
        });
    }
    return connection;
};

module.exports = connectDB;
