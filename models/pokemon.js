const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: String,
    //image: String,
    location: String,
    huntMethods: String,
    notes: String
})

module.exports = mongoose.model('Pokemon', pokemonSchema);