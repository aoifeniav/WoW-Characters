const multerUpload = require('../middlewares/files.middleware');
const uploadToCloudinary = require('../middlewares/files.middleware');
const Char = require('../models/Char.model');
const User = require('../models/User.model');

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

// TODO: Crear relación guild-char al crear y editar personaje.
const newCharPost = async (req, res, next) => {
    try {
        const { name, faction, race, charClass, level, realm, pic, owner, ...professions } = req.body;

        for (let profession in professions) {
            professions[profession] = professions[profession] === 'on' ? true : false;
        }

        const characterData = { name, faction, race, charClass, level, realm, pic: req.picUrl, owner, professions }
        const newChar = new Char(characterData);
        const createdChar = await newChar.save();

        await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { chars: createdChar._id } },
            { new: true }
        );

        return res.redirect(`/chars/${createdChar._id}`);
    } catch (error) {
        return next(error);
    }
};

const editCharGet = async (req, res, next) => {
    try {
        const char = await Char.findById(req.params.id);

        return res.render('./chars/edit-char', { char });
    } catch (error) {
        return next(error);
    }
};

const editCharPut = async (req, res, next) => {
    const { id } = req.params;
    try {
        const { name, faction, race, charClass, level, realm, pic, ...professions } = req.body;

        for (let profession in professions) {
            professions[profession] = professions[profession] === 'on' ? true : false;
        }

        const characterData = { name, faction, race, charClass, level, realm, professions }

        if (req.picUrl) {
            characterData.pic = req.picUrl;
        }

        await Char.findOneAndUpdate(
            { _id: id },
            characterData,
            { new: true }
        );
        return res.redirect(`/chars/${id}`);
    } catch (error) {
        return next(error);
    }
};

const charGet = async (req, res, next) => {
    const { id } = req.params;

    try {
        const char = await Char.findById(id);
        const professions = [];
        for (let profession in char.toObject().professions) {
            if (char.toObject().professions[profession]) {
                professions.push(profession);
            }
        };

        return res.status(200).render('./chars/char', { char, professions });

        // Al interactuar con Handlebars, esta parte del código debe omitirse.
        // if (char) {
        //     return res.status(200).json(char)
        // } else {
        //     // Si el código se está ejecutando sin fallos, podemos crear un error y enviarlo con throw al catch, que será quien haga next (al gestor de errores).
        //     const error = new Error('No existe el personaje con ese ID de MongoDB.');
        //     error.status = 404;
        //     throw error
        // }
    } catch (error) {
        next(error);
    };
};

const charDelete = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleted = await Char.findByIdAndDelete(id);

        await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { chars: id } },
            { new: true }
        );

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
