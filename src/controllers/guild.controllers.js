const Guild = require('../models/Guild.model');

const guildGet = async (req, res, next) => {
    const { id } = req.params;

    try {
        const guild = await Guild.findById(id).populate('members');
        return res.status(200).render('./guild/guild-members', { guild, user: req.user });
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

module.exports = {
    guildGet,
    guildDelete,
};