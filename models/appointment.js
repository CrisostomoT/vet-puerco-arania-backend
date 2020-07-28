const { Schema, Types, model } = require("mongoose");

const appointmentModel = new Schema({
  service: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    ref: 'user',
    required: true,
  },
  pet: {
    type: String,
    ref: 'pet',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    
  },
  description: {
    type: String,
    required: true,
  },
});

const Appointment = model("appointment", appointmentModel);
module.exports = Appointment;
