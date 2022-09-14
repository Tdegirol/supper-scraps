const { Schema, model } = require('mongoose');
const ingredientSchema = require('./ingredient');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  ingredients: [ingredientSchema]
  // TODO: Choose API and replicate schema
});

const Recipe = model('Recipe', recipeSchema);

module.exports = recipeSchema;
