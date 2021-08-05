const mongoose = require('mongoose');
const Char = require('../models/Char.model');
const db = require('../config/db.config.js');

const chars = [
    {
        name: 'Orënne',
        faction: 'Horde',
        race: 'tauren',
        charClass: 'shaman',
        level: 60,
        realm: "C'Thun",
        professions: {
            leatherworking: true,
            skinning: true,
        }
    },
    {
        name: 'Zekogs',
        faction: 'Horde',
        race: 'troll',
        charClass: 'death knight',
        level: 50,
        realm: "C'Thun",
        professions: {
            herbalism: true,
            mining: true,
        }
    },
    {
        name: 'Galeshra',
        faction: 'Horde',
        race: 'blood elf',
        charClass: 'priest',
        level: 60,
        realm: "C'Thun",
        professions: {
            alchemy: true,
            tailoring: true,
        }
    },
    {
        name: 'Anasthore',
        faction: 'Horde',
        race: 'blood elf',
        charClass: 'paladin',
        level: 60,
        realm: "C'Thun",
        professions: {
            enchanting: true,
            jewelcrafting: true,
        }
    },
    {
        name: 'Mengzhen',
        faction: 'Horde',
        race: 'pandaren',
        charClass: 'monk',
        level: 60,
        realm: "C'Thun",
        professions: {
            herbalism: true,
            inscription: true,
        }
    },
    {
        name: 'Thelramir',
        faction: 'Horde',
        race: 'blood elf',
        charClass: 'demon hunter',
        level: 50,
        realm: "C'Thun",
        professions: {
            blacksmithing: true,
            engineering: true,
        }
    },
    {
        name: 'Gibraelyn',
        faction: 'Horde',
        race: 'nightborne',
        charClass: 'rogue',
        level: 60,
        realm: "C'Thun",
        professions: {
            herbalism: true,
            mining: true,
        }
    },
    {
        name: 'Nadayt',
        faction: 'Horde',
        race: 'vulpera',
        charClass: 'warrior',
        level: 52,
        realm: "C'Thun",
    },
    {
        name: 'Sisomeet',
        faction: 'Horde',
        race: 'Zandalari troll',
        charClass: 'druid',
        level: 60,
        realm: "C'Thun",
    },
    {
        name: 'Ximénez',
        faction: 'Horde',
        race: 'undead',
        charClass: 'warlock',
        level: 60,
        realm: "C'Thun",
    },
    {
        name: 'Fredericia',
        faction: 'Horde',
        race: 'goblin',
        charClass: 'shaman',
        level: 60,
        realm: "C'Thun",
        professions: {
            enchanting: true,
        }
    },
    {
        name: 'Xingtian',
        faction: 'Horde',
        race: 'pandaren',
        charClass: 'hunter',
        level: 44,
        realm: "C'Thun",
    },
    {
        name: 'Ereyaad',
        faction: 'Alliance',
        race: 'draenei',
        charClass: 'hunter',
        level: 60,
        realm: "Los Errantes",
        professions: {
            enchanting: true,
        }
    },
    {
        name: 'Nanyla',
        faction: 'Alliance',
        race: 'night elf',
        charClass: 'hunter',
        level: 60,
        realm: "Los Errantes",
    },
    {
        name: 'Brishen',
        faction: 'Alliance',
        race: 'worgen',
        charClass: 'priest',
        level: 58,
        realm: "Los Errantes",
    },
    {
        name: 'Kuruudos',
        faction: 'Alliance',
        race: 'Lightforged draenei',
        charClass: 'paladin',
        level: 60,
        realm: "Los Errantes",
    },
    {
        name: 'Raekhara',
        faction: 'Alliance',
        race: 'Dark Iron dwarf',
        charClass: 'warlock',
        level: 50,
        realm: "Los Errantes",
    },
    {
        name: 'Gildredzisa',
        faction: 'Alliance',
        race: 'mechagnome',
        charClass: 'mage',
        level: 60,
        realm: "Los Errantes",
        professions: {
            enchanting: true,
        }
    },
    {
        name: 'Ygweede',
        faction: 'Horde',
        race: 'goblin',
        charClass: 'mage',
        level: 50,
        realm: "Zul'jin",
    },
];

mongoose
    .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const allChars = await Char.find();

        if (allChars.length) {
            console.log(`[FIND] ${allChars.length} characters found.`);
            await Char.collection.drop();
            console.log("[DELETE] Collection deleted.");
        } else {
            console.log('[FIND] No characters were found.')
        }
    })
    .catch(error => console.log('[ERROR] Unable to delete collection:', error))
    .then(async () => {
        await Char.insertMany(chars);
        console.log('[SUCCESS] Characters reset.');
    })
    .catch(error => console.log('[ERROR] Unable to reset characters:', error))
    .finally(() => mongoose.disconnect());

