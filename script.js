const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kali@123',
    database: 'registration'
});

// connection.connect();

connection.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("Connected!");
    connection.release();
})