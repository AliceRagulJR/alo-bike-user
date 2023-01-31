const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

let TaskSchema = new Schema({
    currentDate: {
        type: String,
        required: true
    },
    startingKm: {
        type: String,
        required: true
    },
    endingKm: {
        type: String,
        required: true
    },
    petrolAmount: {
        type: String,
        required: true
    },
    otherCharges: {
        type: String,
        required: true
    },
    collectionAboutToday: {
        type: String,
        required: true
    },
    cashInHand: {
        type: Number,
        required: true
    },
    depositAmount: {
        type: String,
        required: true
    },
    dailyBeta: {
        type: String,
        required: true
    },
    name: {
        type: String,
        require: true
    },
})
 const validate = (user) => {
    const schema = Joi.object({
        currentDate: Joi.string().required(),
        startingKm: Joi.string().required(),
        endingKm: Joi.string().required(),
        petrolAmount: Joi.string().required(),
        otherCharges: Joi.string().required(),
        collectionAboutToday: Joi.string().required(),
        cashInHand: Joi.number().required(),
        depositAmount: Joi.string().required(),
        dailyBeta: Joi.string().required(),
        name: Joi.string().required(),
    });
    return schema.validate(user,{abortEarly:false});
};

module.exports = {TaskSchema, validate}
