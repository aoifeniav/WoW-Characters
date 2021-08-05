const hbs = require('hbs');
const mongoose = require('mongoose');

const hbsHelpers = () => {
    try {
        // TODO: Hay que probar este helper
        hbs.registerHelper('profCount', (professions) => professions.length);
        
        hbs.registerHelper('json', (content) => JSON.stringify(content));
    } catch (error) {
        return next(error);
    }
}

module.exports = { hbsHelpers };
