const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/WebProject');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Exit process with failure
    }
};


connectDB();

// Define Mongoose schema and model
const UserSchema = new mongoose.Schema({
    associationName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    nationalAddress: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', UserSchema);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public', 'CS346 project')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'CS346 project', 'signupPerson.html'));
});

app.post('/signup', async (req, res) => {
    const data = {
        associationName: req.body['اسم الجمعية'],
        firstName: req.body['الاسم الاول'],
        lastName: req.body['الاسم الاخير'],
        username: req.body['اسم المستخدم'],
        password: req.body['كلمة المرور'],
        email: req.body['الايميل الالكتروني'],
        phoneNumber: req.body['رقم الجوال'],
        nationalAddress: req.body['العنوان الوطني'],
        code: req.body['الرمز']
    };
    try {
        await User.create(data);
        res.sendFile(path.join(__dirname, 'public', 'CS346 project', 'personpage.html'));
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Server error');
    }
});

app.post('/login', async (req, res) => {
    const { 'اسم المستخدم': username, 'كلمة المرور': password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.sendFile(path.join(__dirname, 'public', 'CS346 project', 'personpage.html'));
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error');
    }
});

// 404 handling
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'CS346 project', 'pagenotfound.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
