const Profile = require('../models/profile');
const Pokemon = require('../models/pokemon');

module.exports = {
    index,
    add: addPokemon,
    delete: deletePokemon,
    edit: editPokemon
}

function editPokemon(req, res) {
    //  Okay so I don't want to edit the list, I want to edit the Pokemon ON the list. So I need the Pokemon docs that the IDs on the list are attached to and edit those.
    Pokemon.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        function (err, pokemon) {
            if (err || !pokemon) return res.redirect('/');
            res.redirect('/successes')
        }
    )
}

async function deletePokemon(req, res) {
    try {
        const profileDocument = await Profile.findById(req.user.profile);
        if (!profileDocument) return res.redirect('/');
        profileDocument.successList.remove(req.params.id);
        await profileDocument.save();
        Pokemon.findOneAndDelete({ _id: req.params.id }, function (err) {
            res.redirect('/successes');
        });
    } catch (err) {
        res.send(err);
    }
}

function addPokemon(req, res) {
    Pokemon.create(req.body, function (err, pokemonBeingAdded) {
        Profile.findById(req.user.profile, function (err, profileDocument) {
            profileDocument.successList.push(pokemonBeingAdded);
            profileDocument.save(function (err) {
                res.render("lists/successes", { profile: profileDocument });
            })
        })
        console.log(req.body);
        //  I need to add Pokemon to the user-specific lists... Profile.findById isn't working though... How do I do that?
        console.log(req.user.profile);

    })
}

function index(req, res) {
    Profile.findById(req.user.profile)
        .populate("successList")
        .exec(function (err, profileDocument) {
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