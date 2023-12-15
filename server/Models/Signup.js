const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
  fullName: { type: String, required: false },
  email: { type: String, required: true },
  profession: {type: String, required: false},
  location: {type: String, required: false},
  password: { type: String, required: true },
  userType: { type: String, enum: ['alumni', 'admin']},
});

const Signup = mongoose.model("Signup", SignupSchema);

module.exports = Signup;
