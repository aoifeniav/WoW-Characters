const express = require('express');
const router = express.Router();
const guildControllers = require('../controllers/guild.controllers');

router.get('/', guildControllers.guildGet);

// TODO: Crear vista para crear hermandad
router.get('/new-guild', guildControllers.newGuildGet);
router.post('/new-guild', guildControllers.newGuildPost);

// TODO: Crear vista para editar hermandad
router.get('/edit-guild/:id', guildControllers.editGuildGet);
router.put('/edit-guild/:id', guildControllers.editGuildPut);

router.delete('/delete/:id', guildControllers.guildDelete);

module.exports = router;
