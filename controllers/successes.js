const Profile = require('../models/profile');
const Pokemon = require('../models/pokemon');

module.exports = {
    index,
    add: addPokemon
}

function addPokemon(req, res) {
    console.log(req.body);
    // Profile.findById(req.user._id, function(err, profileDocument) {
    //     profileDocument.huntList.push(req.body);
    //     profileDocument.save(function(err) {
            res.render("lists/successes");
    //     })
    // })
}

function index(req, res) {
    Pokemon.find({}, function(err, allPokemonOnList) {
        if(err) {
            console.log('Error in index function');
        }
        console.log(allPokemonOnList);
        res.render("lists/successes");
    })
}