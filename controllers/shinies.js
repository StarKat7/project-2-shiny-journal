const Profile = require('../models/profile');
const Pokemon = require('../models/pokemon');
const pokemon = require('../models/pokemon');
const app = require('../server');

module.exports = {
    index,
    add: addPokemon,
    delete: deletePokemon,
    edit: editPokemon,
    acquired
}

async function acquired(req, res) {
    //  So I need to move the selected Pokemon from the shinies list to the successes list.
    //  req.params.id will give the ID of the Pokemon, I need to remove the ID from the huntList and add it to the successList
    try {
        const profileDocument = await Profile.findById(req.user.profile);
        if (!profileDocument) return res.redirect('/');
        profileDocument.huntList.remove(req.params.id);
        await profileDocument.save();
        profileDocument.successList.push(req.params.id);
        await profileDocument.save();
        res.redirect('/successes');
    } catch (err) {
        res.send(err);
    }
    
}

function editPokemon(req, res) {
    //  Okay so I don't want to edit the list, I want to edit the Pokemon ON the list. So I need the Pokemon docs that the IDs on the list are attached to and edit those.
    Pokemon.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        function (err, pokemon) {
            if (err || !pokemon) return res.redirect('/');
            console.log(req.body);
            res.redirect('/shinies');
        }
    )
}

async function deletePokemon(req, res) {
    try {
        const profileDocument = await Profile.findById(req.user.profile);
        if (!profileDocument) return res.redirect('/');
        profileDocument.huntList.remove(req.params.id);
        await profileDocument.save();
        Pokemon.findOneAndDelete({ _id: req.params.id }, function (err) {
            res.redirect('/shinies');
        });
    } catch (err) {
        res.send(err);
    }
}

function addPokemon(req, res) {
    Pokemon.create(req.body, function (err, pokemonBeingAdded) {
        Profile.findById(req.user.profile, function (err, profileDocument) {
            profileDocument.huntList.push(pokemonBeingAdded);
            profileDocument.save(function (err) {
                res.redirect('/shinies');
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
        .exec(function (err, profileDocument) {
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
        })  //  It worked!!
}