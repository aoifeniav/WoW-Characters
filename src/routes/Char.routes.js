const express = require('express');
const router = express.Router();
const charControllers = require('../controllers/char.controller');
const charFiltersControllers = require('../controllers/char-filters.controller');

router.get('/', charControllers.charListGet);

router.get("/new-char", charControllers.newCharGet);
router.post('/new-char', charControllers.newCharPost);

router.get("/edit-char/:id", charControllers.editCharGet);
router.put('/edit-char/:id', charControllers.editCharPut);

router.get('/realm/:charRealm', charFiltersControllers.charsByRealm);
router.get('/level/:charLevel', charFiltersControllers.charsByLevel);
router.get('/filter', charFiltersControllers.charsByQuery);

router.get('/:id', charControllers.charGet);
router.delete('/:id', charControllers.charDelete);

module.exports = router;