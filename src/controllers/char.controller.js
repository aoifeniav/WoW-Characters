const Char = require('../models/Char.model');
const User = require('../models/User.model');
const Guild = require('../models/Guild.model');

const charListGet = async (req, res, next) => {
    try {
        const chars = await Char.find({ owner: req.user._id });
        return res.status(200).render('./chars/char-list', { chars, user: req.user });
    } catch (error) {
        next(error);
    }
};

const newCharGet = async (req, res, next) => {
    return res.status(200).render('./chars/new-char', { user: req.user });
};

const newCharPost = async (req, res, next) => {
    try {
        let { name, faction, race, charClass, level, realm, guild, pic, owner, ...professions } = req.body;

        for (let profession in professions) {
            professions[profession] = professions[profession] === 'on' ? true : false;
        }

        let guildDoc;
        if (guild.trim() !== '') {
            guildDoc = await Guild.findOne({ name: guild });
            if (guildDoc === null) {
                const guildData = { name: guild, faction, realm }
                guildDoc = new Guild(guildData);
                await guildDoc.save();
            }
        }

        const characterData = { name, faction, race, charClass, level, realm, pic: req.picUrl, owner, professions };

        if (guildDoc) {
            characterData.guild = guildDoc._id;
        }

        const newChar = new Char(characterData);
        await newChar.save();

        await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { chars: newChar._id } },
            { new: true }
        );

        if (guildDoc) {
            await Guild.findByIdAndUpdate(
                guildDoc._id,
                { $addToSet: { members: newChar._id } },
                { new: true }
            );
        }

        return res.redirect(`/chars/${newChar._id}`);
    } catch (error) {
        return next(error);
    }
};

const editCharGet = async (req, res, next) => {
    try {
        const char = await Char.findById(req.params.id);
        const guild = await Guild.findById(char.guild);

        return res.render('./chars/edit-char', { char, guild });
    } catch (error) {
        return next(error);
    }
};

const editCharPut = async (req, res, next) => {
    const { id } = req.params;
    try {
        const { name, faction, race, charClass, level, realm, guild, pic, ...professions } = req.body;

        for (let profession in professions) {
            professions[profession] = professions[profession] === 'on' ? true : false;
        }

        let guildDoc;
        // If guild field contains text, we find the guild with the name given.
        if (guild.trim() !== '') {
            guildDoc = await Guild.findOne({ name: guild });
            // If there is no guild with the name given, a new guild is created.
            if (guildDoc === null) {
                const guildData = { name: guild, faction, realm }
                guildDoc = new Guild(guildData);
                await guildDoc.save();

                // If char belonged to a previous guild, char is removed from previous guild's members.
                let oldGuildDoc = await Guild.findOne({ members: id });
                if (oldGuildDoc) {
                    const guildMemberIndex = oldGuildDoc.members.findIndex((memberId) => memberId == id);
                    if (guildMemberIndex !== -1) {
                        oldGuildDoc.members.splice(guildMemberIndex, 1);
                        oldGuildDoc.save();
                    }

                    // If char was previous guild's only member, previous guild is deleted.
                    if (oldGuildDoc.members.length === 0) {
                        await Guild.findByIdAndDelete(oldGuildDoc._id);
                    }
                }
            }

        // If guild field does not contain text and char belonged to a previous guild,
        // char is removed from previous guild's members.
        } else {
            let oldGuildDoc = await Guild.findOne({ members: id });
            if (oldGuildDoc) {
                const guildMemberIndex = oldGuildDoc.members.findIndex((memberId) => memberId == id);
                if (guildMemberIndex !== -1) {
                    oldGuildDoc.members.splice(guildMemberIndex, 1);
                    oldGuildDoc.save();
                }

                // If char was previous guild's only member, previous guild is deleted.
                if (oldGuildDoc.members.length === 0) {
                    await Guild.findByIdAndDelete(oldGuildDoc._id);
                }
            }
        }

        const characterData = { name, faction, race, charClass, level, realm, professions }

        if (guildDoc) {
            characterData.guild = guildDoc._id;
        } else {
            characterData.guild = null;
        }

        if (req.picUrl) {
            characterData.pic = req.picUrl;
        }

        const editedChar = await Char.findOneAndUpdate(
            { _id: id },
            characterData,
            { new: true }
        );

        if (guildDoc) {
            await Guild.findByIdAndUpdate(
                guildDoc._id,
                { $addToSet: { members: editedChar._id } },
                { new: true }
            );
        }

        return res.redirect(`/chars/${id}`);
    } catch (error) {
        return next(error);
    }
};

const charGet = async (req, res, next) => {
    const { id } = req.params;

    try {
        const char = await Char.findById(id);
        const guild = await Guild.findById(char.guild);

        const professions = [];
        for (let profession in char.toObject().professions) {
            if (char.toObject().professions[profession]) {
                professions.push(profession);
            }
        };

        return res.status(200).render('./chars/char', { char, professions, guild });
    } catch (error) {
        next(error);
    };
};

const charDelete = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleted = await Char.findByIdAndDelete(id);

        await User.findByIdAndUpdate(
            deleted.owner,
            { $pull: { chars: id } },
            { new: true }
        );

        await Guild.findByIdAndUpdate(
            deleted.guild,
            { $pull: { members: id } },
            { new: true }
        );

        const deletedCharGuild = await Guild.findById(deleted.guild);

        if (deletedCharGuild.members.length === 0) {
            await Guild.findByIdAndDelete(deletedCharGuild._id);
        }

        if (!deleted) {
            return res.status(404).json('The character you are trying to delete does not exist.')
        } else {
            return res.redirect('/chars');
        };
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    charListGet,
    newCharGet,
    newCharPost,
    editCharGet,
    editCharPut,
    charGet,
    charDelete,
};
