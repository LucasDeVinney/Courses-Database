// Import required middleware and models
bodyParser = require('body-parser').json();
var express = require('express');
var router = express.Router();
const User = require('../models').User;
const Course = require('../models').Course;
const { authenticateUser } = require('../middleware/auth-user');

// Gets current logged in user
router.get('/users', authenticateUser, async function(req, res, next) {
    const user = req.currentUser;
    res.status(200).json({ user });
});

// Creates new user
router.post('/users', bodyParser, async function(req, res, next) {
    let errors = [];

    // Valides required data is present and correct
    if (!req.body.firstName) {
        errors.push('Please provide a value for "firstName"');
    }
    if (!req.body.lastName) {
        errors.push('Please provide a value for "lastName"');
    }
    if (!req.body.emailAddress) {
        errors.push('Please provide a value for "emailAddress"');
    } else if (!/^\S+@\S+\.\S+$/.test(req.body.emailAddress)) {
        errors.push('Please provide a valid email address format (example@domain.com)'); 
    } 
    if (!req.body.password) {
        errors.push('Please provide a value for "password"');
    }

    if (errors.length > 0) {
        res.status(400).json( { errors } );
    } else {
        try {
            const newUser = await User.create(req.body);
            res.location('/')
            res.status(201).end();
        } catch (error) {
            // Catches if email is already in use
            if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ message: 'That email address is already in use.' });
            } else {
                throw error;
            }
        }
    }
    
});

module.exports = router;