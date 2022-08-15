const Profile = require('../models/profile');
const Pokemon = require('../models/pokemon');

module.exports = {
    index,
    add: addPokemon
}

function addPokemon(req, res) {
    console.log(req.body);
    Pokemon.create(req.body, function(err, pokemonBeingAdded) {
        console.log(pokemonBeingAdded, '<-- Pokemon being added');
        res.redirect('/lists/successes');
    })
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