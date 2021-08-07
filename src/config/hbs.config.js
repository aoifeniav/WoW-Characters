const hbs = require('hbs');

const hbsHelpers = () => {
    try {
        hbs.registerHelper('ifEquals', function(data, desiredData, opts) {
            return (data == desiredData) ? opts.fn(this) : opts.inverse(this);
        });

        hbs.registerHelper('arrayIsEmpty', function(data, desiredData, opts) {
            return (data.length == 0) ? opts.fn(this) : opts.inverse(this);
        });

        // TODO: Probar
        hbs.registerHelper('arrayLength', (array) => array.length);
    } catch (error) {
        return next(error);
    }
}

module.exports = { hbsHelpers };
