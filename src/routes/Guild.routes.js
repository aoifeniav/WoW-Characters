const express = require('express');
const router = express.Router();
const guildControllers = require('../controllers/guild.controllers');

router.get('/:id', guildControllers.guildGet);
router.delete('/:id', guildControllers.guildDelete);

module.exports = router;
