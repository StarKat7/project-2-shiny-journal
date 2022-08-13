const Profile = require('../models/profile');
const Pokemon = require('../models/pokemon');

module.exports = {
    index
}

function index(req, res) {
    res.render("lists/successes");
}