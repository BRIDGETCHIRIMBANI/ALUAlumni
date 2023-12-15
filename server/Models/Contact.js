const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  Name: { type: String, required: false },
  email: { type: String, required: true },
  message: {type: String, required: true},
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;

