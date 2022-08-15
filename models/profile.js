const mongoose = require('mongoose');

// const noteSchema = mongoose.Schema({
//     content: String
// })

// const huntListSchema = mongoose.Schema({
//     pokemon: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}],
//     notes: [noteSchema]
// })

// const successListSchema = mongoose.Schema({
//     pokemon: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}],
//     notes: [noteSchema]
// })

const profileSchema = new mongoose.Schema({
    name: String,
    //avatar: String,
    huntList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}],
    successList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon'}]
})

module.exports = mongoose.model('Profile', profileSchema);