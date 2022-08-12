const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    content: String
})

const huntListSchema = mongoose.Schema({
    title: String,
    pokemon: Array,
    notes: [noteSchema]
})

const successListSchema = mongoose.Schema({
    title: String,
    pokemon: Array,
    notes: [noteSchema]
})

const profileSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    huntList: [huntListSchema],
    successList: [successListSchema]
})

module.exports = mongoose.model('Profile', profileSchema);