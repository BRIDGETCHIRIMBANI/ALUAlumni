const router = require("express").Router();
const Event = require("../Models/Event");
const moment = require("moment");
//const axios = require("axios");

// Create event
router.post("/create-event", async (req, res) => {
  try {
    console.log("Received event data:", req.body);
    const event = new Event(req.body);
    await event.save();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get events
//router.get("/get-events", async (req, res) => {
  //try {
    //const start = moment(req.query.start).toDate();
    //const end = moment(req.query.end).toDate();
    
    //const events = await Event.find({
      //start: { $gte: start },
      //end: { $lte: end },
    //});

    //console.log("Fetched events:", events);

    //res.send(events);
  //} catch (error) {
    //res.status(500).json({ error: 'Server error' });
  //}
//});

router.get('/get-events', async (req, res) => {
  try {
    const events = await Event.find();
    console.log(events);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching events' });
  }
});

module.exports = router;
