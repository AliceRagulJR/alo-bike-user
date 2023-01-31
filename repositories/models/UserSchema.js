const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

let UserSchema = new Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    // password: {
    //     type: String,
    //     require: true
    // },
    phoneNumber: {
        type: Number,
        required: true
    },
    securityPin: {
        type: Number,
        required: true
    },
    licenceNumber: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    },
 
})
const validate = (user) => {
    const schema = Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().required().email(),
        phoneNumber: Joi.number().required(),
        securityPin: Joi.number().required(),
        licenceNumber: Joi.string().required(),
    });
    return schema.validate(user, { abortEarly: false });
};

module.exports = { UserSchema, validate }
