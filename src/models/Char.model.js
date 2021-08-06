const mongoose = require('mongoose');

const { Schema } = mongoose;

const charSchema = new Schema(
    {
        name: { type: String, required: true },
        faction: {
            type: String,
            required: true,
            enum: ['Horde', 'Alliance']
        },
        race: {
            type: String,
            required: true,
            enum: ["blood elf", "dark iron dwarf", "draenei", "dwarf", "gnome", "goblin", "highmountain tauren", "kul tiran", "lightforged draenei", "human", 
            "mag'har orc", "mechagnome", "night elf", "nightborne", "orc", "pandaren", "tauren", "troll", "undead", "void elf", "vulpera", "worgen", "zandalari troll"]
        },
        charClass: {
            type: String,
            required: true,
            enum: ['death knight', 'demon hunter', 'druid', 'hunter', 'mage', 'monk', 'paladin', 'priest', 'rogue', 'shaman', 'warlock', 'warrior']
        },
        level: { type: Number, required: true, min: 1, max: 60 },
        realm: { type: String, required: true },
        pic: { type: String, default: 'https://res.cloudinary.com/wowchars/image/upload/v1628187301/default_xnibvc.jpg' },
        professions: {
            alchemy: { type: Boolean, default: false },
            blacksmithing: { type: Boolean, default: false },
            enchanting: { type: Boolean, default: false },
            engineering: { type: Boolean, default: false },
            herbalism: { type: Boolean, default: false },
            inscription: { type: Boolean, default: false },
            jewelcrafting: { type: Boolean, default: false },
            leatherworking: { type: Boolean, default: false },
            mining: { type: Boolean, default: false },
            skinning: { type: Boolean, default: false },
            tailoring: { type: Boolean, default: false }
        },
        owner: { type: mongoose.Types.ObjectId, ref: 'Users' }
    },
    { timestamps: true }
);

const Char = mongoose.model('Characters', charSchema);

module.exports = Char;


