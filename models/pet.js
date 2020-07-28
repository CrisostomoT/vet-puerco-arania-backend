const { Schema, Types, model } = require("mongoose");

const petModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  weigth: {
    type: Number,
  },
  owner: {
    type: Types.ObjectId,
    ref: "user",
  },
  query: [
    {
      type: String,
      ref: "query",
    },
  ],
});

const Pet = model("pet", petModel);

module.exports = Pet;
