const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8 // Password must have at least 8 characters
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This will only work on SAVE or CREATE!!
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    }
});

// DOCUMENT MIDDLEWARE
userSchema.pre('save', async function(next) {
    // If password has not been modified, then return next
    if(!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    
    // Delete passwordConfirm field to not have it set plainly in the database
    this.passwordConfirm = undefined;
    next();
});

// User Model
const User = mongoose.model('User', userSchema);

module.exports = User;