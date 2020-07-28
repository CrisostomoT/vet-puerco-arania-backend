const { Schema, Types, model } = require("mongoose");

const breedModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  breedAnimal: {
    type: Types.ObjectId,
    ref: "pet",
  },
});

const Breed = model("breed", breedModel);

module.exports = Breed;
