const express = require('express');
const router = express.Router();
const charControllers = require('../controllers/char.controller');
const charFiltersControllers = require('../controllers/char-filters.controller');
const files = require('../middlewares/files.middleware');

router.get('/', charControllers.charListGet);

router.get('/new-char', charControllers.newCharGet);
router.post('/new-char', files.multerUpload.single('pic'), files.cloudinaryUpload, charControllers.newCharPost);

router.get('/edit-char/:id', charControllers.editCharGet);
router.put('/edit-char/:id', files.multerUpload.single('pic'), files.cloudinaryUpload, charControllers.editCharPut);

router.get('/realm/:charRealm', charFiltersControllers.charsByRealm);
router.get('/level/:charLevel', charFiltersControllers.charsByLevel);
router.get('/filter', charFiltersControllers.charsByQuery);

router.get('/:id', charControllers.charGet);
router.delete('/:id', charControllers.charDelete);

module.exports = router;