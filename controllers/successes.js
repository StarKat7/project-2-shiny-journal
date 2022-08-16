const Profile = require('../models/profile');
const Pokemon = require('../models/pokemon');

module.exports = {
    index,
    add: addPokemon
}

function addPokemon(req, res) {
    Pokemon.create(req.body, function(err, pokemonBeingAdded) {
        Profile.findById(req.user.profile, function(err, profileDocument) {
            profileDocument.successList.push(pokemonBeingAdded);
            profileDocument.save(function(err) {
                res.render("lists/successes", {profile: profileDocument});
            })
    })
    console.log(req.body);
    //  I need to add Pokemon to the user-specific lists... Profile.findById isn't working though... How do I do that?
    console.log(req.user.profile);
    
    })
}

function index(req, res) {
    Profile.findById(req.user.profile)
        .populate("huntList")
        .exec(function(err, profileDocument) {
            //  Maybe .populate will work... I have the profile document, now I need the Pokemon...
            Pokemon.find(
                { _id: { $in: profileDocument.successList } },
                function (err, pokemonInList) {
                    res.render("lists/successes", {
                        profile: profileDocument,
                        successList: pokemonInList
                    })
                }
            )
        })  //  It worked!!
}