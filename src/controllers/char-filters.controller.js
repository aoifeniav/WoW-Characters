const Char = require('../models/Char.model');

// TODO: Hay que utilizar una regex para que la búsqueda funcione con minúsculas.
const charsByRealm = async (req, res, next) => {
    const { charRealm } = req.params;

    try {
        const charsByRealm = await Char.find({ realm: charRealm });
        return res.status(200).json(charsByRealm);
    } catch (error) {
        next(error);
    }
};

const charsByLevel = async (req, res, next) => {
    const { charLevel } = req.params;

    try {
        const charsByLevel = await Char.find({ level: { $gte: charLevel } });
        return res.status(200).json(charsByLevel);
    } catch (error) {
        next(error);
    }
};

const charsByQuery = async (req, res, next) => {
    try {
        const { race, level, realm } = req.query;
        const query = {};

        // La expresión regular de Mongoose de realm es para buscarlo sin ser case sensitive.
        if (race) query.race = race;
        if (level) query.level = level;
        if (realm) query.realm = { $regex: new RegExp('^' + realm.toLowerCase(), 'i') };

        const filtered = await Char.find(query);

        return res.status(200).json(filtered);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    charsByRealm,
    charsByLevel,
    charsByQuery
};
