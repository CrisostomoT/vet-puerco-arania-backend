const { Schema, Types, model } = require("mongoose");

const turnsModel = new Schema({
  service: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  pet: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Turns = model("turns", turnsModel);
module.exports = Turns;
