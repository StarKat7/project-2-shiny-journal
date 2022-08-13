const mongoose = require('mongoose');

// Create your User Model
const userSchema = new mongoose.Schema({
	googleId: {
	  type: String,
	  required: true
	},
    profile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
	email: String,
  }, {
	timestamps: true
  });
  

module.exports = mongoose.model('User', userSchema);