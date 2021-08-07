const Guild = require('../models/Guild.model');

const guildGet = async (req, res, next) => {
    try {
        const guilds = await Guild.find().populate('members');
        return res.status(200).json(guilds);
    } catch (error) {
        return next(error);
    }
};

const newGuildGet = async (req, res, next) => {
    return res.status(200).render('./guilds/new-guild');
};

const newGuildPost = async (req, res, next) => {
    try {
        const { name, realm, founded, guildMaster, members } = req.body;
        const newGuild = new Guild({ name, realm, founded, guildMaster, members });
        const createdGuild = await newGuild.save();
        return res.status(201).json(createdGuild);
    } catch (error) {
        return next(error);
    }
};

const editGuildGet = async (req, res, next) => {
    try {
        const guild = await Guild.findById(req.params.id);

        return res.render('./guilds/edit-guild', { guild });
    } catch (error) {
        return next(error);
    }
};

const editGuildPut = async (req, res, next) => {
    const { id } = req.params;

    try {
        const { name, faction, realm, founded } = req.body;
        const update = {};

        if (name) update.name = name;
        if (faction) update.faction = faction;
        if (realm) update.realm = realm;
        if (founded) update.founded = Number(founded);

        const updatedGuild = await Guild.findOneAndUpdate(
            { _id: id },
            update,
            { new: true }
        );
        return res.status(200).json(updatedGuild);
    } catch (error) {
        return next(error);
    }
};

const guildDelete = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleted = await Guild.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json('The guild you are trying to delete does not exist.')
        } else {
            return res.status(200).json('Guild deleted.')
        };
    } catch (error) {
        return next(error);
    }
};

// Ruta sin usar
// router.put('/add-char', async (req, res, next) => {
//     try {
//         const { guildId, charId } = req.body;
//         if (!guildId || !charId) {
//             const error = new Error('Not enough arguments to update guild.');
//             error.status = 400;
//             throw error;
//         }

//         const updatedGuild = await Guild.findByIdAndUpdate(
//             guildId,
//             { $addToSet: { members: charId } },
//             { new: true }
//         );

//         return res.status(200).json(updatedGuild);

//     } catch (error) {
//         return next(error);
//     }
// });

module.exports = {
    guildGet,
    newGuildGet,
    newGuildPost,
    editGuildGet,
    editGuildPut,
    guildGet,
    guildDelete,
};