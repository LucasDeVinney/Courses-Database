// Require middleware and models
bodyParser = require('body-parser').json();
var express = require('express');
var router = express.Router();
const User = require('../models').User;
const Course = require('../models').Course;
const { authenticateUser } = require('../middleware/auth-user');
const { asyncHandler } = require('../middleware/async-handler');

// Get all courses
router.get('/courses', asyncHandler(async (req, res, next) => {
    const courses = await Course.findAll();
    res.status = 200;
    res.json(courses);
}));

// Get one coures by id
router.get('/courses/:id', asyncHandler(async function(req, res, next) {
    const course = await Course.findByPk(req.params.id, {
        include: [
            {
                model: User,
                as: 'user'
            },
        ],
    });
    if (!course) {
        res.status(404).send({message: "Course not found"});
    }
    res.status = 200;
    res.send(course);
}));

// Create course
router.post('/courses', bodyParser, asyncHandler(async function(req, res, next) {
    const errors = [];

    // Validate all required data is present
    if (!req.body.title) {
        errors.push('Please provide a value for "title"');
    }
    if (!req.body.description) {
        errors.push('Please provide a value for "description"');
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
    } else {
        try {
            const newCourse = await Course.create(req.body);
            res.location('/');
            res.status(201).end();
  
        } catch (error) {
            throw error; 
        }
    }
}));

// Update course
router.put('/courses/:id', authenticateUser, bodyParser, asyncHandler(async (req, res) => {
    const errors = [];

    const course = await Course.findByPk(req.params.id, {
        include: [
          { model: User, as: 'user' }
        ]
    });
    
    // Validates that the course exists
    if (course) {
        // Validates the current user is the owner
        if (course.user.id !== req.currentUser.id) {
            res.status(403).json( {message: 'You are not authorized to update this course.'} );
            return;
        }

        // Validates all required data is present
        if (!req.body.title) {
            errors.push('Please provide a "title".');   
        }
        if (!req.body.description) {
            errors.push('Please provide a "description".');   
        }
  
        if (errors.length > 0) {
            res.status(400).json({ errors }); 
            return; 
        }

        await course.update(req.body);
        res.status(204).end();
    } else {
        errors.push('Course not found.')
        res.status(404).json({ errors }); 
    }
}));

// Deletes specific course
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    const courseOwner = await User.findByPk(course.userId);
    const isCourseOwner = (
        courseOwner.emailAddress === req.currentUser.emailAddress
        && courseOwner.password === req.currentUser.password
    );
    if (course && isCourseOwner) {
        await course.destroy();
        res.status(204).end();
    } else if (!isCourseOwner) {
        res.status(401).json({ message: "You are not the owner of the course and cannot delete it" })
    } else {
        res.status(404).json({ message: "Coures not found" })
    }
  }));

  module.exports = router;