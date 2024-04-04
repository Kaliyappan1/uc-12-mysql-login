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


//,  connect to mysql
connection.connect();

//  middleware to parse JSON
app.use(bodyParser.json());

// Routes
app.post('/signup', (req, res) => {
    const {fname,lname, gender, email, password} = req.body;

    // insert new user into database
    connection.query('INSERT INTO users (fname, lname, gender, email, password) VALUES (?,?,?,?,?)', [ fname, lname, gender,email, password], (error, results, fields) => {
    if (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while signing up'});
    }else{
        res.json({ message: 'signup successful' });
    }
    });
});

app.post('/login', (req,res)=> {
    const {email, password} = req.body;

    // Verify user credentials
    connection.query
})

