const mongoose = require('mongoose');
// Define a schema for the user model
const userSchema = new mongoose.Schema({
    username: String,
  });
  
  // Create a model for the user schema
  const User = mongoose.model('User', userSchema);
  module.exports = User;