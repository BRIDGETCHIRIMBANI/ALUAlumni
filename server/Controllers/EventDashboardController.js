const express = require('express');
const router = express.Router();
const Event = require('../Models/Event');

// Fetch all events
router.get('/get-events', async (req, res) => {
  try {
    const events = await Event.find();
    console.log(events);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching events' });
  }
});

// Add an event
router.post('/add-event', async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = await Event.create(eventData);
    res.json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the event' });
  }
});

// Edit an event
router.put('/edit-event/:_Id', async (req, res) => {
  const { title, description, location, start, end } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params._Id,
      { title, description, location, start, end },
      { new: true }
    );
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the event' });
  }
});


// Delete an event
router.delete('/delete-event/:_Id', async (req, res) => {
  try {
    await Event.findByIdAndRemove(req.params._Id);
    res.json({ message: 'Event removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while removing the event' });
  }
});


module.exports = router;
