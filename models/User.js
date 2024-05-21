// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    phone: String,
    address: String,
    code: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
