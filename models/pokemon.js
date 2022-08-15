const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: String,
    //image: String,
    location: Array,
    huntMethods: Array
})

module.exports = mongoose.model('Pokemon', pokemonSchema);