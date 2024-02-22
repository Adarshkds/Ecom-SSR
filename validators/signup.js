const Joi = require('joi');

const user = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(1).max(10).required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    gridRadios: Joi.allow('')
})

module.exports = user;