const Profile = require('../models/profile');
const Pokemon = require('../models/pokemon');
const pokemon = require('../models/pokemon');
const app = require('../server');

module.exports = {
    index,
    add: addPokemon
}

function addPokemon(req, res) {
    Pokemon.create(req.body, function(err, pokemonBeingAdded) {
        Profile.findById(req.user.profile, function(err, profileDocument) {
            profileDocument.huntList.push(pokemonBeingAdded);
            profileDocument.save(function(err) {
                res.render("lists/shinies", {profile: profileDocument});
            })
    })
    console.log(req.body);
    //  I need to add Pokemon to the user-specific lists... Profile.findById isn't working though... How do I do that?
    console.log(req.user.profile);
    
    })
}

function index(req, res) {
    //  First I have to get the profile document so I can access the specific userlist. Did that with Profile.findById
    //  Then I have to get the IDs from huntList
    //  Then I have to somehow substitute the Pokemon in place of their IDs and pass it to the appropriate views page so it can access the info

    Profile.findById(req.user.profile)
        .populate("huntList")
        .exec(function(err, profileDocument) {
            //  Maybe .populate will work... I have the profile document, now I need the Pokemon...
            Pokemon.find(
                { _id: { $in: profileDocument.huntList } },
                function (err, pokemonInList) {
                    res.render("lists/shinies", {
                        profile: profileDocument,
                        huntList: pokemonInList
                    })
                }
            )
        })

    // Profile.findById(req.user.profile, function (err, profileDocument) {
    //     if (err) {
    //         res.send('Error in index function');
    //     }
    //     res.render("lists/shinies", { profileLists: profileDocument });
    //   });
    
    //   Profile.findById(req.user.profile, function (err, profileDocument) {
    //     const pokemonList = Pokemon.find({
    //       _id: { $in: profileDocument.huntList },
    //     });
    //     res.render("lists/shinies", { pokemonList });
    //   });

    // const pokemonList = Profile.findById(req.user.profile).populate('pokemon').exec(function(err, profile) {
    //     console.log(profile);
    //     return profile.huntList;
    // })
    
    // res.render('lists/shinies', {pokemonList})
    
    // try {
    //     const pokemonList = Profile.findById(req.user.profile, function(err, profileDocument) {
    //     const profileHuntList = profileDocument.huntList;
    //     console.log(profileHuntList, "profile hunt list");
    //     return profileHuntList.map(p => {
    //         Pokemon.findById(p, function(err, pokemonDoc) {
    //             console.log(pokemonDoc, "pokemon doc")
    //             // pokemonList.push(pokemonDoc);
    //             return pokemonDoc;
    //             //console.log(pokemonList, "pokemon list after push")
    //         });
    //     })
    //     // return pokemonList;
    // })
    // console.log(pokemonList, "outside of forEach");
    //     res.render("lists/shinies", {pokemonList})
    // } catch (err) {
    //     return console.error(err);
    // }
    
    //  Need to grab the Pokemons' ids from huntList to show them on the page...
    // huntList.map(for each ID send a Pokemon)
    

    // Pokemon.find({}, function(err, allPokemonOnList) {
    //     if(err) {
    //         console.log('Error in index function');
    //     }
        //console.log(allPokemonOnList);
       // res.render("lists/shinies");
}