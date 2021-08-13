const mongoose = require('mongoose');

const { Schema } = mongoose;

const guildSchema = new Schema(
    {
        name: { type: String, required: true },
        faction: { type: String, required: true },
        realm: { type: String, required: true },
        members: [ { type: mongoose.Types.ObjectId, ref: 'Characters' } ]
    },
    { timestamps: true }
);

const Guild = mongoose.model('Guilds', guildSchema);

module.exports = Guild;
