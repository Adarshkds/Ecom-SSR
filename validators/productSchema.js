const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().min(3).max(12).required(),
    imageLink: Joi.string().allow(''),
    price: Joi.number().min(0).max(500000).required(),
    description: Joi.string().required(),
    colors: Joi.string().allow('')
})

module.exports = productSchema; 