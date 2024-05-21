const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/3awn', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to database successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public', 'CS346 project')));

// Signup route
app.post('/signup', async (req, res) => {
    const { firstName, lastName, username, password, email, phone, address, code } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            email,
            phone,
            address,
            code
        });

        await newUser.save();
        res.redirect('/personPage.html');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating user.');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            res.redirect('/personPage.html');
        } else {
            res.status(400).send('Invalid username or password.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in.');
    }
});

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, 'public', 'CS346 project', 'pageNotFound.html'));
});

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});
