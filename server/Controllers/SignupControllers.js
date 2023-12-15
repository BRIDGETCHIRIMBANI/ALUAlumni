const express = require('express');
const router = express.Router();
const Signup = require('../Models/Signup');

// Handle POST request to /api/signup
router.post('/signup', async (req, res) => {
    const {
      fullName,
      email,
      profession,
      location,
      userType,
      password,
      confirmPassword
    } = req.body;
  
    // Check if the passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await Signup.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Create a new Signup document
      const newSignup = new Signup({
        fullName,
        email,
        profession,
        location,
        userType,
        password,
      });

      // Save the new Signup document to the database
      const savedSignup = await newSignup.save();

      res.status(201).json(savedSignup);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while signing up' });
    }
});

// Handle POST request to /api/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await Signup.findOne({ email, password });
      console.log(user)
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
});

module.exports = router;
