const express = require('express');
const multerUpload = require('../middlewares/files.middleware');
const uploadToCloudinary = require('../middlewares/files.middleware');
const Char = require('../models/Char.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const chars = await Char.find();
        return res.status(200).render('./chars/char-list', { chars, title: "WoW Characters" });
    } catch (error) {
        next(error);
    }
});

router.get("/new-char", (req, res, next) => {
    return res.status(200).render("./chars/new-char");
});

router.post('/new-char', async (req, res, next) => {

    try {
        const { name, faction, race, charClass, level, realm, pic, ...professions } = req.body;

        for (let profession in professions) {
            professions[profession] = professions[profession] === 'on' ? true : false;
        }

        const characterData = { name, faction, race, charClass, level, realm, pic: req.fileUrl, professions }

        const newChar = new Char(characterData);
        const createdChar = await newChar.save();
        return res.redirect(`/chars/${createdChar._id}`);
    } catch (error) {
        return next(error);
    }
});

router.get("/edit-char/:id", async (req, res, next) => {
    try {
        const char = await Char.findById(req.params.id);

        return res.render('./chars/edit-char', { char });
    } catch (error) {
        return next(error);
    }
});

router.put('/edit-char/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const { name, faction, race, charClass, level, realm, pic, ...professions } = req.body;

        for (let profession in professions) {
            professions[profession] = professions[profession] === 'on' ? true : false;
        }

        const characterData = { name, faction, race, charClass, level, realm, pic, professions }

        const updatedChar = await Char.findOneAndUpdate(
            { _id: id },
            characterData,
            { new: true }
        );
        return res.redirect(`/chars/${id}`);
    } catch (error) {
        return next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const char = await Char.findById(id);
        return res.status(200).render('./chars/char', { char });

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
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleted = await Char.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json('The character you are trying to delete does not exist.')
        } else {
            return res.redirect('/chars');
        };
    } catch (error) {
        return next(error);
    }
});

// TODO: Llevar estas peticiones a un controller unused.
// Otras peticiones que devuelven JSON:

router.get('/race/:charRace', async (req, res, next) => {
    const { charRace } = req.params;

    try {
        const charsByRace = await Char.find({ race: charRace });
        return res.status(200).json(charsByRace);
    } catch (error) {
        next(error);
    }
});

router.get('/level/:charLevel', async (req, res, next) => {
    const { charLevel } = req.params;

    try {
        const charsByLevel = await Char.find({ level: { $gte: charLevel } });
        return res.status(200).json(charsByLevel);
    } catch (error) {
        next(error);
    }
});

router.get('/filter', async (req, res, next) => {
    try {
        const { race, level, realm } = req.query;
        const query = {};

        // Si el condicional es solo una condición, se puede simplificar su sintaxis.
        // La expresión regular de Mongoose de realm es para buscarlo sin ser case sensitive.
        if (race) query.race = race;
        if (level) query.level = level;
        if (realm) query.realm = { $regex: new RegExp("^" + realm.toLowerCase(), "i") };

        const filtered = await Char.find(query);

        return res.status(200).json(filtered);
    } catch (error) {
        next(error);
    }
});

module.exports = router;