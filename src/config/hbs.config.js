const hbs = require('hbs');
const mongoose = require('mongoose');

const hbsHelpers = () => {
    try {
        hbs.registerHelper('ifEquals', (charData, desiredData, opts) => {
            return (charData == desiredData) ? opts.fn(this) : opts.inverse(this);
        });

        // TODO:
        hbs.registerHelper('profCount', (professions) => professions.length);

        hbs.registerHelper('json', (content) => JSON.stringify(content));
    } catch (error) {
        return next(error);
    }
}

module.exports = { hbsHelpers };
