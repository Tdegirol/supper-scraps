const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the Recipe's `ingredients` array in Recipe.js
const ingredientSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  measurementUnit: {
    type: String,
    required: true
  },
  measurementSize: {
    type: Number,
    required: true
  }
});

module.exports = ingredientSchema;
