const express = require('express');
const router = express.Router();
const Contact = require('../Models/Contact'); 

router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new contact instance
    const contact = new Contact({ name, email, message }); // Adjust the usage

    // Save the contact in the database
    await contact.save();

    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
