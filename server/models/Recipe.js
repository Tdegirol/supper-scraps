const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // TODO: Choose API and replicate schema
});

module.exports = recipeSchema;
