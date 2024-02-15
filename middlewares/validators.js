const Joi = require('joi');

validator = (schema) => {
    return (req, res, next) => {
        const body = req.body;
        const { error, value } = schema.validate(body);

        if (error) {
            return res.render('err', {error} );
        }
        next();
    }
}

module.exports = validator;