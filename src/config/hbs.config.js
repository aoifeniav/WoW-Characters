const hbs = require('hbs');

const hbsHelpers = () => {
    try {
        hbs.registerHelper('ifEquals', function(data, desiredData, opts) {
            return (data == desiredData) ? opts.fn(this) : opts.inverse(this);
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = { hbsHelpers };
