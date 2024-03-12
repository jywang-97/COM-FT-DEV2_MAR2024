const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Connect to MySQL (replace the connection details)
const db = mysql.createConnection({
    host: 'mysql-365889e4-blueconnector-305f.aivencloud.com',
    user: 'nusclass',
    password: 'AVNS_HqZwQM1V6udeuxK9a4Q',
    database: 'b23_wjy'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Define a user table schema (customize it based on your needs)
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    )
`;

db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating users table:', err);
    } else {
        console.log('Users table created');
    }
});


app.post('/login', (req, res) => {
    // Your login logic goes here
    const { loginUsername, loginPassword } = req.body;

    // Example: Check if the username and password match a hardcoded value
    if (loginUsername === 'user' && loginPassword === 'password') {
        //res.redirect('/public/trading.html');
        res.sendFile(__dirname + '/public/trading.html')
    } else {
        res.status(401).send('Invalid credentials. Please try again.');
    }
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, password];

    db.query(insertUserQuery, values, (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const userId = result.insertId;
            res.status(201).json({ id: userId, username, email });
            res.sendFile(__dirname + '/public/registration.html');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});