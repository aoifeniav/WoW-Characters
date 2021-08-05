const mongoose = require('mongoose');

const { Schema } = mongoose;

const charSchema = new Schema(
    {
        name: { type: String, required: true },
        faction: { type: String, required: true, enum: ['Horde', 'Alliance'] },
        race: { type: String, required: true },
        charClass: { type: String, required: true },
        level: { type: Number, default: 1, required: true },
        realm: { type: String, required: true },
        pic: { type: String },
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
    },
    { timestamps: true }
);

const Char = mongoose.model('Characters', charSchema);

module.exports = Char;