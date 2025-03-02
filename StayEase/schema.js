const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing:Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image:Joi.string().allow("",null),
    })
    
})



// title: joi.string().required(),
// description:joi.string().required(),
// location: joi.string().required(),
// country: joi.string().required(),
// price: joi.number().required().min(0),
// image:joi.string().allow("",null),



// const Joi = require('joi');

// const schema = Joi.object({
//     listing: Joi.String()
//         title: Joi.string().required(),

//     password: Joi.string()
//         .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

//     repeat_password: Joi.ref('password'),

//     access_token: [
//         Joi.string(),
//         Joi.number()
//     ],

//     birth_year: Joi.number()
//         .integer()
//         .min(1900)
//         .max(2013),

//     email: Joi.string()
//         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
// })