const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    //avatar: String,
    huntList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }],
    successList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }]
})

module.exports = mongoose.model('Profile', profileSchema);