const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
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

    // Check if the username is already taken
    if (users.some(user => user.username === username)) {
        return res.status(409).json({ error: 'Username already taken. Please choose another.' });
    }

    const newUser = { username, email, password };
    users.push(newUser);

    // Redirect to the registration successful page
   // res.redirect('/registration');
    res.sendFile(__dirname + '/public/registration.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});